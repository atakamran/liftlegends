import React from "react";
import AppLayout from "@/components/Layout/AppLayout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";

const AboutUs = () => {
  const navigate = useNavigate();
  const { theme } = useTheme(); // Access theme from ThemeContext

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto pb-28">
        <div className="flex flex-col items-center mb-10">
          <div className="w-24 h-24 mb-6 flex items-center justify-center">
            <img 
              src={theme === 'dark' ? '/lovable-uploads/white-logo.png' : '/lovable-uploads/black-logo.png'} 
              alt="Lift Legends Logo" 
              className="w-full h-auto"
            />
          </div>
          <h1 className="text-3xl font-bold mb-2">درباره لیفت لجندز</h1>
          <div className="w-16 h-1 bg-black dark:bg-white mb-6"></div>
        </div>

        <div className="space-y-6 text-right px-4">
          <p className="text-lg leading-relaxed">
            اپلیکیشن لیفت لجندز یک ابزار قدرتمند برای مدیریت سلامت، کاهش یا افزایش وزن است.
          </p>
          
          <p className="text-lg leading-relaxed">
            این برنامه به شما کمک می‌کند تا تمرینات بدنسازی خود را در طول روز اندازه‌گیری کنید و در مسیر هدفتون گام بردارید.
          </p>
          
          <p className="text-lg leading-relaxed">
            هدف تیم لیفت لجندز از توسعه این اپلیکیشن ارائه یک راهکار ساده و جامع برای مدیریت سلامت و بهبود عملکرد ورزشی کاربران است.
          </p>
          
          <div className="my-8">
            <h2 className="text-2xl font-bold mb-4">ویژگی‌های اصلی:</h2>
            <ul className="list-disc pr-5 space-y-2">
              <li>دسترسی به بیش از ۱۰۰ تمرین با جزئیات کامل</li>
              <li>ساخت برنامه تمرینی اختصاصی با هوش مصنوعی</li>
              <li>پیگیری پیشرفت و ثبت رکوردهای تمرینی</li>
              <li>برنامه‌های غذایی متناسب با هدف شما</li>
              <li>مشاوره در زمینه مکمل‌های ورزشی</li>
            </ul>
          </div>
          
          <p className="text-lg leading-relaxed">
            با استفاده از لیفت لجندز، شما قادر خواهید بود به اهداف خود در زمینه تناسب اندام، افزایش قدرت و بهبود عملکرد ورزشی دست پیدا کنید.
          </p>
        </div>
        
        <div className="mt-10 flex justify-center">
          <Button
            onClick={() => navigate('/profile')}
            className="px-8 py-6 text-lg"
          >
            ارتباط با تیم لیفت لجندز
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default AboutUs;
