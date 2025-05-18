
import React from 'react';
import { Link } from 'react-router-dom';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { PrimaryButton } from '@/components/PrimaryButton';
import { CircleVisual } from '@/components/CircleVisual';

const StartPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="container max-w-5xl mx-auto px-4">
        <NavBar />
        
        <main className="flex-grow py-12">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-2xl md:text-3xl font-medium mb-6 text-earth-700">
                Build Your Circle
              </h1>
              
              <p className="text-stone-600">
                Coreleven grows through invitation only. To start your own circle, you need to be invited by a current member.
              </p>
            </div>
            
            <div className="bg-stone-100 p-8 rounded-lg mb-10">
              <div className="flex flex-col items-center">
                <div className="mb-6">
                  <CircleVisual filledCount={0} />
                </div>
                
                <h2 className="text-xl font-medium mb-4 text-earth-700">
                  How to join Coreleven:
                </h2>
                
                <div className="text-left max-w-md space-y-6 text-stone-700">
                  <div className="flex space-x-4">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-earth-200 flex items-center justify-center text-earth-700">
                      1
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Get an invitation</h3>
                      <p className="text-sm text-stone-600">
                        Ask a current member to send you their unique invitation link.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-earth-200 flex items-center justify-center text-earth-700">
                      2
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Secure your spot</h3>
                      <p className="text-sm text-stone-600">
                        Pay the one-time fee of $11.11 to lock in your position.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-earth-200 flex items-center justify-center text-earth-700">
                      3
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Build your circle</h3>
                      <p className="text-sm text-stone-600">
                        Once you're in, you can start building your own circle of 11.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <h3 className="font-medium mb-4 text-earth-700">
                Have you been invited?
              </h3>
              
              <p className="text-stone-600 mb-6">
                If you've received an invitation link, you can use it to secure your spot.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <PrimaryButton asChild>
                  <Link to="/invite">I've been invited</Link>
                </PrimaryButton>
                
                <PrimaryButton variant="outline" asChild>
                  <Link to="/">Return Home</Link>
                </PrimaryButton>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default StartPage;
