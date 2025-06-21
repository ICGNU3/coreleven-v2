
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
  const [formData, setFormData] = useState({
    fullName: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleJoinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email) {
      toast({
        title: "Please fill in all fields",
        description: "Name and email are required to join the Grove.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate joining process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      onJoinSuccess();
      toast({
        title: "Welcome to Coreleven",
        description: "You've successfully joined the Grove!",
      });
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
            Join this Grove and begin your journey
          </p>
          
          <div className="bg-white p-6 rounded-lg shadow-sm w-full max-w-sm mb-6">
            <form onSubmit={handleJoinSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  type="text" 
                  required 
                  placeholder="Your name"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  required 
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>
              
              <PrimaryButton 
                className="w-full text-lg py-6"
                type="submit"
                disabled={isSubmitting || !formData.fullName || !formData.email}
              >
                {isSubmitting ? "Joining Grove..." : "Join Grove"}
              </PrimaryButton>
              
              <p className="text-xs text-stone-500 mt-3 text-center">
                Free to join. Begin your Grove journey today.
              </p>
            </form>
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
