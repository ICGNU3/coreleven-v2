
import React from 'react';
import { Sprout, Users, Sparkles } from 'lucide-react';

interface WelcomeMessageProps {
  userName?: string;
  isFirstTime?: boolean;
}

export function WelcomeMessage({ userName, isFirstTime = false }: WelcomeMessageProps) {
  if (!isFirstTime && !userName) return null;
  
  return (
    <div className="bg-gradient-to-br from-earth-50 to-stone-50 p-6 rounded-2xl border border-earth-100 mb-8">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-earth-600 rounded-full mb-2">
          <Sprout className="h-8 w-8 text-white" />
        </div>
        
        {isFirstTime ? (
          <>
            <h2 className="text-xl font-medium text-earth-800">
              Welcome to Coreleven
            </h2>
            <p className="text-stone-600 leading-relaxed max-w-md mx-auto">
              You're joining a rhythm-based network where small groups of 11 cultivate 
              meaningful connections and unlock collective potential together.
            </p>
            <div className="flex items-center justify-center space-x-6 pt-2">
              <div className="flex items-center text-sm text-stone-500">
                <Users className="h-4 w-4 mr-1" />
                Build your Grove
              </div>
              <div className="flex items-center text-sm text-stone-500">
                <Sparkles className="h-4 w-4 mr-1" />
                Unlock potential
              </div>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-lg font-medium text-earth-800">
              Welcome back, {userName}
            </h2>
            <p className="text-stone-600">
              Your Grove awaits. Continue building meaningful connections.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
