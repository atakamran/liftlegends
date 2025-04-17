import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dumbbell, ChevronRight, Sparkles, Lock, Star, Play, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import AppLayout from "@/components/Layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { hasFeatureAccess } from "@/services/subscriptionService";
import { useTheme } from "@/context/ThemeContext";
import { Progress } from "@/components/ui/progress";
import { getTodayExercise, getTodayDay } from "../services/exerciseService"; // Import the functions to fetch today's exercise and day

const Index = () => {
  const [userPlan, setUserPlan] = useState({ plan: 'basic', label: 'پلن رایگان', isActive: true, remainingTime: "" });
  const [canAccessAI, setCanAccessAI] = useState(false);
  const [canAccessFoodPlans, setCanAccessFoodPlans] = useState(false);
  const [userData, setUserData] = useState({ name: "", currentWeight: 0, targetWeight: 0, goal: "", progress: 0 });
  const { theme, getButtonGradient, getAccentColor } = useTheme();
  const navigate = useNavigate();
  
  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      if (!isLoggedIn) {
        navigate("/login");
      }
    };
    
    checkAuth();
  }, [navigate]);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get user data from localStorage
        const currentUser = localStorage.getItem("currentUser");
        if (!currentUser) {
          navigate("/login");
          return;
        }
        
        const user = JSON.parse(currentUser);
        
        // Set user data
        setUserData({
          name: user.name || "کاربر",
          currentWeight: parseFloat(user.currentWeight) || 70,
          targetWeight: parseFloat(user.targetWeight) || 65,
          goal: user.goal || "کاهش وزن",
          progress: 35 // Hardcoded progress for now
        });
        
        // Set subscription info from localStorage
        const subscription_plan = user.subscription_plan || "basic";
        
        if (subscription_plan !== "basic") {
          // This is a premium user
          setUserPlan({ 
            plan: subscription_plan, 
            label: subscription_plan === "pro" ? "Pro" : "Ultimate", 
            isActive: true, 
            remainingTime: "30 روز" // Hardcoded remaining time
          });
        } else {
          setUserPlan({ plan: "basic", label: "پلن رایگان", isActive: true, remainingTime: "" });
        }

        // Feature access based on plan
        setCanAccessAI(subscription_plan === "ultimate");
        setCanAccessFoodPlans(subscription_plan === "pro" || subscription_plan === "ultimate");
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchUserData();
  }, [navigate]);

  // Today's workout data based on current day of the week
  const todayExercise = getTodayExercise(); // Fetch today's exercise based on the day of the week

  // Weekly progress statistics
  const weeklyStats = {
    workouts: 3,
    totalSets: 42,
    totalReps: 560,
    totalTime: 120 // minutes
  };

  return (
    <AppLayout className="flex flex-col items-center pb-16">
      {/* Welcome Section with Motivational Message */}
      <section className="w-full py-6">
        <div className="flex justify-between items-center">
         
          <div>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              userPlan.plan === 'basic' 
                ? 'bg-gray-200 text-gray-800' 
                : userPlan.plan === 'pro' 
                ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black' 
                : 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black'
            }`}>
              {userPlan.label}
              {userPlan.plan !== 'basic' && <Star className="w-3 h-3 ml-1" />}
            </span>
          </div>
        </div>
      </section>

      {/* Today's Workout Section */}
      <section className="w-full py-4">
        <Card 
          className={`rounded-lg border text-card-foreground ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-gray-800 border-gray-700'} overflow-hidden shadow-lg text-white cursor-pointer transition-transform hover:scale-[1.01] hover:shadow-xl ring-4 ring-yellow-500`}
          onClick={() => navigate(`/day-workout/${encodeURIComponent(getTodayDay())}`)}
        >
          <CardHeader className="flex flex-col space-y-1.5 p-6 pb-2">
            <div className="flex justify-between items-center">
              <h3 className="tracking-tight text-xl font-bold flex items-center">
                <Dumbbell className="mr-2 h-5 w-5 text-yellow-400" />
                تمرین امروز
              </h3>
              <span className="text-xs font-medium py-1 px-2 rounded-full bg-yellow-500 text-black">
                {todayExercise.duration} دقیقه، {todayExercise.intensity}
              </span>
            </div>
            <p className="text-sm text-gray-400">{todayExercise.description}</p>
          </CardHeader>
          <CardContent className="p-6 pt-0 space-y-4">
            {todayExercise.exercises.map((exercise, index) => (
              <div
                key={index}
                className={`flex items-center justify-between py-3 border-b last:border-0 ${theme === 'dark' ? 'border-gray-800' : 'border-gray-700'}`}
              >
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-700'}`}>
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-base">{exercise.name}</h3>
                    <p className="text-xs text-gray-400">
                      {exercise.sets} ست × {exercise.reps} تکرار • {exercise.equipment}
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-yellow-500" />
              </div>
            ))}

          </CardContent>
        </Card>
      </section>

      {/* Progress Tracking Section */}
      <section className="w-full py-4">
        <h2 className="text-xl font-bold mb-3 flex items-center">
          <Calendar className={`mr-2 h-5 w-5 ${getAccentColor()}`} />
          پیشرفت هفتگی
        </h2>
        <Card className={`${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} shadow-lg`}>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div className="text-center">
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>وزن فعلی</p>
                <p className="text-2xl font-bold">{userData.currentWeight} <span className="text-sm">کیلوگرم</span></p>
              </div>
              <div className="text-center">
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>وزن هدف</p>
                <p className="text-2xl font-bold">{userData.targetWeight} <span className="text-sm">کیلوگرم</span></p>
              </div>
            </div>
            
            <div className="mb-1 flex justify-between items-center">
              <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>پیشرفت</span>
              <span className={`text-xs font-medium ${getAccentColor()}`}>{userData.progress}%</span>
            </div>
            <Progress
              value={userData.progress}
              className={`h-2 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}
            />
            
            <div className="grid grid-cols-4 gap-2 mt-5">
              <div className="text-center">
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>جلسات</p>
                <p className="text-lg font-bold">{weeklyStats.workouts}</p>
              </div>
              <div className="text-center">
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>ست‌ها</p>
                <p className="text-lg font-bold">{weeklyStats.totalSets}</p>
              </div>
              <div className="text-center">
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>تکرارها</p>
                <p className="text-lg font-bold">{weeklyStats.totalReps}</p>
              </div>
              <div className="text-center">
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>زمان</p>
                <p className="text-lg font-bold">{weeklyStats.totalTime} <span className="text-xs">دقیقه</span></p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Premium Features Section */}
      <section className="w-full py-4">
        <h2 className="text-xl font-bold mb-3 flex items-center">
          <Sparkles className={`mr-2 h-5 w-5 ${getAccentColor()}`} />
          خدمات ویژه
        </h2>
        
        <div className="grid grid-cols-2 gap-4">
          <Link to={canAccessAI ? "/ai-planner" : "/subscription-plans"}>
            <Card className={`${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} h-full relative overflow-hidden ${!canAccessAI ? 'opacity-75' : ''}`}>
              <CardContent className="p-4 h-full flex flex-col">
                <div className="text-center py-4">
                  {!canAccessAI && (
                    <div className="absolute inset-0 backdrop-blur-sm flex items-center justify-center bg-black/40 z-10">
                      <div className="flex flex-col items-center">
                        <Lock className={`h-6 w-6 ${theme === 'dark' ? 'text-yellow-500' : 'text-yellow-500'}`} />
                        <span className="text-xs mt-1 text-white">Ultimate</span>
                      </div>
                    </div>
                  )}
                  <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3 ${theme === 'dark' ? 'bg-yellow-500/10' : 'bg-yellow-500/10'}`}>
                    <Sparkles className={`h-6 w-6 ${getAccentColor()}`} />
                  </div>
                  <h3 className="font-bold">مربی هوش مصنوعی</h3>
                  <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    برنامه تمرینی شخصی سازی شده
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to={canAccessFoodPlans ? "/food-plans" : "/subscription-plans"}>
            <Card className={`${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} h-full relative overflow-hidden ${!canAccessFoodPlans ? 'opacity-75' : ''}`}>
              <CardContent className="p-4 h-full flex flex-col">
                <div className="text-center py-4">
                  {!canAccessFoodPlans && (
                    <div className="absolute inset-0 backdrop-blur-sm flex items-center justify-center bg-black/40 z-10">
                      <div className="flex flex-col items-center">
                        <Lock className={`h-6 w-6 ${theme === 'dark' ? 'text-yellow-500' : 'text-yellow-500'}`} />
                        <span className="text-xs mt-1 text-white">Pro یا Ultimate</span>
                      </div>
                    </div>
                  )}
                  <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3 ${theme === 'dark' ? 'bg-yellow-500/10' : 'bg-yellow-500/10'}`}>
                    <Dumbbell className={`h-6 w-6 ${getAccentColor()}`} />
                  </div>
                  <h3 className="font-bold">برنامه غذایی</h3>
                  <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    رژیم غذایی متناسب با هدف شما
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>
    </AppLayout>
  );
};

export default Index;
