
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface SpeakerQueueItem {
  id: string;
  user_id: string;
  position: number;
  is_speaking: boolean;
  raised_hand_at: string;
  profiles?: {
    full_name: string;
  } | null;
}

interface SpeakerQueueProps {
  speakers: SpeakerQueueItem[];
}

export const SpeakerQueue: React.FC<SpeakerQueueProps> = ({ speakers }) => {
  if (speakers.length === 0) return null;

  return (
    <div className="space-y-2">
      <h4 className="font-medium text-sm">Speaker Queue</h4>
      <div className="space-y-1">
        {speakers.map((speaker, index) => (
          <div key={speaker.id} className="flex items-center space-x-2 text-sm">
            <span className="w-6 h-6 bg-earth-100 rounded-full flex items-center justify-center text-xs">
              {index + 1}
            </span>
            <span>{speaker.profiles?.full_name || 'Anonymous'}</span>
            {speaker.is_speaking && (
              <Badge variant="default" className="bg-green-500 text-xs">
                Speaking
              </Badge>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
