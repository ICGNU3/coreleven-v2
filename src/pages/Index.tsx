
import React, { useRef } from 'react';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import { WhatIsCoreleven } from '@/components/WhatIsCoreleven';

const Index = () => {
  const section2Ref = useRef<HTMLElement>(null);
  
  const scrollToNextSection = () => {
    section2Ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-stone-50 to-earth-50">
      <div className="container max-w-4xl mx-auto px-4">
        <NavBar />
        
        <main className="flex-grow">
          <HeroSection onScrollToNext={scrollToNextSection} />
          <WhatIsCoreleven sectionRef={section2Ref} />
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
