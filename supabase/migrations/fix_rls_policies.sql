-- Drop existing insert policy
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.user_profiles;

-- Create a more permissive insert policy
CREATE POLICY "Users can insert their own profile" 
  ON public.user_profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id OR auth.role() = 'authenticated');

-- Add a policy to allow service role to manage all profiles
CREATE POLICY "Service role can manage all profiles" 
  ON public.user_profiles 
  USING (auth.role() = 'service_role');

-- Make sure RLS is enabled
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;