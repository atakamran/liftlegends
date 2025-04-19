import { supabase } from "@/integrations/supabase/client";

export type SubscriptionPlan = 'basic' | 'pro' | 'ultimate';

export interface UserSubscription {
  plan: SubscriptionPlan;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

// Get current user session from Supabase
export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session || !session.user) {
    throw new Error("User not logged in");
  }
  return session.user;
}

// Supabase database operations for subscriptions
export async function saveSubscriptionData(userId: string, subscriptionData: any) {
  const { error } = await supabase
    .from('subscriptions')
    .upsert({ 
      user_id: userId,
      ...subscriptionData 
    });
  
  if (error) {
    console.error("Error saving subscription data:", error);
    throw error;
  }
}

export async function getSubscriptionData(userId: string) {
  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .single();
  
  if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned" which is fine
    console.error("Error getting subscription data:", error);
    throw error;
  }
  
  return data;
}

// Function to get the current user's subscription
export async function getUserSubscription(): Promise<UserSubscription | null> {
  try {
    // Get current user
    const user = await getSession();
    
    if (!user) {
      return null;
    }

    // Get user subscription info from Supabase
    const data = await getSubscriptionData(user.id);

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
