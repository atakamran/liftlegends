
import React, { useState } from "react";
import { Send } from "lucide-react";
import AppLayout from "@/components/Layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const AiPlanner = () => {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      toast({
        title: "خطا",
        description: "لطفاً درخواست خود را وارد کنید",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate AI response (in a real app, this would call an API)
    setTimeout(() => {
      let aiResponse = "";
      
      if (prompt.toLowerCase().includes("برنامه غذایی") || prompt.toLowerCase().includes("تغذیه")) {
        aiResponse = `برنامه غذایی پیشنهادی:
        
صبحانه:
- ۳ تخم مرغ کامل
- ۱ لیوان شیر کم چرب
- نان سبوس دار

میان وعده:
- ۱ عدد موز
- ۳۰ گرم آجیل خام

ناهار:
- ۱۵۰ گرم سینه مرغ پخته
- ۱ پیمانه برنج قهوه‌ای
- سالاد سبزیجات با روغن زیتون

عصرانه:
- ۱ عدد سیب
- ۱ قاشق غذاخوری کره بادام زمینی

شام:
- ۱۵۰ گرم ماهی سالمون
- سبزیجات بخارپز
- ۱ عدد سیب زمینی شیرین

قبل از خواب:
- ۱ کاسه ماست یونانی با ۱ قاشق عسل`;
      } else if (prompt.toLowerCase().includes("برنامه تمرینی") || prompt.toLowerCase().includes("تمرین")) {
        aiResponse = `برنامه تمرینی ۵ روز در هفته:

روز اول - سینه و سرشانه:
- پرس سینه: ۴ ست، ۸-۱۲ تکرار
- شنا: ۳ ست، ۱۲-۱۵ تکرار
- پرس سرشانه: ۴ ست، ۸-۱۲ تکرار
- زیربغل سیمکش: ۳ ست، ۱۲-۱۵ تکرار
- نشر از جانب با دمبل: ۳ ست، ۱۲-۱۵ تکرار

روز دوم - پا:
- اسکات: ۴ ست، ۸-۱۲ تکرار
- پرس پا: ۴ ست، ۱۰-۱۲ تکرار
- جلو پا: ۳ ست، ۱۲-۱۵ تکرار
- ساق پا ایستاده: ۴ ست، ۱۵-۲۰ تکرار

روز سوم - پشت و بازو:
- زیربغل لت: ۴ ست، ۸-۱۲ تکرار
- زیربغل دمبل تک دست: ۳ ست، ۱۰-۱۲ تکرار
- جلو بازو لاری: ۳ ست، ۱۰-۱۲ تکرار
- پشت بازو سیمکش: ۳ ست، ۱۲-۱۵ تکرار

روز چهارم - استراحت

روز پنجم - شانه و شکم:
- پرس سرشانه: ۴ ست، ۸-۱۰ تکرار
- نشر از جلو: ۳ ست، ۱۰-۱۲ تکرار
- نشر از جانب: ۳ ست، ۱۰-۱۲ تکرار
- کرانچ شکم: ۴ ست، ۱۵-۲۰ تکرار
- پلانک: ۳ ست، ۳۰-۶۰ ثانیه

روز ششم - پا و ساق:
- اسکات هاکی: ۴ ست، ۸-۱۲ تکرار
- لانگز: ۳ ست، ۱۰-۱۲ تکرار هر پا
- پشت پا: ۳ ست، ۱۲-۱۵ تکرار
- ساق پا نشسته: ۴ ست، ۱۵-۲۰ تکرار

روز هفتم - استراحت`;
      } else {
        aiResponse = "لطفاً درخواست خود را درباره برنامه غذایی یا تمرینی به صورت دقیق‌تر بیان کنید. مثال: 'لطفاً یک برنامه غذایی برای افزایش حجم عضلات به من بدهید' یا 'یک برنامه تمرینی ۳ روزه برای تازه‌کارها می‌خواهم.'";
      }
      
      setResponse(aiResponse);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <AppLayout>
      <div className="flex flex-col space-y-6">
        <h1 className="text-2xl font-bold">مشاور هوش مصنوعی تمرین و تغذیه</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>درخواست خود را وارد کنید</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Textarea
                placeholder="مثال: برنامه غذایی برای افزایش حجم عضلات میخوام یا برنامه تمرینی ۵ روزه برای بدنسازی به من بده"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="h-32"
              />
              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "در حال پردازش..." : (
                  <>
                    <Send className="ml-2 h-4 w-4" />
                    ارسال درخواست
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {response && (
          <Card>
            <CardHeader>
              <CardTitle>پاسخ مشاور هوش مصنوعی</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="whitespace-pre-wrap rounded-md bg-muted p-4">
                {response}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
};

export default AiPlanner;
