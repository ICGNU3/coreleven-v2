
import React from 'react';
import { Link } from 'react-router-dom';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { PrimaryButton } from '@/components/PrimaryButton';
import { CircleVisual } from '@/components/CircleVisual';

const StartGrovePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="container max-w-5xl mx-auto px-4">
        <NavBar />
        
        <main className="flex-grow py-12">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-2xl md:text-3xl font-medium mb-6 text-earth-700">
                This is where it begins.
              </h1>
              
              <p className="text-stone-600 text-lg mb-6">
                A Grove is a circle of 11 people, formed with care and rhythm. You are the first. 
                Your next step is to invite 10 aligned people to complete your Grove.
              </p>
            </div>
            
            <div className="mb-10">
              <h2 className="text-xl font-medium mb-4 text-earth-700">
                What a Grove Is
              </h2>
              <p className="text-stone-600 mb-8">
                A Grove is a living circle rooted in trust, clarity, and shared growth. 
                Each person adds their own rhythm. When complete, the Grove becomes a node 
                in a larger system of purpose-driven connection.
              </p>
              
              <div className="flex justify-center mb-10">
                <CircleVisual filledCount={1} />
              </div>
            </div>
            
            <div className="bg-stone-100 p-8 rounded-lg mb-10">
              <h3 className="text-lg font-medium mb-6 text-earth-700">
                Step 1: Activate Your Membership
              </h3>
              
              <p className="text-stone-600 mb-4">
                Before you invite anyone, complete your own entry:
              </p>
              
              <ul className="list-disc list-inside space-y-2 mb-6 text-stone-600 ml-4">
                <li>Click the button below to join as a member</li>
                <li>Once your entry is confirmed, you'll receive your unique invitation link</li>
              </ul>
              
              <div className="flex justify-center my-6">
                <PrimaryButton size="lg" asChild>
                  <Link to="/start">Join Coreleven Now</Link>
                </PrimaryButton>
              </div>
            </div>
            
            <div className="mb-10">
              <h3 className="text-lg font-medium mb-4 text-earth-700">
                Step 2: Invite Your 10
              </h3>
              
              <p className="text-stone-600 mb-4">
                Choose people you trust, respect, or want to grow with:
              </p>
              
              <ul className="list-disc list-inside space-y-2 mb-8 text-stone-600 ml-4">
                <li>People who live with intention</li>
                <li>People who grow with integrity</li>
                <li>People who move with rhythm, not urgency</li>
              </ul>
              
              <div className="bg-earth-50 p-6 rounded-lg mb-8 border border-earth-100">
                <h4 className="font-medium mb-3 text-earth-700">What to Say</h4>
                <p className="text-stone-600 italic">
                  "I'm building a Grove — a circle of 11 people moving with rhythm, purpose, and clarity. 
                  You're someone I want in this with me. Together, we grow. If it feels right to you, 
                  I'll share the next step."
                </p>
              </div>
            </div>
            
            <div className="mb-10">
              <h3 className="text-lg font-medium mb-4 text-earth-700">
                Step 3: Share Your Link
              </h3>
              
              <ul className="list-disc list-inside space-y-2 mb-8 text-stone-600 ml-4">
                <li>Once someone agrees, send them your invitation link</li>
                <li>Let them know they'll be invited to build their own Grove after joining</li>
              </ul>
            </div>
            
            <div className="bg-earth-100 p-8 rounded-lg mb-10">
              <h3 className="text-lg font-medium mb-4 text-earth-700">
                Completion Unlocks
              </h3>
              
              <p className="text-stone-600 mb-4">When your Grove is full:</p>
              
              <ul className="list-disc list-inside space-y-2 mb-6 text-stone-600 ml-4">
                <li>You receive a symbolic marker of completion</li>
                <li>You gain access to the deeper rhythm layer</li>
                <li>Your Grove becomes part of the Coreleven network</li>
              </ul>
            </div>
            
            <div className="text-center text-earth-700 font-medium">
              <p className="mb-2">Move clearly. Invite intentionally. Let the rhythm guide you.</p>
              <p>Eleven is enough.</p>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default StartGrovePage;
