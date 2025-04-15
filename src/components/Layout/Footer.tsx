import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { User, Dumbbell, Apple, Pill } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/integrations/firebase/firebaseConfig";
import { useTheme } from "@/context/ThemeContext";

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme } = useTheme(); // Access theme from ThemeContext

  const handleNavigation = async (path: string, feature?: 'food_plans' | 'supplements' | 'steroids' | 'ai_assistant') => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User not logged in");
      }

      const profileRef = doc(db, "user_profiles", user.uid);
      const profileSnap = await getDoc(profileRef);

      if (!profileSnap.exists()) {
        throw new Error("User profile not found");
      }

      const profileData = profileSnap.data();

      if (feature && profileData.subscription_plan !== "ultimate") {
        toast({
          title: "دسترسی محدود",
          description: "برای استفاده از این بخش نیاز به اشتراک Ultimate دارید.",
          variant: "destructive",
        });
        navigate("/subscription-plans");
        return;
      }

      navigate(path);
    } catch (error) {
      console.error("Error navigating: ", error);
      toast({
        title: "خطا",
        description: "مشکلی در دسترسی به اطلاعات پیش آمد.",
        variant: "destructive",
      });
    }
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-black py-3 z-10 rounded-t-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between rtl">
          {/* مکمل‌ها */}
          <NavLink
            to="/supplements"
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center text-xs text-white",
                isActive ? "opacity-100" : "opacity-50"
              )
            }
          >
            <Pill className="h-6 w-6" />
            <span>مکمل‌ها</span>
          </NavLink>

          {/* تغذیه */}
          <NavLink
            to="/food-plans"
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center text-xs text-white",
                isActive ? "opacity-100" : "opacity-50"
              )
            }
          >
            <Apple className="h-6 w-6" />
            <span>تغذیه</span>
          </NavLink>

          {/* لیفت جنرز */}
          <NavLink
            to="/home"
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center text-xs text-white",
                isActive ? "opacity-100" : "opacity-50"
              )
            }
          >
            <div className="flex items-center justify-center">
              <img 
                src='/lovable-uploads/white-logo.png' 
                alt="Lift Legends Logo" 
                className="h-8"
              />
            </div>
            <span>لیفت جنرز</span>
          </NavLink>

          {/* تمرینات */}
          <NavLink
            to="/exercises"
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center text-xs text-white",
                isActive ? "opacity-100" : "opacity-50"
              )
            }
          >
            <Dumbbell className="h-6 w-6" />
            <span>تمرینات</span>
          </NavLink>

          {/* پروفایل */}
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center text-xs text-white",
                isActive ? "opacity-100" : "opacity-50"
              )
            }
          >
            <User className="h-6 w-6" />
            <span>پروفایل</span>
          </NavLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
