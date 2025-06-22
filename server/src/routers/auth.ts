
import { z } from 'zod';
import { router, publicProcedure, protectedProcedure } from '../trpc';
import { supabase } from '../lib/supabase';
import { InviteCodeCheckSchema, InviteValidationSchema } from '../types';

export const authRouter = router({
  validateInviteCode: publicProcedure
    .input(InviteCodeCheckSchema)
    .output(InviteValidationSchema)
    .mutation(async ({ input }) => {
      const { invite_code } = input;

      try {
        // Get grove by invite code
        const { data: grove, error: groveError } = await supabase
          .from('groves')
          .select('id, owner_id, is_complete')
          .eq('invite_code', invite_code.toUpperCase())
          .single();

        if (groveError || !grove) {
          return { is_valid: false };
        }

        if (grove.is_complete) {
          return { is_valid: false };
        }

        // Get owner profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', grove.owner_id)
          .single();

        // Count current members
        const { count: memberCount } = await supabase
          .from('grove_members')
          .select('*', { count: 'exact' })
          .eq('grove_id', grove.id);

        const totalMembers = (memberCount || 0) + 1; // +1 for owner

        return {
          is_valid: true,
          grove_id: grove.id,
          inviter_name: profile?.full_name || 'Grove Owner',
          filled_spots: totalMembers,
        };
      } catch (error) {
        console.error('Error validating invite code:', error);
        return { is_valid: false };
      }
    }),

  joinGroveWithCode: protectedProcedure
    .input(InviteCodeCheckSchema)
    .mutation(async ({ input, ctx }) => {
      const { invite_code } = input;
      const userId = ctx.user!.id;

      try {
        // Validate invite code first
        const { data: grove, error: groveError } = await supabase
          .from('groves')
          .select('id, is_complete')
          .eq('invite_code', invite_code.toUpperCase())
          .single();

        if (groveError || !grove || grove.is_complete) {
          throw new Error('Invalid or expired invite code');
        }

        // Check if user is already a member
        const { data: existingMember } = await supabase
          .from('grove_members')
          .select('id')
          .eq('grove_id', grove.id)
          .eq('user_id', userId)
          .single();

        if (existingMember) {
          throw new Error('User is already a member of this grove');
        }

        // Add user to grove
        const { error: memberError } = await supabase
          .from('grove_members')
          .insert({
            grove_id: grove.id,
            user_id: userId,
          });

        if (memberError) {
          throw new Error('Failed to join grove');
        }

        return { success: true, grove_id: grove.id };
      } catch (error) {
        console.error('Error joining grove:', error);
        throw new Error(error instanceof Error ? error.message : 'Failed to join grove');
      }
    }),
});
