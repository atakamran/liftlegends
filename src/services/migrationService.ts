
import { supabase } from "@/integrations/supabase/client";

// Data migration utility for moving from Supabase to Firebase
export const exportSupabaseToFirebase = async () => {
  try {
    // Get current user
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) {
      throw new Error("User not authenticated");
    }

    // Get all user data from Supabase
    const { data: profiles, error: profilesError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', session.user.id);
    
    if (profilesError) throw profilesError;

    // Export data in JSON format
    const exportData = {
      user: {
        id: session.user.id,
        email: session.user.email,
        createdAt: session.user.created_at
      },
      profiles: profiles || []
    };

    // Create a blob and download link
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    // Create download link
    const a = document.createElement('a');
    a.href = url;
    a.download = `supabase_export_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 0);

    return {
      success: true,
      message: "Export completed. The file has been downloaded to your device."
    };
    
  } catch (error) {
    console.error("Export error:", error);
    return {
      success: false,
      message: "Failed to export data. See console for details."
    };
  }
};

// Example code for Firebase import (to be used in a Firebase environment)
/*
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

export const importToFirebase = async (jsonData) => {
  const firebaseConfig = {
    // Your Firebase config here
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  
  try {
    const data = JSON.parse(jsonData);
    
    // Import user profile
    if (data.profiles && data.profiles.length > 0) {
      const profile = data.profiles[0];
      await setDoc(doc(db, "userProfiles", data.user.id), {
        ...profile,
        importedFromSupabase: true,
        importDate: new Date()
      });
    }
    
    return {
      success: true,
      message: "Data successfully imported to Firebase"
    };
  } catch (error) {
    console.error("Import error:", error);
    return {
      success: false,
      message: "Failed to import data to Firebase"
    };
  }
};
*/
