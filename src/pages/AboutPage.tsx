
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
            
            <div className="prose prose-stone max-w-none text-stone-700 space-y-6">
              <p className="text-lg">
                Coreleven helps you build the trusted community you've been looking for. Start with 11 people who matter to you.
              </p>
              
              <h2 className="text-2xl font-medium text-earth-700 mt-8 mb-4">The Problem We Solve</h2>
              
              <p>
                Building meaningful professional and personal relationships is harder than ever. Social media creates shallow connections. Networking events feel transactional. Online communities are too large to form real bonds.
              </p>
              
              <p>
                You want a group of people you can trust - to share ideas with, get feedback from, and support each other's growth. But finding and organizing that group feels overwhelming.
              </p>
              
              <h2 className="text-2xl font-medium text-earth-700 mt-8 mb-4">Our Solution: Groves</h2>
              
              <p>
                A Grove is your private circle of 11 people. Small enough that everyone knows each other. Large enough for diverse perspectives and meaningful discussion.
              </p>
              
              <p>
                You choose every member. You control the privacy. You shape the culture. We provide the tools to make it work.
              </p>
              
              <h2 className="text-2xl font-medium text-earth-700 mt-8 mb-4">How It Works</h2>
              
              <ul className="my-6 space-y-3">
                <li className="flex items-start">
                  <span className="text-earth-500 mr-3 font-bold">1.</span>
                  <span><strong>Start Your Grove:</strong> You're the first member. Invite 10 people you trust and respect.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-earth-500 mr-3 font-bold">2.</span>
                  <span><strong>Build Together:</strong> Use chat, audio rooms, and shared tools to connect and collaborate.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-earth-500 mr-3 font-bold">3.</span>
                  <span><strong>Grow Your Network:</strong> Each member can start their own Grove, expanding the trusted network.</span>
                </li>
              </ul>
              
              <h2 className="text-2xl font-medium text-earth-700 mt-8 mb-4">Why 11?</h2>
              
              <p>
                We've found 11 to be the perfect size. Large enough for rich discussions and diverse input. Small enough that everyone can participate meaningfully and build real relationships with each other.
              </p>
              
              <h2 className="text-2xl font-medium text-earth-700 mt-8 mb-4">Built for Trust</h2>
              
              <p>
                Privacy is fundamental. Your Grove is yours. You control who joins, what gets shared, and how your community operates. We provide the platform, you create the culture.
              </p>
              
              <p>
                Coreleven is designed and built by Israel Wilson, focused on creating tools that support genuine human connection and mutual growth.
              </p>
              
              <div className="bg-earth-50 p-6 rounded-lg mt-8">
                <p className="text-lg font-medium text-earth-700 mb-3">
                  Ready to start building?
                </p>
                <p className="text-stone-600 mb-4">
                  Your Grove begins with the first person you invite. Choose people who inspire you, challenge you, and support your growth.
                </p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <PrimaryButton asChild size="lg">
                  <Link to="/signup">Start Your Grove</Link>
                </PrimaryButton>
                <PrimaryButton asChild variant="outline" size="lg">
                  <Link to="/faq">Common Questions</Link>
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
