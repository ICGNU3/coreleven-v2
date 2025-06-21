
import React, { useState } from 'react';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { KeyRound } from 'lucide-react';

interface InviteCodeFormProps {
  onInviteCodeSubmit: (inviteCode: string) => Promise<void>;
}

export const InviteCodeForm = ({ onInviteCodeSubmit }: InviteCodeFormProps) => {
  const [inviteCode, setInviteCode] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inviteCode.trim()) {
      toast({
        title: "Please enter an invite code",
        description: "You need a valid invite code to join a Grove.",
        variant: "destructive"
      });
      return;
    }

    await onInviteCodeSubmit(inviteCode);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-stone-50 to-earth-50">
      <div className="container max-w-4xl mx-auto px-4">
        <NavBar />
        
        <main className="flex-grow py-12 flex items-center justify-center">
          <div className="max-w-md w-full">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-earth-600 rounded-full mb-4">
                <KeyRound className="h-8 w-8 text-white" />
              </div>
              
              <h1 className="text-2xl md:text-3xl font-medium mb-4 text-earth-700">
                Enter Your Invite Code
              </h1>
              
              <p className="text-stone-600 mb-8">
                Enter the invite code you received to join a Grove.
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-stone-200/50">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="inviteCode" className="text-earth-700 font-medium">Invite Code</Label>
                  <Input
                    id="inviteCode"
                    type="text"
                    required
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value)}
                    placeholder="Enter your invite code"
                    className="border-stone-300 focus:border-earth-500 rounded-xl text-center text-lg tracking-wider"
                    autoFocus
                  />
                </div>
                
                <PrimaryButton 
                  type="submit"
                  className="w-full text-lg py-6 bg-earth-600 hover:bg-earth-700 rounded-xl"
                  disabled={!inviteCode.trim()}
                >
                  Validate Invite Code
                  <KeyRound className="ml-2 h-5 w-5" />
                </PrimaryButton>
              </form>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};
