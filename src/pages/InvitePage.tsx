import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { CircleVisual } from '@/components/CircleVisual';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const InvitePage = () => {
  const { inviteId } = useParams();
  const { toast } = useToast();
  const [joined, setJoined] = useState(false);
  
  // Mock data - in a real app, this would come from an API
  const inviterName = "Sarah Johnson";
  const filledSpots = 7;
  const isValidInvite = true;
  
  const handleJoinClick = () => {
    // Use window.location.href instead of window.open to ensure proper redirect
    window.location.href = 'https://whop.com/checkout/ius12MAWrV2VBT1mN-wN5P-HlWU-uCcK-XkHgsweoqtfO/';
  };
  
  if (!isValidInvite) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="container max-w-5xl mx-auto px-4">
          <NavBar />
          
          <main className="flex-grow flex flex-col items-center justify-center py-12">
            <div className="text-center max-w-md mx-auto">
              <h1 className="text-2xl md:text-3xl font-medium mb-6 text-earth-700">
                Invalid Invitation
              </h1>
              
              <p className="text-stone-600 mb-8">
                This invitation link is invalid or has expired. Please ask your inviter for a new link.
              </p>
              
              <PrimaryButton asChild>
                <Link to="/">Return to Home</Link>
              </PrimaryButton>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <div className="container max-w-5xl mx-auto px-4">
        <NavBar />
        
        <main className="flex-grow py-12">
          <div className="max-w-xl mx-auto">
            {joined ? (
              <div className="text-center">
                <div className="mb-8 inline-block p-3 rounded-full bg-earth-100">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="48" 
                    height="48" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="text-earth-600"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                
                <h1 className="text-2xl md:text-3xl font-medium mb-4 text-earth-700">
                  You're in. Time to build your 11.
                </h1>
                
                <p className="text-stone-600 mb-6">
                  Your spot has been secured in {inviterName}'s circle. Now it's your turn to build your own.
                </p>
                
                <div className="bg-stone-100 p-6 rounded-lg mb-8 text-left">
                  <h3 className="font-medium text-lg mb-3 text-earth-700">Your next steps:</h3>
                  <ol className="space-y-3 list-decimal list-inside text-stone-700">
                    <li>Go to your dashboard</li>
                    <li>Choose 10 people you believe in</li>
                    <li>Send them your unique invitation link</li>
                    <li>Begin your growth journey together</li>
                  </ol>
                </div>
                
                <p className="text-stone-500 text-sm mb-8">
                  Remember, this was a yearly subscription of $11.11 for alpha members. Future stages will have different subscription models.
                </p>
                
                <div className="flex justify-center">
                  <PrimaryButton size="lg" asChild>
                    <Link to="/dashboard">Go to your Dashboard</Link>
                  </PrimaryButton>
                </div>
              </div>
            ) : (
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
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-stone-600">Yearly subscription (Alpha)</span>
                        <span className="text-xl font-medium text-earth-700">$11.11</span>
                      </div>
                      
                      <a 
                        href="https://whop.com/checkout/ius12MAWrV2VBT1mN-wN5P-HlWU-uCcK-XkHgsweoqtfO/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="block w-full"
                      >
                        <PrimaryButton 
                          className="w-full text-lg py-6"
                        >
                          Join Coreleven
                        </PrimaryButton>
                      </a>
                      
                      <p className="text-xs text-stone-500 mt-3 text-center">
                        Special alpha member yearly rate. Future members will pay monthly.
                      </p>
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
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default InvitePage;
