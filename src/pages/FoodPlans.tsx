import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/Layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Apple, UtensilsCrossed, Lock, Loader2 } from "lucide-react";
import { hasFeatureAccess } from "@/services/subscriptionService";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";
import { useToast } from "@/hooks/use-toast";

const FoodPlans = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme, getButtonGradient, getCardGradient, getTextColor, getThemeGradient } = useTheme();
  const [canAccessFoodPlans, setCanAccessFoodPlans] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const checkAuthAndAccess = async () => {
      try {
        setIsLoading(true);
        const loggedIn = localStorage.getItem("isLoggedIn") === "true";
        setIsLoggedIn(loggedIn);

        if (!loggedIn) {
          setIsLoading(false);
          return;
        }

        const hasAccess = await hasFeatureAccess("food_plans");
        const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
        const subscriptionPlan = currentUser.subscription_plan;

        if (subscriptionPlan === "ultimate") {
          setCanAccessFoodPlans(true);
        } else {
          setCanAccessFoodPlans(hasAccess);
        }
      } catch (error) {
        console.error("Error checking access: ", error);
        setCanAccessFoodPlans(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthAndAccess();
  }, []);
  
  const handleGetSubscription = () => {
    navigate("/subscription-plans");
  };
  
  const handleLogin = () => {
    navigate("/phone-login?redirect=/food-plans");
  };
  
  if (isLoading) {
    return (
      <AppLayout className={`flex flex-col items-center justify-center min-h-screen ${getThemeGradient()}`}>
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className={`mt-2 ${getTextColor()}`}>در حال بررسی دسترسی...</p>
      </AppLayout>
    );
  }
  
  if (!isLoggedIn) {
    return (
      <AppLayout className={`flex flex-col items-center justify-center ${getThemeGradient()}`}>
        <div className="text-center max-w-md py-12">
          <Lock className={`mx-auto h-12 w-12 mb-4 ${getTextColor()}`} />
          <h2 className={`text-2xl font-bold mb-2 ${getTextColor()}`}>نیاز به ورود</h2>
          <p className="text-muted-foreground mb-6">
            برای دسترسی به بخش برنامه‌های غذایی، لطفا ابتدا وارد سیستم شوید.
          </p>
          <Button 
            onClick={handleLogin}
            className={`${getButtonGradient()} text-white shadow-lg`}
          >
            ورود به سیستم
          </Button>
        </div>
      </AppLayout>
    );
  }
  
  if (!canAccessFoodPlans) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    const subscriptionPlan = currentUser.subscription_plan;

    if (subscriptionPlan === "pro" || subscriptionPlan === "ultimate") {
      return (
        <AppLayout className={`flex flex-col ${getThemeGradient()}`}>
          <h1 className={`text-3xl font-bold mb-6 text-center ${getTextColor()}`}>برنامه‌های غذایی</h1>
          
          <div className="grid gap-4">
            <Card className={`${getCardGradient()} shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105`}>
              <CardHeader className="flex flex-row items-center gap-4">
                <Apple className={`h-8 w-8 ${getTextColor()}`} />
                <CardTitle className={getTextColor()}>برنامه غذایی افزایش حجم</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">برنامه غذایی مناسب برای افزایش وزن و حجم عضلانی</p>
              </CardContent>
            </Card>
    
            <Card className={`${getCardGradient()} shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105`}>
              <CardHeader className="flex flex-row items-center gap-4">
                <UtensilsCrossed className={`h-8 w-8 ${getTextColor()}`} />
                <CardTitle className={getTextColor()}>برنامه غذایی کاهش چربی</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">برنامه غذایی مناسب برای کاهش چربی و حفظ توده عضلانی</p>
              </CardContent>
            </Card>
          </div>
        </AppLayout>
      );
    }

    return (
      <AppLayout className={`flex flex-col items-center justify-center ${getThemeGradient()}`}>
        <div className="text-center max-w-md py-12">
          <Lock className="mx-auto h-12 w-12 mb-4 text-muted-foreground" />
          <h2 className={`text-2xl font-bold mb-2 ${getTextColor()}`}>دسترسی محدود شده</h2>
          <p className="text-muted-foreground mb-6">
            برای دسترسی به بخش برنامه‌های غذایی، نیاز به اشتراک Pro یا Ultimate دارید.
          </p>
          {/* <p className={`text-lg font-semibold mb-4 ${getTextColor()}`}>
            پلن فعلی شما: {subscriptionPlan || "ندارید"}
          </p> */}
          <Button 
            onClick={handleGetSubscription}
            className={`${getButtonGradient()} text-white shadow-lg`}
          >
            مشاهده پلن‌های اشتراک
          </Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout className={`flex flex-col ${getThemeGradient()}`}>
      <h1 className={`text-3xl font-bold mb-6 text-center ${getTextColor()}`}>برنامه‌های غذایی</h1>
      
      <div className="grid gap-4">
        <Card className={`${getCardGradient()} shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105`}>
          <CardHeader className="flex flex-row items-center gap-4">
            <Apple className={`h-8 w-8 ${getTextColor()}`} />
            <CardTitle className={getTextColor()}>برنامه غذایی افزایش حجم</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">برنامه غذایی مناسب برای افزایش وزن و حجم عضلانی</p>
          </CardContent>
        </Card>

        <Card className={`${getCardGradient()} shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105`}>
          <CardHeader className="flex flex-row items-center gap-4">
            <UtensilsCrossed className={`h-8 w-8 ${getTextColor()}`} />
            <CardTitle className={getTextColor()}>برنامه غذایی کاهش چربی</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">برنامه غذایی مناسب برای کاهش چربی و حفظ توده عضلانی</p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default FoodPlans;
