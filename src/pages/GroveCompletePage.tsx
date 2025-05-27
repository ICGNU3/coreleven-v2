
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { PrimaryButton } from '@/components/PrimaryButton';
import { CircleVisual } from '@/components/CircleVisual';
import { Sparkles, ArrowRight } from 'lucide-react';

const GroveCompletePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userId = localStorage.getItem('currentUserId');
        if (!userId) {
          navigate('/signup');
          return;
        }

        const response = await fetch(`/api/user/${userId}`);
        if (!response.ok) throw new Error('Failed to load user data');
        
        const userData = await response.json();
        
        // Check if Grove is actually complete
        if (userData.inviteCount < 10) {
          navigate('/dashboard');
          return;
        }
        
        setUser(userData);
      } catch (error) {
        console.error('Error loading user data:', error);
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-earth-100 to-earth-200">
        <div className="animate-pulse text-earth-600">Loading...</div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-earth-100 via-earth-50 to-stone-50">
      <div className="container max-w-4xl mx-auto px-4">
        <NavBar />
        
        <main className="flex-grow py-12 flex items-center justify-center">
          <div className="max-w-2xl mx-auto text-center">
            {/* Celebration Header */}
            <div className="mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-earth-600 rounded-full mb-6 animate-pulse">
                <Sparkles className="h-10 w-10 text-white" />
              </div>
              
              <h1 className="text-3xl md:text-4xl font-medium mb-4 text-earth-800">
                Your Grove is Complete
              </h1>
              
              <p className="text-xl text-earth-600 mb-2">
                Rhythm Unlocked
              </p>
              
              <p className="text-stone-600">
                Congratulations, {user.name}. You've built a complete Grove of 11.
              </p>
            </div>

            {/* Grove Symbol */}
            <div className="mb-12">
              <div className="relative">
                <CircleVisual filledCount={10} />
                
                {/* Animated Grove Symbol Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-earth-500 to-earth-700 flex items-center justify-center shadow-lg animate-pulse">
                    <div className="text-white text-3xl">🌳</div>
                  </div>
                </div>
                
                {/* Gentle pulse rings */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full border-2 border-earth-400 opacity-30 animate-ping"></div>
                  <div className="absolute w-40 h-40 rounded-full border-2 border-earth-300 opacity-20 animate-ping" style={{animationDelay: '0.5s'}}></div>
                </div>
              </div>
            </div>

            {/* Completion Message */}
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-stone-200/50 mb-8">
              <h2 className="text-2xl font-medium mb-4 text-earth-700">
                What's Next?
              </h2>
              
              <p className="text-stone-700 leading-relaxed mb-6">
                Your Grove represents a complete network of aligned individuals. This is the foundation 
                for what comes next in the Coreleven ecosystem.
              </p>
              
              <div className="space-y-4">
                <div className="p-4 bg-earth-50 rounded-xl">
                  <h3 className="font-medium text-earth-700 mb-2">🌱 Early Access</h3>
                  <p className="text-sm text-stone-600">
                    You now have access to advanced Coreleven features as they become available.
                  </p>
                </div>
                
                <div className="p-4 bg-earth-50 rounded-xl">
                  <h3 className="font-medium text-earth-700 mb-2">🔗 Network Effects</h3>
                  <p className="text-sm text-stone-600">
                    Your Grove can now connect with other completed Groves in the expanding network.
                  </p>
                </div>
                
                <div className="p-4 bg-earth-50 rounded-xl">
                  <h3 className="font-medium text-earth-700 mb-2">📈 Next Cycle</h3>
                  <p className="text-sm text-stone-600">
                    Stay tuned for the next 90-day cycle and deeper platform features.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <PrimaryButton asChild className="w-full bg-earth-600 hover:bg-earth-700 rounded-xl text-lg py-6">
                <Link to="/dashboard">
                  View Your Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </PrimaryButton>
              
              <p className="text-sm text-stone-500">
                Keep your dashboard bookmarked. More features coming soon.
              </p>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default GroveCompletePage;
