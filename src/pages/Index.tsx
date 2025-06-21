
import React, { useRef } from 'react';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { WelcomeMessage } from '@/components/WelcomeMessage';
import { GroveProgress } from '@/components/GroveProgress';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Link } from 'react-router-dom';
import { ArrowDown, Sprout, Users, Sparkles } from 'lucide-react';

const Index = () => {
  const featuresRef = useRef<HTMLElement>(null);
  
  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-stone-50 to-earth-50">
      <div className="container max-w-4xl mx-auto px-4">
        <NavBar />
        
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="min-h-[85vh] flex flex-col justify-center items-center py-16 md:py-24">
            <WelcomeMessage isFirstTime={true} />
            
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-earth-800 leading-tight">
                Trust and Believe.<br />
                <span className="text-earth-600">Eleven is Enough.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
                Build your Grove of 11 and unlock collective potential through rhythm-based connection.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <PrimaryButton 
                  size="lg" 
                  asChild 
                  className="shadow-lg hover:shadow-xl transition-all group bg-earth-600 hover:bg-earth-700 px-8 py-4"
                >
                  <Link to="/signup">
                    Begin Your Grove
                    <Sprout className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  </Link>
                </PrimaryButton>
                
                <button
                  onClick={scrollToFeatures}
                  className="text-stone-600 hover:text-earth-700 font-medium transition-colors flex items-center"
                >
                  Learn More
                  <ArrowDown className="ml-1 h-4 w-4" />
                </button>
              </div>
              
              <div className="pt-8">
                <GroveProgress 
                  filledCount={0} 
                  size="lg" 
                  showPulse={true}
                  className="transform hover:scale-105 transition-transform duration-500" 
                />
              </div>
            </div>
            
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
              <ArrowDown className="text-earth-500 h-6 w-6" />
            </div>
          </section>

          {/* Features Section */}
          <section ref={featuresRef} className="py-20 md:py-28 border-t border-stone-200/50">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-medium mb-6 text-earth-700">
                  What is Coreleven?
                </h2>
                <p className="text-lg text-stone-600 max-w-2xl mx-auto">
                  A rhythm-based framework where Groves of 11 cultivate clarity, 
                  alignment, and symbolic structure through seasonal cycles.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-16">
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-stone-200/50 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-earth-100 rounded-full mb-4">
                    <Users className="h-6 w-6 text-earth-600" />
                  </div>
                  <h3 className="text-lg font-medium mb-3 text-earth-700">Build Your Grove</h3>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    Invite 10 aligned souls to form your circle. Each Grove becomes a foundation for deeper connection.
                  </p>
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-stone-200/50 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-earth-100 rounded-full mb-4">
                    <Sparkles className="h-6 w-6 text-earth-600" />
                  </div>
                  <h3 className="text-lg font-medium mb-3 text-earth-700">Unlock Potential</h3>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    Complete Groves receive symbolic markers and access to deeper network layers.
                  </p>
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-stone-200/50 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-earth-100 rounded-full mb-4">
                    <Sprout className="h-6 w-6 text-earth-600" />
                  </div>
                  <h3 className="text-lg font-medium mb-3 text-earth-700">Seasonal Rhythms</h3>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    Move through cyclical seasons together, building relational wealth over time.
                  </p>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-8 md:p-10 rounded-2xl shadow-sm border border-stone-200/50 text-center">
                <p className="text-lg md:text-xl text-stone-700 leading-relaxed mb-6">
                  Coreleven restores scale to the human level. Your circle of 11 starts here.
                </p>
                
                <PrimaryButton asChild className="bg-earth-600 hover:bg-earth-700">
                  <Link to="/signup">
                    Start Building
                    <Sprout className="ml-2 h-4 w-4" />
                  </Link>
                </PrimaryButton>
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
