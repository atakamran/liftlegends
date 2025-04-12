
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send } from "lucide-react";
import { hasFeatureAccess } from "@/services/subscriptionService";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

// Define message types
type MessageType = {
  id: string;
  content: string;
  sender: 'user' | 'advisor';
  timestamp: Date;
};

// Define predefined message options
type PredefinedMessageOption = {
  id: string;
  text: string;
  description?: string;
};

const predefinedMessages: PredefinedMessageOption[] = [
  {
    id: 'weekly',
    text: 'هفته‌ای یکبار تمرین کنم؟',
    description: 'پیشنهاد برای افراد مبتدی'
  },
  {
    id: 'twice_week',
    text: 'هفته‌ای دو بار تمرین کنم؟',
    description: 'پیشنهاد برای افراد با تجربه متوسط'
  },
  {
    id: 'three_week',
    text: 'هفته‌ای سه بار تمرین کنم؟',
    description: 'پیشنهاد برای افراد پیشرفته'
  },
  {
    id: 'split',
    text: 'برنامه اسپلیت چطور است؟',
    description: 'تمرین گروه‌های عضلانی مختلف در روزهای مختلف'
  }
];

// Responses from advisor based on the message sent
const advisorResponses: Record<string, string> = {
  'weekly': 'برای شروع، هفته‌ای یکبار مناسب است. ابتدا با تمرین‌های کل بدن شروع کنید و به مرور زمان تعداد جلسات را افزایش دهید.',
  'twice_week': 'هفته‌ای دو بار تمرین برای افراد با تجربه متوسط مناسب است. می‌توانید بدن را به دو بخش بالاتنه و پایین تنه تقسیم کنید.',
  'three_week': 'هفته‌ای سه بار تمرین برای افراد پیشرفته مناسب است. می‌توانید از برنامه‌های سه روزه مانند Push/Pull/Legs استفاده کنید.',
  'split': 'برنامه اسپلیت برای افراد با تجربه مناسب است. در این روش هر روز یک گروه عضلانی خاص را هدف قرار می‌دهید. برای مثال: روز اول سینه، روز دوم پشت، روز سوم پا و...'
};

export const AdvisorChat: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: '1',
      content: 'سلام! من مشاور تمرین شما هستم. چگونه می‌توانم کمکتان کنم؟',
      sender: 'advisor',
      timestamp: new Date()
    }
  ]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPremiumUser, setIsPremiumUser] = useState<boolean | null>(null);
  const { toast } = useToast();

  // Check if user has premium access
  React.useEffect(() => {
    const checkAccess = async () => {
      try {
        const hasAccess = await hasFeatureAccess('ai_assistant');
        setIsPremiumUser(hasAccess);
      } catch (error) {
        console.error("Error in checking feature access:", error);
        setIsPremiumUser(false);
      }
    };
    
    checkAccess();
  }, []);

  // Handle sending a predefined message
  const handleSendMessage = (messageOption: PredefinedMessageOption) => {
    // Add user message
    const userMessage: MessageType = {
      id: Date.now().toString(),
      content: messageOption.text,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Add advisor response after a small delay
    setTimeout(() => {
      const advisorMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        content: advisorResponses[messageOption.id] || 'متأسفم، نمی‌توانم در این مورد کمک کنم.',
        sender: 'advisor',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, advisorMessage]);
    }, 1000);
  };

  const toggleChat = () => {
    if (!isExpanded && !isPremiumUser) {
      toast({
        title: "دسترسی محدود",
        description: "این ویژگی فقط برای کاربران اشتراک Ultimate در دسترس است.",
        variant: "destructive"
      });
      return;
    }
    
    setIsExpanded(!isExpanded);
  };

  return (
    <Card className="fixed bottom-4 left-4 z-50 shadow-lg transition-all duration-300 overflow-hidden"
      style={{
        width: isExpanded ? '320px' : '60px',
        height: isExpanded ? '400px' : '60px',
      }}>
      
      {isExpanded ? (
        <>
          <CardHeader className="pb-2">
            <CardTitle className="flex justify-between items-center">
              <div>مشاور تمرین</div>
              <Button variant="ghost" size="icon" onClick={toggleChat}>
                <MessageSquare size={20} />
              </Button>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="h-[260px] overflow-y-auto pb-0">
            <div className="flex flex-col gap-3">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={cn(
                    "p-3 rounded-lg max-w-[80%]",
                    message.sender === 'advisor' 
                      ? "bg-muted self-start rounded-tr-xl" 
                      : "bg-primary text-primary-foreground self-end rounded-tl-xl"
                  )}
                >
                  {message.content}
                </div>
              ))}
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col gap-2 pt-4">
            <div className="text-xs text-muted-foreground">پیشنهادات:</div>
            <div className="grid grid-cols-2 gap-2 w-full">
              {predefinedMessages.map((option) => (
                <Button 
                  key={option.id}
                  variant="outline"
                  size="sm"
                  className="text-xs h-auto py-2 justify-start"
                  title={option.description}
                  onClick={() => handleSendMessage(option)}
                >
                  <Send className="h-3 w-3 ml-1" />
                  {option.text.length > 15 ? `${option.text.substring(0, 15)}...` : option.text}
                </Button>
              ))}
            </div>
          </CardFooter>
        </>
      ) : (
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-full w-full rounded-full" 
          onClick={toggleChat}
        >
          <MessageSquare size={24} />
        </Button>
      )}
    </Card>
  );
};

export default AdvisorChat;
