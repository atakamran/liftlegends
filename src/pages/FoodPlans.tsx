
import React from "react";
import AppLayout from "@/components/Layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Apple, UtensilsCrossed } from "lucide-react";

const FoodPlans = () => {
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
