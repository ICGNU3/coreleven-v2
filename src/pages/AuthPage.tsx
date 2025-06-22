
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { LogIn, Sprout } from 'lucide-react';

const AuthPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast({
        title: "Please fill in all fields",
        description: "Email and password are required to sign in.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Welcome back!",
        description: "You've successfully signed in.",
      });
      
      navigate('/dashboard');
      
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "Sign in failed",
        description: error.message || "Please check your credentials and try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-stone-50 to-earth-50">
      <div className="container max-w-4xl mx-auto px-4">
        <NavBar />
        
        <main className="flex-grow py-12 flex items-center justify-center">
          <div className="max-w-md w-full">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-earth-600 rounded-full mb-6">
                <Sprout className="h-8 w-8 text-white" />
              </div>
              
              <h1 className="text-3xl font-medium mb-4 text-earth-700">
                Welcome Back
              </h1>
              
              <p className="text-stone-600 mb-8">
                Sign in to continue your Grove journey
              </p>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-stone-200/50">
              <form onSubmit={handleEmailSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-earth-700 font-medium">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your@email.com"
                    className="h-12 border-stone-300 focus:border-earth-500 rounded-xl"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-earth-700 font-medium">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Your password"
                    className="h-12 border-stone-300 focus:border-earth-500 rounded-xl"
                    disabled={isSubmitting}
                  />
                </div>
                
                <div className="pt-4">
                  <PrimaryButton 
                    type="submit"
                    className="w-full h-12 text-base bg-earth-600 hover:bg-earth-700 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting || !formData.email.trim() || !formData.password.trim()}
                  >
                    {isSubmitting ? (
                      "Signing in..."
                    ) : (
                      <>
                        Sign In
                        <LogIn className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </PrimaryButton>
                </div>

                <div className="text-center pt-6 border-t border-stone-200 mt-6">
                  <p className="text-sm text-stone-600">
                    New to Coreleven?{' '}
                    <Link to="/signup" className="text-earth-600 hover:text-earth-700 font-medium">
                      Join now
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AuthPage;
