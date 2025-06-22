
import React, { useRef } from 'react';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { WelcomeMessage } from '@/components/WelcomeMessage';
import { GroveProgress } from '@/components/GroveProgress';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Link } from 'react-router-dom';
import { ArrowDown, Sprout, Users, Sparkles, Shield } from 'lucide-react';

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
                Build Your Trusted Circle.<br />
                <span className="text-earth-600">Start With 11.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
                Create a private community of 11 people you trust. Share ideas, support each other's goals, and grow together in a focused, intentional way.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <PrimaryButton 
                  size="lg" 
                  asChild 
                  className="shadow-lg hover:shadow-xl transition-all group bg-earth-600 hover:bg-earth-700 px-8 py-4"
                >
                  <Link to="/signup">
                    Start Your Grove
                    <Sprout className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  </Link>
                </PrimaryButton>
                
                <button
                  onClick={scrollToFeatures}
                  className="text-stone-600 hover:text-earth-700 font-medium transition-colors flex items-center"
                >
                  How It Works
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
                <p className="text-sm text-stone-600 mt-3">Your Grove starts with you, grows to 11</p>
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
                  Why Groves Work
                </h2>
                <p className="text-lg text-stone-600 max-w-2xl mx-auto">
                  Small, trusted groups create the perfect environment for meaningful connection and mutual growth.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-16">
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-stone-200/50 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-earth-100 rounded-full mb-4">
                    <Users className="h-6 w-6 text-earth-600" />
                  </div>
                  <h3 className="text-lg font-medium mb-3 text-earth-700">Perfect Size</h3>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    11 members is large enough for diverse perspectives, small enough for everyone to be heard and known.
                  </p>
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-stone-200/50 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-earth-100 rounded-full mb-4">
                    <Shield className="h-6 w-6 text-earth-600" />
                  </div>
                  <h3 className="text-lg font-medium mb-3 text-earth-700">Built on Trust</h3>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    You choose every member. Private by design. Create the safe space you need to share and grow.
                  </p>
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-stone-200/50 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-earth-100 rounded-full mb-4">
                    <Sparkles className="h-6 w-6 text-earth-600" />
                  </div>
                  <h3 className="text-lg font-medium mb-3 text-earth-700">Real Connection</h3>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    Move beyond surface-level networking. Build relationships that support your goals and growth.
                  </p>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-8 md:p-10 rounded-2xl shadow-sm border border-stone-200/50 text-center">
                <h3 className="text-xl md:text-2xl font-medium mb-4 text-earth-700">
                  Ready to Build Your Grove?
                </h3>
                <p className="text-lg text-stone-600 leading-relaxed mb-6">
                  Start with people you trust. Invite those who inspire you. Create the community you've been looking for.
                </p>
                
                <PrimaryButton asChild size="lg" className="bg-earth-600 hover:bg-earth-700">
                  <Link to="/signup">
                    Create Your Grove
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
