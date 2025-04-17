import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { User, Dumbbell, Apple, Brain } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/context/ThemeContext";

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { theme } = useTheme();
  const [activeItem, setActiveItem] = useState<string>("");

  // Update active item based on current path
  useEffect(() => {
    const path = location.pathname;
    if (path.includes("profile")) {
      setActiveItem("profile");
    } else if (path.includes("ai-planner")) {
      setActiveItem("ai-planner");
    } else if (path.includes("home")) {
      setActiveItem("home");
    } else if (path.includes("exercises")) {
      setActiveItem("exercises");
    } else if (path.includes("food-plans")) {
      setActiveItem("food-plans");
    }
  }, [location]);

  const checkAccess = async (path: string, feature?: string) => {
    try {
      // Get current user from localStorage
      const currentUser = localStorage.getItem("currentUser");
      if (!currentUser) {
        navigate("/login");
        return false;
      }
      
      const user = JSON.parse(currentUser);
      
      if (feature && feature === "ai_assistant" && user.subscription_plan !== "ultimate") {
        toast({
          title: "دسترسی محدود",
          description: "برای استفاده از این بخش نیاز به اشتراک Ultimate دارید.",
          variant: "destructive",
        });
        navigate("/subscription-plans");
        return false;
      }
      
      if (feature && feature === "food_plans" && user.subscription_plan === "basic") {
        toast({
          title: "دسترسی محدود",
          description: "برای استفاده از این بخش نیاز به اشتراک Pro یا Ultimate دارید.",
          variant: "destructive",
        });
        navigate("/subscription-plans");
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error checking access: ", error);
      toast({
        title: "خطا",
        description: "مشکلی در دسترسی به اطلاعات پیش آمد.",
        variant: "destructive",
      });
      return false;
    }
  };

  const handleNavigation = async (path: string, feature?: string) => {
    const hasAccess = await checkAccess(path, feature);
    if (hasAccess) {
      navigate(path);
    }
  };

  const navItemClass = (isActive: boolean) => 
    cn(
      "flex flex-col items-center text-xs transition-all duration-300 ease-in-out transform hover:scale-110",
      isActive ? "text-yellow-400 font-bold" : "text-white hover:text-yellow-200"
    );

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/95 to-black/80 py-3 z-10 rounded-t-3xl shadow-2xl transition-all duration-300 ease-in-out border-t border-yellow-500/20 backdrop-blur-sm">
      <div className="container mx-auto px-4 max-w-md">
        <div className="flex items-center justify-between rtl">
          {/* Profile */}
          <NavLink
            to="/profile"
            className={({ isActive }) => navItemClass(isActive)}
          >
            <div className={`relative p-1 ${activeItem === "profile" ? "after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-yellow-400 after:rounded-full after:animate-pulse after:shadow-md after:shadow-yellow-400/50" : ""}`}>
              <User className={`h-6 w-6 ${activeItem === "profile" ? "text-yellow-400 drop-shadow-md" : ""}`} />
            </div>
            <span className="mt-0.5 text-[0.65rem] font-medium">پروفایل</span>
          </NavLink>

          {/* AI Coach */}
          <NavLink
            to="/ai-planner"
            className={({ isActive }) => navItemClass(isActive)}
            onClick={(e) => {
              e.preventDefault();
              handleNavigation("/ai-planner", "ai_assistant");
            }}
          >
            <div className={`relative p-1 ${activeItem === "ai-planner" ? "after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-yellow-400 after:rounded-full after:animate-pulse after:shadow-md after:shadow-yellow-400/50" : ""}`}>
              <Brain className={`h-6 w-6 ${activeItem === "ai-planner" ? "text-yellow-400 drop-shadow-md" : ""}`} />
            </div>
            <span className="mt-0.5 text-[0.65rem] font-medium">مربی من</span>
          </NavLink>

          {/* Home - Logo in center */}
          <NavLink
            to="/home"
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center text-xs -mt-8 transition-all duration-300 ease-in-out transform hover:scale-110",
                isActive ? "text-yellow-400" : "text-white"
              )
            }
          >
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-xl border-4 border-black transition-transform duration-300 hover:rotate-12 hover:shadow-yellow-500/50 relative">
              <div className="absolute inset-0 rounded-full bg-yellow-500 blur-sm opacity-50"></div>
              <img 
                src='/lovable-uploads/black-logo.png' 
                alt="Lift Legends Logo" 
                className="h-10 w-10 relative z-10"
              />
              {activeItem === "home" && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-black rounded-full animate-pulse"></div>
              )}
            </div>
          </NavLink>

          {/* Programs/Exercises */}
          <NavLink
            to="/exercises"
            className={({ isActive }) => navItemClass(isActive)}
          >
            <div className={`relative p-1 ${activeItem === "exercises" ? "after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-yellow-400 after:rounded-full after:animate-pulse after:shadow-md after:shadow-yellow-400/50" : ""}`}>
              <Dumbbell className={`h-6 w-6 ${activeItem === "exercises" ? "text-yellow-400 drop-shadow-md" : ""}`} />
            </div>
            <span className="mt-0.5 text-[0.65rem] font-medium">تمرینات</span>
          </NavLink>

          {/* Food Plans */}
          <NavLink
            to="/food-plans"
            className={({ isActive }) => navItemClass(isActive)}
            onClick={(e) => {
              e.preventDefault();
              handleNavigation("/food-plans", "food_plans");
            }}
          >
            <div className={`relative p-1 ${activeItem === "food-plans" ? "after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-yellow-400 after:rounded-full after:animate-pulse after:shadow-md after:shadow-yellow-400/50" : ""}`}>
              <Apple className={`h-6 w-6 ${activeItem === "food-plans" ? "text-yellow-400 drop-shadow-md" : ""}`} />
            </div>
            <span className="mt-0.5 text-[0.65rem] font-medium">تغذیه</span>
          </NavLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
