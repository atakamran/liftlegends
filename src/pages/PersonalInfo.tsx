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
  const {
    theme,
    getButtonGradient,
    getCardGradient,
    getTextColor,
    getThemeGradient,
  } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [userData, setUserData] = useState({
    name: "",
    goal: "",
    height: "",
    currentWeight: "",
    targetWeight: "",
    age: "",
    gender: "",
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
    setUserData((prev) => ({
      ...prev,
      [field]: value,
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

      // Get current user data from localStorage
      const currentUserData = localStorage.getItem("currentUser");
      let currentUser = {};

      if (currentUserData) {
        currentUser = JSON.parse(currentUserData);
      }

      // Save to localStorage with all existing data
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          ...currentUser,
          ...userData,
          updatedAt: new Date().toISOString(),
        })
      );

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
    <div className={`min-h-screen p-4 ${getThemeGradient()}`}>
      <Button
        variant="ghost"
        className={`mb-4 hover:bg-gray-200/20 transition-all ${getTextColor()}`}
        onClick={goBack}
      >
        <ArrowLeft className="ml-2" />
        بازگشت
      </Button>

      <div className="max-w-md mx-auto">
        <Card className={`${getCardGradient()} shadow-xl overflow-hidden`}>
          <div
            className={`h-2 w-full ${
              theme === "dark"
                ? "bg-gradient-to-r from-yellow-500 to-yellow-600"
                : "bg-gradient-to-r from-yellow-400 to-yellow-500"
            }`}
          ></div>
          <CardHeader className="pb-2">
            <CardTitle
              className={`text-2xl font-bold text-center ${getTextColor()}`}
            >
              اطلاعات شخصی
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* اطلاعات اصلی */}
              <div className="space-y-4 mb-6">
                <h3
                  className={`text-lg font-semibold ${getTextColor()} border-b ${
                    theme === "dark" ? "border-gray-800" : "border-gray-200"
                  } pb-2 mb-2`}
                >
                  اطلاعات اصلی
                </h3>

                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className={`text-sm font-medium ${getTextColor()}`}
                  >
                    نام و نام خانوادگی
                  </Label>
                  <Input
                    id="name"
                    value={userData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="نام و نام خانوادگی"
                    className={`${
                      theme === "dark"
                        ? "bg-gray-800/50 border-gray-700 focus:border-yellow-500"
                        : "bg-gray-50 border-gray-300 focus:border-yellow-500"
                    } transition-all`}
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="age"
                    className={`text-sm font-medium ${getTextColor()}`}
                  >
                    سن
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    value={userData.age}
                    onChange={(e) => handleChange("age", e.target.value)}
                    placeholder="سن شما"
                    min="10"
                    max="100"
                    className={`${
                      theme === "dark"
                        ? "bg-gray-800/50 border-gray-700 focus:border-yellow-500"
                        : "bg-gray-50 border-gray-300 focus:border-yellow-500"
                    } transition-all`}
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="gender"
                    className={`text-sm font-medium ${getTextColor()}`}
                  >
                    جنسیت
                  </Label>
                  <Select
                    value={userData.gender}
                    onValueChange={(value) => handleChange("gender", value)}
                  >
                    <SelectTrigger
                      className={`${
                        theme === "dark"
                          ? "bg-gray-800/50 border-gray-700"
                          : "bg-gray-50 border-gray-300"
                      } transition-all`}
                    >
                      <SelectValue
                        placeholder={userData.gender || "انتخاب جنسیت"}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">👨‍♂️ مرد</SelectItem>
                      <SelectItem value="female">👩‍♀️ زن</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* اطلاعات فیزیکی */}
              <div className="space-y-4 mb-6">
                <h3
                  className={`text-lg font-semibold ${getTextColor()} border-b ${
                    theme === "dark" ? "border-gray-800" : "border-gray-200"
                  } pb-2 mb-2`}
                >
                  اطلاعات فیزیکی
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="height"
                      className={`text-sm font-medium ${getTextColor()}`}
                    >
                      قد (سانتی‌متر)
                    </Label>
                    <Input
                      id="height"
                      type="number"
                      value={userData.height}
                      onChange={(e) => handleChange("height", e.target.value)}
                      placeholder="قد به سانتی‌متر"
                      min="100"
                      max="250"
                      className={`${
                        theme === "dark"
                          ? "bg-gray-800/50 border-gray-700 focus:border-yellow-500"
                          : "bg-gray-50 border-gray-300 focus:border-yellow-500"
                      } transition-all`}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="currentWeight"
                      className={`text-sm font-medium ${getTextColor()}`}
                    >
                      وزن فعلی (کیلوگرم)
                    </Label>
                    <Input
                      id="currentWeight"
                      type="number"
                      value={userData.currentWeight}
                      onChange={(e) =>
                        handleChange("currentWeight", e.target.value)
                      }
                      placeholder="وزن فعلی"
                      min="30"
                      max="250"
                      step="0.1"
                      className={`${
                        theme === "dark"
                          ? "bg-gray-800/50 border-gray-700 focus:border-yellow-500"
                          : "bg-gray-50 border-gray-300 focus:border-yellow-500"
                      } transition-all`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="targetWeight"
                    className={`text-sm font-medium ${getTextColor()}`}
                  >
                    وزن هدف (کیلوگرم)
                  </Label>
                  <Input
                    id="targetWeight"
                    type="number"
                    value={userData.targetWeight}
                    onChange={(e) =>
                      handleChange("targetWeight", e.target.value)
                    }
                    placeholder="وزن هدف به کیلوگرم"
                    min="30"
                    max="250"
                    step="0.1"
                    className={`${
                      theme === "dark"
                        ? "bg-gray-800/50 border-gray-700 focus:border-yellow-500"
                        : "bg-gray-50 border-gray-300 focus:border-yellow-500"
                    } transition-all`}
                  />
                </div>
              </div>

              {/* اهداف تمرینی */}
              <div className="space-y-4 mb-6">
                <h3
                  className={`text-lg font-semibold ${getTextColor()} border-b ${
                    theme === "dark" ? "border-gray-800" : "border-gray-200"
                  } pb-2 mb-2`}
                >
                  اهداف تمرینی
                </h3>

                <div className="space-y-2">
                  <Label
                    htmlFor="goal"
                    className={`text-sm font-medium ${getTextColor()}`}
                  >
                    هدف اصلی شما
                  </Label>
                  <Select
                    value={userData.goal}
                    onValueChange={(value) => handleChange("goal", value)}
                  >
                    <SelectTrigger
                      className={`${
                        theme === "dark"
                          ? "bg-gray-800/50 border-gray-700"
                          : "bg-gray-50 border-gray-300"
                      } transition-all`}
                    >
                      <SelectValue
                        placeholder={userData.goal || "انتخاب هدف"}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weight_loss">⚖️ کاهش وزن</SelectItem>
                      <SelectItem value="muscle_gain">💪 افزایش عضله</SelectItem>
                      <SelectItem value="maintenance">🔄 حفظ وضعیت</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                type="submit"
                className={`w-full h-12 mt-6 ${getButtonGradient()} rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg text-white`}
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    در حال ذخیره...
                  </>
                ) : (
                  <>
                    <Save className="ml-2 h-5 w-5" />
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
