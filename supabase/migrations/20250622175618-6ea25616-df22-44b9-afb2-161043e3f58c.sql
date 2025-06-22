
-- Add user questionnaire data for AI matching
CREATE TABLE public.user_questionnaires (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  big_five_scores JSONB, -- openness, conscientiousness, extraversion, agreeableness, neuroticism
  enneagram_type INTEGER CHECK (enneagram_type >= 1 AND enneagram_type <= 9),
  interest_tags TEXT[],
  region TEXT,
  pronouns TEXT,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add grove types and privacy settings
ALTER TABLE public.groves 
ADD COLUMN grove_type TEXT DEFAULT 'personal' CHECK (grove_type IN ('personal', 'auto')),
ADD COLUMN is_private BOOLEAN DEFAULT false,
ADD COLUMN merge_eligible BOOLEAN DEFAULT true;

-- Add audio rooms
CREATE TABLE public.audio_rooms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  grove_id UUID REFERENCES public.groves NOT NULL,
  daily_room_name TEXT,
  is_active BOOLEAN DEFAULT false,
  max_participants INTEGER DEFAULT 11,
  created_by UUID REFERENCES auth.users,
  scheduled_for TIMESTAMP WITH TIME ZONE,
  started_at TIMESTAMP WITH TIME ZONE,
  ended_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add speaker queue for audio rooms
CREATE TABLE public.speaker_queue (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id UUID REFERENCES public.audio_rooms NOT NULL,
  user_id UUID REFERENCES auth.users NOT NULL,
  position INTEGER NOT NULL,
  is_speaking BOOLEAN DEFAULT false,
  raised_hand_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add chat messages for groves
CREATE TABLE public.grove_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  grove_id UUID REFERENCES public.groves NOT NULL,
  sender_id UUID REFERENCES auth.users NOT NULL,
  content TEXT NOT NULL,
  message_type TEXT DEFAULT 'text' CHECK (message_type IN ('text', 'system')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add notification preferences
CREATE TABLE public.notification_preferences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL UNIQUE,
  quiet_hours_start TIME,
  quiet_hours_end TIME,
  enable_grove_invites BOOLEAN DEFAULT true,
  enable_merge_notifications BOOLEAN DEFAULT true,
  enable_chat_notifications BOOLEAN DEFAULT true,
  enable_audio_notifications BOOLEAN DEFAULT true,
  daily_digest_enabled BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add transcripts table (optional feature)
CREATE TABLE public.audio_transcripts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id UUID REFERENCES public.audio_rooms NOT NULL,
  user_id UUID REFERENCES auth.users NOT NULL,
  transcript_text TEXT,
  encrypted_data BYTEA,
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (now() + interval '30 days'),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all new tables
ALTER TABLE public.user_questionnaires ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audio_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.speaker_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grove_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audio_transcripts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_questionnaires
CREATE POLICY "Users can view their own questionnaire" 
  ON public.user_questionnaires 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own questionnaire" 
  ON public.user_questionnaires 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own questionnaire" 
  ON public.user_questionnaires 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- RLS Policies for audio_rooms (grove members can access)
CREATE POLICY "Grove members can view audio rooms" 
  ON public.audio_rooms 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.groves g 
      LEFT JOIN public.grove_members gm ON g.id = gm.grove_id 
      WHERE g.id = grove_id 
      AND (g.owner_id = auth.uid() OR gm.user_id = auth.uid())
    )
  );

CREATE POLICY "Grove owners can create audio rooms" 
  ON public.audio_rooms 
  FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.groves 
      WHERE id = grove_id AND owner_id = auth.uid()
    )
  );

-- RLS Policies for grove_messages
CREATE POLICY "Grove members can view messages" 
  ON public.grove_messages 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.groves g 
      LEFT JOIN public.grove_members gm ON g.id = gm.grove_id 
      WHERE g.id = grove_id 
      AND (g.owner_id = auth.uid() OR gm.user_id = auth.uid())
    )
  );

CREATE POLICY "Grove members can send messages" 
  ON public.grove_messages 
  FOR INSERT 
  WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
      SELECT 1 FROM public.groves g 
      LEFT JOIN public.grove_members gm ON g.id = gm.grove_id 
      WHERE g.id = grove_id 
      AND (g.owner_id = auth.uid() OR gm.user_id = auth.uid())
    )
  );

-- RLS Policies for notification_preferences
CREATE POLICY "Users can manage their notification preferences" 
  ON public.notification_preferences 
  FOR ALL 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for audio_transcripts
CREATE POLICY "Users can view their own transcripts" 
  ON public.audio_transcripts 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own transcripts" 
  ON public.audio_transcripts 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Add function to clean up expired transcripts
CREATE OR REPLACE FUNCTION public.cleanup_expired_transcripts()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  DELETE FROM public.audio_transcripts 
  WHERE expires_at < now();
END;
$$;

-- Add function for AI matching (placeholder for now)
CREATE OR REPLACE FUNCTION public.find_matching_groves(user_id UUID)
RETURNS TABLE(grove_id UUID, compatibility_score NUMERIC)
LANGUAGE plpgsql
AS $$
BEGIN
  -- Placeholder implementation - will be enhanced with actual AI matching logic
  RETURN QUERY
  SELECT g.id as grove_id, 0.5 as compatibility_score
  FROM public.groves g
  WHERE g.grove_type = 'auto' 
  AND g.is_complete = false 
  AND g.merge_eligible = true
  AND g.owner_id != user_id
  LIMIT 10;
END;
$$;

-- Update the grove completion check to handle grove types
CREATE OR REPLACE FUNCTION public.check_grove_completion()
RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE
  member_count INTEGER;
BEGIN
  -- Count members in the grove (including owner)
  SELECT COUNT(*) + 1 INTO member_count
  FROM public.grove_members
  WHERE grove_id = NEW.grove_id;
  
  -- If we have 11 total (owner + 10 members), mark grove as complete
  IF member_count = 11 THEN
    UPDATE public.groves
    SET is_complete = TRUE, completed_at = NOW()
    WHERE id = NEW.grove_id;
  END IF;
  
  RETURN NEW;
END;
$$;
