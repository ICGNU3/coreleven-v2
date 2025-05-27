
import React, { RefObject } from 'react';

interface WhatIsCoreelevenProps {
  sectionRef: RefObject<HTMLElement>;
}

export function WhatIsCoreleven({ sectionRef }: WhatIsCoreelevenProps) {
  return (
    <section ref={sectionRef} className="py-20 md:py-28 border-t border-stone-200/50">
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
  );
}
