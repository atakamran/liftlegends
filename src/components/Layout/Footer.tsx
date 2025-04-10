
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { User, Dumbbell, Apple, Pill } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { hasFeatureAccess } from "@/services/subscriptionService";

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleNavigation = async (path: string, feature?: 'food_plans' | 'supplements' | 'steroids' | 'ai_assistant') => {
    if (feature) {
      const hasAccess = await hasFeatureAccess(feature);
      if (!hasAccess) {
        toast({
          title: "دسترسی محدود",
          description: "برای استفاده از این بخش نیاز به اشتراک Pro یا Ultimate دارید.",
          variant: "destructive",
        });
        navigate("/subscription-plans");
        return;
      }
    }
    navigate(path);
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-border/50 py-2 z-10">
      <div className="container mx-auto px-2">
        <div className="flex items-center justify-between">
          {/* Profile (now on the left side) */}
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center p-2 text-xs",
                isActive ? "text-primary" : "text-muted-foreground"
              )
            }
          >
            <User className="h-6 w-6 mb-1" />
            <span>پروفایل</span>
          </NavLink>

          {/* Training Programs */}
          <NavLink
            to="/exercises"
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center p-2 text-xs",
                isActive ? "text-primary" : "text-muted-foreground"
              )
            }
          >
            <Dumbbell className="h-6 w-6 mb-1" />
            <span>تمرینات</span>
          </NavLink>

          {/* Home/Dashboard (Middle with Logo) */}
          <NavLink
            to="/home"
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center p-2 text-xs relative -top-4",
                isActive ? "text-primary" : "text-primary"
              )
            }
          >
            <div className="bg-primary text-primary-foreground p-3 rounded-full shadow-lg mb-1 flex items-center justify-center">
              <img 
                src="/lovable-uploads/28fee595-d948-482e-8443-851c3a7b07c3.png"
                alt="Lift Legends"
                className="h-6 w-6"
              />
            </div>
            <span>لیفت لجندز</span>
          </NavLink>

          {/* Food Plans */}
          <div 
            className="flex flex-col items-center p-2 text-xs cursor-pointer text-muted-foreground"
            onClick={() => handleNavigation("/food-plans", "food_plans")}
          >
            <Apple className="h-6 w-6 mb-1" />
            <span>تغذیه</span>
          </div>

          {/* Supplements/Steroids (now on the right side) */}
          <div 
            className="flex flex-col items-center p-2 text-xs cursor-pointer text-muted-foreground"
            onClick={() => handleNavigation("/supplements", "steroids")}
          >
            <Pill className="h-6 w-6 mb-1" />
            <span>مکمل‌ها</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
