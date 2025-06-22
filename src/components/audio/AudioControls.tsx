
import React from 'react';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Mic, MicOff, Hand, Phone, PhoneOff } from 'lucide-react';

interface AudioControlsProps {
  isConnected: boolean;
  isMuted: boolean;
  handRaised: boolean;
  onJoinRoom: () => void;
  onLeaveRoom: () => void;
  onToggleMute: () => void;
  onRaiseHand: () => void;
}

export const AudioControls: React.FC<AudioControlsProps> = ({
  isConnected,
  isMuted,
  handRaised,
  onJoinRoom,
  onLeaveRoom,
  onToggleMute,
  onRaiseHand,
}) => {
  return (
    <div className="flex space-x-2">
      {!isConnected ? (
        <PrimaryButton 
          onClick={onJoinRoom}
          className="flex-1 bg-earth-600 hover:bg-earth-700"
        >
          <Phone className="mr-2 h-4 w-4" />
          Join Room
        </PrimaryButton>
      ) : (
        <>
          <PrimaryButton 
            onClick={onLeaveRoom}
            variant="outline"
            className="flex-1"
          >
            <PhoneOff className="mr-2 h-4 w-4" />
            Leave
          </PrimaryButton>
          <PrimaryButton 
            onClick={onToggleMute}
            variant="outline"
            className={isMuted ? "border-red-500 text-red-500 hover:bg-red-50" : ""}
          >
            {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </PrimaryButton>
          <PrimaryButton 
            onClick={onRaiseHand}
            variant="outline"
            className={handRaised ? "bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-500" : ""}
          >
            <Hand className="h-4 w-4" />
          </PrimaryButton>
        </>
      )}
    </div>
  );
};
