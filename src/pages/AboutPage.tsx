
import React from 'react';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="container max-w-5xl mx-auto px-4">
        <NavBar />
        
        <main className="flex-grow py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-medium mb-8 text-earth-800">
              About Coreleven
            </h1>
            
            <div className="prose prose-stone max-w-none text-stone-700">
              <p className="text-lg">
                Coreleven is a rhythm-based structure for intentional growth. It begins with one person and unfolds through small, trust-centered circles called Groves.
              </p>
              
              <p>
                Clarity powers momentum. Trust sustains it. In a world full of noise, Coreleven creates space for people to move with purpose and grow through rhythm.
              </p>
              
              <p>
                At the core of the system is the Grove: a group of eleven people. You begin by inviting ten people you trust, respect, or want to grow with. When your Grove is complete, it becomes an active part of a living network designed to support reflection, shared pace, and meaningful action.
              </p>
              
              <p>
                Each Grove defines its rhythm. Circles connect without hierarchy. Growth moves through aligned actions and rituals, not roles or titles. The idea is simple: eleven is enough to begin.
              </p>
              
              <p>
                Coreleven offers a light, flexible structure:
              </p>
              
              <ul className="my-6 space-y-2">
                <li className="flex items-start">
                  <span className="text-earth-500 mr-2">•</span>
                  <span>Onboarding rhythm to start with clarity</span>
                </li>
                <li className="flex items-start">
                  <span className="text-earth-500 mr-2">•</span>
                  <span>Symbolic recognition of Grove completion</span>
                </li>
                <li className="flex items-start">
                  <span className="text-earth-500 mr-2">•</span>
                  <span>Access to tools and practices for reflection</span>
                </li>
                <li className="flex items-start">
                  <span className="text-earth-500 mr-2">•</span>
                  <span>A steward layer shaped by contribution</span>
                </li>
              </ul>
              
              <p>
                The alpha phase is invitation-based. The first 111 completed Groves form the foundation. From there, the system grows through aligned expansion.
              </p>
              
              <p>
                Coreleven is stewarded by Israel Wilson, a systems builder, artist, and cultural architect. The design reflects a commitment to building structures that hold complexity with care and precision. It's a framework born from lived experience and focused on long-term resonance.
              </p>
              
              <p>
                You don't need to explain it. You'll know if it fits. If it does, begin.
              </p>
              
              <p>
                Start your Grove. Let the rhythm begin.
              </p>
              
              <p className="text-xl font-medium text-earth-700 mt-8">
                Eleven is enough.
              </p>
            </div>
            
            <div className="mt-12 text-center">
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <PrimaryButton asChild size="lg">
                  <Link to="/invite">Build My Grove</Link>
                </PrimaryButton>
                <PrimaryButton asChild variant="outline" size="lg">
                  <Link to="/faq">View FAQ</Link>
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

export default AboutPage;
