
-- Drop existing tables if they exist (careful - this will delete data)
DROP TABLE IF EXISTS grove_members CASCADE;
DROP TABLE IF EXISTS grove_invitations CASCADE;
DROP TABLE IF EXISTS groves CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Create groves table
CREATE TABLE public.groves (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  invite_code TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  is_complete BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (id)
);

-- Create grove_invitations table
CREATE TABLE public.grove_invitations (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  grove_id UUID NOT NULL REFERENCES public.groves ON DELETE CASCADE,
  invited_by UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  invitee_email TEXT,
  invitee_name TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined')),
  invited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  accepted_at TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY (id)
);

-- Create grove_members table
CREATE TABLE public.grove_members (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  grove_id UUID NOT NULL REFERENCES public.groves ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id),
  UNIQUE(grove_id, user_id)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.groves ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grove_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grove_members ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for groves
CREATE POLICY "Users can view groves they own or are members of" ON public.groves
  FOR SELECT USING (
    auth.uid() = owner_id OR 
    EXISTS (
      SELECT 1 FROM public.grove_members 
      WHERE grove_id = groves.id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create their own groves" ON public.groves
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Grove owners can update their groves" ON public.groves
  FOR UPDATE USING (auth.uid() = owner_id);

-- RLS Policies for grove_invitations
CREATE POLICY "Users can view invitations for their groves" ON public.grove_invitations
  FOR SELECT USING (
    auth.uid() = invited_by OR
    EXISTS (
      SELECT 1 FROM public.groves 
      WHERE id = grove_id AND owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can create invitations for their groves" ON public.grove_invitations
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.groves 
      WHERE id = grove_id AND owner_id = auth.uid()
    )
  );

-- RLS Policies for grove_members
CREATE POLICY "Users can view members of groves they belong to" ON public.grove_members
  FOR SELECT USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM public.groves 
      WHERE id = grove_id AND owner_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM public.grove_members gm
      WHERE gm.grove_id = grove_members.grove_id AND gm.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can join groves" ON public.grove_members
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Function to automatically create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'name')
  );
  RETURN NEW;
END;
$$;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Function to generate unique invite codes
CREATE OR REPLACE FUNCTION generate_invite_code()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  code TEXT;
BEGIN
  LOOP
    code := upper(substring(encode(gen_random_bytes(6), 'base64') from 1 for 8));
    -- Remove confusing characters
    code := replace(replace(replace(replace(code, '0', 'A'), '1', 'B'), 'O', 'C'), 'I', 'D');
    
    -- Check if code already exists
    IF NOT EXISTS (SELECT 1 FROM public.groves WHERE invite_code = code) THEN
      RETURN code;
    END IF;
  END LOOP;
END;
$$;

-- Function to check if grove is complete (has 11 members including owner)
CREATE OR REPLACE FUNCTION check_grove_completion()
RETURNS TRIGGER
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

-- Trigger to check grove completion when new member joins
CREATE TRIGGER check_grove_completion_trigger
  AFTER INSERT ON public.grove_members
  FOR EACH ROW EXECUTE PROCEDURE check_grove_completion();
