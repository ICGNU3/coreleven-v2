
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CircleVisual } from '@/components/CircleVisual';
import { useToast } from '@/hooks/use-toast';
import { Users, Sprout } from 'lucide-react';

interface InviteData {
  inviterName: string;
  groveId: string;
  filledSpots: number;
  isValid: boolean;
}

const InvitePage = () => {
  const { inviteId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [inviteData, setInviteData] = useState<InviteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadInviteData = async () => {
      try {
        const response = await fetch(`/api/invite/${inviteId}`);
        if (!response.ok) throw new Error('Invalid invite');
        
        const data = await response.json();
        setInviteData(data);
      } catch (error) {
        console.error('Error loading invite:', error);
        setInviteData({ inviterName: '', groveId: '', filledSpots: 0, isValid: false });
      } finally {
        setLoading(false);
      }
    };

    if (inviteId) {
      loadInviteData();
    } else {
      setLoading(false);
    }
  }, [inviteId]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email) {
      toast({
        title: "Please fill in all fields",
        description: "Name and email are required to join this Grove.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Join Grove via invite
      const response = await fetch('/api/join-grove', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          referrerGroveId: inviteData?.groveId
        })
      });
      
      if (!response.ok) throw new Error('Failed to join Grove');
      
      const { checkoutUrl, userId } = await response.json();
      
      // Store user ID for post-payment redirect
      localStorage.setItem('pendingUserId', userId);
      localStorage.setItem('joinedViaInvite', 'true');
      
      // Redirect to Stripe checkout
      window.location.href = checkoutUrl;
      
    } catch (error) {
      console.error('Join error:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again in a moment.",
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-50 to-earth-50">
        <div className="animate-pulse text-earth-600">Loading invitation...</div>
      </div>
    );
  }

  if (!inviteData?.isValid) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-stone-50 to-earth-50">
        <div className="container max-w-4xl mx-auto px-4">
          <NavBar />
          <main className="flex-grow py-12 flex items-center justify-center">
            <div className="max-w-md w-full text-center">
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-stone-200/50">
                <h1 className="text-2xl font-medium mb-4 text-earth-700">
                  Invalid Invitation
                </h1>
                <p className="text-stone-600 mb-6">
                  This invitation link is no longer valid or has expired.
                </p>
                <PrimaryButton asChild className="bg-earth-600 hover:bg-earth-700 rounded-xl">
                  <a href="/signup">
                    Start Your Own Grove
                    <Sprout className="ml-2 h-4 w-4" />
                  </a>
                </PrimaryButton>
              </div>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-stone-50 to-earth-50">
      <div className="container max-w-4xl mx-auto px-4">
        <NavBar />
        
        <main className="flex-grow py-12 flex items-center justify-center">
          <div className="max-w-md w-full">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-earth-600 rounded-full mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              
              <h1 className="text-2xl md:text-3xl font-medium mb-4 text-earth-700">
                You've Been Invited
              </h1>
              
              <p className="text-stone-600 mb-2">
                <strong>{inviteData.inviterName}</strong> has invited you to join their Grove.
              </p>
              
              <p className="text-sm text-stone-500 mb-8">
                A rhythm-based network for human growth and collective potential.
              </p>
              
              <div className="flex justify-center mb-8">
                <CircleVisual filledCount={inviteData.filledSpots} />
              </div>
              
              <div className="bg-earth-50 p-4 rounded-xl mb-8">
                <p className="text-sm text-earth-700">
                  <strong>{10 - inviteData.filledSpots}</strong> spots remaining in this Grove
                </p>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-stone-200/50">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-earth-700 font-medium">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Your full name"
                    className="border-stone-300 focus:border-earth-500 rounded-xl"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-earth-700 font-medium">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your@email.com"
                    className="border-stone-300 focus:border-earth-500 rounded-xl"
                  />
                </div>
                
                <div className="border-t border-stone-200 pt-6">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-stone-600">Access fee</span>
                    <span className="text-2xl font-medium text-earth-700">$11.11</span>
                  </div>
                  
                  <PrimaryButton 
                    type="submit"
                    className="w-full text-lg py-6 bg-earth-600 hover:bg-earth-700 rounded-xl"
                    disabled={isSubmitting || !formData.fullName || !formData.email}
                  >
                    {isSubmitting ? (
                      "Joining Grove..."
                    ) : (
                      <>
                        Join Grove & Pay $11.11
                        <Sprout className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </PrimaryButton>
                  
                  <p className="text-xs text-stone-500 mt-3 text-center">
                    After joining, you'll get your own referral link to build your Grove.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default InvitePage;
