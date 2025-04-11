import { auth } from "@/integrations/firebase/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/integrations/firebase/firebaseConfig";

export type SubscriptionPlan = 'basic' | 'pro' | 'ultimate';

export interface UserSubscription {
  plan: SubscriptionPlan;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

// Replace Supabase session retrieval with Firebase Authentication
export async function getSession() {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not logged in");
  }
  return user;
}

// Replace Supabase database operations with Firestore
export async function saveSubscriptionData(userId: string, subscriptionData: any) {
  const subscriptionRef = doc(db, "subscriptions", userId);
  await setDoc(subscriptionRef, subscriptionData, { merge: true });
}

export async function getSubscriptionData(userId: string) {
  const subscriptionRef = doc(db, "subscriptions", userId);
  const subscriptionSnap = await getDoc(subscriptionRef);
  if (!subscriptionSnap.exists()) {
    return null;
  }
  return subscriptionSnap.data();
}

// Function to get the current user's subscription
export async function getUserSubscription(): Promise<UserSubscription | null> {
  try {
    // Get current user
    const user = await getSession();
    
    if (!user) {
      return null;
    }

    // Get user subscription info from Firestore
    const data = await getSubscriptionData(user.uid);

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
