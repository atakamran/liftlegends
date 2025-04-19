
import React, { useState, useEffect } from "react";
import AppLayout from "@/components/Layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  UserIcon, CrownIcon, MoonIcon, BellIcon, 
  HeadphonesIcon, InfoIcon, LogOutIcon, ChevronRightIcon, 
  SunIcon, Loader2, BadgeCheck, Sparkles, CalendarDays, Dumbbell, Scale
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Subscription plan types
type SubscriptionPlan = "basic" | "pro" | "ultimate";

// Theme colors for different subscription plans
const planColors: Record<SubscriptionPlan, {
  bg: string;
  text: string;
  border: string;
  icon: string;
  gradient: string;
  name: string;
}> = {
  basic: {
    bg: "bg-slate-700",
    text: "text-white",
    border: "border-slate-500",
    icon: "text-slate-300",
    gradient: "from-slate-600 to-slate-800",
    name: "پایه"
  },
  pro: {
    bg: "bg-purple-700",
    text: "text-white",
    border: "border-purple-500",
    icon: "text-purple-300",
    gradient: "from-purple-600 to-purple-900",
    name: "حرفه‌ای"
  },
  ultimate: {
    bg: "bg-yellow-600",
    text: "text-white",
    border: "border-yellow-400",
    icon: "text-yellow-300",
    gradient: "from-yellow-500 to-yellow-800",
    name: "نامحدود"
  }
};

const Profile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    name: "",
    phoneNumber: "",
    age: "",
    gender: "",
    height: "",
    currentWeight: "",
    targetWeight: "",
    goal: "",
    fitnessLevel: "",
    joinDate: "",
    workoutCount: 0,
    streak: 0,
  });
  const [subscriptionPlan, setSubscriptionPlan] = useState<SubscriptionPlan>("basic");
  const [subscriptionEndDate, setSubscriptionEndDate] = useState<Date | null>(null);
  const [daysLeft, setDaysLeft] = useState<number>(0);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Get data from localStorage
        const currentUserData = localStorage.getItem("currentUser");
        
        if (!currentUserData) {
          navigate("/phone-login");
          return;
        }
        
        // Parse user data from currentUser
        const parsedUserData = JSON.parse(currentUserData);
        
        // Get subscription plan from currentUser
        const plan = parsedUserData.subscription_plan || "basic";
        console.log("Subscription plan from currentUser:", plan);
        const validPlans: SubscriptionPlan[] = ["basic", "pro", "ultimate"];
        const subscriptionPlan = validPlans.includes(plan as SubscriptionPlan) 
          ? plan as SubscriptionPlan 
          : "basic";
        console.log("Using subscription plan:", subscriptionPlan);
        
        // Format join date
        const joinDate = parsedUserData.updatedAt 
          ? new Date(parsedUserData.updatedAt) 
          : new Date();
        joinDate.setMonth(joinDate.getMonth() - 2); // Assume joined 2 months ago
        const formattedJoinDate = new Intl.DateTimeFormat('fa-IR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }).format(joinDate);
        
        // Set user data
        setUserData({
          name: parsedUserData.name || "کاربر",
          phoneNumber: parsedUserData.phoneNumber || "",
          age: parsedUserData.age || "",
          gender: parsedUserData.gender || "",
          height: parsedUserData.height || "",
          currentWeight: parsedUserData.currentWeight || "",
          targetWeight: parsedUserData.targetWeight || "",
          goal: parsedUserData.goal || "",
          fitnessLevel: parsedUserData.fitnessLevel || "متوسط",
          joinDate: formattedJoinDate,
          workoutCount: parseInt(localStorage.getItem("workoutCount") || "12"),
          streak: parseInt(localStorage.getItem("streak") || "3"),
        });

        // Set subscription data
        setSubscriptionPlan(subscriptionPlan);
        
        // Set subscription end date (30 days from now)
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 30);
        setSubscriptionEndDate(endDate);
        
        // Calculate days left
        const today = new Date();
        const diffTime = Math.abs(endDate.getTime() - today.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setDaysLeft(diffDays);
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast({
          title: "خطا در بارگذاری",
          description: "مشکلی در بارگذاری اطلاعات پروفایل پیش آمد.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate, toast]);

  const handleLogout = async () => {
    try {
      // Just set isLoggedIn to false without removing user data
      localStorage.setItem("isLoggedIn", "false");
      
      navigate("/");
      toast({
        title: "خروج موفق",
        description: "شما با موفقیت از حساب کاربری خود خارج شدید.",
      });
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "خطا در خروج",
        description: "لطفاً دوباره تلاش کنید.",
        variant: "destructive",
      });
    }
  };

  // Get plan display name in Persian
  const getPlanDisplayName = (plan: SubscriptionPlan) => {
    return planColors[plan].name;
  };

  // Get plan icon
  const getPlanIcon = (plan: SubscriptionPlan) => {
    switch (plan) {
      case "basic": return <BadgeCheck className={`h-6 w-6 ${planColors[plan].icon}`} />;
      case "pro": return <Sparkles className={`h-6 w-6 ${planColors[plan].icon}`} />;
      case "ultimate": return <CrownIcon className={`h-6 w-6 ${planColors[plan].icon}`} />;
      default: return <CrownIcon className={`h-6 w-6 ${planColors[plan].icon}`} />;
    }
  };

  const menuItems = [
    {
      title: "مشخصات فردی",
      icon: <UserIcon className="h-5 w-5" />,
      onClick: () => navigate("/personal-info"),
    },
    {
      title: "خرید اشتراک",
      icon: <CrownIcon className="h-5 w-5" />,
      onClick: () => navigate("/subscription-plans"),
      badge: getPlanDisplayName(subscriptionPlan),
      badgeColor: planColors[subscriptionPlan].bg,
    },
    {
      title: theme === 'light' ? 'تاریک' : 'روشن',
      icon: theme === 'light' ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />,
      onClick: () => {
        toggleTheme();
        toast({ 
          title: theme === 'light' ? "حالت تاریک فعال شد" : "حالت روشن فعال شد", 
          description: theme === 'light' ? "تم برنامه به حالت تاریک تغییر کرد." : "تم برنامه به حالت روشن تغییر کرد." 
        });
      },
      component: (
        <div className="flex items-center justify-start rtl:flex-row-reverse">
          <Switch
            id="theme-mode"
            checked={theme === 'dark'}
            onCheckedChange={toggleTheme}
          />
        </div>
      ),
    },
    {
      title: "یادآوری",
      icon: <BellIcon className="h-5 w-5" />,
      onClick: () => toast({ title: "به زودی", description: "این قابلیت به زودی اضافه خواهد شد." }),
    },
    {
      title: "پشتیبانی",
      icon: <HeadphonesIcon className="h-5 w-5" />,
      onClick: () => toast({ title: "به زودی", description: "این قابلیت به زودی اضافه خواهد شد." }),
    },
    {
      title: "درباره ما",
      icon: <InfoIcon className="h-5 w-5" />,
      onClick: () => navigate("/about-us"),
    },
    {
      title: "خروج از حساب",
      icon: <LogOutIcon className="h-5 w-5" />,
      onClick: handleLogout,
    },
  ];

  if (loading) {
    return (
      <AppLayout>
        <div className="flex justify-center items-center h-[70vh]">
          <Loader2 className="h-8 w-8 animate-spin mr-2" />
          <p className="text-lg">در حال بارگذاری...</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto pb-12 px-4">
        <div className="relative mb-8">
          {/* Background header with gradient based on subscription */}
          <div className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-r ${planColors[subscriptionPlan].gradient} rounded-b-3xl -z-10`}></div>
          
          {/* User Profile Card */}
          <Card className="mt-16 mb-6 shadow-lg border-0 overflow-visible">
            <CardContent className="p-0">
              <div className="flex flex-col  items-center -mt-12">
                <div className={`w-24 h-24 rounded-full ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} flex items-center justify-center overflow-hidden border-4 ${planColors[subscriptionPlan].border} shadow-xl`}>
                  <UserIcon className={`h-12 w-12 ${planColors[subscriptionPlan].icon}`} />
                </div>
                
                <div className="text-center mt-4 px-6 pb-6 w-full">
                  <h2 className="text-2xl font-bold">{userData.name}</h2>
                  <p className="text-muted-foreground text-sm mt-1">
                    {userData.phoneNumber}
                  </p>
                  
                  {/* User stats */}
                  <div className="grid grid-cols-3 gap-4 mt-6 text-center">
                    <div className="flex flex-col items-center">
                      <CalendarDays className="h-5 w-5 mb-1 text-muted-foreground" />
                      <span className="text-sm font-medium">عضویت</span>
                      <span className="text-xs text-muted-foreground">{userData.joinDate}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Dumbbell className="h-5 w-5 mb-1 text-muted-foreground" />
                      <span className="text-sm font-medium">تمرینات</span>
                      <span className="text-xs text-muted-foreground">{userData.workoutCount} جلسه</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Scale className="h-5 w-5 mb-1 text-muted-foreground" />
                      <span className="text-sm font-medium">وزن</span>
                      <span className="text-xs text-muted-foreground">{userData.currentWeight ? `${userData.currentWeight} کیلوگرم` : "ثبت نشده"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Subscription Status Card */}
          {(
            <Card className={`mb-6 border-0 shadow-lg overflow-hidden`}>
              <div className={`bg-gradient-to-r ${planColors[subscriptionPlan].gradient} p-1`}>
                <CardContent className={`${theme === 'light' ? 'bg-white' : 'bg-gray-900'} rounded-md p-4`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {getPlanIcon(subscriptionPlan)}
                      <div className="ml-3">
                        <h3 className="text-lg font-semibold">اشتراک {getPlanDisplayName(subscriptionPlan)}</h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          {subscriptionEndDate && `تا ${new Intl.DateTimeFormat('fa-IR').format(subscriptionEndDate)}`}
                        </p>
                      </div>
                    </div>
                    <Badge className={`${planColors[subscriptionPlan].bg} ${planColors[subscriptionPlan].text}`}>
                      {daysLeft} روز باقیمانده
                    </Badge>
                  </div>
                  
                  {/* Progress bar for subscription */}
                  <div className="mt-4">
                    <Progress value={daysLeft} max={30} className="h-2" />
                  </div>
                </CardContent>
              </div>
            </Card>
          )}
          
          {/* Upgrade card removed as all users now have at least basic subscription */}
        </div>
        
        {/* Menu Options */}
        <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
          <CardContent className="p-0">
            <div className="divide-y dark:divide-gray-800">
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  className="w-full py-4 px-4 flex items-center justify-between hover:bg-secondary/50 transition-colors cursor-pointer"
                  onClick={item.component ? undefined : item.onClick}
                >
                  <div 
                    className="flex items-center"
                    onClick={item.component ? item.onClick : undefined}
                  >
                    <ChevronRightIcon className="h-5 w-5 ml-3 rtl:rotate-180 text-muted-foreground" />
                    <span className="text-base font-medium">{item.title}</span>
                    {item.badge && (
                      <Badge className={`mr-2 ${item.badgeColor}`}>
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center">
                    {item.component && <div className="ml-4">{item.component}</div>}
                    <div className={`${theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'} p-2 rounded-full`}>
                      {item.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Profile;
