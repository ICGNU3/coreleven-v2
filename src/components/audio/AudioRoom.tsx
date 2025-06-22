
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Mic, MicOff, Hand, Users, Calendar, Phone, PhoneOff } from 'lucide-react';

interface AudioRoomProps {
  groveId: string;
  groveName?: string;
}

interface AudioRoom {
  id: string;
  daily_room_name: string | null;
  is_active: boolean;
  max_participants: number;
  created_by: string | null;
  scheduled_for: string | null;
  started_at: string | null;
  ended_at: string | null;
}

interface SpeakerQueue {
  id: string;
  user_id: string;
  position: number;
  is_speaking: boolean;
  raised_hand_at: string;
  profiles?: {
    full_name: string;
  };
}

export const AudioRoom: React.FC<AudioRoomProps> = ({ groveId, groveName }) => {
  const { toast } = useToast();
  const [room, setRoom] = useState<AudioRoom | null>(null);
  const [speakerQueue, setSpeakerQueue] = useState<SpeakerQueue[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [handRaised, setHandRaised] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAudioRoom();
  }, [groveId]);

  const loadAudioRoom = async () => {
    try {
      const { data: roomData, error: roomError } = await supabase
        .from('audio_rooms')
        .select('*')
        .eq('grove_id', groveId)
        .eq('is_active', true)
        .single();

      if (roomError && roomError.code !== 'PGRST116') {
        console.error('Error loading audio room:', roomError);
      } else if (roomData) {
        setRoom(roomData);
        await loadSpeakerQueue(roomData.id);
      }
    } catch (error) {
      console.error('Error in loadAudioRoom:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadSpeakerQueue = async (roomId: string) => {
    try {
      const { data, error } = await supabase
        .from('speaker_queue')
        .select(`
          *,
          profiles:user_id (
            full_name
          )
        `)
        .eq('room_id', roomId)
        .order('position');

      if (error) {
        console.error('Error loading speaker queue:', error);
      } else {
        setSpeakerQueue(data || []);
      }
    } catch (error) {
      console.error('Error in loadSpeakerQueue:', error);
    }
  };

  const createAudioRoom = async () => {
    try {
      setLoading(true);
      const { data: user } = await supabase.auth.getUser();
      
      if (!user.user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to create an audio room.",
          variant: "destructive"
        });
        return;
      }

      // Generate a unique room name for Daily.co
      const roomName = `grove_${groveId}_${Date.now()}`;

      const { data: newRoom, error } = await supabase
        .from('audio_rooms')
        .insert({
          grove_id: groveId,
          daily_room_name: roomName,
          is_active: true,
          created_by: user.user.id,
          started_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      setRoom(newRoom);
      toast({
        title: "Audio room created!",
        description: "Grove members can now join the conversation.",
      });
    } catch (error: any) {
      console.error('Error creating audio room:', error);
      toast({
        title: "Failed to create room",
        description: error.message || "Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const joinAudioRoom = async () => {
    if (!room) return;
    
    try {
      // In a real implementation, this would integrate with Daily.co SDK
      // For now, we'll simulate joining the room
      setIsConnected(true);
      toast({
        title: "Joined audio room",
        description: "You're now connected to the Grove conversation.",
      });
    } catch (error) {
      console.error('Error joining room:', error);
      toast({
        title: "Failed to join room",
        description: "Please try again.",
        variant: "destructive"
      });
    }
  };

  const leaveAudioRoom = async () => {
    try {
      setIsConnected(false);
      setHandRaised(false);
      toast({
        title: "Left audio room",
        description: "You've disconnected from the Grove conversation.",
      });
    } catch (error) {
      console.error('Error leaving room:', error);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    toast({
      title: isMuted ? "Unmuted" : "Muted",
      description: isMuted ? "Your microphone is now on." : "Your microphone is now off.",
    });
  };

  const raiseHand = async () => {
    if (!room || !isConnected) return;

    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return;

      if (!handRaised) {
        // Add to speaker queue
        const nextPosition = speakerQueue.length + 1;
        const { error } = await supabase
          .from('speaker_queue')
          .insert({
            room_id: room.id,
            user_id: user.user.id,
            position: nextPosition
          });

        if (error) throw error;
        
        setHandRaised(true);
        await loadSpeakerQueue(room.id);
        toast({
          title: "Hand raised",
          description: "You've been added to the speaker queue.",
        });
      } else {
        // Remove from speaker queue
        const { error } = await supabase
          .from('speaker_queue')
          .delete()
          .eq('room_id', room.id)
          .eq('user_id', user.user.id);

        if (error) throw error;

        setHandRaised(false);
        await loadSpeakerQueue(room.id);
        toast({
          title: "Hand lowered",
          description: "You've been removed from the speaker queue.",
        });
      }
    } catch (error: any) {
      console.error('Error with hand raise:', error);
      toast({
        title: "Failed to update speaker queue",
        description: error.message || "Please try again.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading audio room...</div>
        </CardContent>
      </Card>
    );
  }

  if (!room) {
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
            onClick={createAudioRoom}
            className="bg-earth-600 hover:bg-earth-700"
            disabled={loading}
          >
            Start Audio Room
          </PrimaryButton>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Audio Room</span>
            <Badge variant="default" className="bg-green-500">
              Live
            </Badge>
          </div>
          <div className="text-sm text-stone-600">
            {speakerQueue.length} in queue
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Connection Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-stone-400'}`} />
            <span className="text-sm text-stone-600">
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
          {isConnected && (
            <div className="flex items-center space-x-2">
              <Badge variant={isMuted ? "destructive" : "default"}>
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

        {/* Speaker Queue */}
        {speakerQueue.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Speaker Queue</h4>
            <div className="space-y-1">
              {speakerQueue.map((speaker, index) => (
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
        )}

        {/* Controls */}
        <div className="flex space-x-2">
          {!isConnected ? (
            <PrimaryButton 
              onClick={joinAudioRoom}
              className="flex-1 bg-earth-600 hover:bg-earth-700"
            >
              <Phone className="mr-2 h-4 w-4" />
              Join Room
            </PrimaryButton>
          ) : (
            <>
              <PrimaryButton 
                onClick={leaveAudioRoom}
                variant="outline"
                className="flex-1"
              >
                <PhoneOff className="mr-2 h-4 w-4" />
                Leave
              </PrimaryButton>
              <PrimaryButton 
                onClick={toggleMute}
                variant={isMuted ? "destructive" : "outline"}
              >
                {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </PrimaryButton>
              <PrimaryButton 
                onClick={raiseHand}
                variant={handRaised ? "default" : "outline"}
                className={handRaised ? "bg-yellow-500 hover:bg-yellow-600" : ""}
              >
                <Hand className="h-4 w-4" />
              </PrimaryButton>
            </>
          )}
        </div>

        <p className="text-xs text-stone-500">
          Audio rooms support up to 11 participants. This is a prototype - full Daily.co integration coming soon.
        </p>
      </CardContent>
    </Card>
  );
};
