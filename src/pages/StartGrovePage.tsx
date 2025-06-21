
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
                A Grove is a circle of 11. You are the first. What happens next is yours to shape.
              </p>
              
              <p className="text-stone-600 text-lg mb-6">
                Your task: invite 10 aligned people to complete your Grove—deliberately, not urgently. Every person matters.
              </p>
            </div>
            
            <div className="mb-10">
              <h2 className="text-xl font-medium mb-4 text-earth-700">
                What Is a Grove?
              </h2>
              <p className="text-stone-600 mb-8">
                A Grove is a living structure built on trust, clarity, and mutual growth. Each person brings their own pace and presence. Once complete, your Grove becomes part of a larger system—connected, awake, and purposeful.
              </p>
              
              <div className="flex justify-center mb-10">
                <CircleVisual filledCount={1} />
              </div>
              
              <div className="bg-stone-100 p-6 rounded-lg mb-8">
                <h3 className="text-lg font-medium mb-3 text-earth-700">Progress</h3>
                <p className="text-stone-600">1 of 10 invitations filled</p>
              </div>
            </div>
            
            <div className="bg-stone-100 p-8 rounded-lg mb-10">
              <h3 className="text-lg font-medium mb-6 text-earth-700">
                Step 1: Begin Your Membership
              </h3>
              
              <p className="text-stone-600 mb-4">
                Before you invite anyone, complete your own entry:
              </p>
              
              <ul className="list-disc list-inside space-y-2 mb-6 text-stone-600 ml-4">
                <li>Tap the button to join Coreleven</li>
                <li>Once confirmed, you'll receive your unique invitation link</li>
              </ul>
              
              <div className="flex justify-center my-6">
                <PrimaryButton size="lg" asChild>
                  <Link to="/signup">Join Coreleven</Link>
                </PrimaryButton>
              </div>
            </div>
            
            <div className="mb-10">
              <h3 className="text-lg font-medium mb-4 text-earth-700">
                Step 2: Invite 10 People Who Matter
              </h3>
              
              <p className="text-stone-600 mb-4">
                Look for people you trust. People who think deeply, move with care, and live in alignment with what matters.
              </p>
              
              <p className="text-stone-600 mb-4">Invite those who:</p>
              
              <ul className="list-disc list-inside space-y-2 mb-8 text-stone-600 ml-4">
                <li>Listen more than they react</li>
                <li>Build, even when no one is watching</li>
                <li>Value clarity over speed</li>
              </ul>
              
              <div className="bg-earth-50 p-6 rounded-lg mb-8 border border-earth-100">
                <h4 className="font-medium mb-3 text-earth-700">How to Invite Them</h4>
                <p className="text-stone-600 mb-3">Say it your way—or start with this:</p>
                <p className="text-stone-600 italic">
                  "I'm building a Grove—a circle of 11 people committed to living with intention. You're someone I trust to hold space, grow alongside, and move with purpose. If this feels aligned, I'll send you the next step."
                </p>
              </div>
            </div>
            
            <div className="mb-10">
              <h3 className="text-lg font-medium mb-4 text-earth-700">
                Step 3: Share Your Link
              </h3>
              
              <ul className="list-disc list-inside space-y-2 mb-8 text-stone-600 ml-4">
                <li>Once someone agrees, share your personal link</li>
                <li>Let them know they'll build their own Grove after joining yours</li>
              </ul>
            </div>
            
            <div className="bg-earth-100 p-8 rounded-lg mb-10">
              <h3 className="text-lg font-medium mb-4 text-earth-700">
                When Your Grove Is Complete
              </h3>
              
              <ul className="list-disc list-inside space-y-2 mb-6 text-stone-600 ml-4">
                <li>You'll receive a symbolic marker of completion</li>
                <li>New layers of access will open</li>
                <li>Your Grove will be visible within the Coreleven constellation</li>
              </ul>
            </div>
            
            <div className="text-center text-earth-700 font-medium">
              <p className="mb-2">Move clearly. Invite with care. Completion is the beginning.</p>
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
