import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { WelcomeMessage } from '@/components/WelcomeMessage';
import { GroveProgress } from '@/components/GroveProgress';
import { MemberCard } from '@/components/MemberCard';
import { StatusBadge } from '@/components/StatusBadge';
import { PrimaryButton } from '@/components/PrimaryButton';
import { AudioRoom } from '@/components/audio/AudioRoom';
import { GroveChat } from '@/components/grove/GroveChat';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { Plus, Users, Sparkles, Settings, Volume2 } from 'lucide-react';

interface Grove {
  id: string;
  invite_code: string;
  created_at: string;
  is_complete: boolean;
  grove_type: 'personal' | 'auto';
  is_private: boolean;
  members?: any[];
  memberCount: number;
}

interface Profile {
  id: string;
  full_name: string;
  email: string;
  created_at: string;
}

const DashboardPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [groves, setGroves] = useState<Grove[]>([]);
  const [selectedGrove, setSelectedGrove] = useState<Grove | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'audio' | 'chat'>('overview');

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (!session) {
          navigate('/auth');
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (!session) {
        navigate('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  useEffect(() => {
    if (groves.length > 0 && !selectedGrove) {
      setSelectedGrove(groves[0]);
    }
  }, [groves, selectedGrove]);

  const loadUserData = async () => {
    if (!user) return;

    try {
      // Load profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error('Error loading profile:', profileError);
      } else {
        setProfile(profileData);
      }

      // Load groves with member counts
      const { data: grovesData, error: grovesError } = await supabase
        .from('groves')
        .select(`
          *,
          grove_members (
            id,
            user_id,
            joined_at,
            profiles:user_id (
              full_name,
              email
            )
          )
        `)
        .or(`owner_id.eq.${user.id},grove_members.user_id.eq.${user.id}`);

      if (grovesError) {
        console.error('Error loading groves:', grovesError);
      } else {
        const processedGroves = grovesData?.map(grove => ({
          ...grove,
          memberCount: (grove.grove_members?.length || 0) + 1, // +1 for owner
          members: grove.grove_members
        })) || [];
        
        setGroves(processedGroves);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-50 to-earth-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-earth-600 mx-auto mb-4"></div>
          <p className="text-stone-600">Loading your Groves...</p>
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    return null;
  }

  const personalGroves = groves.filter(g => g.grove_type === 'personal');
  const autoGroves = groves.filter(g => g.grove_type === 'auto');

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-stone-50 to-earth-50">
      <div className="container max-w-6xl mx-auto px-4">
        <NavBar />
        
        <main className="flex-grow py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Sidebar - Grove List */}
            <div className="space-y-6">
              <WelcomeMessage userName={profile.full_name} />
              
              {/* Personal Groves */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-stone-200/50 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-earth-700 flex items-center">
                    <Users className="mr-2 h-5 w-5" />
                    Personal Groves
                  </h3>
                  <PrimaryButton
                    onClick={() => navigate('/start-grove')}
                    className="text-xs px-3 py-1 bg-earth-600 hover:bg-earth-700"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    New
                  </PrimaryButton>
                </div>
                
                <div className="space-y-3">
                  {personalGroves.map(grove => (
                    <div
                      key={grove.id}
                      onClick={() => setSelectedGrove(grove)}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedGrove?.id === grove.id
                          ? 'border-earth-500 bg-earth-50'
                          : 'border-stone-200 hover:border-earth-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">My Grove</span>
                        <StatusBadge 
                          status={grove.is_complete ? 'complete' : 'active'} 
                          size="sm" 
                        />
                      </div>
                      <GroveProgress 
                        currentMembers={grove.memberCount} 
                        targetMembers={11} 
                        size="sm" 
                      />
                      <p className="text-xs text-stone-600 mt-1">
                        Code: {grove.invite_code}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Auto Groves */}
              {autoGroves.length > 0 && (
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-stone-200/50 p-6">
                  <h3 className="font-medium text-earth-700 mb-4 flex items-center">
                    <Sparkles className="mr-2 h-5 w-5" />
                    Auto Groves
                  </h3>
                  
                  <div className="space-y-3">
                    {autoGroves.map(grove => (
                      <div
                        key={grove.id}
                        onClick={() => setSelectedGrove(grove)}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                          selectedGrove?.id === grove.id
                            ? 'border-earth-500 bg-earth-50'
                            : 'border-stone-200 hover:border-earth-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-sm">Auto Grove #{grove.id.slice(-4)}</span>
                          <StatusBadge 
                            status={grove.is_complete ? 'complete' : 'active'} 
                            size="sm" 
                          />
                        </div>
                        <GroveProgress 
                          currentMembers={grove.memberCount} 
                          targetMembers={11} 
                          size="sm" 
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-stone-200/50 p-6">
                <PrimaryButton
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Sign Out
                </PrimaryButton>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {selectedGrove && (
                <>
                  {/* Grove Header */}
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-stone-200/50 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h2 className="text-xl font-medium text-earth-700 mb-1">
                          {selectedGrove.grove_type === 'personal' ? 'My Grove' : `Auto Grove #${selectedGrove.id.slice(-4)}`}
                        </h2>
                        <p className="text-stone-600 text-sm">
                          {selectedGrove.is_complete 
                            ? 'Complete Grove of 11 members' 
                            : `${selectedGrove.memberCount} of 11 members`}
                        </p>
                      </div>
                      <StatusBadge 
                        status={selectedGrove.is_complete ? 'complete' : 'active'}
                      />
                    </div>
                    
                    <GroveProgress 
                      currentMembers={selectedGrove.memberCount} 
                      targetMembers={11} 
                    />
                  </div>

                  {/* Tab Navigation */}
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-stone-200/50">
                    <div className="flex border-b border-stone-200">
                      {[
                        { id: 'overview', label: 'Overview', icon: Users },
                        { id: 'audio', label: 'Audio Room', icon: Volume2 },
                        { id: 'chat', label: 'Chat', icon: Users }
                      ].map(({ id, label, icon: Icon }) => (
                        <button
                          key={id}
                          onClick={() => setActiveTab(id as any)}
                          className={`flex-1 flex items-center justify-center px-4 py-3 text-sm font-medium transition-colors ${
                            activeTab === id
                              ? 'text-earth-700 border-b-2 border-earth-600 bg-earth-50'
                              : 'text-stone-600 hover:text-earth-600'
                          }`}
                        >
                          <Icon className="mr-2 h-4 w-4" />
                          {label}
                        </button>
                      ))}
                    </div>

                    <div className="p-6">
                      {activeTab === 'overview' && (
                        <div className="space-y-4">
                          <h3 className="font-medium text-earth-700">Grove Members</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Owner */}
                            <MemberCard
                              name={profile.full_name}
                              email={profile.email}
                              joinDate={selectedGrove.created_at}
                              isOwner={true}
                            />
                            
                            {/* Members */}
                            {selectedGrove.members?.map((member: any) => (
                              <MemberCard
                                key={member.id}
                                name={member.profiles?.full_name || 'Anonymous'}
                                email={member.profiles?.email || ''}
                                joinDate={member.joined_at}
                                isOwner={false}
                              />
                            ))}
                          </div>
                          
                          {!selectedGrove.is_complete && (
                            <div className="mt-6 p-4 bg-earth-50 rounded-lg border border-earth-200">
                              <p className="text-sm text-earth-700 mb-2">
                                <strong>Invite Code:</strong> {selectedGrove.invite_code}
                              </p>
                              <p className="text-xs text-earth-600">
                                Share this code with friends to invite them to your Grove. 
                                Your Grove will be complete when you reach 11 members.
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      {activeTab === 'audio' && (
                        <AudioRoom
                          groveId={selectedGrove.id}
                          groveName={selectedGrove.grove_type === 'personal' ? 'My Grove' : `Auto Grove #${selectedGrove.id.slice(-4)}`}
                        />
                      )}

                      {activeTab === 'chat' && (
                        <GroveChat
                          groveId={selectedGrove.id}
                          groveName={selectedGrove.grove_type === 'personal' ? 'My Grove' : `Auto Grove #${selectedGrove.id.slice(-4)}`}
                        />
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardPage;
