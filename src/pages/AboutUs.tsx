
import React from "react";
import AppLayout from "@/components/Layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dumbbell, Star, Trophy, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto pb-12 px-4 text-center">
        <h1 className="text-2xl font-bold mb-6 rtl:text-right">درباره ما</h1>

        {/* Logo Section */}
        <div className="mb-12 py-10 flex justify-center">
          <div className="w-32 h-32 bg-black rounded-full flex items-center justify-center">
            <div className="text-white">
              <svg
                width="80"
                height="80"
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="20" y="30" width="80" height="15" rx="7.5" fill="white" />
                <path
                  d="M75 55 L100 80 L75 105 L50 80 Z"
                  fill="white"
                  transform="rotate(-45 75 80)"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* App Description */}
        <Card className="mb-6 bg-black text-white">
          <CardContent className="p-8">
            <div className="space-y-4 rtl:text-right">
              <p className="text-lg leading-relaxed">
                اپلیکیشن <span className="text-purple-400 font-bold">لیفت لجندز</span> یک ابزار قدرتمند برای مدیریت سلامت، افزایش قدرت و تناسب اندام است.
              </p>
              <p className="text-lg leading-relaxed">
                این برنامه به شما کمک می‌کند تا میزان پیشرفت خود را در طول روز اندازه گیری کنید و در مسیر قهرمان شدن گام بردارید.
              </p>
              <p className="text-lg leading-relaxed">
                هدف تیم لیفت لجندز از توسعه این اپلیکیشن ارائه یک راهکار ساده و جامع برای مدیریت سلامت و دستیابی به اهداف بدنسازی کاربران است.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-purple-900 to-black text-white">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Dumbbell className="h-12 w-12 mb-4" />
              <h3 className="text-xl font-semibold mb-2">برنامه تمرینی شخصی</h3>
              <p>برنامه تمرینی منحصر به فرد بر اساس نیازها و اهداف شما</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900 to-black text-white">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Trophy className="h-12 w-12 mb-4" />
              <h3 className="text-xl font-semibold mb-2">پیگیری پیشرفت</h3>
              <p>ثبت و تحلیل پیشرفت تمرینی شما برای رسیدن به اهداف</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900 to-black text-white">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Star className="h-12 w-12 mb-4" />
              <h3 className="text-xl font-semibold mb-2">مشاوره تخصصی</h3>
              <p>دریافت مشاوره از متخصصین تغذیه و تمرین</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900 to-black text-white">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Users className="h-12 w-12 mb-4" />
              <h3 className="text-xl font-semibold mb-2">جامعه ورزشی</h3>
              <p>عضویت در جامعه ورزشکاران برای انگیزه و حمایت بیشتر</p>
            </CardContent>
          </Card>
        </div>

        {/* Contact Button */}
        <Button 
          onClick={() => navigate("/contact")} 
          className="w-full py-6 text-lg bg-white text-black hover:bg-gray-200 rounded-full"
        >
          ارتباط با تیم لیفت لجندز
        </Button>
      </div>
    </AppLayout>
  );
};

export default AboutUs;
