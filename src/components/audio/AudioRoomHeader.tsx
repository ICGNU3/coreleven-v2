
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';

interface AudioRoomHeaderProps {
  speakerQueueLength: number;
}

export const AudioRoomHeader: React.FC<AudioRoomHeaderProps> = ({ speakerQueueLength }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Users className="h-5 w-5" />
        <span>Audio Room</span>
        <Badge variant="default" className="bg-green-500">
          Live
        </Badge>
      </div>
      <div className="text-sm text-stone-600">
        {speakerQueueLength} in queue
      </div>
    </div>
  );
};
