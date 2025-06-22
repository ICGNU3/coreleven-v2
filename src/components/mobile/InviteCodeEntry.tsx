
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PrimaryButton } from '@/components/PrimaryButton';
import { useToast } from '@/hooks/use-toast';

interface InviteCodeEntryProps {
  onCodeSubmit: (code: string) => void;
  loading?: boolean;
}

export const InviteCodeEntry: React.FC<InviteCodeEntryProps> = ({
  onCodeSubmit,
  loading = false,
}) => {
  const [code, setCode] = useState('');
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!code.trim()) {
      toast({
        title: "Code Required",
        description: "Please enter an invite code.",
        variant: "destructive"
      });
      return;
    }

    onCodeSubmit(code.trim().toUpperCase());
  };

  return (
    <div className="min-h-screen bg-stone-50 p-4 flex items-center justify-center">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-stone-900 mb-2">Coreleven</h1>
          <p className="text-stone-600">Enter your invite code to join</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Join Grove</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Invite Code
              </label>
              <Input
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="Enter 8-character code"
                maxLength={8}
                className="text-center text-lg tracking-wider font-mono"
                disabled={loading}
              />
            </div>

            <PrimaryButton
              onClick={handleSubmit}
              disabled={loading || !code.trim()}
              className="w-full"
            >
              {loading ? 'Joining...' : 'Join Grove'}
            </PrimaryButton>

            <div className="text-center">
              <p className="text-xs text-stone-500">
                Don't have a code? Ask a Grove member for an invitation.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
