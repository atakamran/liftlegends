import React from "react";
import AppLayout from "@/components/Layout/AppLayout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChevronRight, Users, Dumbbell, Brain, LineChart, Utensils, PlusCircle } from "lucide-react";

const AboutUs = () => {
  const navigate = useNavigate();
  const { theme } = useTheme(); // Access theme from ThemeContext

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto pb-28 px-4">
        {/* Hero Section with Animation */}
        <div className="flex flex-col items-center mb-12 relative">
          <div className="w-28 h-28 mb-6 flex items-center justify-center rounded-full bg-primary/10 p-2 shadow-lg transform hover:scale-105 transition-all duration-300">
            <img 
              src={theme === 'dark' ? '/lovable-uploads/white-logo.png' : '/lovable-uploads/black-logo.png'} 
              alt="Lift Legends Logo" 
              className="w-full h-auto"
            />
          </div>
          <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-l from-primary to-primary/70">درباره لیفت لجندز</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary/40 rounded-full mb-6"></div>
          <Badge variant="secondary" className="mb-4 text-sm py-1 px-3">نسخه ۲.۰</Badge>
        </div>

        {/* Main Content with Tabs */}
        <Tabs defaultValue="about" className="w-full mb-10">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="about" className="text-base">درباره ما</TabsTrigger>
            <TabsTrigger value="features" className="text-base">ویژگی‌ها</TabsTrigger>
            <TabsTrigger value="mission" className="text-base">ماموریت ما</TabsTrigger>
          </TabsList>
          
          {/* About Tab */}
          <TabsContent value="about" className="space-y-6 text-right">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Users className="h-6 w-6 text-primary" />
                  <span>تیم لیفت لجندز</span>
                </CardTitle>
                <CardDescription>
                  همراه شما در مسیر سلامتی و تناسب اندام
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg leading-relaxed">
                  اپلیکیشن لیفت لجندز یک ابزار قدرتمند برای مدیریت سلامت، کاهش یا افزایش وزن است.
                </p>
                
                <p className="text-lg leading-relaxed">
                  این برنامه به شما کمک می‌کند تا تمرینات بدنسازی خود را در طول روز اندازه‌گیری کنید و در مسیر هدفتون گام بردارید.
                </p>
                
                <p className="text-lg leading-relaxed">
                  هدف تیم لیفت لجندز از توسعه این اپلیکیشن ارائه یک راهکار ساده و جامع برای مدیریت سلامت و بهبود عملکرد ورزشی کاربران است.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Features Tab */}
          <TabsContent value="features" className="space-y-6 text-right">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Dumbbell className="h-6 w-6 text-primary" />
                  <span>ویژگی‌های اصلی</span>
                </CardTitle>
                <CardDescription>
                  امکانات پیشرفته برای دستیابی به اهداف ورزشی شما
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-right flex-row-reverse">
                      <div className="flex items-center gap-2">
                        <Dumbbell className="h-5 w-5 text-primary" />
                        <span>دسترسی به بیش از ۱۰۰ تمرین با جزئیات کامل</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-right pr-8">
                      مجموعه کاملی از تمرینات بدنسازی با توضیحات تصویری و ویدیویی که به شما کمک می‌کند تکنیک صحیح را یاد بگیرید.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-right flex-row-reverse">
                      <div className="flex items-center gap-2">
                        <Brain className="h-5 w-5 text-primary" />
                        <span>ساخت برنامه تمرینی اختصاصی با هوش مصنوعی</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-right pr-8">
                      با استفاده از هوش مصنوعی پیشرفته، برنامه‌های تمرینی متناسب با اهداف، سطح آمادگی و محدودیت‌های شما طراحی می‌شود.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-right flex-row-reverse">
                      <div className="flex items-center gap-2">
                        <LineChart className="h-5 w-5 text-primary" />
                        <span>پیگیری پیشرفت و ثبت رکوردهای تمرینی</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-right pr-8">
                      با نمودارهای پیشرفته و سیستم ثبت رکورد، می‌توانید پیشرفت خود را به صورت دقیق پیگیری کنید و از روند بهبود خود آگاه شوید.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4">
                    <AccordionTrigger className="text-right flex-row-reverse">
                      <div className="flex items-center gap-2">
                        <Utensils className="h-5 w-5 text-primary" />
                        <span>برنامه‌های غذایی متناسب با هدف شما</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-right pr-8">
                      برنامه‌های غذایی متنوع و متناسب با اهداف شما، همراه با محاسبه دقیق کالری و ماکرونوترینت‌ها برای دستیابی به بهترین نتایج.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-5">
                    <AccordionTrigger className="text-right flex-row-reverse">
                      <div className="flex items-center gap-2">
                        <PlusCircle className="h-5 w-5 text-primary" />
                        <span>مشاوره در زمینه مکمل‌های ورزشی</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-right pr-8">
                      راهنمایی‌های تخصصی درباره مکمل‌های ورزشی مناسب برای اهداف مختلف، همراه با توصیه‌های کاربردی برای استفاده بهینه.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Mission Tab */}
          <TabsContent value="mission" className="space-y-6 text-right">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <ChevronRight className="h-6 w-6 text-primary" />
                  <span>ماموریت ما</span>
                </CardTitle>
                <CardDescription>
                  چشم‌انداز و هدف تیم لیفت لجندز
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg leading-relaxed">
                  ماموریت ما در لیفت لجندز ایجاد یک پلتفرم جامع و کاربرپسند است که به افراد کمک می‌کند به اهداف تناسب اندام و سلامتی خود دست یابند.
                </p>
                
                <p className="text-lg leading-relaxed">
                  ما معتقدیم که هر فردی، صرف نظر از سطح آمادگی جسمانی، باید به ابزارها و منابع لازم برای بهبود سلامت و عملکرد بدنی خود دسترسی داشته باشد.
                </p>
                
                <p className="text-lg leading-relaxed">
                  با استفاده از لیفت لجندز، شما قادر خواهید بود به اهداف خود در زمینه تناسب اندام، افزایش قدرت و بهبود عملکرد ورزشی دست پیدا کنید.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* CTA Button */}
        <div className="mt-10 flex justify-center">
          <Button
            onClick={() => navigate('/profile')}
            className="px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-primary to-primary/80 hover:scale-105"
          >
            ارتباط با تیم لیفت لجندز
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default AboutUs;
