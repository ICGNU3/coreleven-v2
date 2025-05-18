
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
              Eleven is enough.
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-stone-600 max-w-2xl mx-auto">
              Build your life with rhythm, structure, and a circle that holds you.
            </p>
            
            <div className="flex flex-col md:flex-row justify-center gap-4 mb-16">
              <PrimaryButton size="lg" asChild>
                <Link to="/invite">I've been invited</Link>
              </PrimaryButton>
              <PrimaryButton size="lg" variant="outline" asChild>
                <Link to="/start">I'm ready to build my circle</Link>
              </PrimaryButton>
            </div>
            
            <div className="max-w-md mx-auto">
              <CircleVisual filledCount={4} className="mb-6" />
            </div>
          </section>
          
          {/* About Section */}
          <section className="py-12 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-medium mb-6 text-center text-earth-700">
              A support system, not a subscription
            </h2>
            
            <div className="space-y-6 text-stone-700">
              <p>
                Coreleven is not a brand — it's a structure for disciplined personal growth. 
                Each person is part of a circle of 11. Once you're invited in, your role is to 
                build your own circle of 11.
              </p>
              
              <p>
                We grow by structure, not scale. This is for the first 1,111 people only. Once 
                that layer is full, the alpha closes.
              </p>
              
              <div className="bg-stone-100 p-6 rounded-lg">
                <h3 className="font-medium text-lg mb-3 text-earth-700">How it works</h3>
                <ol className="space-y-3 list-decimal list-inside">
                  <li>You join a circle (by invitation only)</li>
                  <li>You build your own circle of 11 people</li>
                  <li>Your circle becomes a structure for growth and accountability</li>
                  <li>You move through rhythms together</li>
                </ol>
              </div>
            </div>
          </section>
          
          {/* Principles Section */}
          <section className="py-12 max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-medium mb-8 text-center text-earth-700">
              Core Principles
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-6 rounded-lg bg-earth-50">
                <h3 className="font-medium text-lg mb-2 text-earth-700">Structure</h3>
                <p className="text-stone-600">
                  This isn't a network. It's a container for focused growth.
                </p>
              </div>
              
              <div className="p-6 rounded-lg bg-earth-50">
                <h3 className="font-medium text-lg mb-2 text-earth-700">Rhythm</h3>
                <p className="text-stone-600">
                  Move together with intention, not reaction.
                </p>
              </div>
              
              <div className="p-6 rounded-lg bg-earth-50">
                <h3 className="font-medium text-lg mb-2 text-earth-700">Quality</h3>
                <p className="text-stone-600">
                  Eleven people who truly matter is enough.
                </p>
              </div>
            </div>
          </section>
          
          {/* CTA Section */}
          <section className="py-12 text-center">
            <p className="text-stone-600 mb-6 max-w-xl mx-auto">
              This is where it starts. Build your life, one person at a time.
            </p>
            
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <PrimaryButton size="lg" asChild>
                <Link to="/invite">I've been invited</Link>
              </PrimaryButton>
              <PrimaryButton size="lg" variant="outline" asChild>
                <Link to="/start">I'm ready to build my circle</Link>
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
