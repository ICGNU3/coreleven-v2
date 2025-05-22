
import React from 'react';
import { Link } from 'react-router-dom';
import { CircleVisual } from '@/components/CircleVisual';
import { PrimaryButton } from '@/components/PrimaryButton';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="container max-w-5xl mx-auto px-4">
        <NavBar />
        
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="py-16 md:py-24 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-4 text-earth-800">
              Trust and Believe. Eleven is Enough.
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-stone-600 max-w-2xl mx-auto">
              A living system for personal growth built in circles of 11. Start yours today.
            </p>
            
            <div className="flex justify-center mb-16">
              <PrimaryButton size="lg" asChild>
                <Link to="/start">Begin Building Your Grove</Link>
              </PrimaryButton>
            </div>
            
            <div className="max-w-md mx-auto">
              <CircleVisual filledCount={4} className="mb-6" />
            </div>
          </section>
          
          {/* What is Coreleven Section */}
          <section className="py-12 border-t border-stone-200">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-medium mb-6 text-center text-earth-700">
                What is Coreleven?
              </h2>
              
              <p className="text-stone-700 text-center">
                Coreleven is a rhythm-based structure. Each person builds a Grove — a group of 11 — rooted in trust, 
                shared clarity, and mutual momentum. This is a system for people who want to grow with intention, not noise.
              </p>
            </div>
          </section>
          
          {/* Why Now Section */}
          <section className="py-12 bg-earth-50 rounded-lg">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-medium mb-6 text-center text-earth-700">
                Why Now?
              </h2>
              
              <ul className="space-y-3 text-stone-700">
                <li className="flex items-start">
                  <span className="text-earth-500 mr-2">•</span>
                  <span>Help shape the first cycle of Coreleven</span>
                </li>
                <li className="flex items-start">
                  <span className="text-earth-500 mr-2">•</span>
                  <span>Build your Grove and unlock deeper access</span>
                </li>
                <li className="flex items-start">
                  <span className="text-earth-500 mr-2">•</span>
                  <span>Join a founding layer of rhythm-holders</span>
                </li>
                <li className="flex items-start">
                  <span className="text-earth-500 mr-2">•</span>
                  <span>Align with a new kind of structure — clear, minimal, human</span>
                </li>
              </ul>
            </div>
          </section>
          
          {/* How It Works Section */}
          <section className="py-12 border-t border-stone-200">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-medium mb-6 text-center text-earth-700">
                How It Works
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="p-6 rounded-lg bg-earth-50">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-earth-500 text-white mb-4">
                    1
                  </div>
                  <h3 className="font-medium text-lg mb-2 text-earth-700">Step into the system</h3>
                </div>
                
                <div className="p-6 rounded-lg bg-earth-50">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-earth-500 text-white mb-4">
                    2
                  </div>
                  <h3 className="font-medium text-lg mb-2 text-earth-700">Build your Grove by inviting 10 aligned people</h3>
                </div>
                
                <div className="p-6 rounded-lg bg-earth-50">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-earth-500 text-white mb-4">
                    3
                  </div>
                  <h3 className="font-medium text-lg mb-2 text-earth-700">Complete your Grove and access what's next</h3>
                </div>
              </div>
            </div>
          </section>
          
          {/* Questions Section */}
          <section className="py-12 border-t border-stone-200">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-medium mb-6 text-center text-earth-700">
                Questions You Might Be Asking
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="p-4 bg-stone-100 rounded-lg">
                  <h3 className="font-medium text-earth-700">What's the goal of this?</h3>
                </div>
                <div className="p-4 bg-stone-100 rounded-lg">
                  <h3 className="font-medium text-earth-700">Is this one of those weird invite things?</h3>
                </div>
                <div className="p-4 bg-stone-100 rounded-lg">
                  <h3 className="font-medium text-earth-700">What am I expected to do?</h3>
                </div>
                <div className="p-4 bg-stone-100 rounded-lg">
                  <h3 className="font-medium text-earth-700">What do I tell people I want to invite?</h3>
                </div>
              </div>
              
              <p className="text-center text-stone-600">
                Answers will open clearly, one click away.
              </p>
            </div>
          </section>
          
          {/* About the Creator Section */}
          <section className="py-12 border-t border-stone-200">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-medium mb-6 text-earth-700">
                About the Creator
              </h2>
              
              <h3 className="font-medium text-xl mb-2 text-earth-700">Israel Wilson</h3>
              <p className="text-stone-600 mb-6">
                Builder of systems that help people grow with clarity, rhythm, and trust.
              </p>
              
              <div className="bg-stone-100 p-6 rounded-lg italic text-stone-700">
                "I needed something like this. So I made it real. Now it's yours too."
              </div>
            </div>
          </section>
          
          {/* Final Invitation Section */}
          <section className="py-12 text-center border-t border-stone-200">
            <div className="max-w-2xl mx-auto">
              <p className="text-stone-700 mb-6">
                This isn't content. It's not a community.<br />
                It's a rhythm you carry. A circle you shape. A system that grows.
              </p>
              
              <p className="text-stone-700 mb-8">
                Start with one. Then build your 10. Let the rhythm begin.
              </p>
              
              <PrimaryButton size="lg" asChild>
                <Link to="/start">Begin Now</Link>
              </PrimaryButton>
            </div>
          </section>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
