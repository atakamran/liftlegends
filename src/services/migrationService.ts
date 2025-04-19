
import { supabase } from "@/integrations/supabase/client";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { auth, db } from "@/integrations/firebase/firebaseConfig";
import { toast } from "sonner";

// Data migration utility for moving from Supabase to Firebase
export const exportSupabaseToFirebase = async () => {
  try {
    // Get current user
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      console.error("Session error:", sessionError);
      return {
        success: false,
        message: "Authentication error: " + sessionError.message
      };
    }
    
    if (!session?.user) {
      return {
        success: false,
        message: "User not authenticated in Supabase"
      };
    }

    // Get all user data from Supabase
    const { data: profiles, error: profilesError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', session.user.id);
    
    if (profilesError) {
      console.error("Profile error:", profilesError);
      return {
        success: false,
        message: "Failed to retrieve user profiles: " + profilesError.message
      };
    }

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

    toast.success("Data exported successfully");
    return {
      success: true,
      message: "Export completed. The file has been downloaded to your device."
    };
    
  } catch (error) {
    console.error("Export error:", error);
    toast.error("Failed to export data");
    return {
      success: false,
      message: typeof error === 'object' && error !== null && 'message' in error 
        ? `Failed to export data: ${(error as Error).message}` 
        : "Failed to export data. See console for details."
    };
  }
};

// Import data from JSON to Firebase
export const importToFirebase = async (jsonData: string) => {
  try {
    // Check if user is authenticated in Firebase
    const currentUser = auth.currentUser;
    if (!currentUser) {
      return {
        success: false,
        message: "You must be logged in to Firebase to import data"
      };
    }
    
    const data = JSON.parse(jsonData);
    
    // Import user profile
    if (data.profiles && data.profiles.length > 0) {
      const profile = data.profiles[0];
      await setDoc(doc(db, "user_profiles", currentUser.uid), {
        ...profile,
        user_id: currentUser.uid,
        importedFromSupabase: true,
        importDate: new Date()
      });
    }
    
    toast.success("Data successfully imported to Firebase");
    return {
      success: true,
      message: "Data successfully imported to Firebase"
    };
  } catch (error) {
    console.error("Import error:", error);
    toast.error("Failed to import data to Firebase");
    return {
      success: false,
      message: typeof error === 'object' && error !== null && 'message' in error 
        ? `Failed to import data: ${(error as Error).message}` 
        : "Failed to import data. See console for details."
    };
  }
};

// Helper function to read uploaded JSON file
export const readFileAsJson = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      if (event.target?.result) {
        resolve(event.target.result as string);
      } else {
        reject(new Error("Failed to read file"));
      }
    };
    
    reader.onerror = () => {
      reject(new Error("Error reading file"));
    };
    
    reader.readAsText(file);
  });
};
