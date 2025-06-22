
import { z } from 'zod';
import { router, protectedProcedure } from '../trpc';
import { supabase } from '../lib/supabase';
import { generateAudioRoomJWT } from '../lib/auth';

export const audioRouter = router({
  // Generate JWT for audio room access
  generateRoomToken: protectedProcedure
    .input(z.object({ grove_id: z.string().uuid() }))
    .output(z.object({ token: z.string(), expires_in: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.user!.id;
      const { grove_id } = input;

      try {
        // Verify user has access to the grove
        const { data: grove, error: groveError } = await supabase
          .from('groves')
          .select('owner_id')
          .eq('id', grove_id)
          .single();

        const { data: membership } = await supabase
          .from('grove_members')
          .select('id')
          .eq('grove_id', grove_id)
          .eq('user_id', userId)
          .single();

        if (groveError || (!grove || (grove.owner_id !== userId && !membership))) {
          throw new Error('Access denied to grove');
        }

        const token = generateAudioRoomJWT({
          grove_id,
          user_id: userId,
        });

        return {
          token,
          expires_in: 24 * 60 * 60, // 24 hours in seconds
        };
      } catch (error) {
        console.error('Error generating room token:', error);
        throw new Error('Failed to generate room token');
      }
    }),

  // Get active audio rooms for user's groves
  getActiveRooms: protectedProcedure
    .output(z.array(z.object({
      id: z.string().uuid(),
      grove_id: z.string().uuid(),
      is_active: z.boolean(),
      participant_count: z.number(),
      started_at: z.string().optional(),
    })))
    .query(async ({ ctx }) => {
      const userId = ctx.user!.id;

      try {
        // Get user's groves
        const { data: ownedGroves } = await supabase
          .from('groves')
          .select('id')
          .eq('owner_id', userId);

        const { data: memberGroves } = await supabase
          .from('grove_members')
          .select('grove_id')
          .eq('user_id', userId);

        const groveIds = [
          ...(ownedGroves?.map(g => g.id) || []),
          ...(memberGroves?.map(m => m.grove_id) || [])
        ];

        if (groveIds.length === 0) {
          return [];
        }

        // Get active audio rooms for these groves
        const { data: rooms, error } = await supabase
          .from('audio_rooms')
          .select('id, grove_id, is_active, started_at')
          .in('grove_id', groveIds)
          .eq('is_active', true);

        if (error) throw error;

        // Get participant counts for each room
        const roomsWithCounts = await Promise.all(
          (rooms || []).map(async (room) => {
            const { count } = await supabase
              .from('speaker_queue')
              .select('*', { count: 'exact' })
              .eq('room_id', room.id);

            return {
              ...room,
              participant_count: count || 0,
            };
          })
        );

        return roomsWithCounts;
      } catch (error) {
        console.error('Error fetching active rooms:', error);
        throw new Error('Failed to fetch active rooms');
      }
    }),
});
