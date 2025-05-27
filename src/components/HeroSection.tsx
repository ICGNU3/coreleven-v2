
import React, { RefObject } from 'react';
import { Link } from 'react-router-dom';
import { CircleVisual } from '@/components/CircleVisual';
import { PrimaryButton } from '@/components/PrimaryButton';
import { ArrowDown, Sprout } from 'lucide-react';

interface HeroSectionProps {
  onScrollToNext: () => void;
}

export function HeroSection({ onScrollToNext }: HeroSectionProps) {
  return (
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
  );
}
