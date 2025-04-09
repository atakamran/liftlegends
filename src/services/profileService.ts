
import { supabase } from "@/integrations/supabase/client";
import { UserProfile } from "@/types";

export interface ProfileFormData {
  name?: string;
  gender?: string;
  age?: number | string;
  height?: number | string;
  weight?: number | string;
  fitness_level?: string;
  primary_goal?: string;
  training_days_per_week?: string;
  training_place?: string;
  dietary_restrictions?: boolean | string;
  dietary_restrictions_details?: string;
  takes_supplements?: boolean | string;
  steroids_interest?: string;
}

export async function saveProfile(profileData: ProfileFormData) {
  const { data: session } = await supabase.auth.getSession();
  const user_id = session?.session?.user?.id;

  if (!user_id) {
    throw new Error("User not logged in");
  }

  // Convert string values to appropriate types
  const processedData = {
    ...profileData,
    user_id,
    age: profileData.age ? Number(profileData.age) : undefined,
    height: profileData.height ? Number(profileData.height) : undefined,
    weight: profileData.weight ? Number(profileData.weight) : undefined,
    dietary_restrictions: profileData.dietary_restrictions === "yes" || profileData.dietary_restrictions === true,
    takes_supplements: profileData.takes_supplements === "yes" || profileData.takes_supplements === true,
  };

  // Check if profile exists
  const { data: existingProfile } = await supabase
    .from("user_profiles")
    .select()
    .eq("user_id", user_id)
    .maybeSingle();

  if (existingProfile) {
    // Update existing profile
    const { data, error } = await supabase
      .from("user_profiles")
      .update(processedData)
      .eq("user_id", user_id)
      .select();

    if (error) throw error;
    return data;
  } else {
    // Insert new profile
    const { data, error } = await supabase
      .from("user_profiles")
      .insert(processedData)
      .select();

    if (error) throw error;
    return data;
  }
}

export async function getProfile() {
  const { data: session } = await supabase.auth.getSession();
  const user_id = session?.session?.user?.id;

  if (!user_id) {
    throw new Error("User not logged in");
  }

  const { data, error } = await supabase
    .from("user_profiles")
    .select()
    .eq("user_id", user_id)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function deleteProfile() {
  const { data: session } = await supabase.auth.getSession();
  const user_id = session?.session?.user?.id;

  if (!user_id) {
    throw new Error("User not logged in");
  }

  const { error } = await supabase
    .from("user_profiles")
    .delete()
    .eq("user_id", user_id);

  if (error) throw error;
  return true;
}
