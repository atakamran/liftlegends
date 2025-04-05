
import React from "react";
import { Link } from "react-router-dom";
import { Dumbbell, ClipboardList, Library, BarChart, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import AppLayout from "@/components/Layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <AppLayout className="flex flex-col items-center">
      <section className="py-12 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">لیفت لجندز</h1>
        <p className="text-xl mb-8">
          برنامه تمرینی هوشمند برای بدنسازان و ورزشکاران حرفه‌ای
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="gap-2">
            <Link to="/ai-planner">
              <Brain className="h-5 w-5" />
              مشاور هوش مصنوعی
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link to="/exercises">
              <Library className="h-5 w-5" />
              مشاهده تمرین‌ها
            </Link>
          </Button>
        </div>
      </section>

      <section className="w-full py-8">
        <h2 className="text-2xl font-bold mb-6 text-center">ویژگی‌های برنامه</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <Brain className="h-8 w-8 mb-2" />
              <CardTitle>مشاور هوش مصنوعی</CardTitle>
              <CardDescription>
                دریافت برنامه‌های تمرینی و غذایی شخصی با استفاده از هوش مصنوعی
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Dumbbell className="h-8 w-8 mb-2" />
              <CardTitle>برنامه‌های تمرینی شخصی</CardTitle>
              <CardDescription>
                برنامه‌های تمرینی اختصاصی مطابق با اهداف و سطح آمادگی شما
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <ClipboardList className="h-8 w-8 mb-2" />
              <CardTitle>ثبت و پیگیری تمرینات</CardTitle>
              <CardDescription>
                امکان ثبت جزئیات تمرینات و پیگیری پیشرفت
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <BarChart className="h-8 w-8 mb-2" />
              <CardTitle>آمار و تحلیل پیشرفت</CardTitle>
              <CardDescription>
                مشاهده روند پیشرفت و تحلیل عملکرد در طول زمان
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      <section className="w-full py-8 text-center">
        <h2 className="text-2xl font-bold mb-6">شروع کنید</h2>
        <p className="mb-8">
          برای استفاده از تمام امکانات برنامه، همین حالا پروفایل خود را تکمیل کنید
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild>
            <Link to="/profile">تکمیل پروفایل</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/workout-tracker">ثبت تمرین</Link>
          </Button>
        </div>
      </section>
    </AppLayout>
  );
};

export default Index;
