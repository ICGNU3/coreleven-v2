
import jwt from 'jsonwebtoken';
import { supabase } from './supabase';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface AuthContext {
  user: {
    id: string;
    email: string;
  } | null;
}

export const createAuthContext = async (authorization?: string): Promise<AuthContext> => {
  if (!authorization) {
    return { user: null };
  }

  try {
    const token = authorization.replace('Bearer ', '');
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return { user: null };
    }

    return {
      user: {
        id: user.id,
        email: user.email || '',
      }
    };
  } catch (error) {
    console.error('Auth error:', error);
    return { user: null };
  }
};

export const generateAudioRoomJWT = (payload: { grove_id: string; user_id: string }): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
};

export const verifyAudioRoomJWT = (token: string): { grove_id: string; user_id: string } | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    return {
      grove_id: decoded.grove_id,
      user_id: decoded.user_id,
    };
  } catch (error) {
    return null;
  }
};
