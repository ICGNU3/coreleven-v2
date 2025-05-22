
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { CircleVisual } from '@/components/CircleVisual';
import { PrimaryButton } from '@/components/PrimaryButton';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { ArrowDown, Check, Users, Clock, Sprout } from 'lucide-react';

const Index = () => {
  const section2Ref = useRef<HTMLElement>(null);
  
  const scrollToNextSection = () => {
    section2Ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <div className="container max-w-5xl mx-auto px-4">
        <NavBar />
        
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="min-h-[90vh] flex flex-col justify-center items-center py-16 md:py-24">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 text-earth-800 leading-tight">
                Trust and Believe. <span className="text-earth-600">Eleven is Enough.</span>
              </h1>
              <p className="text-xl md:text-2xl mb-12 text-stone-600 max-w-2xl mx-auto leading-relaxed">
                A rhythm-based system for intentional growth. Start your Grove and connect with purpose.
              </p>
              
              <div className="flex justify-center mb-16">
                <PrimaryButton size="lg" onClick={scrollToNextSection} className="shadow-lg hover:shadow-xl transition-all group">
                  Begin Building My Grove
                  <Sprout className="ml-1 h-5 w-5 group-hover:scale-110 transition-transform" />
                </PrimaryButton>
              </div>
            </div>
            
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
              <ArrowDown className="text-earth-600 h-8 w-8" />
            </div>
          </section>
          
          {/* What is Coreleven */}
          <section ref={section2Ref} className="py-20 md:py-28 border-t border-stone-200">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-semibold mb-10 text-center text-earth-700 relative">
                <span className="inline-block relative">
                  What is Coreleven?
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-earth-400 rounded-full"></span>
                </span>
              </h2>
              
              <div className="bg-white p-8 md:p-10 rounded-xl shadow-sm transform transition-all hover:shadow-md hover:scale-[1.01] duration-300">
                <p className="text-lg md:text-xl text-stone-700 text-center mb-8 leading-relaxed">
                  Coreleven is a simple, intentional structure. You build a Grove — a group of 11 — to grow 
                  with clarity, rhythm, and aligned action.
                </p>
                
                <div className="flex justify-center">
                  <Link to="/about" className="text-earth-600 hover:text-earth-800 font-medium flex items-center group transition-colors">
                    <span>Learn more about our approach</span>
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>
          
          {/* Why It Matters */}
          <section className="py-20 md:py-28 bg-earth-50/70 rounded-lg">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-semibold mb-10 text-center text-earth-700 relative">
                <span className="inline-block relative">
                  Why It Matters
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-earth-400 rounded-full"></span>
                </span>
              </h2>
              
              <ul className="space-y-4 md:space-y-6 max-w-2xl mx-auto">
                <li className="flex items-center p-6 bg-white rounded-lg shadow-sm transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-md">
                  <span className="text-earth-500 mr-4 flex-shrink-0">
                    <Check className="h-6 w-6" />
                  </span>
                  <span className="text-lg font-medium text-stone-800">Grow at your own pace, but never alone</span>
                </li>
                <li className="flex items-center p-6 bg-white rounded-lg shadow-sm transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-md">
                  <span className="text-earth-500 mr-4 flex-shrink-0">
                    <Users className="h-6 w-6" />
                  </span>
                  <span className="text-lg font-medium text-stone-800">Connect deeply with aligned people</span>
                </li>
                <li className="flex items-center p-6 bg-white rounded-lg shadow-sm transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-md">
                  <span className="text-earth-500 mr-4 flex-shrink-0">
                    <Clock className="h-6 w-6" />
                  </span>
                  <span className="text-lg font-medium text-stone-800">Shape a new kind of rhythm-based structure</span>
                </li>
                <li className="flex items-center p-6 bg-white rounded-lg shadow-sm transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-md">
                  <span className="text-earth-500 mr-4 flex-shrink-0">
                    <Sprout className="h-6 w-6" />
                  </span>
                  <span className="text-lg font-medium text-stone-800">This is the alpha. You are the first layer</span>
                </li>
              </ul>
            </div>
          </section>
          
          {/* How It Works */}
          <section className="py-20 md:py-28 border-t border-stone-200">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-semibold mb-10 text-center text-earth-700 relative">
                <span className="inline-block relative">
                  How It Works
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-earth-400 rounded-full"></span>
                </span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="p-6 rounded-lg bg-white shadow-sm relative group hover:shadow-md transition-shadow">
                  <div className="absolute inset-0 bg-earth-500 opacity-0 rounded-lg transform scale-95 group-hover:scale-100 group-hover:opacity-5 transition-all duration-300"></div>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-earth-500 text-white mb-4 relative">
                    <span className="text-xl font-medium">1</span>
                    <span className="absolute animate-ripple w-16 h-16 rounded-full"></span>
                  </div>
                  <h3 className="font-medium text-xl mb-3 text-earth-700">Say yes</h3>
                  <p className="text-stone-600">Accept the invitation to join Coreleven</p>
                </div>
                
                <div className="p-6 rounded-lg bg-white shadow-sm relative group hover:shadow-md transition-shadow">
                  <div className="absolute inset-0 bg-earth-500 opacity-0 rounded-lg transform scale-95 group-hover:scale-100 group-hover:opacity-5 transition-all duration-300"></div>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-earth-500 text-white mb-4 relative">
                    <span className="text-xl font-medium">2</span>
                    <span className="absolute animate-ripple w-16 h-16 rounded-full" style={{ animationDelay: '0.3s' }}></span>
                  </div>
                  <h3 className="font-medium text-xl mb-3 text-earth-700">Invite 10 people you trust</h3>
                  <p className="text-stone-600">Build your Grove with intention</p>
                </div>
                
                <div className="p-6 rounded-lg bg-white shadow-sm relative group hover:shadow-md transition-shadow">
                  <div className="absolute inset-0 bg-earth-500 opacity-0 rounded-lg transform scale-95 group-hover:scale-100 group-hover:opacity-5 transition-all duration-300"></div>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-earth-500 text-white mb-4 relative">
                    <span className="text-xl font-medium">3</span>
                    <span className="absolute animate-ripple w-16 h-16 rounded-full" style={{ animationDelay: '0.6s' }}></span>
                  </div>
                  <h3 className="font-medium text-xl mb-3 text-earth-700">Unlock the next layer</h3>
                  <p className="text-stone-600">When your Grove is full, new dimensions emerge</p>
                </div>
              </div>
              
              <div className="text-center mt-12">
                <Link to="/faq" className="text-earth-600 hover:text-earth-800 underline-offset-4 underline font-medium transition-colors">
                  View frequently asked questions →
                </Link>
              </div>
            </div>
          </section>
          
          {/* About the Founder */}
          <section className="py-20 md:py-28 border-t border-stone-200">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-semibold mb-10 text-earth-700 relative">
                <span className="inline-block relative">
                  About the Founder
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-earth-400 rounded-full"></span>
                </span>
              </h2>
              
              <h3 className="font-medium text-2xl mb-4 text-earth-700">Israel Wilson</h3>
              <p className="text-stone-700 mb-10 text-lg max-w-2xl mx-auto">
                I build systems that help people grow with clarity, rhythm, and trust. 
                Coreleven is the structure I needed — so I made it real.
              </p>
              
              <div className="bg-white p-8 rounded-lg shadow-sm text-stone-700 relative max-w-2xl mx-auto transform transition-all hover:shadow-md hover:scale-[1.01] duration-300">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-4xl text-earth-300">"</div>
                <p className="text-lg italic">
                  I needed something like this. So I made it real. Now it's yours too.
                </p>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-4xl text-earth-300">"</div>
              </div>
            </div>
          </section>
          
          {/* Final CTA with Circle Visual */}
          <section className="py-20 md:py-28 text-center border-t border-stone-200">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-earth-700">
                Ready to Begin?
              </h2>
              
              <p className="text-lg text-stone-700 mb-12 max-w-2xl mx-auto">
                This is the first door. You've seen the rhythm. You know if this is for you.
              </p>
              
              <div className="flex flex-col items-center">
                <div className="relative mb-16 transform transition-transform hover:scale-[1.03] duration-500">
                  <CircleVisual filledCount={0} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-earth-700 font-semibold text-xl">Your Grove</div>
                      <div className="text-stone-500">Starts with you</div>
                    </div>
                  </div>
                </div>
                
                <p className="text-stone-700 italic mb-10 text-lg max-w-2xl mx-auto">
                  This isn't content. It's not a community.<br />
                  It's a rhythm you carry. A circle you shape. A system that grows.
                </p>
                
                <PrimaryButton size="lg" asChild className="shadow-lg hover:shadow-xl transition-all group">
                  <a href="https://whop.com/" target="_blank" rel="noopener noreferrer">
                    Complete My Entry
                    <Sprout className="ml-1 h-5 w-5 group-hover:scale-110 transition-transform" />
                  </a>
                </PrimaryButton>
                
                <p className="text-sm text-stone-500 mt-4">
                  A one-time payment of $11.11 secures your position.
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
