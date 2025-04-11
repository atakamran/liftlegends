import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import AppLayout from "@/components/Layout/AppLayout";
import { cn } from "@/lib/utils";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db, auth } from "@/integrations/firebase/firebaseConfig"; // Ensure auth is imported
import { getCurrentUserProfile } from "@/services/profileService";

const fetchUserProfile = async () => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User not logged in");
    }

    const profileRef = doc(db, "user_profiles", user.uid);
    const profileSnap = await getDoc(profileRef);

    if (!profileSnap.exists()) {
      throw new Error("User profile not found");
    }

    return profileSnap.data();
  } catch (error) {
    console.error("Error fetching user profile: ", error);
    throw error;
  }
};

const SubscriptionPlans = () => {
  const navigate = useNavigate();
  const [subscriptionInfo, setSubscriptionInfo] = useState<{ plan: string; remainingTime: string } | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          navigate("/login"); // Redirect to login if user is not authenticated
          return;
        }

        const profileRef = doc(db, "user_profiles", user.uid);
        const profileSnap = await getDoc(profileRef);

        if (!profileSnap.exists()) {
          navigate("/subscription-plans"); // Redirect to subscription plans if profile does not exist
          return;
        }

        const profileData = profileSnap.data();
        // Process profileData if needed
      } catch (error) {
        console.error("Error fetching user profile: ", error);
        navigate("/subscription-plans"); // Redirect to subscription plans on error
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    const fetchSubscriptionInfo = async () => {
      try {
        const profile = await getCurrentUserProfile();
        if (profile.subscription_plan && profile.subscription_start_date && profile.subscription_end_date) {
          const startDate = new Date(profile.subscription_start_date);
          const endDate = new Date(profile.subscription_end_date);
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
            plan: profile.subscription_plan,
            remainingTime,
          });
        }
      } catch (error) {
        console.error("Error fetching subscription info: ", error);
      }
    };

    fetchSubscriptionInfo();
  }, []);

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

  const handleSelectPlan = async (planId: string, duration: string) => {
    try {
      const profileData = await fetchUserProfile();
      console.log("Fetched profile data: ", profileData);

      const profileRef = doc(db, "user_profiles", auth.currentUser.uid);

      if (planId === "basic") {
        await setDoc(profileRef, {
          subscription_plan: planId,
          subscription_duration: "free",
          subscription_start_date: new Date().toISOString(),
          subscription_end_date: null, // No end date for free plan
        }, { merge: true });
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
    }
  };

  return (
    <AppLayout className="py-8">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">انتخاب اشتراک</h1>
          <p className="text-muted-foreground">
            پلن مناسب خودتان را انتخاب کنید و به سطح بعدی تمرین برسید
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <Card 
              key={plan.id}
              className={cn(
                "flex flex-col relative overflow-hidden", 
                plan.popular ? "border-primary shadow-md" : ""
              )}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-center py-1 text-xs font-medium">
                  پیشنهاد ویژه
                </div>
              )}
              <CardHeader className={plan.popular ? "pt-8" : ""}>
                <CardTitle>{plan.title}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-2">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground text-sm"> تومان / {plan.interval}</span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm">
                      {feature.included ? (
                        <Check className="mr-2 h-4 w-4 text-primary" />
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
                  {subscriptionInfo && subscriptionInfo.plan !== "basic" ? (
                    <div className="text-center text-muted-foreground">
                      <p>پلن شما: {subscriptionInfo.plan === "pro" ? "Pro" : "Ultimate"}</p>
                      <p>زمان باقی‌مانده: {subscriptionInfo.remainingTime}</p>
                    </div>
                  ) : (
                    <Button 
                      onClick={() => handleSelectPlan("basic", "free")}
                      className="w-full"
                      variant="outline"
                    >
                      استفاده از پلن رایگان
                    </Button>
                  )}
                  {plan.id !== "basic" && !subscriptionInfo && (
                    <>
                      <Button 
                        onClick={() => handleSelectPlan(plan.id, "1_month")}
                        className="w-full"
                        variant="default"
                      >
                        انتخاب این پلن (1 ماهه)
                      </Button>
                      <Button 
                        onClick={() => handleSelectPlan(plan.id, "3_months")}
                        className="w-full"
                        variant="default"
                      >
                        انتخاب این پلن (3 ماهه)
                      </Button>
                      <Button 
                        onClick={() => handleSelectPlan(plan.id, "1_year")}
                        className="w-full"
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
      </div>
    </AppLayout>
  );
};

export default SubscriptionPlans;
