
import React from 'react';
import { Link } from 'react-router-dom';
import { PrimaryButton } from '@/components/PrimaryButton';

interface JoinSuccessProps {
  inviterName: string;
}

export const JoinSuccess = ({ inviterName }: JoinSuccessProps) => {
  return (
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
  );
};
