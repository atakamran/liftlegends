import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, SupabaseUserProfile } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: User | null;
  profile: SupabaseUserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (
    phoneNumber: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  signUp: (
    userData: Partial<User>,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  updateProfile: (
    profileData: Partial<User>
  ) => Promise<{ success: boolean; error?: string }>;
  updateSubscription: (
    plan: string,
    durationMonths?: number
  ) => Promise<{ success: boolean; error?: string }>;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<SupabaseUserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);

      try {
        // Check if user is authenticated with Supabase
        const { data: sessionData } = await supabase.auth.getSession();

        if (sessionData.session) {
          // User is authenticated with Supabase
          const { data: userData } = await supabase.auth.getUser();

          if (userData.user) {
            // Get user profile from Supabase
            const { data: profileData, error: profileError } = await supabase
              .from("user_profiles")
              .select("*")
              .eq("user_id", userData.user.id)
              .single();

            if (profileError && profileError.code !== "PGRST116") {
              console.error("Error fetching user profile:", profileError);
            }

            // Convert Supabase user to app User format
            const appUser: User = {
              email: userData.user.email || "",
              name: profileData?.name || "",
              age: profileData?.age?.toString() || "",
              gender: profileData?.gender || "",
              currentWeight: profileData?.weight?.toString() || "",
              height: profileData?.height?.toString() || "",
              targetWeight: profileData?.target_weight?.toString() || "",
              goal: profileData?.primary_goal || "",
              activityLevel: profileData?.fitness_level || "",
              subscription_plan: profileData?.subscription_plan || "basic",
              subscription_start_date:
                profileData?.subscription_start_date || "",
              subscription_end_date: profileData?.subscription_end_date || "",
              createdAt: profileData?.created_at || "",
              updatedAt: profileData?.updated_at || "",
            };

            setUser(appUser);
            setProfile(profileData || null);
            setIsAuthenticated(true);
          }
        } else {
          // No active session
          setUser(null);
          setProfile(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        setUser(null);
        setProfile(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session) {
          await refreshUserData();
        } else if (event === "SIGNED_OUT") {
          setUser(null);
          setProfile(null);
          setIsAuthenticated(false);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const refreshUserData = async () => {
    try {
      const { data: userData } = await supabase.auth.getUser();

      if (userData.user) {
        // Get user profile from Supabase
        const { data: profileData, error: profileError } = await supabase
          .from("user_profiles")
          .select("*")
          .eq("user_id", userData.user.id)
          .single();

        if (profileError && profileError.code !== "PGRST116") {
          console.error("Error fetching user profile:", profileError);
        }

        // Convert Supabase user to app User format
        const appUser: User = {
          email: userData.user.email || "",
          name: profileData?.name || "",
          age: profileData?.age?.toString() || "",
          gender: profileData?.gender || "",
          currentWeight: profileData?.weight?.toString() || "",
          height: profileData?.height?.toString() || "",
          targetWeight: profileData?.target_weight?.toString() || "",
          goal: profileData?.primary_goal || "",
          activityLevel: profileData?.fitness_level || "",
          subscription_plan: profileData?.subscription_plan || "basic",
          subscription_start_date: profileData?.subscription_start_date || "",
          subscription_end_date: profileData?.subscription_end_date || "",
          createdAt: profileData?.created_at || "",
          updatedAt: profileData?.updated_at || "",
        };

        setUser(appUser);
        setProfile(profileData || null);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Error refreshing user data:", error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);

      // Use email for Supabase auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        // Get user profile
        const { data: profileData, error: profileError } = await supabase
          .from("user_profiles")
          .select("*")
          .eq("user_id", data.user.id)
          .single();

        if (profileError && profileError.code !== "PGRST116") {
          console.error("Error fetching user profile:", profileError);
        }

        // Convert Supabase user to app User format
        const appUser: User = {
          email,
          name: profileData?.name || "",
          age: profileData?.age?.toString() || "",
          gender: profileData?.gender || "",
          currentWeight: profileData?.weight?.toString() || "",
          height: profileData?.height?.toString() || "",
          targetWeight: profileData?.target_weight?.toString() || "",
          goal: profileData?.primary_goal || "",
          activityLevel: profileData?.fitness_level || "",
          subscription_plan: profileData?.subscription_plan || "basic",
          subscription_start_date: profileData?.subscription_start_date || "",
          subscription_end_date: profileData?.subscription_end_date || "",
          createdAt: profileData?.created_at || "",
          updatedAt: profileData?.updated_at || "",
        };

        setUser(appUser);
        setProfile(profileData || null);
        setIsAuthenticated(true);

        return { success: true };
      }

      return { success: false, error: "خطا در ورود به سیستم" };
    } catch (error) {
      console.error("Error signing in:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "خطا در ورود به سیستم",
      };
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (userData: Partial<User>, password: string) => {
    try {
      setIsLoading(true);

      const email = userData.email;
      if (!email) {
        return { success: false, error: "ایمیل الزامی است" };
      }

      // Use email for Supabase auth
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            email: email,
          },
        },
      });

      if (authError) throw authError;
      
      if (authData.user) {
        // Create user profile with fields that match the database schema exactly
        const { error: profileError } = await supabase
          .from("user_profiles")
          .insert({
            user_id: authData.user.id,
            name: userData.name,
            age: userData.age ? Number(userData.age) : null,
            gender: userData.gender,
            height: userData.height ? Number(userData.height) : null,
            weight: userData.currentWeight
              ? Number(userData.currentWeight)
              : null,
            target_weight: userData.targetWeight
              ? Number(userData.targetWeight)
              : null,
            primary_goal: userData.goal,
            fitness_level: userData.activityLevel,
            subscription_plan: userData.subscription_plan || "basic",
            subscription_start_date: new Date().toISOString(),
            subscription_end_date: new Date(
              Date.now() + 30 * 24 * 60 * 60 * 1000
            ).toISOString(), // 30 days
            // Set default values for other fields in the schema
            dietary_restrictions: null,
            dietary_restrictions_details: null,
            steroids_interest: null,
            takes_supplements: null,
            training_days_per_week: null,
            training_place: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });

        if (profileError) throw profileError;

        // Refresh user data
        await refreshUserData();

        return { success: true };
      }

      return { success: false, error: "خطا در ثبت نام" };
    } catch (error) {
      console.error("Error signing up:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "خطا در ثبت نام",
      };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);

      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      // Clear local state
      setUser(null);
      setProfile(null);
      setIsAuthenticated(false);

      // Navigate to home
      navigate("/");

      toast({
        title: "خروج موفق",
        description: "شما با موفقیت از حساب کاربری خود خارج شدید.",
      });
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "خطا در خروج",
        description: "مشکلی در خروج از حساب کاربری پیش آمد.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (profileData: Partial<User>) => {
    try {
      setIsLoading(true);

      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        return { success: false, error: "کاربر احراز هویت نشده است" };
      }

      // Convert from app format to database format
      // Include all fields that match the database schema
      const dbProfileData = {
        name: profileData.name,
        age: profileData.age ? Number(profileData.age) : undefined,
        gender: profileData.gender,
        height: profileData.height ? Number(profileData.height) : undefined,
        weight: profileData.currentWeight
          ? Number(profileData.currentWeight)
          : undefined,
        target_weight: profileData.targetWeight
          ? Number(profileData.targetWeight)
          : undefined,
        primary_goal: profileData.goal,
        fitness_level: profileData.activityLevel,
        updated_at: new Date().toISOString(),
        // Don't set these fields to undefined as they might already have values
        // Only include them if they're provided in profileData
        dietary_restrictions: profileData.dietary_restrictions,
        dietary_restrictions_details: profileData.dietary_restrictions_details,
        steroids_interest: profileData.steroids_interest,
        takes_supplements: profileData.takes_supplements,
        training_days_per_week: profileData.training_days_per_week,
        training_place: profileData.training_place
      };

      // Remove undefined values
      Object.keys(dbProfileData).forEach((key) => {
        if (dbProfileData[key] === undefined) {
          delete dbProfileData[key];
        }
      });

      const { data, error } = await supabase
        .from("user_profiles")
        .update(dbProfileData)
        .eq("user_id", userData.user.id)
        .select();

      if (error) throw error;

      // Update local state
      if (data && data.length > 0) {
        setProfile(data[0]);

        // Update user object
        if (user) {
          const updatedUser = {
            ...user,
            ...profileData,
            updatedAt: new Date().toISOString(),
          };
          setUser(updatedUser);

          // For backward compatibility
          localStorage.setItem("currentUser", JSON.stringify(updatedUser));
        }
      }

      return { success: true };
    } catch (error) {
      console.error("Error updating profile:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "خطا در به‌روزرسانی پروفایل",
      };
    } finally {
      setIsLoading(false);
    }
  };

  const updateSubscription = async (
    plan: string,
    durationMonths: number = 1
  ) => {
    try {
      setIsLoading(true);

      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        return { success: false, error: "کاربر احراز هویت نشده است" };
      }

      const durationMilliseconds = durationMonths * 30 * 24 * 60 * 60 * 1000;

      const { data, error } = await supabase
        .from("user_profiles")
        .update({
          subscription_plan: plan,
          subscription_start_date: new Date().toISOString(),
          subscription_end_date: new Date(
            Date.now() + durationMilliseconds
          ).toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", userData.user.id)
        .select();

      if (error) throw error;

      // Update local state
      if (data && data.length > 0) {
        setProfile(data[0]);

        // Update user object
        if (user) {
          const updatedUser = {
            ...user,
            subscription_plan: plan,
            subscription_start_date: new Date().toISOString(),
            subscription_end_date: new Date(
              Date.now() + durationMilliseconds
            ).toISOString(),
            updatedAt: new Date().toISOString(),
          };
          setUser(updatedUser);

          // For backward compatibility
          localStorage.setItem("currentUser", JSON.stringify(updatedUser));
        }
      }

      return { success: true };
    } catch (error) {
      console.error("Error updating subscription:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "خطا در به‌روزرسانی اشتراک",
      };
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    profile,
    isLoading,
    isAuthenticated,
    signIn,
    signUp,
    signOut,
    updateProfile,
    updateSubscription,
    refreshUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
