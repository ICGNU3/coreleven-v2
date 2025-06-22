
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface ConnectionStatusProps {
  isConnected: boolean;
  isMuted: boolean;
  handRaised: boolean;
}

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ 
  isConnected, 
  isMuted, 
  handRaised 
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-stone-400'}`} />
        <span className="text-sm text-stone-600">
          {isConnected ? 'Connected' : 'Disconnected'}
        </span>
      </div>
      {isConnected && (
        <div className="flex items-center space-x-2">
          <Badge variant={isMuted ? "outline" : "default"}>
            {isMuted ? 'Muted' : 'Unmuted'}
          </Badge>
          {handRaised && (
            <Badge variant="outline" className="bg-yellow-50 border-yellow-300">
              Hand Raised
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};
