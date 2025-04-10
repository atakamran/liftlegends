
import React from "react";
import { Link } from "react-router-dom";
import { Dumbbell, ClipboardList, Library, BarChart, Brain, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AppLayout from "@/components/Layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const todayWorkout = {
    name: "تمرین سینه و سه سر",
    exercises: [
      { name: "پرس سینه", sets: 4, reps: 12 },
      { name: "شنا با دمبل", sets: 3, reps: 10 }
    ]
  };

  const userStats = {
    currentWeight: 85, // kg
    goalWeight: 88, // kg
  };

  return (
    <AppLayout className="flex flex-col items-center">
      {/* Today's Workout Section */}
      <section className="w-full py-4">
        <Card className="bg-slate-900 text-white border-slate-800">
          <CardHeader>
            <CardTitle className="text-2xl">تمرین امروز</CardTitle>
            <CardDescription className="text-slate-400">{todayWorkout.name}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {todayWorkout.exercises.map((exercise, index) => (
              <div key={index} className="flex items-center justify-between border-b border-slate-800 pb-4 last:border-0 last:pb-0">
                <div>
                  <h3 className="font-semibold">{exercise.name}</h3>
                  <p className="text-sm text-slate-400">{exercise.sets} ست × {exercise.reps} تکرار</p>
                </div>
                <ChevronRight className="h-5 w-5 text-slate-400" />
              </div>
            ))}
            <Button className="w-full mt-4">شروع تمرین</Button>
          </CardContent>
        </Card>
      </section>

      {/* Progress Tracking */}
      <section className="w-full py-4">
        <h2 className="text-2xl font-bold mb-4">پیشرفت</h2>
        <Card className="bg-slate-900 text-white border-slate-800">
          <CardContent className="p-6">
            <div className="flex justify-between">
              <div>
                <p className="text-slate-400">وزن فعلی</p>
                <p className="text-3xl font-bold">{userStats.currentWeight} کیلوگرم</p>
              </div>
              <div>
                <p className="text-slate-400">وزن هدف</p>
                <p className="text-3xl font-bold">{userStats.goalWeight} کیلوگرم</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Features Section - Simplified */}
      <section className="w-full py-4">
        <h2 className="text-2xl font-bold mb-4">خدمات</h2>
        <div className="grid grid-cols-2 gap-4">
          <Card className="hover:bg-accent/50 transition-colors">
            <CardHeader className="p-4">
              <Brain className="h-6 w-6 mb-1" />
              <CardTitle className="text-base">مشاور هوش مصنوعی</CardTitle>
            </CardHeader>
          </Card>

          <Card className="hover:bg-accent/50 transition-colors">
            <CardHeader className="p-4">
              <Dumbbell className="h-6 w-6 mb-1" />
              <CardTitle className="text-base">برنامه‌های تمرینی</CardTitle>
            </CardHeader>
          </Card>

          <Card className="hover:bg-accent/50 transition-colors">
            <CardHeader className="p-4">
              <ClipboardList className="h-6 w-6 mb-1" />
              <CardTitle className="text-base">ثبت تمرین</CardTitle>
            </CardHeader>
          </Card>

          <Card className="hover:bg-accent/50 transition-colors">
            <CardHeader className="p-4">
              <BarChart className="h-6 w-6 mb-1" />
              <CardTitle className="text-base">آمار پیشرفت</CardTitle>
            </CardHeader>
          </Card>
        </div>
      </section>
    </AppLayout>
  );
};

export default Index;
