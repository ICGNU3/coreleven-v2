
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CircleVisual } from '@/components/CircleVisual';
import { Sprout } from 'lucide-react';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: Implement payment flow with Stripe
    console.log('Form submitted:', formData);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsSubmitting(false);
      // TODO: Redirect to dashboard after successful payment
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container max-w-5xl mx-auto px-4">
        <NavBar />
        
        <main className="flex-grow py-12">
          <div className="max-w-lg mx-auto">
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
            
            <div className="bg-white p-8 rounded-lg shadow-sm border border-stone-200">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Your full name"
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your@email.com"
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="username">Username (optional)</Label>
                  <Input
                    id="username"
                    type="text"
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    placeholder="Choose a unique username"
                    className="w-full"
                  />
                  <p className="text-xs text-stone-500">
                    This will be part of your invitation link: coreleven.app/invite/username
                  </p>
                </div>
                
                <div className="border-t border-stone-200 pt-6">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-stone-600">One-time access fee</span>
                    <span className="text-2xl font-medium text-earth-700">$11.11</span>
                  </div>
                  
                  <PrimaryButton 
                    type="submit"
                    className="w-full text-lg py-6"
                    disabled={isSubmitting || !formData.fullName || !formData.email}
                  >
                    {isSubmitting ? (
                      "Processing..."
                    ) : (
                      <>
                        Complete Entry & Pay $11.11
                        <Sprout className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </PrimaryButton>
                  
                  <p className="text-xs text-stone-500 mt-3 text-center">
                    Secure payment processing. Your Grove awaits.
                  </p>
                </div>
              </form>
            </div>
            
            <div className="text-center mt-8">
              <p className="text-stone-600 mb-4">
                Already been invited to a Grove?
              </p>
              <Button variant="ghost" asChild>
                <Link to="/invite" className="text-earth-600 hover:text-earth-800">
                  Use invitation link instead
                </Link>
              </Button>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default SignupPage;
