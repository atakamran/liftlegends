import { auth, db } from "@/integrations/firebase/firebaseConfig";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { userProfilesConverter } from "@/integrations/firebase/types";

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
  const user_id = "currentUserId"; // Replace with actual user ID retrieval logic

  if (!user_id) {
    throw new Error("User not logged in");
  }

  // Validate required fields
  const requiredFields = ["name", "age", "height", "weight", "fitness_level"];
  for (const field of requiredFields) {
    if (!profileData[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
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

  // Ensure numeric fields are valid
  if (isNaN(processedData.age) || isNaN(processedData.height) || isNaN(processedData.weight)) {
    throw new Error("Age, height, and weight must be valid numbers");
  }

  const profileRef = doc(db, "user_profiles", user_id).withConverter(userProfilesConverter);
  await setDoc(profileRef, processedData, { merge: true });
  return processedData;
}

export async function getProfile() {
  const user_id = "currentUserId"; // Replace with actual user ID retrieval logic

  if (!user_id) {
    throw new Error("User not logged in");
  }

  const profileRef = doc(db, "user_profiles", user_id).withConverter(userProfilesConverter);
  const profileSnap = await getDoc(profileRef);

  if (!profileSnap.exists()) {
    return null;
  }

  return profileSnap.data();
}

export async function deleteProfile() {
  const user_id = "currentUserId"; // Replace with actual user ID retrieval logic

  if (!user_id) {
    throw new Error("User not logged in");
  }

  const profileRef = doc(db, "user_profiles", user_id);
  await deleteDoc(profileRef);
  return true;
}

export async function getCurrentUserProfile() {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not logged in");
  }

  const profileRef = doc(db, "user_profiles", user.uid);
  const profileSnap = await getDoc(profileRef);

  if (!profileSnap.exists()) {
    throw new Error("User profile not found");
  }

  return profileSnap.data();
}
