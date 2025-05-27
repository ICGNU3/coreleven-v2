
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { CircleVisual } from '@/components/CircleVisual';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Copy, Share2, Users } from 'lucide-react';

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

  const progress = (user.inviteCount / 10) * 100;
  const isComplete = user.inviteCount >= 10;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-stone-50 to-earth-50">
      <div className="container max-w-4xl mx-auto px-4">
        <NavBar />
        
        <main className="flex-grow py-12">
          <div className="max-w-2xl mx-auto">
            {/* Welcome Section */}
            <div className="text-center mb-12">
              <h1 className="text-2xl md:text-3xl font-medium mb-4 text-earth-700">
                Welcome to Your Grove, {user.name}
              </h1>
              
              {isComplete ? (
                <p className="text-lg text-earth-600 mb-8">
                  🌱 Your Grove is complete! Rhythm unlocked.
                </p>
              ) : (
                <p className="text-stone-600 mb-8">
                  Share your unique link to grow your Grove. Invite {10 - user.inviteCount} more aligned souls.
                </p>
              )}
            </div>

            {/* Grove Visual */}
            <div className="flex justify-center mb-12">
              <div className="relative">
                <CircleVisual filledCount={user.inviteCount} />
                {isComplete && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-earth-600 rounded-full flex items-center justify-center animate-pulse">
                      <span className="text-white text-2xl">✨</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Invite Link Section */}
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-stone-200/50 mb-8">
              <h2 className="text-xl font-medium mb-4 text-earth-700 flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Your Referral Link
              </h2>
              
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
                  {copying ? 'Copying...' : 'Copy Link'}
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

            {/* Progress Section */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-stone-200/50 mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="text-stone-600">Grove Progress</span>
                <span className="font-medium text-earth-700">{user.inviteCount} of 10</span>
              </div>
              
              <div className="w-full bg-stone-200 rounded-full h-3 mb-4">
                <div 
                  className="bg-earth-600 h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              
              {isComplete ? (
                <div className="text-center">
                  <PrimaryButton asChild className="bg-earth-600 hover:bg-earth-700 rounded-xl">
                    <Link to="/grove-complete">
                      View Your Complete Grove
                    </Link>
                  </PrimaryButton>
                </div>
              ) : (
                <p className="text-sm text-stone-500 text-center">
                  Each person who joins through your link fills another circle in your Grove.
                </p>
              )}
            </div>

            {/* Referrals List */}
            {user.referrals.length > 0 && (
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-stone-200/50">
                <h3 className="text-lg font-medium mb-4 text-earth-700">Your Grove Members</h3>
                <div className="space-y-3">
                  {user.referrals.map((referral, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-stone-50 rounded-xl">
                      <div>
                        <div className="font-medium text-stone-800">{referral.name}</div>
                        <div className="text-sm text-stone-500">{referral.email}</div>
                      </div>
                      <div className="text-xs text-stone-400">
                        {new Date(referral.joinedAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
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
