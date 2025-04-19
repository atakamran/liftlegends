import { supabase } from "@/integrations/supabase/client";

/**
 * Ensures the user is authenticated before making a request
 * @returns The current user ID if authenticated, null otherwise
 */
export async function ensureAuthenticated(): Promise<string | null> {
  try {
    // Check if we have a session
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      console.error("Session error:", sessionError);
      return null;
    }
    
    if (!sessionData.session) {
      console.log("No active session");
      return null;
    }
    
    // Get the user
    const { data: userData, error: userError } = await supabase.auth.getUser();
    
    if (userError) {
      console.error("User error:", userError);
      return null;
    }
    
    if (!userData.user) {
      console.log("No user found");
      return null;
    }
    
    return userData.user.id;
  } catch (error) {
    console.error("Error ensuring authentication:", error);
    return null;
  }
}

/**
 * Refreshes the session token if needed
 * @returns True if successful, false otherwise
 */
export async function refreshSession(): Promise<boolean> {
  try {
    const { data, error } = await supabase.auth.refreshSession();
    
    if (error) {
      console.error("Error refreshing session:", error);
      return false;
    }
    
    return !!data.session;
  } catch (error) {
    console.error("Error in refreshSession:", error);
    return false;
  }
}