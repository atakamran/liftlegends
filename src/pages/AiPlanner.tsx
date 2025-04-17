import React, { useState, useRef, useEffect } from "react";
import { Send, User, Bot } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import navigate function
import AppLayout from "@/components/Layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getCurrentUserProfile } from "@/services/profileService"; // Import the function to fetch user profile

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const AiPlanner = () => {
  const { toast } = useToast();
  const navigate = useNavigate(); // Initialize navigate function
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "سلام! من دستیار هوش مصنوعی شما در زمینه تمرین و تغذیه هستم. چطور می‌توانم به شما کمک کنم؟",
      sender: "ai",
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

 
  const generateRandomId = () => {
    return Math.random().toString(36).substring(2, 15);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      toast({
        title: "خطا",
        description: "لطفاً پیام خود را وارد کنید",
        variant: "destructive",
      });
      return;
    }

    // Add user message to chat
    const userMessage: Message = {
      id: generateRandomId(),
      content: prompt.trim(),
      sender: "user",
      timestamp: new Date()
    };
    setMessages(prevMessages => [...prevMessages, userMessage]);
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
        aiResponse = "چه کمکی از دست من برمیاد؟ می‌تونم در مورد برنامه‌های تمرینی، برنامه‌های غذایی، یا روش‌های بهبود عملکرد ورزشی به شما مشاوره بدم.";
      }
      
      const aiMessage: Message = {
        id: generateRandomId(),
        content: aiResponse,
        sender: "ai",
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, aiMessage]);
      setIsLoading(false);
      setPrompt("");
    }, 1500);
  };

  return (
    <AppLayout>
      <div className="flex flex-col space-y-4">
        
        <Card className="flex-1">
          <CardHeader>
            {/* <CardTitle>چت با مشاور هوش مصنوعی</CardTitle> */}
          </CardHeader>
          <CardContent className="flex flex-col">
            <ScrollArea className="h-[50vh] pr-4">
              <div className="flex flex-col space-y-4">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`flex items-start gap-2 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
                      <Avatar className="h-8 w-8 mt-0.5">
                        {message.sender === "user" ? (
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        ) : (
                          <AvatarFallback className="bg-slate-700">
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div 
                        className={`rounded-lg px-4 py-2 whitespace-pre-wrap ${
                          message.sender === "user" 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-muted"
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            
            <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
              <Textarea
                placeholder="سوال خود را بنویسید. مثال: برنامه غذایی برای افزایش حجم عضلات می‌خوام..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="flex-1 resize-none"
                rows={3}
              />
              <Button 
                type="submit" 
                className="h-auto self-end px-4"
                disabled={isLoading}
              >
                {isLoading ? "..." : <Send className="h-4 w-4" />}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-slate-50 dark:bg-slate-900">
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-2">پیشنهادات برای پرسش:</h3>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setPrompt("برنامه غذایی برای افزایش حجم عضلات")}
              >
                برنامه غذایی برای افزایش حجم
              </Button>
              <Button 
                variant="outline"
                size="sm" 
                onClick={() => setPrompt("برنامه تمرینی ۵ روزه")}
              >
                برنامه تمرینی ۵ روزه
              </Button>
              <Button 
                variant="outline"
                size="sm" 
                onClick={() => setPrompt("تمرینات مؤثر برای عضلات شکم")}
              >
                تمرینات برای عضلات شکم
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default AiPlanner;
