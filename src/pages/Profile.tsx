
import React, { useState } from "react";
import AppLayout from "@/components/Layout/AppLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserProfile, ExerciseLevel } from "@/types";
import { useToast } from "@/hooks/use-toast";

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

  const handleChange = (field: keyof UserProfile, value: any) => {
    setProfile({
      ...profile,
      [field]: value,
    });
  };

  const handleSave = () => {
    // In a real app, this would save to a database
    console.log("Saving profile:", profile);
    
    toast({
      title: "پروفایل ذخیره شد",
      description: "اطلاعات پروفایل شما با موفقیت ذخیره شد.",
    });
  };

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">پروفایل من</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>اطلاعات شخصی</CardTitle>
            <CardDescription>
              اطلاعات خود را وارد کنید تا برنامه تمرینی شخصی‌سازی شده دریافت کنید.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="name">نام</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => handleChange("name", e.target.value)}
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
                  onChange={(e) => handleChange("age", Number(e.target.value))}
                />
              </div>
              
              <div>
                <Label htmlFor="weight">وزن (کیلوگرم)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={profile.weight}
                  onChange={(e) => handleChange("weight", Number(e.target.value))}
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
                  onChange={(e) => handleChange("height", Number(e.target.value))}
                />
              </div>
              
              <div>
                <Label htmlFor="fitness-level">سطح آمادگی</Label>
                <Select 
                  value={profile.fitnessLevel}
                  onValueChange={(value) => handleChange("fitnessLevel", value as ExerciseLevel)}
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
            <Button onClick={handleSave}>ذخیره پروفایل</Button>
          </CardFooter>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Profile;
