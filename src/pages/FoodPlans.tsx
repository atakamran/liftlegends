
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/Layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Apple, UtensilsCrossed, Lock, Loader2 } from "lucide-react";
import { hasFeatureAccess } from "@/services/subscriptionService";
import { Button } from "@/components/ui/button";

const FoodPlans = () => {
  const navigate = useNavigate();
  const [canAccessFoodPlans, setCanAccessFoodPlans] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const checkAccess = async () => {
      try {
        const hasAccess = await hasFeatureAccess("food_plans");
        setCanAccessFoodPlans(hasAccess);
      } catch (error) {
        console.error("Error checking access: ", error);
        setCanAccessFoodPlans(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAccess();
  }, []);
  
  if (isLoading) {
    return (
      <AppLayout className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="mt-2">در حال بررسی دسترسی...</p>
      </AppLayout>
    );
  }
  
  if (!canAccessFoodPlans) {
    return (
      <AppLayout className="flex flex-col items-center justify-center">
        <div className="text-center max-w-md py-12">
          <Lock className="mx-auto h-12 w-12 mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2">دسترسی محدود شده</h2>
          <p className="text-muted-foreground mb-6">
            برای دسترسی به بخش برنامه‌های غذایی، نیاز به اشتراک Pro یا Ultimate دارید.
          </p>
          <Button onClick={() => navigate("/subscription-plans")}>
            مشاهده پلن‌های اشتراک
          </Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout className="flex flex-col">
      <h1 className="text-3xl font-bold mb-6 text-center">برنامه‌های غذایی</h1>
      
      <div className="grid gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Apple className="h-8 w-8" />
            <CardTitle>برنامه غذایی افزایش حجم</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">برنامه غذایی مناسب برای افزایش وزن و حجم عضلانی</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <UtensilsCrossed className="h-8 w-8" />
            <CardTitle>برنامه غذایی کاهش چربی</CardTitle>
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
