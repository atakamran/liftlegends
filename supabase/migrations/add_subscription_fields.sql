
-- Add subscription fields to user_profiles table
ALTER TABLE public.user_profiles
ADD COLUMN IF NOT EXISTS subscription_plan TEXT DEFAULT 'basic',
ADD COLUMN IF NOT EXISTS subscription_start_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS subscription_end_date TIMESTAMP WITH TIME ZONE;

-- Add index for faster subscription lookups
CREATE INDEX IF NOT EXISTS idx_user_profiles_subscription_plan
ON public.user_profiles(subscription_plan);
