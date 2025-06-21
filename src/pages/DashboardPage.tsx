
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { GroveProgress } from '@/components/GroveProgress';
import { WelcomeMessage } from '@/components/WelcomeMessage';
import { MemberAvatar } from '@/components/MemberAvatar';
import { StatusBadge } from '@/components/StatusBadge';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Copy, Share2, Users, MessageSquare, Bell } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  groveId: string;
  inviteCount: number;
  referrals: Array<{
    name: string;
    email: string;
    joinedAt: string;
    status: 'confirmed' | 'pending';
  }>;
}

const DashboardPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [copying, setCopying] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userId = localStorage.getItem('currentUserId');
        if (!userId) {
          navigate('/signup');
          return;
        }

        const response = await fetch(`/api/user/${userId}`);
        if (!response.ok) throw new Error('Failed to load user data');
        
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error loading user data:', error);
        navigate('/signup');
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [navigate]);

  const handleCopyLink = async () => {
    if (!user) return;
    
    setCopying(true);
    const inviteLink = `${window.location.origin}/invite/${user.groveId}`;
    
    try {
      await navigator.clipboard.writeText(inviteLink);
      toast({
        title: "Invite link copied!",
        description: "Share this link to grow your Grove.",
      });
    } catch (error) {
      console.error('Failed to copy:', error);
      toast({
        title: "Copy failed",
        description: "Please copy the link manually.",
        variant: "destructive"
      });
    } finally {
      setCopying(false);
    }
  };

  const handleShare = async () => {
    if (!user) return;
    
    const inviteLink = `${window.location.origin}/invite/${user.groveId}`;
    const shareText = `Join my Grove on Coreleven - a rhythm-based network for human growth. ${inviteLink}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join my Grove',
          text: shareText,
          url: inviteLink
        });
      } catch (error) {
        console.error('Share failed:', error);
      }
    } else {
      handleCopyLink();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-50 to-earth-50">
        <div className="animate-pulse text-earth-600">Loading your Grove...</div>
      </div>
    );
  }

  if (!user) return null;

  const isComplete = user.inviteCount >= 10;
  const groveStatus = isComplete ? 'completed' : user.inviteCount > 0 ? 'in-progress' : 'empty';

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-stone-50 to-earth-50">
      <div className="container max-w-4xl mx-auto px-4">
        <NavBar />
        
        <main className="flex-grow py-8">
          <div className="max-w-2xl mx-auto space-y-8">
            {/* Welcome Section */}
            <WelcomeMessage userName={user.name} />

            {/* Grove Status Header */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-stone-200/50">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-xl font-medium text-earth-700">Your Grove</h1>
                  <p className="text-stone-600 text-sm">
                    {isComplete ? 'Complete and thriving' : `${10 - user.inviteCount} spots remaining`}
                  </p>
                </div>
                <StatusBadge status={groveStatus} />
              </div>
              
              <div className="flex justify-center">
                <GroveProgress 
                  filledCount={user.inviteCount} 
                  size="md" 
                  showPulse={!isComplete}
                />
              </div>
            </div>

            {/* Members Grid */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-stone-200/50">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-earth-700 flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Grove Members
                </h2>
                <span className="text-sm text-stone-500">{user.inviteCount + 1} of 11</span>
              </div>
              
              <div className="grid grid-cols-6 gap-3 mb-6">
                {/* User (center) */}
                <div className="col-span-6 flex justify-center mb-2">
                  <div className="text-center">
                    <MemberAvatar 
                      name={user.name}  
                      status="confirmed" 
                      size="lg"
                      showStatus={false}
                    />
                    <p className="text-xs text-stone-600 mt-1 font-medium">You</p>
                  </div>
                </div>
                
                {/* Referrals */}
                {user.referrals.map((referral, index) => (
                  <div key={index} className="text-center">
                    <MemberAvatar 
                      name={referral.name} 
                      status={referral.status}
                      size="md"
                    />
                    <p className="text-xs text-stone-600 mt-1 truncate">{referral.name}</p>
                  </div>
                ))}
                
                {/* Empty slots */}
                {Array.from({ length: 10 - user.inviteCount }).map((_, index) => (
                  <div key={`empty-${index}`} className="text-center">
                    <MemberAvatar status="empty" size="md" showStatus={false} />
                    <p className="text-xs text-stone-400 mt-1">Open</p>
                  </div>
                ))}
              </div>

              {!isComplete && (
                <div className="border-t border-stone-200 pt-4">
                  <div className="bg-stone-100 p-4 rounded-xl mb-4">
                    <code className="text-sm text-stone-700 break-all">
                      {window.location.origin}/invite/{user.groveId}
                    </code>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      onClick={handleCopyLink}
                      disabled={copying}
                      className="flex-1 bg-earth-600 hover:bg-earth-700 text-white rounded-xl"
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      {copying ? 'Copying...' : 'Copy Invite Link'}
                    </Button>
                    
                    <Button 
                      onClick={handleShare}
                      variant="outline"
                      className="flex-1 border-earth-300 text-earth-700 hover:bg-earth-50 rounded-xl"
                    >
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Grove Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="p-6 h-auto flex-col items-start border-earth-200 hover:border-earth-300 hover:bg-earth-50 rounded-xl"
                disabled
              >
                <MessageSquare className="h-5 w-5 mb-2 text-earth-600" />
                <div className="text-left">
                  <div className="font-medium text-earth-700">Grove Chat</div>
                  <div className="text-xs text-stone-500">Coming soon</div>
                </div>
              </Button>
              
              <Button 
                variant="outline"
                className="p-6 h-auto flex-col items-start border-earth-200 hover:border-earth-300 hover:bg-earth-50 rounded-xl"
                disabled
              >
                <Bell className="h-5 w-5 mb-2 text-earth-600" />
                <div className="text-left">
                  <div className="font-medium text-earth-700">Reflections</div>
                  <div className="text-xs text-stone-500">Coming soon</div>
                </div>
              </Button>
            </div>

            {/* Complete Grove CTA */}
            {isComplete && (
              <div className="bg-gradient-to-br from-earth-100 to-earth-50 p-6 rounded-2xl border border-earth-200">
                <div className="text-center">
                  <h3 className="text-lg font-medium text-earth-800 mb-2">
                    🌳 Grove Complete!
                  </h3>
                  <p className="text-stone-700 mb-4">
                    Your Grove has reached full potential. Explore what's next.
                  </p>
                  <PrimaryButton asChild className="bg-earth-600 hover:bg-earth-700 rounded-xl">
                    <Link to="/grove-complete">
                      Explore Your Complete Grove
                    </Link>
                  </PrimaryButton>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardPage;
