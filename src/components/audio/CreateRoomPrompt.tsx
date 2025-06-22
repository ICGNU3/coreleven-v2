
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Users } from 'lucide-react';

interface CreateRoomPromptProps {
  groveName?: string;
  onCreateRoom: () => void;
  loading: boolean;
}

export const CreateRoomPrompt: React.FC<CreateRoomPromptProps> = ({
  groveName,
  onCreateRoom,
  loading,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Users className="h-5 w-5" />
          <span>Audio Room</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-stone-600">
          No active audio room for {groveName || 'this Grove'}.
        </p>
        <PrimaryButton 
          onClick={onCreateRoom}
          className="bg-earth-600 hover:bg-earth-700"
          disabled={loading}
        >
          Start Audio Room
        </PrimaryButton>
      </CardContent>
    </Card>
  );
};
