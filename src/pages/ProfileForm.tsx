
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const ProfileForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    weight: "",
    height: "",
    goal: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if all required fields are filled
    const requiredFields = ["name", "age", "gender", "weight", "height", "goal"];
    const isValid = requiredFields.every(field => !!formData[field as keyof typeof formData]);
    
    if (isValid) {
      toast({
        title: "پروفایل ذخیره شد",
        description: "اطلاعات شما با موفقیت ثبت شد.",
      });
      navigate("/payment");
    } else {
      toast({
        title: "خطا در ثبت اطلاعات",
        description: "لطفاً تمام فیلدهای الزامی را پر کنید.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>تکمیل پروفایل</CardTitle>
          <CardDescription>لطفاً اطلاعات خود را وارد کنید تا بتوانیم برنامه مناسب شما را ارائه دهیم</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">نام و نام خانوادگی</Label>
              <Input 
                id="name" 
                value={formData.name}
                onChange={handleChange}
                placeholder="نام و نام خانوادگی خود را وارد کنید"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">سن</Label>
                <Input 
                  id="age" 
                  type="number"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="سن"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gender">جنسیت</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => handleSelectChange("gender", value)}
                >
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="انتخاب جنسیت" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">مرد</SelectItem>
                    <SelectItem value="female">زن</SelectItem>
                    <SelectItem value="other">سایر</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weight">وزن (کیلوگرم)</Label>
                <Input 
                  id="weight" 
                  type="number"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="وزن به کیلوگرم"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="height">قد (سانتیمتر)</Label>
                <Input 
                  id="height" 
                  type="number"
                  value={formData.height}
                  onChange={handleChange}
                  placeholder="قد به سانتیمتر"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="goal">هدف از تمرین</Label>
              <Select
                value={formData.goal}
                onValueChange={(value) => handleSelectChange("goal", value)}
              >
                <SelectTrigger id="goal">
                  <SelectValue placeholder="انتخاب هدف" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weight-loss">کاهش وزن</SelectItem>
                  <SelectItem value="muscle-gain">افزایش توده عضلانی</SelectItem>
                  <SelectItem value="endurance">استقامت</SelectItem>
                  <SelectItem value="overall-fitness">سلامت عمومی</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <CardFooter className="px-0 pt-4">
              <Button type="submit" className="w-full">
                ادامه و پرداخت
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileForm;
