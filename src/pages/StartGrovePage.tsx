
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
                Ready to Build Your Grove?
              </h1>
              
              <p className="text-stone-600 text-lg mb-6">
                You're about to create something special - a trusted circle of 11 people who will support each other's growth and success.
              </p>
              
              <p className="text-stone-600 text-lg mb-6">
                Take your time choosing the right people. Quality over speed. Every person you invite shapes your Grove's culture.
              </p>
            </div>
            
            <div className="mb-10">
              <h2 className="text-xl font-medium mb-4 text-earth-700">
                What You're Creating
              </h2>
              <p className="text-stone-600 mb-8">
                A Grove is your private community of 11 people. You'll have tools for meaningful conversation, collaboration, and mutual support. It's designed to be the trusted circle you've been looking for.
              </p>
              
              <div className="flex justify-center mb-10">
                <CircleVisual filledCount={1} />
              </div>
              
              <div className="bg-stone-100 p-6 rounded-lg mb-8">
                <h3 className="text-lg font-medium mb-3 text-earth-700">Your Progress</h3>
                <p className="text-stone-600">You're member #1. Invite 10 more to complete your Grove.</p>
              </div>
            </div>
            
            <div className="bg-earth-50 p-8 rounded-lg mb-10 border border-earth-100">
              <h3 className="text-lg font-medium mb-6 text-earth-700">
                Step 1: Join Coreleven
              </h3>
              
              <p className="text-stone-600 mb-4">
                First, secure your spot as the founder of your Grove:
              </p>
              
              <ul className="list-disc list-inside space-y-2 mb-6 text-stone-600 ml-4">
                <li>Complete your Coreleven membership</li>
                <li>Get your unique Grove invitation code</li>
                <li>Access your Grove management tools</li>
              </ul>
              
              <div className="flex justify-center my-6">
                <PrimaryButton size="lg" asChild>
                  <Link to="/signup">Join Coreleven</Link>
                </PrimaryButton>
              </div>
            </div>
            
            <div className="mb-10">
              <h3 className="text-lg font-medium mb-4 text-earth-700">
                Step 2: Choose Your 10 People
              </h3>
              
              <p className="text-stone-600 mb-4">
                Think of people you genuinely trust and respect. People whose judgment you value and whose success you want to support.
              </p>
              
              <p className="text-stone-600 mb-4">Consider inviting people who:</p>
              
              <ul className="list-disc list-inside space-y-2 mb-8 text-stone-600 ml-4">
                <li>Share your values but bring different perspectives</li>
                <li>Are committed to personal or professional growth</li>
                <li>Will contribute meaningfully to group discussions</li>
                <li>You'd be comfortable sharing challenges and successes with</li>
              </ul>
              
              <div className="bg-stone-100 p-6 rounded-lg mb-8">
                <h4 className="font-medium mb-3 text-earth-700">How to Invite Them</h4>
                <p className="text-stone-600 mb-3">Reach out personally. Here's a simple way to start:</p>
                <p className="text-stone-600 italic">
                  "I'm starting a private group of 11 people I trust and respect - focused on supporting each other's growth and sharing meaningful conversations. I'd love for you to be part of it. Interested in learning more?"
                </p>
              </div>
            </div>
            
            <div className="mb-10">
              <h3 className="text-lg font-medium mb-4 text-earth-700">
                Step 3: Share Your Grove Code
              </h3>
              
              <ul className="list-disc list-inside space-y-2 mb-8 text-stone-600 ml-4">
                <li>Once someone agrees, share your Grove invitation code</li>
                <li>Let them know they can start their own Grove after joining yours</li>
                <li>Help them understand they're joining something special</li>
              </ul>
            </div>
            
            <div className="bg-earth-100 p-8 rounded-lg mb-10">
              <h3 className="text-lg font-medium mb-4 text-earth-700">
                When Your Grove Is Complete
              </h3>
              
              <ul className="list-disc list-inside space-y-2 mb-6 text-stone-600 ml-4">
                <li>All 11 members can participate in audio rooms and group chat</li>
                <li>Your Grove becomes part of the larger Coreleven network</li>
                <li>Each member can invite others to start new Groves</li>
                <li>You'll have access to advanced collaboration tools</li>
              </ul>
            </div>
            
            <div className="text-center text-earth-700 font-medium">
              <p className="mb-2">Build with intention. Invite with care.</p>
              <p>Your Grove starts with the first person you choose.</p>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default StartGrovePage;
