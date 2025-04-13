
import React, { useState } from "react";
import AppLayout from "@/components/Layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { HeadphonesIcon, Send, Mail, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "پیام شما دریافت شد",
      description: "به زودی با شما تماس خواهیم گرفت.",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto pb-12 px-4">
        <h1 className="text-2xl font-bold mb-6 text-center">ارتباط با ما</h1>

        <Card className="mb-6 bg-gradient-to-r from-purple-900 to-indigo-800 text-white">
          <CardContent className="p-8 text-center">
            <HeadphonesIcon className="h-16 w-16 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">پشتیبانی تیم لیفت لجندز</h2>
            <p className="text-gray-200">
              سوالی دارید؟ نظری دارید؟ تیم ما آماده پاسخگویی به شما است.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <Mail className="h-10 w-10 mx-auto mb-2 text-purple-600" />
              <h3 className="font-medium">ایمیل</h3>
              <p className="text-gray-600 text-sm">info@liftlegends.com</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Phone className="h-10 w-10 mx-auto mb-2 text-purple-600" />
              <h3 className="font-medium">تلفن</h3>
              <p className="text-gray-600 text-sm">021-12345678</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <MapPin className="h-10 w-10 mx-auto mb-2 text-purple-600" />
              <h3 className="font-medium">آدرس</h3>
              <p className="text-gray-600 text-sm">تهران، خیابان ولیعصر</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4">ارسال پیام</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">نام</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="نام خود را وارد کنید"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">ایمیل</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="ایمیل خود را وارد کنید"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">پیام</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="پیام خود را بنویسید"
                  rows={5}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full">
                <Send className="h-4 w-4 mr-2" />
                ارسال پیام
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Contact;
