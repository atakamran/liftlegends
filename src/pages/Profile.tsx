
import React, { useState, useEffect } from "react";
import AppLayout from "@/components/Layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/integrations/firebase/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/integrations/firebase/firebaseConfig";
import { 
  ProfileIcon, 
  CrownIcon, 
  MoonIcon, 
  BellIcon, 
  HeadphonesIcon, 
  InfoIcon, 
  LogOutIcon,
  SettingsIcon, 
  ShieldCheckIcon,
  CalendarIcon,
  BadgeCheckIcon,
  HeartIcon,
  DumbbellIcon,
  StarIcon
} from "@/icons";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
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
      icon: <ProfileIcon className="h-5 w-5" />,
      onClick: () => setIsPersonalInfoOpen(!isPersonalInfoOpen),
      bgColor: "bg-gradient-to-r from-purple-500 to-indigo-600",
    },
    {
      title: "خرید اشتراک",
      icon: <CrownIcon className="h-5 w-5" />,
      onClick: () => navigate("/subscription-plans"),
      bgColor: "bg-gradient-to-r from-amber-500 to-yellow-400",
    },
    {
      title: "تنظیمات ظاهری",
      icon: <MoonIcon className="h-5 w-5" />,
      onClick: () => toast({ title: "به زودی", description: "این قابلیت به زودی اضافه خواهد شد." }),
      bgColor: "bg-gradient-to-r from-blue-500 to-cyan-400",
    },
    {
      title: "یادآوری تمرین",
      icon: <BellIcon className="h-5 w-5" />,
      onClick: () => toast({ title: "به زودی", description: "این قابلیت به زودی اضافه خواهد شد." }),
      bgColor: "bg-gradient-to-r from-orange-500 to-red-400",
    },
    {
      title: "پشتیبانی",
      icon: <HeadphonesIcon className="h-5 w-5" />,
      onClick: () => toast({ title: "به زودی", description: "این قابلیت به زودی اضافه خواهد شد." }),
      bgColor: "bg-gradient-to-r from-emerald-500 to-green-400",
    },
    {
      title: "درباره ما",
      icon: <InfoIcon className="h-5 w-5" />,
      onClick: () => navigate("/about-us"),
      bgColor: "bg-gradient-to-r from-gray-600 to-gray-500",
    },
    {
      title: "خروج از حساب",
      icon: <LogOutIcon className="h-5 w-5" />,
      onClick: handleLogout,
      bgColor: "bg-gradient-to-r from-rose-600 to-pink-500",
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
        <Card className="mb-6 overflow-hidden">
          <div className="h-16 bg-gradient-to-r from-purple-600 to-blue-500"></div>
          <CardContent className="p-6 flex items-center justify-between relative">
            <div className="flex-1 z-10">
              <h2 className="text-xl font-bold">{formData.name || userData.displayName || "کاربر"}</h2>
              <p className="text-gray-600 text-sm mt-1 ltr:text-left rtl:text-right">
                {userData.phoneNumber || userData.email}
              </p>
            </div>
            <div className="w-20 h-20 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center overflow-hidden absolute top-0 right-6 transform -translate-y-1/2">
              <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <ProfileIcon className="h-10 w-10 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Subscription Status Card */}
        <Card className="mb-6 bg-gradient-to-r from-purple-900 to-indigo-800 text-white overflow-hidden">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-lg font-semibold">
                {subscriptionStatus === "active" 
                  ? "اشتراک شما فعال است" 
                  : "در حال حاضر اشتراک فعال ندارید"}
              </h2>
              {subscriptionStatus === "active" && (
                <div className="flex items-center mt-2">
                  <BadgeCheckIcon className="h-5 w-5 mr-1 text-emerald-300" />
                  <span className="text-sm text-emerald-300">کاربر ویژه</span>
                </div>
              )}
            </div>
            <div className="bg-white/10 p-3 rounded-full">
              <CrownIcon className="h-8 w-8 text-amber-300" />
            </div>
          </CardContent>
        </Card>
        
        {/* Menu Options */}
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  className="w-full py-4 px-4 flex items-center justify-between hover:bg-gray-50 transition-colors rounded-lg"
                  onClick={item.onClick}
                >
                  <div className="flex items-center">
                    <div className={`${item.bgColor} p-3 rounded-full mr-3`}>
                      <div className="text-white">
                        {item.icon}
                      </div>
                    </div>
                    <span className="text-lg">{item.title}</span>
                  </div>
                  <div className="text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rtl:rotate-180" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
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
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <DumbbellIcon className="h-5 w-5 mr-2 text-purple-600" />
                ویرایش اطلاعات شخصی
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">نام</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="نام خود را وارد کنید"
                    className="border-purple-200 focus:border-purple-400"
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
                  <Button type="submit" disabled={saving} className="flex-1 bg-purple-600 hover:bg-purple-700">
                    {saving ? "در حال ذخیره..." : "ذخیره تغییرات"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setIsPersonalInfoOpen(false)} className="flex-1 border-purple-200">
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
