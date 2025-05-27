
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CircleVisual } from '@/components/CircleVisual';
import { Sprout } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SignupPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email) {
      toast({
        title: "Please fill in all fields",
        description: "Name and email are required to begin your Grove.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Create user in Airtable and get Stripe checkout session
      const response = await fetch('/api/create-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) throw new Error('Failed to create user');
      
      const { checkoutUrl, userId } = await response.json();
      
      // Store user ID in localStorage for post-payment redirect
      localStorage.setItem('pendingUserId', userId);
      
      // Redirect to Stripe checkout
      window.location.href = checkoutUrl;
      
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again in a moment.",
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-stone-50 to-earth-50">
      <div className="container max-w-4xl mx-auto px-4">
        <NavBar />
        
        <main className="flex-grow py-12 flex items-center justify-center">
          <div className="max-w-md w-full">
            <div className="text-center mb-10">
              <h1 className="text-2xl md:text-3xl font-medium mb-4 text-earth-700">
                Begin Your Grove
              </h1>
              
              <p className="text-stone-600 mb-8">
                Join the rhythmic network. Your circle of 11 starts here.
              </p>
              
              <div className="flex justify-center mb-8">
                <CircleVisual filledCount={0} />
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
                    <span className="text-stone-600">One-time access</span>
                    <span className="text-2xl font-medium text-earth-700">$11.11</span>
                  </div>
                  
                  <PrimaryButton 
                    type="submit"
                    className="w-full text-lg py-6 bg-earth-600 hover:bg-earth-700 rounded-xl"
                    disabled={isSubmitting || !formData.fullName || !formData.email}
                  >
                    {isSubmitting ? (
                      "Creating your Grove..."
                    ) : (
                      <>
                        Complete Entry & Pay $11.11
                        <Sprout className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </PrimaryButton>
                  
                  <p className="text-xs text-stone-500 mt-3 text-center">
                    Secure payment. Your Grove awaits.
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

export default SignupPage;
