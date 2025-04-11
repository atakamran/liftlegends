import React, { useState, useEffect } from "react";
import AppLayout from "@/components/Layout/AppLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/integrations/firebase/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/integrations/firebase/firebaseConfig";

const Profile = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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
    steroids_interest: "",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      const user = auth.currentUser;
      if (!user) {
        setLoading(false);
        return;
      }

      const profileRef = doc(db, "user_profiles", user.uid);
      const profileSnap = await getDoc(profileRef);
      if (profileSnap.exists()) {
        const data = profileSnap.data();
        setFormData((prev) => ({
          ...prev,
          ...data,
        }));
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

  if (loading) {
    return <p>در حال بارگذاری...</p>;
  }

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto pb-12">
        <h1 className="text-2xl font-bold mb-6">پروفایل من</h1>
        <Card>
          <CardHeader>
            <CardTitle>اطلاعات پروفایل</CardTitle>
            <CardDescription>اطلاعات خود را وارد کنید.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">نام</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="نام خود را وارد کنید"
                />
              </div>

              <div>
                <Label>جنسیت</Label>
                <RadioGroup
                  value={formData.gender}
                  onValueChange={(value) => handleSelectChange("gender", value)}
                  className="flex space-x-4"
                >
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">مرد</Label>
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">زن</Label>
                </RadioGroup>
              </div>

              <div>
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

              <div>
                <Label htmlFor="height">قد (سانتی‌متر)</Label>
                <Input
                  id="height"
                  name="height"
                  type="number"
                  value={formData.height}
                  onChange={handleChange}
                  placeholder="قد خود را وارد کنید"
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
                  placeholder="وزن خود را وارد کنید"
                />
              </div>

              <div>
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
                    <SelectItem value="fitness">تناسب اندام</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" disabled={saving}>
                {saving ? "در حال ذخیره..." : "ذخیره پروفایل"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Profile;
