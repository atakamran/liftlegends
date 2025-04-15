import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { User, Dumbbell, Apple, Pill, Brain } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/context/ThemeContext";

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme } = useTheme();

  const handleNavigation = async (path: string, feature?: string) => {
    try {
      // Get current user from localStorage
      const currentUser = localStorage.getItem("currentUser");
      if (!currentUser) {
        navigate("/login");
        return;
      }
      
      const user = JSON.parse(currentUser);
      
      if (feature && feature === "ai_assistant" && user.subscription_plan !== "ultimate") {
        toast({
          title: "دسترسی محدود",
          description: "برای استفاده از این بخش نیاز به اشتراک Ultimate دارید.",
          variant: "destructive",
        });
        navigate("/subscription-plans");
        return;
      }
      
      if (feature && feature === "food_plans" && user.subscription_plan === "basic") {
        toast({
          title: "دسترسی محدود",
          description: "برای استفاده از این بخش نیاز به اشتراک Pro یا Ultimate دارید.",
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
    <footer className="fixed bottom-0 left-0 right-0 bg-black py-3 z-10 rounded-t-lg shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between rtl">
          {/* Profile */}
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center text-xs",
                isActive ? "text-yellow-400" : "text-white"
              )
            }
          >
            <User className="h-6 w-6" />
            <span>پروفایل</span>
          </NavLink>

          {/* AI Coach */}
          <button
            onClick={() => handleNavigation("/ai-planner", "ai_assistant")}
            className="flex flex-col items-center text-xs text-white"
          >
            <Brain className="h-6 w-6" />
            <span>مربی من</span>
          </button>

          {/* Home - Logo in center */}
          <NavLink
            to="/home"
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center text-xs -mt-5",
                isActive ? "text-yellow-400" : "text-white"
              )
            }
          >
            <div className="h-14 w-14 rounded-full bg-yellow-500 flex items-center justify-center shadow-lg border-4 border-black">
              <img 
                src='/lovable-uploads/black-logo.png' 
                alt="Lift Legends Logo" 
                className="h-10 w-10"
              />
            </div>
          </NavLink>

          {/* Programs/Exercises */}
          <NavLink
            to="/exercises"
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center text-xs",
                isActive ? "text-yellow-400" : "text-white"
              )
            }
          >
            <Dumbbell className="h-6 w-6" />
            <span>تمرینات</span>
          </NavLink>

          {/* Food Plans */}
          <button
            onClick={() => handleNavigation("/food-plans", "food_plans")}
            className="flex flex-col items-center text-xs text-white"
          >
            <Apple className="h-6 w-6" />
            <span>تغذیه</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
