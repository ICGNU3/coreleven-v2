
import { z } from 'zod';

// User types
export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  full_name: z.string().optional(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type User = z.infer<typeof UserSchema>;

// Grove types
export const GroveTypeSchema = z.enum(['personal', 'auto']);

export const GroveSchema = z.object({
  id: z.string().uuid(),
  owner_id: z.string().uuid(),
  invite_code: z.string(),
  grove_type: GroveTypeSchema,
  is_private: z.boolean().default(false),
  is_complete: z.boolean().default(false),
  merge_eligible: z.boolean().default(true),
  created_at: z.string(),
  completed_at: z.string().optional(),
});

export type Grove = z.infer<typeof GroveSchema>;

// Grove member types
export const GroveMemberSchema = z.object({
  id: z.string().uuid(),
  grove_id: z.string().uuid(),
  user_id: z.string().uuid(),
  joined_at: z.string(),
});

export type GroveMember = z.infer<typeof GroveMemberSchema>;

// Invite types
export const InviteCodeCheckSchema = z.object({
  invite_code: z.string().min(8).max(8),
});

export const InviteValidationSchema = z.object({
  is_valid: z.boolean(),
  grove_id: z.string().uuid().optional(),
  inviter_name: z.string().optional(),
  filled_spots: z.number().optional(),
});

export type InviteCodeCheck = z.infer<typeof InviteCodeCheckSchema>;
export type InviteValidation = z.infer<typeof InviteValidationSchema>;

// Audio room JWT types
export const AudioRoomJWTSchema = z.object({
  grove_id: z.string().uuid(),
  user_id: z.string().uuid(),
});

export type AudioRoomJWT = z.infer<typeof AudioRoomJWTSchema>;

// API Request/Response types
export const CreateGroveSchema = z.object({
  grove_type: GroveTypeSchema.default('personal'),
  is_private: z.boolean().default(false),
});

export const UpdateGroveSchema = z.object({
  grove_id: z.string().uuid(),
  is_private: z.boolean().optional(),
  merge_eligible: z.boolean().optional(),
});

export type CreateGrove = z.infer<typeof CreateGroveSchema>;
export type UpdateGrove = z.infer<typeof UpdateGroveSchema>;
