import { supabase } from "@/integrations/supabase/client";
import { User, CompletedExercise } from "@/types";

// Constants for localStorage keys (for migration purposes)
const USERS_KEY = "users";
const CURRENT_USER_KEY = "currentUser";
const USER_PHONE_NUMBER_KEY = "userPhoneNumber";
const IS_LOGGED_IN_KEY = "isLoggedIn";
const COMPLETED_EXERCISES_KEY = "completedExercises";
const WORKOUT_COUNT_KEY = "workoutCount";
const STREAK_KEY = "streak";

// Authentication functions
export async function signUp(email: string, password: string, userData: Partial<User>) {
  try {
    // Create the auth user with email
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: email,
      password,
      options: {
        data: {
          email: email,
        }
      }
    });

    if (authError) throw authError;

    if (authData.user) {
      // Then create the user profile
      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert({
          user_id: authData.user.id,
          name: userData.name,
          age: userData.age ? Number(userData.age) : null,
          gender: userData.gender,
          height: userData.height ? Number(userData.height) : null,
          weight: userData.currentWeight ? Number(userData.currentWeight) : null,
          target_weight: userData.targetWeight ? Number(userData.targetWeight) : null,
          primary_goal: userData.goal,
          fitness_level: userData.activityLevel,
          subscription_plan: userData.subscription_plan || "basic",
          subscription_start_date: new Date().toISOString(),
          subscription_end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
        });

      if (profileError) throw profileError;

      return { success: true, user: authData.user };
    }
    
    return { success: false, error: "No user returned from signup" };
  } catch (error) {
    console.error("Error signing up:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error during signup" 
    };
  }
}

export async function signIn(email: string, password: string) {
  try {
    // Use email for authentication
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password,
    });

    if (error) throw error;

    if (data.user) {
      // Get user profile data
      const { data: profileData, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', data.user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        // PGRST116 is "no rows returned" which is fine for new users
        throw profileError;
      }

      return { 
        success: true, 
        user: data.user,
        profile: profileData || null
      };
    }
    
    return { success: false, error: "No user returned from login" };
  } catch (error) {
    console.error("Error signing in:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error during login" 
    };
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error("Error signing out:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error during logout" 
    };
  }
}

export async function getCurrentUser() {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    
    if (data.user) {
      // Get user profile data
      const { data: profileData, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', data.user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        throw profileError;
      }

      return { 
        success: true, 
        user: data.user,
        profile: profileData || null
      };
    }
    
    return { success: false, user: null };
  } catch (error) {
    console.error("Error getting current user:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error getting user" 
    };
  }
}

// User profile functions
export async function updateUserProfile(userId: string, profileData: Partial<User>) {
  try {
    // Convert from app format to database format
    const dbProfileData = {
      name: profileData.name,
      age: profileData.age ? Number(profileData.age) : undefined,
      gender: profileData.gender,
      height: profileData.height ? Number(profileData.height) : undefined,
      weight: profileData.currentWeight ? Number(profileData.currentWeight) : undefined,
      target_weight: profileData.targetWeight ? Number(profileData.targetWeight) : undefined,
      primary_goal: profileData.goal,
      fitness_level: profileData.activityLevel,
      updated_at: new Date().toISOString(),
    };

    // Remove undefined values
    Object.keys(dbProfileData).forEach(key => {
      if (dbProfileData[key] === undefined) {
        delete dbProfileData[key];
      }
    });

    const { data, error } = await supabase
      .from('user_profiles')
      .update(dbProfileData)
      .eq('user_id', userId)
      .select();

    if (error) throw error;

    return { success: true, profile: data?.[0] || null };
  } catch (error) {
    console.error("Error updating user profile:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error updating profile" 
    };
  }
}

export async function updateSubscription(userId: string, plan: string, durationMonths: number = 1) {
  try {
    const durationMilliseconds = durationMonths * 30 * 24 * 60 * 60 * 1000;
    
    const { data, error } = await supabase
      .from('user_profiles')
      .update({
        subscription_plan: plan,
        subscription_start_date: new Date().toISOString(),
        subscription_end_date: new Date(Date.now() + durationMilliseconds).toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId)
      .select();

    if (error) throw error;

    return { success: true, profile: data?.[0] || null };
  } catch (error) {
    console.error("Error updating subscription:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error updating subscription" 
    };
  }
}

// Workout progress functions
export async function getCompletedExercises(userId: string): Promise<CompletedExercise[]> {
  try {
    const { data, error } = await supabase
      .from('completed_exercises')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;

    return data.map(item => ({
      day: item.day,
      exerciseName: item.exercise_name,
      completedAt: item.completed_at
    })) || [];
  } catch (error) {
    console.error("Error getting completed exercises:", error);
    return [];
  }
}

export async function saveCompletedExercise(userId: string, day: string, exerciseName: string): Promise<boolean> {
  try {
    // First check if this exercise is already completed
    const { data: existingData, error: checkError } = await supabase
      .from('completed_exercises')
      .select('id')
      .eq('user_id', userId)
      .eq('day', day)
      .eq('exercise_name', exerciseName);

    if (checkError) throw checkError;

    // If already exists, delete it (toggle functionality)
    if (existingData && existingData.length > 0) {
      const { error: deleteError } = await supabase
        .from('completed_exercises')
        .delete()
        .eq('id', existingData[0].id);

      if (deleteError) throw deleteError;
    } else {
      // Otherwise, add it
      const { error: insertError } = await supabase
        .from('completed_exercises')
        .insert({
          user_id: userId,
          day,
          exercise_name: exerciseName,
          completed_at: new Date().toISOString()
        });

      if (insertError) throw insertError;
    }

    return true;
  } catch (error) {
    console.error("Error saving completed exercise:", error);
    return false;
  }
}

export async function clearAllCompletedExercises(userId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('completed_exercises')
      .delete()
      .eq('user_id', userId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error clearing completed exercises:", error);
    return false;
  }
}

export async function getWorkoutStats(userId: string) {
  try {
    // Get workout count
    const { data: exercisesData, error: exercisesError } = await supabase
      .from('completed_exercises')
      .select('day')
      .eq('user_id', userId);

    if (exercisesError) throw exercisesError;

    // Count unique workout days
    const uniqueDays = new Set();
    exercisesData.forEach(item => uniqueDays.add(item.day));
    const workoutCount = uniqueDays.size;

    // Calculate streak (simplified version)
    // In a real app, you'd need more sophisticated logic
    const streak = 3; // Placeholder

    return { workoutCount, streak };
  } catch (error) {
    console.error("Error getting workout stats:", error);
    return { workoutCount: 0, streak: 0 };
  }
}

// Migration functions
export async function migrateLocalStorageToSupabase() {
  try {
    // Check if user is logged in
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) {
      // Try to get current user from localStorage
      const currentUserData = localStorage.getItem(CURRENT_USER_KEY);
      if (!currentUserData) {
        return { success: false, error: "No user logged in" };
      }

      const currentUser = JSON.parse(currentUserData);
      
      // Sign up the user in Supabase
      const signUpResult = await signUp(
        currentUser.email,
        currentUser.password || "defaultpassword", // Fallback password
        currentUser
      );

      if (!signUpResult.success) {
        return { success: false, error: signUpResult.error };
      }
    }

    // At this point we should have a logged in user
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      return { success: false, error: "Failed to authenticate user" };
    }

    const userId = userData.user.id;

    // Migrate completed exercises
    const completedExercisesData = localStorage.getItem(COMPLETED_EXERCISES_KEY);
    if (completedExercisesData) {
      const completedExercises = JSON.parse(completedExercisesData);
      
      // Insert all completed exercises
      for (const exercise of completedExercises) {
        await supabase
          .from('completed_exercises')
          .insert({
            user_id: userId,
            day: exercise.day,
            exercise_name: exercise.exerciseName,
            completed_at: exercise.completedAt
          });
      }
    }

    return { success: true };
  } catch (error) {
    console.error("Error migrating data:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error during migration" 
    };
  }
}