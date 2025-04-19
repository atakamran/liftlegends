import { supabase } from "@/integrations/supabase/client";

/**
 * Retrieves the access token from various sources
 * @returns The access token if found, null otherwise
 */
export async function retrieveAccessToken(): Promise<string | null> {
  try {
    // First check if we have a session in Supabase
    const { data: sessionData } = await supabase.auth.getSession();
    if (sessionData.session?.access_token) {
      console.log("Retrieved access token from active session");
      return sessionData.session.access_token;
    }

    // Check URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('access_token');
    if (accessToken) {
      console.log("Retrieved access token from URL parameters");
      return accessToken;
    }

    // Check localStorage
    const storedToken = localStorage.getItem('supabase.auth.token');
    if (storedToken) {
      try {
        const tokenData = JSON.parse(storedToken);
        if (tokenData.access_token) {
          console.log("Retrieved access token from localStorage");
          return tokenData.access_token;
        }
      } catch (e) {
        console.error("Error parsing stored token:", e);
      }
    }

    console.log("No access token found");
    return null;
  } catch (error) {
    console.error("Error retrieving access token:", error);
    return null;
  }
}

/**
 * Retrieves the refresh token from various sources
 * @returns The refresh token if found, null otherwise
 */
export async function retrieveRefreshToken(): Promise<string | null> {
  try {
    // First check if we have a session in Supabase
    const { data: sessionData } = await supabase.auth.getSession();
    if (sessionData.session?.refresh_token) {
      console.log("Retrieved refresh token from active session");
      return sessionData.session.refresh_token;
    }

    // Check URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const refreshToken = urlParams.get('refresh_token');
    if (refreshToken) {
      console.log("Retrieved refresh token from URL parameters");
      return refreshToken;
    }

    // Check localStorage
    const storedToken = localStorage.getItem('supabase.auth.token');
    if (storedToken) {
      try {
        const tokenData = JSON.parse(storedToken);
        if (tokenData.refresh_token) {
          console.log("Retrieved refresh token from localStorage");
          return tokenData.refresh_token;
        }
      } catch (e) {
        console.error("Error parsing stored token:", e);
      }
    }

    console.log("No refresh token found");
    return null;
  } catch (error) {
    console.error("Error retrieving refresh token:", error);
    return null;
  }
}

/**
 * Attempts to authenticate using available tokens
 * @returns True if authentication was successful, false otherwise
 */
export async function attemptTokenAuthentication(): Promise<boolean> {
  try {
    const accessToken = await retrieveAccessToken();
    const refreshToken = await retrieveRefreshToken();

    if (!accessToken || !refreshToken) {
      console.log("Missing tokens for authentication");
      return false;
    }

    // Set the session with the retrieved tokens
    const { data, error } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken
    });

    if (error) {
      console.error("Error setting session with tokens:", error);
      return false;
    }

    if (data.user) {
      console.log("Successfully authenticated with tokens");
      return true;
    }

    return false;
  } catch (error) {
    console.error("Error during token authentication:", error);
    return false;
  }
}