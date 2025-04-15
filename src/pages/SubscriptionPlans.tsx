
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Check, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import AppLayout from "@/components/Layout/AppLayout";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db, auth } from "@/integrations/firebase/firebaseConfig";
import { getCurrentUserProfile } from "@/services/profileService";
import { useToast } from "@/hooks/use-toast";

const SubscriptionPlans = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme, getButtonGradient, getCardGradient, getTextColor, getThemeGradient } = useTheme();
  const [subscriptionInfo, setSubscriptionInfo] = useState<{ plan: string; remainingTime: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      setIsLoading(true);
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(isLoggedIn);
      
      if (!isLoggedIn) {
        setIsLoading(false);
        return;
      }

      try {
        const phoneNumber = localStorage.getItem("userPhoneNumber");
        if (!phoneNumber) {
          throw new Error("Phone number not found");
        }
        
        const profileRef = doc(db, "user_profiles", phoneNumber);
        const profileSnap = await getDoc(profileRef);
        
        if (!profileSnap.exists()) {
          throw new Error("Profile not found");
        }
        
        const profileData = profileSnap.data();
        if (profileData.subscription_plan && profileData.subscription_start_date && profileData.subscription_end_date) {
          const startDate = new Date(profileData.subscription_start_date);
          const endDate = new Date(profileData.subscription_end_date);
          const now = new Date();

          const timeDiff = endDate.getTime() - now.getTime();
          const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

          let remainingTime = "";
          if (daysRemaining >= 30) {
            const monthsRemaining = Math.floor(daysRemaining / 30);
            remainingTime = `${monthsRemaining} ماه`;
          } else {
            remainingTime = `${daysRemaining} روز`;
          }

          setSubscriptionInfo({
            plan: profileData.subscription_plan,
            remainingTime,
          });
        }
      } catch (error) {
        console.error("Error fetching subscription info: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuthStatus();
  }, []);

  const handleSelectPlan = async (planId: string, duration: string) => {
    if (!isLoggedIn) {
      // Store the chosen plan in localStorage for after login
      localStorage.setItem("pendingSubscription", JSON.stringify({ plan: planId, duration }));
      toast({
        title: "لطفاً وارد شوید",
        description: "برای خرید اشتراک نیاز است ابتدا وارد سیستم شوید.",
      });
      navigate("/phone-login?redirect=/subscription-plans");
      return;
    }

    try {
      const phoneNumber = localStorage.getItem("userPhoneNumber");
      if (!phoneNumber) {
        throw new Error("Phone number not found");
      }

      const profileRef = doc(db, "user_profiles", phoneNumber);
      const profileSnap = await getDoc(profileRef);

      if (!profileSnap.exists()) {
        throw new Error("User profile not found");
      }

      if (planId === "basic") {
        await setDoc(profileRef, {
          subscription_plan: planId,
          subscription_duration: "free",
          subscription_start_date: new Date().toISOString(),
          subscription_end_date: null, // No end date for free plan
        }, { merge: true });
        
        toast({
          title: "اشتراک رایگان",
          description: "اشتراک رایگان با موفقیت فعال شد.",
        });
        
        navigate(`/home`);
        return;
      }

      await setDoc(profileRef, {
        subscription_plan: planId,
        subscription_duration: duration,
        subscription_start_date: new Date().toISOString(),
        subscription_end_date: new Date(
          Date.now() +
            (duration === "1_month"
              ? 30 * 24 * 60 * 60 * 1000
              : duration === "3_months"
              ? 90 * 24 * 60 * 60 * 1000
              : 365 * 24 * 60 * 60 * 1000)
        ).toISOString(),
      }, { merge: true });

      navigate(`/payment?plan=${planId}&duration=${duration}`);
    } catch (error) {
      console.error("Error selecting plan: ", error);
      toast({
        title: "خطا",
        description: "مشکلی در انتخاب پلن رخ داد. لطفاً دوباره تلاش کنید.",
        variant: "destructive",
      });
    }
  };

  const plans = [
    {
      id: "basic",
      title: "پلن رایگان",
      description: "برای شروع کافیه",
      price: "۰",
      interval: "رایگان",
      features: [
        { text: "برنامه تمرینی پایه", included: true },
        { text: "محدودیت در تعداد تمرین", included: true },
        { text: "برنامه غذایی", included: false },
        { text: "مشاور هوش مصنوعی", included: false },
        { text: "برنامه مکمل‌ها", included: false },
      ],
      popular: false
    },
    {
      id: "pro",
      title: "پلن Pro",
      description: "مناسب برای علاقه‌مندان حرفه‌ای",
      price: "۹۹,۰۰۰",
      interval: "ماهانه",
      features: [
        { text: "برنامه تمرینی پیشرفته", included: true },
        { text: "برنامه غذایی شخصی‌سازی شده", included: true },
        { text: "برنامه مکمل‌های استاندارد", included: true },
        { text: "آپدیت هفتگی برنامه‌ها", included: true },
        { text: "مشاور هوش مصنوعی", included: false },
      ],
      popular: true
    },
    {
      id: "ultimate",
      title: "پلن Ultimate",
      description: "مناسب برای ورزشکاران حرفه‌ای",
      price: "۱۹۹,۰۰۰",
      interval: "ماهانه",
      features: [
        { text: "همه امکانات پلن Pro", included: true },
        { text: "مشاور هوش مصنوعی اختصاصی", included: true },
        { text: "برنامه استروئیدی / حرفه‌ای", included: true },
        { text: "برنامه تمرینی رقابتی", included: true },
        { text: "مشاوره اختصاصی", included: true },
      ],
      popular: false
    },
  ];
  
  if (isLoading) {
    return (
      <AppLayout className="py-8">
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
          <p className="ml-2 text-lg">در حال بارگذاری...</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout className={`py-8 ${getThemeGradient()}`}>
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${getTextColor()}`}>انتخاب اشتراک</h1>
          <p className="text-muted-foreground">
            پلن مناسب خودتان را انتخاب کنید و به سطح بعدی تمرین برسید
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <Card 
              key={plan.id}
              className={cn(
                "flex flex-col relative overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105", 
                plan.popular ? "border-primary shadow-xl" : "",
                getCardGradient()
              )}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-indigo-600 to-blue-600 text-primary-foreground text-center py-1 text-xs font-medium">
                  پیشنهاد ویژه
                </div>
              )}
              <CardHeader className={plan.popular ? "pt-8" : ""}>
                <CardTitle className={getTextColor()}>{plan.title}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-2">
                  <span className={`text-3xl font-bold ${getTextColor()}`}>{plan.price}</span>
                  <span className="text-muted-foreground text-sm"> تومان / {plan.interval}</span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className={`flex items-center text-sm ${getTextColor()}`}>
                      {feature.included ? (
                        <Check className="mr-2 h-4 w-4 text-green-500" />
                      ) : (
                        <X className="mr-2 h-4 w-4 text-muted-foreground" />
                      )}
                      {feature.text}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <div className="flex flex-col space-y-2 w-full">
                  {isLoggedIn && subscriptionInfo && subscriptionInfo.plan !== "basic" ? (
                    <div className="text-center text-muted-foreground">
                      <p>پلن شما: {subscriptionInfo.plan === "pro" ? "Pro" : "Ultimate"}</p>
                      <p>زمان باقی‌مانده: {subscriptionInfo.remainingTime}</p>
                    </div>
                  ) : (
                    <Button 
                      onClick={() => handleSelectPlan("basic", "free")}
                      className={`w-full ${getButtonGradient()} text-white`}
                      variant="outline"
                    >
                      استفاده از پلن رایگان
                    </Button>
                  )}
                  {plan.id !== "basic" && (!subscriptionInfo || subscriptionInfo.plan === "basic") && (
                    <>
                      <Button 
                        onClick={() => handleSelectPlan(plan.id, "1_month")}
                        className={`w-full ${getButtonGradient()} text-white`}
                        variant="default"
                      >
                        انتخاب این پلن (1 ماهه)
                      </Button>
                      <Button 
                        onClick={() => handleSelectPlan(plan.id, "3_months")}
                        className={`w-full ${getButtonGradient()} text-white`}
                        variant="default"
                      >
                        انتخاب این پلن (3 ماهه)
                      </Button>
                      <Button 
                        onClick={() => handleSelectPlan(plan.id, "1_year")}
                        className={`w-full ${getButtonGradient()} text-white`}
                        variant="default"
                      >
                        انتخاب این پلن (1 ساله)
                      </Button>
                    </>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {!isLoggedIn && (
          <div className="mt-12 text-center">
            <p className={`mb-4 ${getTextColor()}`}>برای خرید اشتراک نیاز است ابتدا وارد سیستم شوید</p>
            <Button 
              onClick={() => navigate("/phone-login?redirect=/subscription-plans")}
              className={`${getButtonGradient()} text-white px-8 py-6 rounded-full text-lg shadow-lg`}
            >
              ورود به سیستم
            </Button>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default SubscriptionPlans;
