import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dumbbell, ClipboardList, Library, BarChart, Brain, ChevronRight, Sparkles, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import AppLayout from "@/components/Layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserPlanInfo, hasFeatureAccess } from "@/services/subscriptionService";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "@/integrations/firebase/firebaseConfig";

const Index = () => {
  const [userPlan, setUserPlan] = useState({ plan: 'basic', label: 'پلن رایگان', isActive: true, remainingTime: "" });
  const [canAccessAI, setCanAccessAI] = useState(false);
  const [canAccessFoodPlans, setCanAccessFoodPlans] = useState(false);
  
  useEffect(() => {
    const fetchUserPlan = async () => {
      try {
        const profileRef = doc(db, "user_profiles", auth.currentUser?.uid);
        const profileSnap = await getDoc(profileRef);

        if (profileSnap.exists()) {
          const profileData = profileSnap.data();
          const { subscription_plan, subscription_start_date, subscription_end_date } = profileData;

          if (subscription_plan && subscription_plan !== "basic" && subscription_start_date && subscription_end_date) {
            const startDate = new Date(subscription_start_date);
            const endDate = new Date(subscription_end_date);
            const now = new Date();

            if (endDate > now) {
              const timeDiff = endDate.getTime() - now.getTime();
              const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

              let remainingTime = "";
              if (daysRemaining >= 30) {
                const monthsRemaining = Math.floor(daysRemaining / 30);
                remainingTime = `${monthsRemaining} ماه`;
              } else {
                remainingTime = `${daysRemaining} روز`;
              }

              setUserPlan({ plan: subscription_plan, label: subscription_plan === "pro" ? "Pro" : "Ultimate", isActive: true, remainingTime });
            } else {
              setUserPlan({ plan: subscription_plan, label: subscription_plan === "pro" ? "Pro" : "Ultimate", isActive: false, remainingTime: "منقضی شده" });
            }
          } else {
            setUserPlan({ plan: "basic", label: "پلن رایگان", isActive: true, remainingTime: "" });
          }
        } else {
          setUserPlan({ plan: "basic", label: "پلن رایگان", isActive: true, remainingTime: "" });
        }

        const aiAccess = await hasFeatureAccess("ai_assistant");
        const foodAccess = await hasFeatureAccess("food_plans");

        setCanAccessAI(aiAccess);
        setCanAccessFoodPlans(foodAccess);
      } catch (error) {
        console.error("Error fetching user plan: ", error);
      }
    };

    fetchUserPlan();
  }, []);

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

  const planBadgeStyle = `
    inline-block px-3 py-1 rounded-full text-sm font-medium
    ${userPlan.plan === 'basic' ? 'bg-gray-200 text-gray-800' : ''}
    ${userPlan.plan === 'pro' ? 'bg-blue-200 text-blue-800' : ''}
    ${userPlan.plan === 'ultimate' ? 'bg-green-200 text-green-800' : ''}
  `;

  const remainingTimeStyle = `
    text-xs font-medium
    ${userPlan.remainingTime === 'منقضی شده' ? 'text-red-500' : 'text-gray-500'}
  `;

  return (
    <AppLayout className="flex flex-col items-center">
      {/* Subscription Info */}
      <section className="w-full py-4">
        <div className="flex justify-between items-center mb-4">
          <div className="text-right">
            {userPlan.remainingTime && (
              <span className={remainingTimeStyle}>
                {userPlan.remainingTime}
              </span>
            )}
          </div>
          <div className="text-left">
            <span className={planBadgeStyle}>{userPlan.label}</span>
          </div>
        </div>
      </section>

      {/* Today's Workout Section */}
      <section className="w-full py-4">
        <Card className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white border-gray-700 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">تمرین امروز</CardTitle>
            <CardDescription className="text-gray-400">{todayWorkout.name}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {todayWorkout.exercises.map((exercise, index) => (
              <div key={index} className="flex items-center justify-between border-b border-gray-700 pb-4 last:border-0 last:pb-0">
                <div>
                  <h3 className="font-semibold text-lg">{exercise.name}</h3>
                  <p className="text-sm text-gray-400">{exercise.sets} ست × {exercise.reps} تکرار</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            ))}
            <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white">شروع تمرین</Button>
          </CardContent>
        </Card>
      </section>

      {/* Progress Tracking */}
      <section className="w-full py-4">
        <h2 className="text-2xl font-bold mb-4">پیشرفت</h2>
        <Card className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white border-gray-700 shadow-lg">
          <CardContent className="p-6">
            <div className="flex justify-between">
              <div>
                <p className="text-gray-400">وزن فعلی</p>
                <p className="text-3xl font-bold">{userStats.currentWeight} کیلوگرم</p>
              </div>
              <div>
                <p className="text-gray-400">وزن هدف</p>
                <p className="text-3xl font-bold">{userStats.goalWeight} کیلوگرم</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Features Section */}
      <section className="w-full py-4">
        <h2 className="text-2xl font-bold mb-4">خدمات</h2>
        <div className="grid grid-cols-2 gap-4">
          <Link to={canAccessAI ? "/ai-planner" : "/subscription-plans"}>
            <Card className={`hover:bg-accent/50 transition-colors ${!canAccessAI ? 'relative opacity-80' : ''}`}>
              <CardHeader className="p-4">
                <Brain className="h-6 w-6 mb-1" />
                <CardTitle className="text-base">مشاور هوش مصنوعی</CardTitle>
                {!canAccessAI && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg">
                    <div className="flex flex-col items-center">
                      <Lock className="h-6 w-6 text-white" />
                      <span className="text-xs mt-1 text-white">Ultimate</span>
                    </div>
                  </div>
                )}
              </CardHeader>
            </Card>
          </Link>

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

          <Link to={canAccessFoodPlans ? "/food-plans" : "/subscription-plans"}>
            <Card className={`hover:bg-accent/50 transition-colors ${!canAccessFoodPlans ? 'relative opacity-80' : ''}`}>
              <CardHeader className="p-4">
                <BarChart className="h-6 w-6 mb-1" />
                <CardTitle className="text-base">برنامه غذایی</CardTitle>
                {!canAccessFoodPlans && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg">
                    <div className="flex flex-col items-center">
                      <Lock className="h-6 w-6 text-white" />
                      <span className="text-xs mt-1 text-white">Pro یا Ultimate</span>
                    </div>
                  </div>
                )}
              </CardHeader>
            </Card>
          </Link>
        </div>
      </section>
    </AppLayout>
  );
};

export default Index;
