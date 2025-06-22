
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

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
  } | null;
}

export const useAudioRoom = (groveId: string) => {
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
      const { data: queueData, error: queueError } = await supabase
        .from('speaker_queue')
        .select('*')
        .eq('room_id', roomId)
        .order('position');

      if (queueError) {
        console.error('Error loading speaker queue:', queueError);
        setSpeakerQueue([]);
        return;
      }

      if (queueData && queueData.length > 0) {
        const userIds = queueData.map(item => item.user_id);
        const { data: profilesData } = await supabase
          .from('profiles')
          .select('id, full_name')
          .in('id', userIds);

        const enrichedQueue = queueData.map(item => ({
          ...item,
          profiles: profilesData?.find(p => p.id === item.user_id) || null
        }));

        setSpeakerQueue(enrichedQueue);
      } else {
        setSpeakerQueue([]);
      }
    } catch (error) {
      console.error('Error in loadSpeakerQueue:', error);
      setSpeakerQueue([]);
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

  return {
    room,
    speakerQueue,
    isConnected,
    isMuted,
    handRaised,
    loading,
    createAudioRoom,
    joinAudioRoom,
    leaveAudioRoom,
    toggleMute,
    raiseHand,
  };
};
