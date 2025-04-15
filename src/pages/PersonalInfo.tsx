import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/context/ThemeContext";
import { Loader2, Save, ArrowLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PersonalInfo = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [userData, setUserData] = useState({
    name: "",
    goal: "",
    height: "",
    currentWeight: "",
    targetWeight: "",
    birthDate: "",
    gender:"",
  });
  

  useEffect(() => {
    const fetchUserProfile = () => {
      setIsLoading(true);
      try {
        const currentUser = localStorage.getItem("currentUser");

        if (!currentUser) {
          navigate("/phone-login");
          return;
        }

        setUserData(JSON.parse(currentUser));
      } catch (error) {
        console.error("Error fetching user profile:", error);
        toast({
          title: "خطا در دریافت اطلاعات",
          description: "مشکلی در بارگذاری اطلاعات شخصی شما پیش آمد.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate, toast]);
  
  const handleChange = (field: string, value: string) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      // Validate required fields
      if (!userData.name) {
        toast({
          title: "خطا در ثبت اطلاعات",
          description: "لطفاً نام خود را وارد کنید.",
          variant: "destructive",
        });
        return;
      }
      
      // Save to localStorage
      localStorage.setItem("currentUser", JSON.stringify({
        ...userData,
        updatedAt: new Date().toISOString(),
      }));
      
      toast({
        title: "اطلاعات ذخیره شد",
        description: "اطلاعات شخصی شما با موفقیت ذخیره شد.",
      });
      
      navigate("/profile");
    } catch (error) {
      console.error("Error updating user profile:", error);
      toast({
        title: "خطا در ذخیره اطلاعات",
        description: "مشکلی در ذخیره اطلاعات شخصی شما پیش آمد.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  const goBack = () => {
    navigate(-1);
  };
  
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="mr-2">در حال بارگذاری اطلاعات...</span>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen p-4">
      <Button 
        variant="ghost" 
        className="mb-4" 
        onClick={goBack}
      >
        <ArrowLeft className="ml-2" />
        بازگشت
      </Button>
      
      <div className="max-w-md mx-auto">
        <Card className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">اطلاعات شخصی</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">نام و نام خانوادگی</Label>
                <Input
                  id="name"
                  value={userData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="نام و نام خانوادگی"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="goal">هدف</Label>
                <Select
                  value={userData.goal}
                  onValueChange={(value) => handleChange('goal', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="انتخاب هدف" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weight_loss">کاهش وزن</SelectItem>
                    <SelectItem value="muscle_gain">افزایش عضله</SelectItem>
                    <SelectItem value="maintenance">حفظ وضعیت</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="height">قد (سانتی‌متر)</Label>
                <Input
                  id="height"
                  type="number"
                  value={userData.height}
                  onChange={(e) => handleChange("height", e.target.value)}
                  placeholder="قد به سانتی‌متر"
                  min="100"
                  max="250"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="currentWeight">وزن فعلی (کیلوگرم)</Label>
                <Input
                  id="currentWeight"
                  type="number"
                  value={userData.currentWeight}
                  onChange={(e) => handleChange("currentWeight", e.target.value)}
                  placeholder="وزن فعلی به کیلوگرم"
                  min="30"
                  max="250"
                  step="0.1"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="targetWeight">وزن هدف (کیلوگرم)</Label>
                <Input
                  id="targetWeight"
                  type="number"
                  value={userData.targetWeight}
                  onChange={(e) => handleChange("targetWeight", e.target.value)}
                  placeholder="وزن هدف به کیلوگرم"
                  min="30"
                  max="250"
                  step="0.1"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="birthDate">تاریخ تولد</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={userData.birthDate}
                  onChange={(e) => handleChange("birthDate", e.target.value)}
                  placeholder="تاریخ تولد"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">جنسیت</Label>
                <Select
                  value={userData.gender}
                  onValueChange={(value) => handleChange('gender', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="انتخاب جنسیت" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">مرد</SelectItem>
                    <SelectItem value="female">زن</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                type="submit" 
                className={`w-full ${theme === 'dark' ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    در حال ذخیره...
                  </>
                ) : (
                  <>
                    <Save className="ml-2 h-4 w-4" />
                    ذخیره اطلاعات
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PersonalInfo;
