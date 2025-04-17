import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AppLayout from "@/components/Layout/AppLayout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckIcon, CreditCard, Crown, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/context/ThemeContext";

const SubscriptionPlans = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme, getThemeGradient } = useTheme();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      title: "Basic",
      titleFa: "رایگان",
      price: { monthly: "0", annual: "0" },
      features: [
        "دسترسی به تمرینات پایه",
        "ثبت تمرینات",
        "ثبت اطلاعات فیزیکی",
      ],
      cta: "طرح فعلی",
      isPro: false,
      disabled: true
    },
    {
      title: "Pro",
      titleFa: "حرفه‌ای",
      price: { monthly: "49,000", annual: "499,000" },
      features: [
        "تمرینات اختصاصی",
        "برنامه‌های غذایی",
        "پشتیبانی 24/7",
        "ردیابی پیشرفت",
      ],
      cta: "انتخاب این طرح",
      isPro: true,
      discount: "20%"
    },
    {
      title: "Ultimate",
      titleFa: "نامحدود",
      price: { monthly: "99,000", annual: "999,000" },
      features: [
        "مربی هوش مصنوعی",
        "همه امکانات Pro",
        "ویدیو‌های آموزشی",
        "مشاوره تخصصی",
        "استروئیدها و مکمل‌ها",
      ],
      cta: "انتخاب این طرح",
      isPro: true,
      isUltimate: true,
      badge: "محبوب‌ترین",
      discount: "30%"
    }
  ];

  const handlePlanSelection = (plan: string) => {
    if (plan === "Basic") {
      toast({
        title: "این طرح فعلی شماست",
        description: "شما در حال حاضر از نسخه رایگان استفاده می‌کنید.",
      });
      return;
    }
    
    const currentUser = localStorage.getItem("currentUser");
    
    if (!currentUser) {
      toast({
        title: "لطفاً وارد شوید",
        description: "برای خرید اشتراک، ابتدا وارد حساب کاربری خود شوید.",
        variant: "destructive",
      });
      navigate("/phone-login?redirect=/subscription-plans");
      return;
    }
    
    localStorage.setItem("selectedPlan", plan);
    localStorage.setItem("selectedBillingCycle", selectedPlan);

    navigate("/payment");
  };

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto p-4 pb-20">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-3">طرح‌های اشتراک</h1>
          <p className="text-muted-foreground">طرح مناسب خود را انتخاب کنید</p>
          
          <div className={`inline-flex items-center rounded-full p-1 mt-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <button
              onClick={() => setSelectedPlan('monthly')}
              className={`px-4 py-2 rounded-full text-sm ${
                selectedPlan === 'monthly'
                  ? 'bg-yellow-500 text-black font-medium'
                  : theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              ماهانه
            </button>
            <button
              onClick={() => setSelectedPlan('annual')}
              className={`px-4 py-2 rounded-full text-sm ${
                selectedPlan === 'annual'
                  ? 'bg-yellow-500 text-black font-medium'
                  : theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              سالانه (20% تخفیف)
            </button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative ${
                plan.isUltimate 
                  ? theme === 'dark' ? 'border-yellow-500/50 shadow-lg shadow-yellow-500/10' : 'border-yellow-500 shadow-lg shadow-yellow-500/20' 
                  : ''
              }`}
            >
              {plan.badge && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-yellow-500 text-black text-xs font-semibold py-1 px-3 rounded-full">
                    {plan.badge}
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  {plan.title === "Basic" && <ShieldCheck className="h-8 w-8 text-gray-500" />}
                  {plan.title === "Pro" && <Crown className="h-8 w-8 text-yellow-500" />}
                  {plan.title === "Ultimate" && <Sparkles className="h-8 w-8 text-yellow-500" />}
                </div>
                <CardTitle className="text-xl">
                  {plan.titleFa}
                  {plan.discount && selectedPlan === 'annual' && (
                    <span className="mr-2 text-xs text-green-500 bg-green-500/10 px-2 py-1 rounded">
                      {plan.discount} تخفیف
                    </span>
                  )}
                </CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold">{plan.price[selectedPlan]}</span>
                  {plan.price[selectedPlan] !== "0" && (
                    <span className="text-muted-foreground ml-1 text-sm">تومان / {selectedPlan === 'monthly' ? 'ماهانه' : 'سالانه'}</span>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="text-center">
                <Separator className="my-4" />
                <ul className="space-y-3 text-sm mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center justify-center">
                      <CheckIcon className="h-4 w-4 mr-2 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter className="flex justify-center pb-8">
                <Button 
                  onClick={() => handlePlanSelection(plan.title)}
                  disabled={plan.disabled}
                  variant={plan.isPro ? "default" : "outline"}
                  className={`w-full ${plan.isUltimate ? 'bg-yellow-500 hover:bg-yellow-600 text-black' : plan.isPro ? 'bg-black text-white' : ''}`}
                >
                  {plan.isPro && <CreditCard className="h-4 w-4 mr-2" />}
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default SubscriptionPlans;
