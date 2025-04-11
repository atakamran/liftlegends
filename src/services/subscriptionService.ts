
import { supabase } from "@/integrations/supabase/client";

export type SubscriptionPlan = 'basic' | 'pro' | 'ultimate';

export interface UserSubscription {
  plan: SubscriptionPlan;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

// Function to get the current user's subscription
export async function getUserSubscription(): Promise<UserSubscription | null> {
  try {
    // Get current user
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) {
      return null;
    }

    // Get user profile with subscription info
    const { data, error } = await supabase
      .from('user_profiles')
      .select('subscription_plan, subscription_start_date, subscription_end_date')
      .eq('user_id', session.user.id)
      .maybeSingle();

    if (error) {
      console.error("Error fetching subscription:", error);
      return null;
    }

    // If no data or no subscription plan is set, default to basic
    if (!data || !data.subscription_plan) {
      return {
        plan: 'basic',
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year validity for basic plan
        isActive: true
      };
    }

    // Check if subscription is still active
    const now = new Date();
    const endDate = data.subscription_end_date ? new Date(data.subscription_end_date) : null;
    const isActive = endDate ? now < endDate : true;

    return {
      plan: data.subscription_plan as SubscriptionPlan,
      startDate: data.subscription_start_date || new Date().toISOString(),
      endDate: data.subscription_end_date || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      isActive
    };
  } catch (error) {
    console.error("Error in getUserSubscription:", error);
    return null;
  }
}

// Function to check if user has access to a feature based on their plan
export async function hasFeatureAccess(feature: 'ai_assistant' | 'food_plans' | 'supplements' | 'steroids'): Promise<boolean> {
  const subscription = await getUserSubscription();
  
  if (!subscription || !subscription.isActive) {
    return false;
  }

  // Define feature access by plan
  const featureAccess = {
    basic: [],
    pro: ['food_plans', 'supplements'],
    ultimate: ['ai_assistant', 'food_plans', 'supplements', 'steroids']
  };

  return featureAccess[subscription.plan]?.includes(feature) || false;
}

// Function to get user's current plan display information
export async function getUserPlanInfo() {
  const subscription = await getUserSubscription();
  
  if (!subscription) {
    return { 
      plan: 'basic',
      label: 'پلن رایگان',
      endDate: null,
      isActive: true
    };
  }
  
  const planLabels = {
    basic: 'پلن رایگان',
    pro: 'پلن Pro',
    ultimate: 'پلن Ultimate'
  };
  
  return {
    plan: subscription.plan,
    label: planLabels[subscription.plan],
    endDate: subscription.plan === 'basic' ? null : subscription.endDate,
    isActive: subscription.isActive
  };
}
