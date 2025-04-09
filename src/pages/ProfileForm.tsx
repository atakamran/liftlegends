
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";

const ProfileForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form data state
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
    dietaryRestrictions: [],
    sleepHours: "",
    stressLevel: "",

    // Equipment Access
    equipmentAccess: "",

    // Supplements and Steroids
    takesSupplements: "",
    steroidsInterest: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Check required fields
    const requiredFields = ["name", "gender", "age", "height", "weight", "primaryGoal", "fitnessLevel"];
    const isValid = requiredFields.every((field) => !!formData[field as keyof typeof formData]);

    if (isValid) {
      // Simulate form processing
      setTimeout(() => {
        setIsSubmitting(false);
        toast({
          title: "اطلاعات شما ثبت شد",
          description: "در حال هدایت به صفحه پرداخت...",
        });
        navigate("/payment");
      }, 1000);
    } else {
      setIsSubmitting(false);
      toast({
        title: "لطفاً فرم را کامل کنید",
        description: "فیلدهای ضروری را پر کنید",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="flex flex-col items-center mb-4 mt-6">
        <img
          src="/lovable-uploads/28fee595-d948-482e-8443-851c3a7b07c3.png"
          alt="Lift Legends Logo"
          className="h-16 w-16 mb-2"
        />
        <h1 className="text-2xl font-bold">فرم اطلاعات</h1>
      </div>

      <Card className="w-full max-w-3xl mb-10">
        <CardHeader>
          <CardTitle>پروفایل تمرینی</CardTitle>
          <CardDescription>لطفاً اطلاعات خود را وارد کنید تا برنامه مناسب شما را تهیه کنیم</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Section 1: Personal Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">۱. اطلاعات شخصی</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">نام</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="نام و نام خانوادگی"
                    required
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
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="prefer-not-to-say" id="prefer-not-to-say" />
                      <Label htmlFor="prefer-not-to-say" className="mr-2">ترجیح نمی‌دهم بگویم</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="age">سن</Label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      value={formData.age}
                      onChange={handleChange}
                      placeholder="سن"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="height">قد (سانتی‌متر)</Label>
                    <Input
                      id="height"
                      name="height"
                      type="number"
                      value={formData.height}
                      onChange={handleChange}
                      placeholder="قد به سانتی‌متر"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="weight">وزن (کیلوگرم)</Label>
                    <Input
                      id="weight"
                      name="weight"
                      type="number"
                      value={formData.weight}
                      onChange={handleChange}
                      placeholder="وزن به کیلوگرم"
                      required
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
                    <RadioGroupItem value="strength" id="strength" />
                    <Label htmlFor="strength" className="mr-2">افزایش قدرت</Label>
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

            {/* Section 3: Fitness Level */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">۳. سطح آمادگی فعلی</h2>
              <div>
                <RadioGroup
                  value={formData.fitnessLevel}
                  onValueChange={(value) => handleSelectChange("fitnessLevel", value)}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="beginner" id="beginner" />
                    <Label htmlFor="beginner" className="mr-2">مبتدی</Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="intermediate" id="intermediate" />
                    <Label htmlFor="intermediate" className="mr-2">متوسط</Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="advanced" id="advanced" />
                    <Label htmlFor="advanced" className="mr-2">پیشرفته</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Section 4: Exercise Experience */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">۴. تجربه ورزشی</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="yearsOfTraining">چند سال تمرین می‌کنید؟</Label>
                  <Select 
                    value={formData.yearsOfTraining} 
                    onValueChange={(value) => handleSelectChange("yearsOfTraining", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="انتخاب کنید" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="less-than-1">کمتر از یک سال</SelectItem>
                      <SelectItem value="1-3">۱ تا ۳ سال</SelectItem>
                      <SelectItem value="3-5">۳ تا ۵ سال</SelectItem>
                      <SelectItem value="more-than-5">بیشتر از ۵ سال</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="trainingDaysPerWeek">چند روز در هفته تمرین دارید؟</Label>
                  <Select 
                    value={formData.trainingDaysPerWeek} 
                    onValueChange={(value) => handleSelectChange("trainingDaysPerWeek", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="انتخاب کنید" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-2">۱ تا ۲ روز</SelectItem>
                      <SelectItem value="3-4">۳ تا ۴ روز</SelectItem>
                      <SelectItem value="5-6">۵ تا ۶ روز</SelectItem>
                      <SelectItem value="daily">هر روز</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="currentTrainingType">نوع تمرینات فعلی</Label>
                <Select 
                  value={formData.currentTrainingType} 
                  onValueChange={(value) => handleSelectChange("currentTrainingType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="انتخاب کنید" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bodybuilding">بدنسازی</SelectItem>
                    <SelectItem value="powerlifting">پاورلیفتینگ</SelectItem>
                    <SelectItem value="crossfit">کراس‌فیت</SelectItem>
                    <SelectItem value="calisthenics">کالیستنیکس</SelectItem>
                    <SelectItem value="home-workout">تمرین در خانه</SelectItem>
                    <SelectItem value="other">سایر</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Section 5: Physical Condition */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">۵. اطلاعات بدنی و فیزیکی</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bodyFatPercentage">درصد چربی بدن (اختیاری)</Label>
                  <Input
                    id="bodyFatPercentage"
                    name="bodyFatPercentage"
                    type="text"
                    value={formData.bodyFatPercentage}
                    onChange={handleChange}
                    placeholder="اگر می‌دانید وارد کنید"
                  />
                </div>
                
                <div>
                  <Label htmlFor="weakPoints">نقاط ضعف</Label>
                  <Select 
                    value={formData.weakPoints} 
                    onValueChange={(value) => handleSelectChange("weakPoints", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="انتخاب کنید" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="chest">سینه</SelectItem>
                      <SelectItem value="back">پشت</SelectItem>
                      <SelectItem value="shoulders">شانه‌ها</SelectItem>
                      <SelectItem value="arms">بازوها</SelectItem>
                      <SelectItem value="abs">شکم</SelectItem>
                      <SelectItem value="legs">پاها</SelectItem>
                      <SelectItem value="other">سایر</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="injuryHistory">سابقه مصدومیت (اختیاری)</Label>
                <Textarea
                  id="injuryHistory"
                  name="injuryHistory"
                  value={formData.injuryHistory}
                  onChange={handleChange}
                  placeholder="اگر سابقه آسیب دیدگی یا مصدومیت دارید، شرح دهید"
                  className="h-20"
                />
              </div>
            </div>

            {/* Section 6: Nutrition and Lifestyle */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">۶. تغذیه و سبک زندگی</h2>
              <div>
                <Label htmlFor="currentDiet">وضعیت فعلی تغذیه</Label>
                <Select 
                  value={formData.currentDiet} 
                  onValueChange={(value) => handleSelectChange("currentDiet", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="انتخاب کنید" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">غذای معمولی</SelectItem>
                    <SelectItem value="high-protein">پرپروتئین</SelectItem>
                    <SelectItem value="keto">کتوژنیک</SelectItem>
                    <SelectItem value="low-carb">کم کربوهیدرات</SelectItem>
                    <SelectItem value="vegetarian">گیاهخواری</SelectItem>
                    <SelectItem value="vegan">وگان</SelectItem>
                    <SelectItem value="other">سایر</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>محدودیت‌های غذایی</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 mt-2 gap-2">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Checkbox 
                      id="lactose" 
                      checked={formData.dietaryRestrictions.includes('lactose')}
                      onCheckedChange={(checked) => 
                        handleCheckboxChange("dietaryRestrictions", "lactose", checked as boolean)
                      }
                    />
                    <Label htmlFor="lactose" className="mr-2">عدم تحمل لاکتوز</Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Checkbox 
                      id="gluten" 
                      checked={formData.dietaryRestrictions.includes('gluten')}
                      onCheckedChange={(checked) => 
                        handleCheckboxChange("dietaryRestrictions", "gluten", checked as boolean)
                      }
                    />
                    <Label htmlFor="gluten" className="mr-2">حساسیت به گلوتن</Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Checkbox 
                      id="nuts" 
                      checked={formData.dietaryRestrictions.includes('nuts')}
                      onCheckedChange={(checked) => 
                        handleCheckboxChange("dietaryRestrictions", "nuts", checked as boolean)
                      }
                    />
                    <Label htmlFor="nuts" className="mr-2">آلرژی به آجیل</Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Checkbox 
                      id="other-allergy" 
                      checked={formData.dietaryRestrictions.includes('other-allergy')}
                      onCheckedChange={(checked) => 
                        handleCheckboxChange("dietaryRestrictions", "other-allergy", checked as boolean)
                      }
                    />
                    <Label htmlFor="other-allergy" className="mr-2">سایر</Label>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sleepHours">ساعت خواب میانگین در شبانه‌روز</Label>
                  <Select 
                    value={formData.sleepHours} 
                    onValueChange={(value) => handleSelectChange("sleepHours", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="انتخاب کنید" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="less-than-5">کمتر از ۵ ساعت</SelectItem>
                      <SelectItem value="5-6">۵ تا ۶ ساعت</SelectItem>
                      <SelectItem value="7-8">۷ تا ۸ ساعت</SelectItem>
                      <SelectItem value="more-than-8">بیشتر از ۸ ساعت</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="stressLevel">میزان استرس / فشار کاری</Label>
                  <Select 
                    value={formData.stressLevel} 
                    onValueChange={(value) => handleSelectChange("stressLevel", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="انتخاب کنید" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">کم</SelectItem>
                      <SelectItem value="moderate">متوسط</SelectItem>
                      <SelectItem value="high">زیاد</SelectItem>
                      <SelectItem value="very-high">خیلی زیاد</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Section 7: Equipment Access */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">۷. دسترسی به تجهیزات</h2>
              <div>
                <RadioGroup
                  value={formData.equipmentAccess}
                  onValueChange={(value) => handleSelectChange("equipmentAccess", value)}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="gym" id="gym" />
                    <Label htmlFor="gym" className="mr-2">باشگاه کامل</Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="home-equipment" id="home-equipment" />
                    <Label htmlFor="home-equipment" className="mr-2">تجهیزات خانگی</Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="no-equipment" id="no-equipment" />
                    <Label htmlFor="no-equipment" className="mr-2">تمرین بدون تجهیزات</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Section 8: Supplements and Steroids */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">۸. مکمل و استروئید</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="takesSupplements">مصرف مکمل فعلی؟</Label>
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
                  <Label htmlFor="steroidsInterest">تمایل به استفاده از استروئید تحت نظر؟</Label>
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
                      <SelectItem value="need-more-info">اطلاعات بیشتر لازم دارم</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <CardFooter className="px-0 pt-4">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "در حال ثبت اطلاعات..." : "ادامه و پرداخت"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileForm;
