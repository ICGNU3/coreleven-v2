
import React, { useState } from 'react';
import { CircleVisual } from '@/components/CircleVisual';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface PaymentSectionProps {
  filledSpots: number;
  inviterName: string;
  onJoinSuccess: () => void;
}

export const PaymentSection = ({ filledSpots, inviterName, onJoinSuccess }: PaymentSectionProps) => {
  const { toast } = useToast();
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleJoinClick = () => {
    // Direct link to whop checkout - open in new tab
    window.open('https://whop.com/checkout/ius12MAWrV2VBT1mN-wN5P-HlWU-uCcK-XkHgsweoqtfO/', '_blank', 'noopener,noreferrer');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsSubmitting(false);
      onJoinSuccess();
      toast({
        title: "Welcome to Coreleven",
        description: "Your payment was successful and your spot is secure.",
      });
    }, 1500);
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-medium mb-4 text-earth-700">
          You've been invited to join Coreleven
        </h1>
        
        <p className="text-stone-600">
          {inviterName} has invited you to be part of their circle
        </p>
      </div>
      
      <div className="bg-stone-100 p-8 rounded-lg mb-8">
        <div className="flex flex-col items-center">
          <CircleVisual filledCount={filledSpots} className="mb-4" />
          
          <p className="text-lg font-medium text-earth-700 mb-8">
            Secure your spot with a yearly subscription
          </p>
          
          <div className="bg-white p-6 rounded-lg shadow-sm w-full max-w-sm mb-6">
            {showPaymentForm ? (
              <form onSubmit={handlePaymentSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" type="text" required placeholder="Your name" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" required placeholder="your@email.com" />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="card">Card Number</Label>
                    <Input id="card" required placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input id="expiry" required placeholder="MM/YY" className="col-span-1" />
                      <Input id="cvc" required placeholder="CVC" className="col-span-1" />
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 my-4 pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-stone-600">Yearly subscription (Alpha)</span>
                    <span className="text-xl font-medium text-earth-700">$11.11</span>
                  </div>
                </div>
                
                <PrimaryButton 
                  className="w-full text-lg py-6"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Complete My Entry"}
                </PrimaryButton>
                
                <p className="text-xs text-stone-500 mt-3 text-center">
                  Special alpha member yearly rate. Future members will pay monthly.
                </p>
              </form>
            ) : (
              <>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-stone-600">Yearly subscription (Alpha)</span>
                  <span className="text-xl font-medium text-earth-700">$11.11</span>
                </div>
                
                <PrimaryButton 
                  className="w-full text-lg py-6"
                  onClick={handleJoinClick}
                >
                  Join Coreleven
                </PrimaryButton>
                
                <p className="text-xs text-stone-500 mt-3 text-center">
                  Special alpha member yearly rate. Future members will pay monthly.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <p className="text-stone-600 mb-4">
          Not ready to join? No pressure.
        </p>
        <Button variant="ghost" asChild>
          <Link to="/" className="text-stone-500">Return Home</Link>
        </Button>
      </div>
    </div>
  );
};
