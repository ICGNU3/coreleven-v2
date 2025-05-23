
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { InvalidInvite } from '@/components/invite/InvalidInvite';
import { JoinSuccess } from '@/components/invite/JoinSuccess';
import { PaymentSection } from '@/components/invite/PaymentSection';

const InvitePage = () => {
  const { inviteId } = useParams();
  const [joined, setJoined] = useState(false);
  
  // Mock data - in a real app, this would come from an API
  const inviterName = "Sarah Johnson";
  const filledSpots = 7;
  const isValidInvite = true;
  
  const handleJoinSuccess = () => {
    setJoined(true);
  };
  
  if (!isValidInvite) {
    return <InvalidInvite />;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <div className="container max-w-5xl mx-auto px-4">
        <NavBar />
        
        <main className="flex-grow py-12">
          <div className="max-w-xl mx-auto">
            {joined ? (
              <JoinSuccess inviterName={inviterName} />
            ) : (
              <PaymentSection 
                filledSpots={filledSpots} 
                inviterName={inviterName} 
                onJoinSuccess={handleJoinSuccess}
              />
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default InvitePage;
