
import React, { useState, useEffect } from "react";
import AppLayout from "@/components/Layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/integrations/firebase/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/integrations/firebase/firebaseConfig";
import { 
  UserIcon, CrownIcon, MoonIcon, BellIcon, 
  HeadphonesIcon, InfoIcon, LogOutIcon, ChevronRightIcon, 
  SunIcon
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";

const Profile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isPersonalInfoOpen, setIsPersonalInfoOpen] = useState(false);
  const [userData, setUserData] = useState({
    displayName: "",
    email: "",
    phoneNumber: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    age: "",
    height: "",
    weight: "",
    primary_goal: "",
    fitness_level: "",
    training_days_per_week: "",
    training_place: "",
    dietary_restrictions: "no",
    takes_supplements: "no",
    steroids_interest: "no",
  });
  const [subscriptionStatus, setSubscriptionStatus] = useState("inactive");

  useEffect(() => {
    const fetchUserProfile = async () => {
      const user = auth.currentUser;
      if (!user) {
        setLoading(false);
        return;
      }

      // Set user data from auth
      setUserData({
        displayName: user.displayName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
      });

      // Get profile data from Firestore
      const profileRef = doc(db, "user_profiles", user.uid);
      const profileSnap = await getDoc(profileRef);
      if (profileSnap.exists()) {
        const data = profileSnap.data();
        setFormData((prev) => ({
          ...prev,
          ...data,
        }));

        // Check subscription status
        if (data.subscription_end_date) {
          const endDate = new Date(data.subscription_end_date);
          if (endDate > new Date()) {
            setSubscriptionStatus("active");
          }
        }
      }
      setLoading(false);
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User not logged in");
      }

      const profileRef = doc(db, "user_profiles", user.uid);
      await setDoc(profileRef, formData, { merge: true });

      toast({
        title: "پروفایل ذخیره شد",
        description: "اطلاعات شما با موفقیت ذخیره شد.",
      });
      setIsPersonalInfoOpen(false);
    } catch (error) {
      console.error("Error saving profile:", error);
      toast({
        title: "خطا در ذخیره پروفایل",
        description: "لطفاً دوباره تلاش کنید.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
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
      onClick: () => setIsPersonalInfoOpen(!isPersonalInfoOpen),
    },
    {
      title: "خرید اشتراک",
      icon: <CrownIcon className="h-5 w-5" />,
      onClick: () => navigate("/subscription-plans"),
    },
    {
      title: "رنگ برنامه",
      icon: theme === 'light' ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />,
      onClick: () => {
        toggleTheme();
        toast({ 
          title: theme === 'light' ? "حالت تاریک فعال شد" : "حالت روشن فعال شد", 
          description: theme === 'light' ? "تم برنامه به حالت تاریک تغییر کرد." : "تم برنامه به حالت روشن تغییر کرد." 
        });
      },
      component: (
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <Label htmlFor="theme-mode">{theme === 'light' ? 'تاریک' : 'روشن'}</Label>
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
              <h2 className="text-xl font-bold">{formData.name || userData.displayName || "کاربر"}</h2>
              <p className="text-muted-foreground text-sm mt-1 ltr:text-left rtl:text-right">
                {userData.phoneNumber || userData.email}
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
        
        {/* Personal Information Form (Collapsible) */}
        {isPersonalInfoOpen && (
          <Card className="mt-6 animate-in slide-in-from-top duration-300">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">ویرایش اطلاعات شخصی</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">نام</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="نام خود را وارد کنید"
                  />
                </div>

                <div className="space-y-2">
                  <Label>جنسیت</Label>
                  <RadioGroup
                    value={formData.gender}
                    onValueChange={(value) => handleSelectChange("gender", value)}
                    className="flex flex-row space-x-4 space-x-reverse mt-2"
                  >
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="male" id="gender-male" />
                      <Label htmlFor="gender-male" className="mr-2">مرد</Label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="female" id="gender-female" />
                      <Label htmlFor="gender-female" className="mr-2">زن</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age">سن</Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="سن خود را وارد کنید"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="height">قد (سانتی‌متر)</Label>
                    <Input
                      id="height"
                      name="height"
                      type="number"
                      value={formData.height}
                      onChange={handleChange}
                      placeholder="قد به سانتی‌متر"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">وزن (کیلوگرم)</Label>
                    <Input
                      id="weight"
                      name="weight"
                      type="number"
                      value={formData.weight}
                      onChange={handleChange}
                      placeholder="وزن به کیلوگرم"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="primary_goal">هدف اصلی</Label>
                  <Select
                    value={formData.primary_goal}
                    onValueChange={(value) => handleSelectChange("primary_goal", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="هدف خود را انتخاب کنید" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weight-loss">کاهش وزن</SelectItem>
                      <SelectItem value="muscle-gain">افزایش عضله</SelectItem>
                      <SelectItem value="competition">مسابقه فیزیک / بدنسازی</SelectItem>
                      <SelectItem value="fitness">تناسب اندام</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fitness_level">سطح آمادگی</Label>
                  <Select
                    value={formData.fitness_level}
                    onValueChange={(value) => handleSelectChange("fitness_level", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="سطح آمادگی خود را انتخاب کنید" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">مبتدی</SelectItem>
                      <SelectItem value="intermediate">متوسط</SelectItem>
                      <SelectItem value="advanced">پیشرفته</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="training_days_per_week">تعداد روزهای تمرین در هفته</Label>
                  <Select
                    value={formData.training_days_per_week}
                    onValueChange={(value) => handleSelectChange("training_days_per_week", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="انتخاب کنید" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">۱ روز</SelectItem>
                      <SelectItem value="2">۲ روز</SelectItem>
                      <SelectItem value="3">۳ روز</SelectItem>
                      <SelectItem value="4">۴ روز</SelectItem>
                      <SelectItem value="5">۵ روز</SelectItem>
                      <SelectItem value="6">۶ روز</SelectItem>
                      <SelectItem value="7">۷ روز</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="training_place">مکان تمرین</Label>
                  <Select
                    value={formData.training_place}
                    onValueChange={(value) => handleSelectChange("training_place", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="انتخاب کنید" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gym">باشگاه</SelectItem>
                      <SelectItem value="home">خانه</SelectItem>
                      <SelectItem value="no-equipment">بدون تجهیزات</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>محدودیت غذایی</Label>
                  <RadioGroup
                    value={formData.dietary_restrictions?.toString()}
                    onValueChange={(value) => handleSelectChange("dietary_restrictions", value)}
                    className="flex flex-row space-x-4 space-x-reverse mt-2"
                  >
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="yes" id="diet-yes" />
                      <Label htmlFor="diet-yes" className="mr-2">دارم</Label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="no" id="diet-no" />
                      <Label htmlFor="diet-no" className="mr-2">ندارم</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>مکمل مصرف می‌کنی؟</Label>
                  <RadioGroup
                    value={formData.takes_supplements?.toString()}
                    onValueChange={(value) => handleSelectChange("takes_supplements", value)}
                    className="flex flex-row space-x-4 space-x-reverse mt-2"
                  >
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="yes" id="supplements-yes" />
                      <Label htmlFor="supplements-yes" className="mr-2">بله</Label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="no" id="supplements-no" />
                      <Label htmlFor="supplements-no" className="mr-2">نه</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>مایل به استفاده از استروئید هستی؟</Label>
                  <RadioGroup
                    value={formData.steroids_interest}
                    onValueChange={(value) => handleSelectChange("steroids_interest", value)}
                    className="flex flex-row space-x-4 space-x-reverse mt-2"
                  >
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="yes" id="steroids-yes" />
                      <Label htmlFor="steroids-yes" className="mr-2">بله</Label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="no" id="steroids-no" />
                      <Label htmlFor="steroids-no" className="mr-2">نه</Label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="need-more-info" id="steroids-dont-know" />
                      <Label htmlFor="steroids-dont-know" className="mr-2">نمی‌دونم</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex gap-2">
                  <Button type="submit" disabled={saving} className="flex-1">
                    {saving ? "در حال ذخیره..." : "ذخیره تغییرات"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setIsPersonalInfoOpen(false)} className="flex-1">
                    انصراف
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
};

export default Profile;
