
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { CircleVisual } from '@/components/CircleVisual';
import { PrimaryButton } from '@/components/PrimaryButton';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { ArrowDown, Sprout } from 'lucide-react';

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
          {/* Hero Section */}
          <section className="min-h-[90vh] flex flex-col justify-center items-center py-16 md:py-24">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-6 text-earth-800 leading-tight">
                Trust and Believe. <br />
                <span className="text-earth-600">Eleven is Enough.</span>
              </h1>
              
              <p className="text-lg md:text-xl mb-12 text-stone-600 max-w-2xl mx-auto leading-relaxed">
                A rhythm-based network for human-first growth. Build your Grove of 11 and unlock collective potential.
              </p>
              
              <div className="flex justify-center mb-16">
                <PrimaryButton size="lg" asChild className="shadow-lg hover:shadow-xl transition-all group bg-earth-600 hover:bg-earth-700">
                  <Link to="/signup">
                    Begin Your Grove
                    <Sprout className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  </Link>
                </PrimaryButton>
              </div>
              
              <div className="flex justify-center">
                <div className="transform transition-transform hover:scale-105 duration-500">
                  <CircleVisual filledCount={0} />
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
              <ArrowDown className="text-earth-500 h-6 w-6" />
            </div>
          </section>
          
          {/* What is Coreleven */}
          <section ref={section2Ref} className="py-20 md:py-28 border-t border-stone-200/50">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-medium mb-8 text-earth-700">
                What is Coreleven?
              </h2>
              
              <div className="bg-white/80 backdrop-blur-sm p-8 md:p-10 rounded-2xl shadow-sm border border-stone-200/50">
                <p className="text-lg md:text-xl text-stone-700 leading-relaxed mb-6">
                  Coreleven restores scale to the human level. A rhythm-based framework where Groves of 11 
                  cultivate clarity, alignment, and symbolic structure through seasonal cycles.
                </p>
                
                <p className="text-stone-600 leading-relaxed">
                  Your circle of 11 starts here. Invite 10 aligned souls. Build relational wealth. 
                  Move through cyclical seasons together.
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
