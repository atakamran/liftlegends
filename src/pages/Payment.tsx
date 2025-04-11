import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Check, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/integrations/firebase/firebaseConfig";
import AppLayout from "@/components/Layout/AppLayout";

type Plan = {
  id: string;
  title: string;
  price: string;
  numericPrice: number;
  interval: string;
};

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  
  const plans: Record<string, Plan> = {
    pro: {
      id: "pro",
      title: "پلن Pro",
      price: "۹۹,۰۰۰",
      numericPrice: 99000,
      interval: "ماهانه",
    },
    ultimate: {
      id: "ultimate",
      title: "پلن Ultimate",
      price: "۱۹۹,۰۰۰",
      numericPrice: 199000,
      interval: "ماهانه",
    }
  };
  
  useEffect(() => {
    // Get plan from URL query parameter
    const params = new URLSearchParams(location.search);
    const planId = params.get('plan');
    
    if (planId && plans[planId]) {
      setSelectedPlan(plans[planId]);
    } else if (planId !== 'basic') {
      // If plan is not valid and not basic, redirect to plans page
      navigate('/subscription-plans');
    }
  }, [location, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedPlan) {
      toast({
        title: "خطا",
        description: "لطفاً یک پلن را انتخاب کنید.",
      });
      return;
    }

    setIsProcessing(true);

    try {
      const user = auth.currentUser;

      if (!user) {
        throw new Error("کاربر احراز هویت نشده است");
      }

      // Simulate successful payment and update user subscription in Firestore
      setTimeout(async () => {
        try {
          const profileRef = doc(db, "user_profiles", user.uid);
          await updateDoc(profileRef, {
            subscription_plan: selectedPlan.id,
            subscription_start_date: new Date().toISOString(),
            subscription_end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
          });

          toast({
            title: "پرداخت موفقیت‌آمیز",
            description: `اشتراک ${selectedPlan.title} با موفقیت فعال شد.`,
          });

          navigate("/home");
        } catch (error) {
          console.error("Error updating subscription:", error);
          toast({
            title: "خطا در ثبت اشتراک",
            description: "مشکلی در ثبت اشتراک رخ داد. لطفاً دوباره تلاش کنید.",
            variant: "destructive",
          });
        } finally {
          setIsProcessing(false);
        }
      }, 1500);
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "خطا در پرداخت",
        description: "مشکلی در فرآیند پرداخت رخ داد. لطفاً دوباره تلاش کنید.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  // If selected plan is "basic", it's free and we should show a different UI
  if (new URLSearchParams(location.search).get('plan') === 'basic') {
    return (
      <AppLayout>
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
          <Card className="w-full max-w-md text-center">
            <CardHeader>
              <CardTitle>فعال‌سازی پلن رایگان</CardTitle>
              <CardDescription>دسترسی به امکانات پایه برنامه</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-full bg-primary/10 p-3 w-12 h-12 mx-auto flex items-center justify-center">
                <Check className="h-6 w-6 text-primary" />
              </div>
              <p>پلن رایگان فعال است. شما می‌توانید در هر زمان به پلن‌های بالاتر ارتقا دهید.</p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button onClick={() => navigate('/home')}>
                بازگشت به خانه
              </Button>
            </CardFooter>
          </Card>
        </div>
      </AppLayout>
    );
  }

  // For paid plans
  return (
    <AppLayout>
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
        <div className="w-full max-w-md">
          {selectedPlan ? (
            <>
              <h1 className="text-2xl font-bold text-center mb-6">تکمیل خرید اشتراک</h1>
              
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>خلاصه سفارش</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{selectedPlan.title}</p>
                      <p className="text-sm text-muted-foreground">{selectedPlan.interval}</p>
                    </div>
                    <div className="text-lg font-bold">{selectedPlan.price} تومان</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>اطلاعات پرداخت</CardTitle>
                  <CardDescription>اطلاعات کارت خود را وارد کنید</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">شماره کارت</Label>
                      <Input id="cardNumber" placeholder="---- ---- ---- ----" required />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">تاریخ انقضا</Label>
                        <Input id="expiryDate" placeholder="ماه / سال" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" required />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cardHolder">نام صاحب کارت</Label>
                      <Input id="cardHolder" required />
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={isProcessing}>
                      <CreditCard className="ml-2 h-4 w-4" />
                      {isProcessing ? "در حال پردازش..." : `پرداخت ${selectedPlan.price} تومان`}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="text-center">
              <CardHeader>
                <CardTitle>خطا</CardTitle>
              </CardHeader>
              <CardContent>
                <p>پلن انتخاب شده معتبر نیست.</p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button onClick={() => navigate('/subscription-plans')}>
                  بازگشت به صفحه انتخاب پلن
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Payment;
