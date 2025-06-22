
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Hand, Phone, PhoneOff, Users } from 'lucide-react';

interface MobileAudioRoomProps {
  isConnected: boolean;
  isMuted: boolean;
  handRaised: boolean;
  speakerQueue: Array<{
    id: string;
    user_id: string;
    position: number;
    is_speaking: boolean;
    profiles?: { full_name: string } | null;
  }>;
  onJoin: () => void;
  onLeave: () => void;
  onToggleMute: () => void;
  onRaiseHand: () => void;
}

export const MobileAudioRoom: React.FC<MobileAudioRoomProps> = ({
  isConnected,
  isMuted,
  handRaised,
  speakerQueue,
  onJoin,
  onLeave,
  onToggleMute,
  onRaiseHand,
}) => {
  return (
    <div className="min-h-screen bg-stone-50 p-4 pb-20">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-stone-900">Audio Room</h1>
          {isConnected && (
            <Badge className="bg-green-500">Live</Badge>
          )}
        </div>
        <p className="text-stone-600">{speakerQueue.length} in queue</p>
      </div>

      {/* Connection Status */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-stone-400'}`} />
              <span className="text-sm font-medium">
                {isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
            {isConnected && (
              <div className="flex space-x-2">
                <Badge variant={isMuted ? "outline" : "default"}>
                  {isMuted ? 'Muted' : 'Unmuted'}
                </Badge>
                {handRaised && (
                  <Badge className="bg-yellow-500">Hand Raised</Badge>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Speaker Queue */}
      {speakerQueue.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Speaker Queue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {speakerQueue.map((speaker, index) => (
                <div key={speaker.id} className="flex items-center space-x-3 p-3 bg-stone-50 rounded-lg">
                  <div className="w-8 h-8 bg-earth-100 rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{speaker.profiles?.full_name || 'Anonymous'}</p>
                  </div>
                  {speaker.is_speaking && (
                    <Badge className="bg-green-500">Speaking</Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Controls */}
      <div className="fixed bottom-20 left-4 right-4">
        <Card>
          <CardContent className="p-4">
            {!isConnected ? (
              <PrimaryButton onClick={onJoin} className="w-full h-12 text-lg">
                <Phone className="mr-2 h-5 w-5" />
                Join Room
              </PrimaryButton>
            ) : (
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-3">
                  <PrimaryButton
                    onClick={onToggleMute}
                    variant="outline"
                    className={`h-12 ${isMuted ? "border-red-500 text-red-500" : ""}`}
                  >
                    {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                  </PrimaryButton>
                  
                  <PrimaryButton
                    onClick={onRaiseHand}
                    variant="outline"
                    className={`h-12 ${handRaised ? "bg-yellow-500 text-white border-yellow-500" : ""}`}
                  >
                    <Hand className="h-5 w-5" />
                  </PrimaryButton>
                  
                  <PrimaryButton
                    onClick={onLeave}
                    variant="outline"
                    className="h-12 border-red-500 text-red-500"
                  >
                    <PhoneOff className="h-5 w-5" />
                  </PrimaryButton>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {!isConnected && (
        <div className="text-center py-8">
          <Users className="h-16 w-16 mx-auto mb-4 text-stone-300" />
          <p className="text-stone-500">Join the conversation with your Grove</p>
        </div>
      )}
    </div>
  );
};
