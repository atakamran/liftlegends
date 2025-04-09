
import React, { useState } from "react";
import AppLayout from "@/components/Layout/AppLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserProfile, ExerciseLevel } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

const Profile = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    age: 25,
    weight: 70,
    height: 175,
    fitnessLevel: "متوسط",
    goals: ["افزایش قدرت", "عضله‌سازی"],
  });

  // Form data for detailed profile
  const [formData, setFormData] = useState({
    // Personal Information
    name: "",
    gender: "",
    age: "",
    height: "",
    weight: "",

    // Primary Goal
    primaryGoal: "",

    // Fitness Level
    fitnessLevel: "",

    // Exercise Experience
    yearsOfTraining: "",
    trainingDaysPerWeek: "",
    currentTrainingType: "",

    // Physical Condition
    bodyFatPercentage: "",
    weakPoints: "",
    injuryHistory: "",

    // Nutrition and Lifestyle
    currentDiet: "",
    dietaryRestrictions: [] as string[],
    sleepHours: "",
    stressLevel: "",

    // Equipment Access
    equipmentAccess: "",

    // Supplements and Steroids
    takesSupplements: "",
    steroidsInterest: "",
  });

  const handleBasicChange = (field: keyof UserProfile, value: any) => {
    setProfile({
      ...profile,
      [field]: value,
    });
  };

  const handleDetailedChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, value: string, checked: boolean) => {
    setFormData((prev) => {
      const current = Array.isArray(prev[name as keyof typeof prev]) 
        ? [...(prev[name as keyof typeof prev] as string[])] 
        : [];
      
      if (checked) {
        return { ...prev, [name]: [...current, value] };
      } else {
        return { ...prev, [name]: current.filter((item) => item !== value) };
      }
    });
  };

  const handleBasicSave = () => {
    console.log("Saving basic profile:", profile);
    
    toast({
      title: "پروفایل پایه ذخیره شد",
      description: "اطلاعات پروفایل پایه شما با موفقیت ذخیره شد.",
    });
  };

  const handleDetailedSave = () => {
    console.log("Saving detailed profile:", formData);
    
    toast({
      title: "پروفایل تخصصی ذخیره شد",
      description: "اطلاعات پروفایل تخصصی شما با موفقیت ذخیره شد.",
    });
  };

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto pb-12">
        <h1 className="text-2xl font-bold mb-6">پروفایل من</h1>
        
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="basic">اطلاعات پایه</TabsTrigger>
            <TabsTrigger value="detailed">اطلاعات تخصصی</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle>اطلاعات شخصی</CardTitle>
                <CardDescription>
                  اطلاعات پایه خود را وارد کنید تا برنامه تمرینی شخصی‌سازی شده دریافت کنید.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="name">نام</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => handleBasicChange("name", e.target.value)}
                    placeholder="نام خود را وارد کنید"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="age">سن</Label>
                    <Input
                      id="age"
                      type="number"
                      value={profile.age}
                      onChange={(e) => handleBasicChange("age", Number(e.target.value))}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="weight">وزن (کیلوگرم)</Label>
                    <Input
                      id="weight"
                      type="number"
                      value={profile.weight}
                      onChange={(e) => handleBasicChange("weight", Number(e.target.value))}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="height">قد (سانتی‌متر)</Label>
                    <Input
                      id="height"
                      type="number"
                      value={profile.height}
                      onChange={(e) => handleBasicChange("height", Number(e.target.value))}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="fitness-level">سطح آمادگی</Label>
                    <Select 
                      value={profile.fitnessLevel}
                      onValueChange={(value) => handleBasicChange("fitnessLevel", value as ExerciseLevel)}
                    >
                      <SelectTrigger id="fitness-level">
                        <SelectValue placeholder="انتخاب سطح" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="مبتدی">مبتدی</SelectItem>
                        <SelectItem value="متوسط">متوسط</SelectItem>
                        <SelectItem value="پیشرفته">پیشرفته</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleBasicSave}>ذخیره پروفایل</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="detailed">
            <Card>
              <CardHeader>
                <CardTitle>پروفایل تخصصی</CardTitle>
                <CardDescription>
                  اطلاعات دقیق‌تر خود را وارد کنید تا برنامه تمرینی کاملاً شخصی‌سازی شده دریافت کنید.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {/* Section 1: Personal Information */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">۱. اطلاعات شخصی</h2>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="detailed-name">نام</Label>
                        <Input
                          id="detailed-name"
                          name="name"
                          value={formData.name}
                          onChange={handleDetailedChange}
                          placeholder="نام و نام خانوادگی"
                        />
                      </div>

                      <div>
                        <Label>جنسیت</Label>
                        <RadioGroup
                          value={formData.gender}
                          onValueChange={(value) => handleSelectChange("gender", value)}
                          className="flex flex-col space-y-1 mt-2"
                        >
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="male" id="male" />
                            <Label htmlFor="male" className="mr-2">مرد</Label>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="female" id="female" />
                            <Label htmlFor="female" className="mr-2">زن</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="detailed-age">سن</Label>
                          <Input
                            id="detailed-age"
                            name="age"
                            type="number"
                            value={formData.age}
                            onChange={handleDetailedChange}
                            placeholder="سن"
                          />
                        </div>
                        <div>
                          <Label htmlFor="detailed-height">قد (سانتی‌متر)</Label>
                          <Input
                            id="detailed-height"
                            name="height"
                            type="number"
                            value={formData.height}
                            onChange={handleDetailedChange}
                            placeholder="قد به سانتی‌متر"
                          />
                        </div>
                        <div>
                          <Label htmlFor="detailed-weight">وزن (کیلوگرم)</Label>
                          <Input
                            id="detailed-weight"
                            name="weight"
                            type="number"
                            value={formData.weight}
                            onChange={handleDetailedChange}
                            placeholder="وزن به کیلوگرم"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Primary Goal */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">۲. هدف اصلی</h2>
                    <div>
                      <RadioGroup
                        value={formData.primaryGoal}
                        onValueChange={(value) => handleSelectChange("primaryGoal", value)}
                        className="flex flex-col space-y-1"
                      >
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <RadioGroupItem value="weight-loss" id="weight-loss" />
                          <Label htmlFor="weight-loss" className="mr-2">کاهش وزن</Label>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <RadioGroupItem value="muscle-gain" id="muscle-gain" />
                          <Label htmlFor="muscle-gain" className="mr-2">افزایش حجم عضلات</Label>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <RadioGroupItem value="competition" id="competition" />
                          <Label htmlFor="competition" className="mr-2">شرکت در مسابقات فیزیک یا بادی‌بیلدینگ</Label>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <RadioGroupItem value="fitness" id="fitness" />
                          <Label htmlFor="fitness" className="mr-2">تناسب اندام و سلامتی عمومی</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  {/* Additional sections from the ProfileForm.tsx... */}
                  {/* Adding remaining sections with condensed UI */}
                  
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">۳. تمرین و آمادگی</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fitnessLevel">سطح آمادگی</Label>
                        <Select 
                          value={formData.fitnessLevel} 
                          onValueChange={(value) => handleSelectChange("fitnessLevel", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="انتخاب کنید" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beginner">مبتدی</SelectItem>
                            <SelectItem value="intermediate">متوسط</SelectItem>
                            <SelectItem value="advanced">پیشرفته</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="trainingDaysPerWeek">روزهای تمرین در هفته</Label>
                        <Select 
                          value={formData.trainingDaysPerWeek} 
                          onValueChange={(value) => handleSelectChange("trainingDaysPerWeek", value)}
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
                    </div>
                    
                    <div>
                      <Label htmlFor="equipmentAccess">مکان تمرین</Label>
                      <RadioGroup
                        value={formData.equipmentAccess}
                        onValueChange={(value) => handleSelectChange("equipmentAccess", value)}
                        className="flex flex-col space-y-1 mt-2"
                      >
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <RadioGroupItem value="gym" id="gym" />
                          <Label htmlFor="gym" className="mr-2">باشگاه</Label>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <RadioGroupItem value="home-equipment" id="home-equipment" />
                          <Label htmlFor="home-equipment" className="mr-2">خانه</Label>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <RadioGroupItem value="no-equipment" id="no-equipment" />
                          <Label htmlFor="no-equipment" className="mr-2">بدون تجهیزات</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">۴. تغذیه و مکمل</h2>
                    <div>
                      <Label>محدودیت غذایی دارید؟</Label>
                      <RadioGroup
                        value={formData.dietaryRestrictions.length > 0 ? "yes" : "no"}
                        onValueChange={(value) => {
                          if (value === "no") {
                            setFormData(prev => ({ ...prev, dietaryRestrictions: [] }));
                          }
                        }}
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
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="takesSupplements">مکمل مصرف می‌کنید؟</Label>
                        <Select 
                          value={formData.takesSupplements} 
                          onValueChange={(value) => handleSelectChange("takesSupplements", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="انتخاب کنید" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">بله</SelectItem>
                            <SelectItem value="no">خیر</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="steroidsInterest">مایل به استفاده از استروئید هستید؟</Label>
                        <Select 
                          value={formData.steroidsInterest} 
                          onValueChange={(value) => handleSelectChange("steroidsInterest", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="انتخاب کنید" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">بله</SelectItem>
                            <SelectItem value="no">خیر</SelectItem>
                            <SelectItem value="need-more-info">نمی‌دانم</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end pt-6">
                <Button onClick={handleDetailedSave}>ذخیره پروفایل تخصصی</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Profile;
