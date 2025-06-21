
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CircleVisual } from '@/components/CircleVisual';
import { useToast } from '@/hooks/use-toast';
import { Users, Sprout, KeyRound } from 'lucide-react';

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
  const [inviteCode, setInviteCode] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showInviteForm, setShowInviteForm] = useState(!inviteId);

  useEffect(() => {
    if (inviteId) {
      loadInviteData();
    } else {
      setLoading(false);
      setShowInviteForm(true);
    }
  }, [inviteId]);

  const loadInviteData = async () => {
    try {
      // Simulate API call - replace with real API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock invite data - replace with real API response
      setInviteData({
        inviterName: 'Sarah Johnson',
        groveId: 'grove-123',
        filledSpots: Math.floor(Math.random() * 8) + 1,
        isValid: true
      });
    } catch (error) {
      console.error('Error loading invite:', error);
      setInviteData({ inviterName: '', groveId: '', filledSpots: 0, isValid: false });
    } finally {
      setLoading(false);
    }
  };

  const handleInviteCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inviteCode.trim()) {
      toast({
        title: "Please enter an invite code",
        description: "You need a valid invite code to join a Grove.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      // Simulate invite code validation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful validation - replace with real API
      setInviteData({
        inviterName: 'Sarah Johnson',
        groveId: 'grove-123',
        filledSpots: Math.floor(Math.random() * 8) + 1,
        isValid: true
      });
      
      setShowInviteForm(false);
      toast({
        title: "Invite code accepted!",
        description: "Welcome to the Grove invitation.",
      });
      
    } catch (error) {
      console.error('Invalid invite code:', error);
      toast({
        title: "Invalid invite code",
        description: "Please check your invite code and try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

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
      // Simulate joining Grove
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Welcome to Coreleven!",
        description: "You've successfully joined the Grove!",
      });
      
      // Redirect to dashboard
      navigate('/dashboard');
      
    } catch (error) {
      console.error('Join error:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again in a moment.",
        variant: "destructive"
      });
    } finally {
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

  // Show invite code entry form
  if (showInviteForm) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-stone-50 to-earth-50">
        <div className="container max-w-4xl mx-auto px-4">
          <NavBar />
          
          <main className="flex-grow py-12 flex items-center justify-center">
            <div className="max-w-md w-full">
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-earth-600 rounded-full mb-4">
                  <KeyRound className="h-8 w-8 text-white" />
                </div>
                
                <h1 className="text-2xl md:text-3xl font-medium mb-4 text-earth-700">
                  Enter Your Invite Code
                </h1>
                
                <p className="text-stone-600 mb-8">
                  Enter the invite code you received to join a Grove.
                </p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-stone-200/50">
                <form onSubmit={handleInviteCodeSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="inviteCode" className="text-earth-700 font-medium">Invite Code</Label>
                    <Input
                      id="inviteCode"
                      type="text"
                      required
                      value={inviteCode}
                      onChange={(e) => setInviteCode(e.target.value)}
                      placeholder="Enter your invite code"
                      className="border-stone-300 focus:border-earth-500 rounded-xl text-center text-lg tracking-wider"
                      autoFocus
                    />
                  </div>
                  
                  <PrimaryButton 
                    type="submit"
                    className="w-full text-lg py-6 bg-earth-600 hover:bg-earth-700 rounded-xl"
                    disabled={!inviteCode.trim()}
                  >
                    Validate Invite Code
                    <KeyRound className="ml-2 h-5 w-5" />
                  </PrimaryButton>
                </form>
              </div>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    );
  }

  // Show invalid invite
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

  // Show Grove invitation details and join form
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
                
                <div className="pt-4">
                  <PrimaryButton 
                    type="submit"
                    className="w-full text-lg py-6 bg-earth-600 hover:bg-earth-700 rounded-xl"
                    disabled={isSubmitting || !formData.fullName || !formData.email}
                  >
                    {isSubmitting ? (
                      "Joining Grove..."
                    ) : (
                      <>
                        Join Grove
                        <Sprout className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </PrimaryButton>
                  
                  <p className="text-xs text-stone-500 mt-3 text-center">
                    After joining, you'll get your own 10 invites to build your Grove.
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
