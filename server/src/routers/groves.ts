
import { z } from 'zod';
import { router, protectedProcedure } from '../trpc';
import { supabase } from '../lib/supabase';
import { CreateGroveSchema, UpdateGroveSchema, GroveSchema } from '../types';

export const grovesRouter = router({
  // Get user's groves
  getUserGroves: protectedProcedure
    .output(z.array(GroveSchema))
    .query(async ({ ctx }) => {
      const userId = ctx.user!.id;

      try {
        // Get groves owned by user
        const { data: ownedGroves, error: ownedError } = await supabase
          .from('groves')
          .select('*')
          .eq('owner_id', userId);

        if (ownedError) throw ownedError;

        // Get groves user is a member of
        const { data: memberGroves, error: memberError } = await supabase
          .from('grove_members')
          .select('groves(*)')
          .eq('user_id', userId);

        if (memberError) throw memberError;

        const allGroves = [
          ...(ownedGroves || []),
          ...(memberGroves?.map(m => m.groves).filter(Boolean) || [])
        ];

        // Remove duplicates
        const uniqueGroves = allGroves.filter((grove, index, self) => 
          index === self.findIndex(g => g.id === grove.id)
        );

        return uniqueGroves;
      } catch (error) {
        console.error('Error fetching user groves:', error);
        throw new Error('Failed to fetch groves');
      }
    }),

  // Create a new grove
  createGrove: protectedProcedure
    .input(CreateGroveSchema)
    .output(GroveSchema)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.user!.id;

      try {
        // Generate invite code
        const { data: inviteCode } = await supabase.rpc('generate_invite_code');
        
        if (!inviteCode) {
          throw new Error('Failed to generate invite code');
        }

        const { data: grove, error } = await supabase
          .from('groves')
          .insert({
            owner_id: userId,
            invite_code: inviteCode,
            grove_type: input.grove_type,
            is_private: input.is_private,
          })
          .select()
          .single();

        if (error) throw error;

        return grove;
      } catch (error) {
        console.error('Error creating grove:', error);
        throw new Error('Failed to create grove');
      }
    }),

  // Update grove settings
  updateGrove: protectedProcedure
    .input(UpdateGroveSchema)
    .output(GroveSchema)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.user!.id;
      const { grove_id, ...updateData } = input;

      try {
        // Verify user owns the grove
        const { data: grove, error: fetchError } = await supabase
          .from('groves')
          .select('owner_id')
          .eq('id', grove_id)
          .single();

        if (fetchError || grove?.owner_id !== userId) {
          throw new Error('Grove not found or access denied');
        }

        const { data: updatedGrove, error } = await supabase
          .from('groves')
          .update(updateData)
          .eq('id', grove_id)
          .select()
          .single();

        if (error) throw error;

        return updatedGrove;
      } catch (error) {
        console.error('Error updating grove:', error);
        throw new Error('Failed to update grove');
      }
    }),

  // Delete grove
  deleteGrove: protectedProcedure
    .input(z.object({ grove_id: z.string().uuid() }))
    .output(z.object({ success: z.boolean() }))
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.user!.id;
      const { grove_id } = input;

      try {
        // Verify user owns the grove
        const { data: grove, error: fetchError } = await supabase
          .from('groves')
          .select('owner_id')
          .eq('id', grove_id)
          .single();

        if (fetchError || grove?.owner_id !== userId) {
          throw new Error('Grove not found or access denied');
        }

        const { error } = await supabase
          .from('groves')
          .delete()
          .eq('id', grove_id);

        if (error) throw error;

        return { success: true };
      } catch (error) {
        console.error('Error deleting grove:', error);
        throw new Error('Failed to delete grove');
      }
    }),

  // Get matching groves for auto-grove type
  getMatchingGroves: protectedProcedure
    .output(z.array(GroveSchema.extend({ compatibility_score: z.number() })))
    .query(async ({ ctx }) => {
      const userId = ctx.user!.id;

      try {
        const { data: matchingGroves, error } = await supabase
          .rpc('find_matching_groves', { user_id: userId });

        if (error) throw error;

        // Get full grove details for matching groves
        const groveIds = matchingGroves?.map(g => g.grove_id) || [];
        
        if (groveIds.length === 0) {
          return [];
        }

        const { data: groves, error: grovesError } = await supabase
          .from('groves')
          .select('*')
          .in('id', groveIds);

        if (grovesError) throw grovesError;

        // Combine grove data with compatibility scores
        return groves?.map(grove => {
          const match = matchingGroves?.find(m => m.grove_id === grove.id);
          return {
            ...grove,
            compatibility_score: match?.compatibility_score || 0,
          };
        }) || [];
      } catch (error) {
        console.error('Error fetching matching groves:', error);
        throw new Error('Failed to fetch matching groves');
      }
    }),
});
