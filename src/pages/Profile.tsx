
import React, { useState, useEffect } from "react";
import AppLayout from "@/components/Layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/integrations/firebase/firebaseConfig";
import { 
  UserIcon, CrownIcon, MoonIcon, BellIcon, 
  HeadphonesIcon, InfoIcon, LogOutIcon, ChevronRightIcon, 
  SunIcon, Loader2
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";

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
    weight: "",
    fitnessLevel: "",
  });
  const [subscriptionStatus, setSubscriptionStatus] = useState("inactive");

  useEffect(() => {
    const fetchUserProfile = async () => {
      const phoneNumber = localStorage.getItem("userPhoneNumber");
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      
      if (!phoneNumber || !isLoggedIn) {
        navigate("/login");
        return;
      }
      
      try {
        // Get profile data from Firestore
        const profileRef = doc(db, "user_profiles", phoneNumber);
        const profileSnap = await getDoc(profileRef);
        
        if (profileSnap.exists()) {
          const data = profileSnap.data();
          setUserData({
            name: data.name || "کاربر",
            phoneNumber: phoneNumber,
            age: data.age || "",
            gender: data.gender || "",
            height: data.height || "",
            weight: data.weight || "",
            fitnessLevel: data.fitnessLevel || "",
          });

          // Check subscription status
          if (data.subscription_end_date) {
            const endDate = new Date(data.subscription_end_date);
            if (endDate > new Date()) {
              setSubscriptionStatus("active");
            }
          }
        } else {
          navigate("/phone-login");
        }
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
      // Remove login info from storage
      localStorage.removeItem("userPhoneNumber");
      localStorage.removeItem("isLoggedIn");
      
      navigate("/login");
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
          <Label htmlFor="theme-mode" className="mr-2">
            
          </Label>
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
        <h1 className="text-2xl font-bold mb-6 text-center">پروفایل</h1>
        
        {/* User Profile Card */}
        <Card className="mb-6">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-xl font-bold">{userData.name}</h2>
              <p className="text-muted-foreground text-sm mt-1 ltr:text-left rtl:text-right">
                {userData.phoneNumber}
              </p>
            </div>
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
              <UserIcon className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        {/* Subscription Status Card */}
        <Card className={`mb-6 ${theme === 'light' ? 'bg-slate-700' : 'bg-slate-900'} text-white`}>
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-lg font-semibold">
                {subscriptionStatus === "active" 
                  ? "اشتراک شما فعال است" 
                  : "در حال حاضر اشتراک فعال ندارید"}
              </h2>
            </div>
            <CrownIcon className="h-6 w-6" />
          </CardContent>
        </Card>
        
        {/* Menu Options */}
        <Card>
          <CardContent className="p-4">
            <div className="space-y-0 divide-y dark:divide-gray-800">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  className="w-full py-4 px-2 flex items-center justify-between hover:bg-secondary transition-colors rounded-md"
                  onClick={item.onClick}
                >
                  <div className="flex items-center">
                    <ChevronRightIcon className="h-5 w-5 ml-2 rtl:rotate-180" />
                    <span className="text-lg">{item.title}</span>
                  </div>
                  <div className="flex items-center">
                    {item.component && <div className="ml-4">{item.component}</div>}
                    <div className="bg-secondary p-3 rounded-full">
                      {item.icon}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Profile;
