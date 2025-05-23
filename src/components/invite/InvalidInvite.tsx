
import React from 'react';
import { Link } from 'react-router-dom';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { PrimaryButton } from '@/components/PrimaryButton';

export const InvalidInvite = () => {
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
};
