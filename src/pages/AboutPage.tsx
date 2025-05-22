
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
                Coreleven is not a brand. It's not a course. It's not a community in the traditional sense. 
                It's a rhythm — one that begins with a single person and unfolds outward in quiet, intentional waves.
              </p>
              
              <p>
                We believe that clarity is more powerful than hype, and trust is more sustainable than influence. 
                In a world flooded with noise, Coreleven offers something rare: a return to pace, to pattern, to rooted connection.
              </p>
              
              <p>
                At the center of Coreleven is a structure we call a Grove: a group of eleven people. 
                You build yours by inviting ten people you trust, respect, or are curious to grow with. 
                Once your Grove is complete, it becomes a live node in a growing network — one that's designed 
                to evolve through shared reflection, seasonal rhythms, and symbolic acts of commitment.
              </p>
              
              <p>
                Each Grove is autonomous but connected. There are no bosses. No gatekeepers. No hierarchies. 
                Just circles of intention, held together by a simple idea: that eleven is enough to begin anything meaningful.
              </p>
              
              <p>
                We don't promise transformation. We don't sell content. We offer structure — light, clear, 
                and flexible enough to hold growth. That structure includes:
              </p>
              
              <ul className="my-6 space-y-2">
                <li className="flex items-start">
                  <span className="text-earth-500 mr-2">•</span>
                  <span>A simple onboarding rhythm</span>
                </li>
                <li className="flex items-start">
                  <span className="text-earth-500 mr-2">•</span>
                  <span>A symbolic threshold for completion</span>
                </li>
                <li className="flex items-start">
                  <span className="text-earth-500 mr-2">•</span>
                  <span>Access to deeper tools and shared rituals</span>
                </li>
                <li className="flex items-start">
                  <span className="text-earth-500 mr-2">•</span>
                  <span>A steward layer that evolves through action</span>
                </li>
              </ul>
              
              <p>
                In the alpha phase, we're keeping this close. Each Grove is formed by invitation. 
                The first 111 completed Groves will form the foundation. After that, the system opens wider — 
                and grows based on rhythm, not reach.
              </p>
              
              <p>
                Coreleven is being stewarded by Israel Wilson, a systems builder, artist, and cultural architect. 
                The system reflects decades of lived experience designing structures that hold complexity without 
                collapsing into chaos. This isn't a hobby. This isn't a hustle. This is the life's work of someone 
                who believes that structure can be sacred — and that sacredness can scale.
              </p>
              
              <p>
                You don't need to understand everything. You don't need to explain it. You just need to feel it.
              </p>
              
              <p>
                If this feels like something real — something rooted — then you already know what to do.
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
