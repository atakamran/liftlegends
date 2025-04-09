
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { useToast } from "@/hooks/use-toast";

const ProfileForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form data state
  const [formData, setFormData] = useState({
    gender: "",
    age: "",
    height: "",
    weight: "",
    goal: "",
    fitnessLevel: "",
    trainingDays: "",
    trainingPlace: "",
    dietaryRestrictions: "no",
    supplements: "no",
    steroids: "no",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Check required fields
    const requiredFields = ["gender", "age", "height", "weight", "goal", "fitnessLevel", "trainingDays", "trainingPlace"];
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

      <Card className="w-full max-w-md mb-10">
        <CardHeader>
          <CardTitle>پروفایل تمرینی</CardTitle>
          <CardDescription>لطفاً اطلاعات خود را وارد کنید تا برنامه مناسب شما را تهیه کنیم</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 1. جنسیت: مرد / زن */}
            <div className="space-y-2">
              <Label>۱. جنسیت</Label>
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

            {/* 2. سن: (ورودی عددی) */}
            <div className="space-y-2">
              <Label htmlFor="age">۲. سن</Label>
              <Input
                id="age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                placeholder="سن خود را وارد کنید"
              />
            </div>

            {/* 3. قد و وزن: (سانتی‌متر و کیلوگرم) */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="height">۳. قد (سانتی‌متر)</Label>
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

            {/* 4. هدف اصلی */}
            <div className="space-y-2">
              <Label htmlFor="goal">۴. هدف اصلی</Label>
              <Select
                value={formData.goal}
                onValueChange={(value) => handleSelectChange("goal", value)}
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

            {/* 5. سطح آمادگی: مبتدی / متوسط / پیشرفته */}
            <div className="space-y-2">
              <Label htmlFor="fitnessLevel">۵. سطح آمادگی</Label>
              <Select
                value={formData.fitnessLevel}
                onValueChange={(value) => handleSelectChange("fitnessLevel", value)}
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

            {/* 6. تعداد روزهای تمرین در هفته: 1 تا 7 */}
            <div className="space-y-2">
              <Label htmlFor="trainingDays">۶. تعداد روزهای تمرین در هفته</Label>
              <Select
                value={formData.trainingDays}
                onValueChange={(value) => handleSelectChange("trainingDays", value)}
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

            {/* 7. مکان تمرین: باشگاه / خانه / بدون تجهیزات */}
            <div className="space-y-2">
              <Label htmlFor="trainingPlace">۷. مکان تمرین</Label>
              <Select
                value={formData.trainingPlace}
                onValueChange={(value) => handleSelectChange("trainingPlace", value)}
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

            {/* 8. محدودیت غذایی: دارد / ندارد */}
            <div className="space-y-2">
              <Label>۸. محدودیت غذایی</Label>
              <RadioGroup
                value={formData.dietaryRestrictions}
                onValueChange={(value) => handleSelectChange("dietaryRestrictions", value)}
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

            {/* 9. مکمل مصرف می‌کنی؟ بله / نه */}
            <div className="space-y-2">
              <Label>۹. مکمل مصرف می‌کنی؟</Label>
              <RadioGroup
                value={formData.supplements}
                onValueChange={(value) => handleSelectChange("supplements", value)}
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

            {/* 10. مایل به استفاده از استروئید هستی؟ بله / نه / نمی‌دونم */}
            <div className="space-y-2">
              <Label>۱۰. مایل به استفاده از استروئید هستی؟</Label>
              <RadioGroup
                value={formData.steroids}
                onValueChange={(value) => handleSelectChange("steroids", value)}
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
                  <RadioGroupItem value="dont-know" id="steroids-dont-know" />
                  <Label htmlFor="steroids-dont-know" className="mr-2">نمی‌دونم</Label>
                </div>
              </RadioGroup>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            onClick={handleSubmit} 
            disabled={isSubmitting}
          >
            {isSubmitting ? "در حال ثبت اطلاعات..." : "ادامه و پرداخت"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfileForm;
