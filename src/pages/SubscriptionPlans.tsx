
import React from "react";
import { useNavigate } from "react-router-dom";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import AppLayout from "@/components/Layout/AppLayout";
import { cn } from "@/lib/utils";

const SubscriptionPlans = () => {
  const navigate = useNavigate();

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

  const handleSelectPlan = (planId: string) => {
    // Navigate to payment page with selected plan
    navigate(`/payment?plan=${planId}`);
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
                <Button 
                  onClick={() => handleSelectPlan(plan.id)}
                  className="w-full"
                  variant={plan.id === "basic" ? "outline" : "default"}
                >
                  {plan.id === "basic" ? "استفاده از پلن رایگان" : "انتخاب این پلن"}
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
