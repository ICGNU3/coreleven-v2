
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Sprout, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const SignupPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const createGrove = async (userId: string) => {
    const { data: codeData } = await supabase.rpc('generate_invite_code');
    
    if (codeData) {
      const { error: groveError } = await supabase
        .from('groves')
        .insert({
          owner_id: userId,
          invite_code: codeData
        });

      if (groveError) {
        console.error('Error creating grove:', groveError);
        throw groveError;
      }
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });

      if (error) {
        throw error;
      }
    } catch (error: any) {
      console.error('Google signup error:', error);
      toast({
        title: "Google signup unavailable",
        description: "Please use email signup or try again later.",
        variant: "destructive"
      });
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.password) {
      toast({
        title: "Please fill in all fields",
        description: "Name, email, and password are required.",
        variant: "destructive"
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
          data: {
            full_name: formData.fullName,
          }
        }
      });

      if (authError) {
        throw authError;
      }

      if (authData.user) {
        await createGrove(authData.user.id);

        toast({
          title: "Welcome to Coreleven!",
          description: "Your Grove has been created! Check your email to confirm your account.",
        });
        
        navigate('/dashboard');
      }
      
    } catch (error: any) {
      console.error('Signup error:', error);
      toast({
        title: "Something went wrong",
        description: error.message || "Please try again in a moment.",
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
                Join Coreleven
              </h1>
              
              <p className="text-stone-600 mb-8">
                Connect with friends and build your Grove of 11
              </p>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-stone-200/50">
              {!showEmailForm ? (
                <div className="space-y-4">
                  <Button
                    onClick={handleGoogleSignUp}
                    variant="outline"
                    className="w-full h-12 text-base border-2 border-stone-300 hover:bg-stone-50 transition-all duration-200"
                  >
                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-stone-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-stone-500">OR</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => setShowEmailForm(true)}
                    variant="outline"
                    className="w-full h-12 text-base border-2 border-stone-300 hover:bg-stone-50 transition-all duration-200"
                  >
                    <Mail className="w-5 h-5 mr-3" />
                    Sign up with email
                  </Button>

                  <p className="text-sm text-stone-500 text-center mt-6">
                    By signing up, you agree to our Terms of Service and Privacy Policy
                  </p>

                  <div className="text-center pt-4 border-t border-stone-200 mt-6">
                    <p className="text-sm text-stone-600">
                      Already have an account?{' '}
                      <Link to="/auth" className="text-earth-600 hover:text-earth-700 font-medium">
                        Sign in
                      </Link>
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleEmailSubmit} className="space-y-6">
                  <button
                    type="button"
                    onClick={() => setShowEmailForm(false)}
                    className="text-stone-500 hover:text-stone-700 text-sm mb-4"
                  >
                    ← Back to options
                  </button>

                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-earth-700 font-medium">Full Name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="Your full name"
                      className="h-12 border-stone-300 focus:border-earth-500 rounded-xl"
                      disabled={isSubmitting}
                    />
                  </div>
                  
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
                      placeholder="Choose a secure password"
                      className="h-12 border-stone-300 focus:border-earth-500 rounded-xl"
                      disabled={isSubmitting}
                    />
                    <p className="text-xs text-stone-500">Must be at least 6 characters</p>
                  </div>
                  
                  <div className="pt-4">
                    <PrimaryButton 
                      type="submit"
                      className="w-full h-12 text-base bg-earth-600 hover:bg-earth-700 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isSubmitting || !formData.fullName.trim() || !formData.email.trim() || !formData.password.trim()}
                    >
                      {isSubmitting ? (
                        "Creating your Grove..."
                      ) : (
                        <>
                          Create Account
                          <Sprout className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </PrimaryButton>
                  </div>
                </form>
              )}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default SignupPage;
