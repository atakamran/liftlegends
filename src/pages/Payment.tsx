
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Check, CreditCard, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/integrations/firebase/firebaseConfig";
import AppLayout from "@/components/Layout/AppLayout";
import { useTheme } from "@/context/ThemeContext";

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
  const { theme, getButtonGradient, getCardGradient, getTextColor, getThemeGradient } = useTheme();
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
    // Check authentication
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      toast({
        title: "نیاز به ورود",
        description: "لطفاً ابتدا وارد سیستم شوید.",
        variant: "destructive",
      });
      navigate("/phone-login?redirect=/subscription-plans");
      return;
    }
    
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
      const currentUser = localStorage.getItem("currentUser");

      if (!currentUser) {
        throw new Error("کاربر احراز هویت نشده است");
      }

      // Simulate successful payment and update user subscription in localStorage
      setTimeout(async () => {
        try {
          const params = new URLSearchParams(location.search);
          const duration = params.get('duration') || "1_month";
          
          const durationMilliseconds = 
            duration === "1_month" ? 30 * 24 * 60 * 60 * 1000 :
            duration === "3_months" ? 90 * 24 * 60 * 60 * 1000 :
            365 * 24 * 60 * 60 * 1000;

          // Get current user data from localStorage
          const currentUserData = localStorage.getItem("currentUser");
          if (!currentUserData) {
            throw new Error("کاربر احراز هویت نشده است");
          }
          
          // Parse user data
          const userData = JSON.parse(currentUserData);
          
          // Update subscription information
          userData.subscription_plan = selectedPlan.id;
          userData.subscription_start_date = new Date().toISOString();
          userData.subscription_end_date = new Date(Date.now() + durationMilliseconds).toISOString();
          
          // Save updated user data back to localStorage
          localStorage.setItem("currentUser", JSON.stringify(userData));

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
    // Update user subscription to basic in localStorage
    const currentUserData = localStorage.getItem("currentUser");
    if (currentUserData) {
      const userData = JSON.parse(currentUserData);
      userData.subscription_plan = "basic";
      userData.subscription_start_date = new Date().toISOString();
      userData.subscription_end_date = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(); // 1 year
      localStorage.setItem("currentUser", JSON.stringify(userData));
    }
    
    return (
      <AppLayout className={getThemeGradient()}>
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
          <Card className={`w-full max-w-md text-center ${getCardGradient()} shadow-xl`}>
            <CardHeader>
              <CardTitle className={getTextColor()}>فعال‌سازی پلن رایگان</CardTitle>
              <CardDescription>دسترسی به امکانات پایه برنامه</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-full bg-green-500/20 p-3 w-12 h-12 mx-auto flex items-center justify-center">
                <Check className="h-6 w-6 text-green-500" />
              </div>
              <p className={getTextColor()}>پلن رایگان فعال است. شما می‌توانید در هر زمان به پلن‌های بالاتر ارتقا دهید.</p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button 
                onClick={() => navigate('/home')}
                className={`${getButtonGradient()} text-white`}
              >
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
    <AppLayout className={getThemeGradient()}>
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/subscription-plans')}
            className="mb-4 flex items-center text-primary hover:text-primary/80"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            بازگشت به صفحه پلن‌ها
          </Button>
          
          {selectedPlan ? (
            <>
              <h1 className={`text-2xl font-bold text-center mb-6 ${getTextColor()}`}>تکمیل خرید اشتراک</h1>
              
              <Card className={`mb-6 ${getCardGradient()} shadow-lg`}>
                <CardHeader>
                  <CardTitle className={getTextColor()}>خلاصه سفارش</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className={`font-medium ${getTextColor()}`}>{selectedPlan.title}</p>
                      <p className="text-sm text-muted-foreground">{selectedPlan.interval}</p>
                    </div>
                    <div className={`text-lg font-bold ${getTextColor()}`}>{selectedPlan.price} تومان</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className={`${getCardGradient()} shadow-lg`}>
                <CardHeader>
                  <CardTitle className={getTextColor()}>اطلاعات پرداخت</CardTitle>
                  <CardDescription>اطلاعات کارت خود را وارد کنید</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber" className={getTextColor()}>شماره کارت</Label>
                      <Input id="cardNumber" placeholder="---- ---- ---- ----" required className="bg-transparent" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate" className={getTextColor()}>تاریخ انقضا</Label>
                        <Input id="expiryDate" placeholder="ماه / سال" required className="bg-transparent" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv" className={getTextColor()}>CVV</Label>
                        <Input id="cvv" placeholder="123" required className="bg-transparent" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cardHolder" className={getTextColor()}>نام صاحب کارت</Label>
                      <Input id="cardHolder" required className="bg-transparent" />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className={`w-full ${getButtonGradient()} text-white shadow-lg transition-all duration-300 hover:shadow-xl`} 
                      disabled={isProcessing}
                    >
                      <CreditCard className="ml-2 h-4 w-4" />
                      {isProcessing ? "در حال پردازش..." : `پرداخت ${selectedPlan.price} تومان`}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className={`text-center ${getCardGradient()} shadow-lg`}>
              <CardHeader>
                <CardTitle className={getTextColor()}>خطا</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={getTextColor()}>پلن انتخاب شده معتبر نیست.</p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button 
                  onClick={() => navigate('/subscription-plans')}
                  className={`${getButtonGradient()} text-white`}
                >
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
