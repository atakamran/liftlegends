
import React from "react";
import AppLayout from "@/components/Layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pill, Beaker } from "lucide-react";

const Supplements = () => {
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
