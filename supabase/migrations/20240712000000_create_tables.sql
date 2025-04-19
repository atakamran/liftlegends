-- Create user_profiles table
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  age INTEGER,
  gender TEXT,
  height NUMERIC,
  weight NUMERIC,
  target_weight NUMERIC,
  primary_goal TEXT,
  fitness_level TEXT,
  subscription_plan TEXT DEFAULT 'basic',
  subscription_start_date TIMESTAMP WITH TIME ZONE,
  subscription_end_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create completed_exercises table
CREATE TABLE IF NOT EXISTS public.completed_exercises (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  day TEXT NOT NULL,
  exercise_name TEXT NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON public.user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_completed_exercises_user_id ON public.completed_exercises(user_id);
CREATE INDEX IF NOT EXISTS idx_completed_exercises_day ON public.completed_exercises(day);
CREATE INDEX IF NOT EXISTS idx_completed_exercises_user_day ON public.completed_exercises(user_id, day);

-- Set up Row Level Security (RLS)
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.completed_exercises ENABLE ROW LEVEL SECURITY;

-- Create policies for user_profiles
CREATE POLICY "Users can view their own profile" 
  ON public.user_profiles 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
  ON public.user_profiles 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
  ON public.user_profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create policies for completed_exercises
CREATE POLICY "Users can view their own completed exercises" 
  ON public.completed_exercises 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own completed exercises" 
  ON public.completed_exercises 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own completed exercises" 
  ON public.completed_exercises 
  FOR DELETE 
  USING (auth.uid() = user_id);