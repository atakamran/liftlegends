
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/Layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pill, Beaker, Lock, Loader2 } from "lucide-react";
import { hasFeatureAccess } from "@/services/subscriptionService";
import { Button } from "@/components/ui/button";

const Supplements = () => {
  const navigate = useNavigate();
  const [canAccessSteroids, setCanAccessSteroids] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const checkAccess = async () => {
      const hasAccess = await hasFeatureAccess("steroids");
      setCanAccessSteroids(hasAccess);
      setIsLoading(false);
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
  
  if (!canAccessSteroids) {
    return (
      <AppLayout className="flex flex-col items-center justify-center">
        <div className="text-center max-w-md py-12">
          <Lock className="mx-auto h-12 w-12 mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2">دسترسی محدود شده</h2>
          <p className="text-muted-foreground mb-6">
            برای دسترسی به بخش مکمل‌ها و استروئیدها، نیاز به اشتراک Ultimate دارید.
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
      <h1 className="text-3xl font-bold mb-6 text-center">مکمل‌ها و استروئیدها</h1>
      
      <div className="grid gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Pill className="h-8 w-8" />
            <CardTitle>مکمل‌های پروتئینی</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">انواع مکمل‌های پروتئینی برای افزایش حجم و ریکاوری</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Beaker className="h-8 w-8" />
            <CardTitle>استروئیدها</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">راهنمای استفاده از استروئیدها و عوارض جانبی آن‌ها</p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Supplements;
