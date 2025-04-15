
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import VerifyCodeStep from "@/components/registration/VerifyCodeStep";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/context/ThemeContext";
import "./Login.css";

const mockUserProfile = {
  name: "کاربر جدید",
  age: "",
  gender: "",
  height: "",
  weight: "",
  targetWeight: "",
  fitnessLevel: "",
  registeredAt: new Date().toISOString()
};

const VerifyCode = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { theme } = useTheme();

  useEffect(() => {
    const storedPhoneNumber = localStorage.getItem("phoneNumberForVerification");
    
    if (!storedPhoneNumber) {
      toast({
        title: "خطا",
        description: "شماره موبایل یافت نشد. لطفاً دوباره وارد شوید.",
        variant: "destructive",
      });
      navigate("/phone-login");
      return;
    }
    
    setPhoneNumber(storedPhoneNumber);
  }, [navigate, toast]);

  const handleVerifyCode = async () => {
    if (!verificationCode || verificationCode.length < 4) {
      toast({
        title: "کد تأیید نامعتبر",
        description: "لطفاً کد تأیید معتبر وارد کنید.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Accept only "1234" as valid code
      if (verificationCode !== "1234") {
        toast({
          title: "کد تأیید اشتباه",
          description: "کد وارد شده صحیح نیست.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Store user data in localStorage
      const existingUserData = localStorage.getItem(`userProfile_${phoneNumber}`);
      
      if (!existingUserData) {
        localStorage.setItem(`userProfile_${phoneNumber}`, JSON.stringify(mockUserProfile));
      }

      // Set login status
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userPhoneNumber", phoneNumber);
      
      // Clean up
      localStorage.removeItem("phoneNumberForVerification");
      
      toast({
        title: "ورود موفقیت‌آمیز",
        description: "به لیفت لجندز خوش آمدید!",
      });
      
      // Get redirect URL from localStorage or default to home
      const redirectUrl = localStorage.getItem("redirectAfterLogin") || "/home";
      localStorage.removeItem("redirectAfterLogin");
      navigate(redirectUrl);
      
    } catch (error) {
      console.error("Error during verification:", error);
      toast({
        title: "خطا در ورود",
        description: "مشکلی در فرآیند ورود رخ داد. لطفاً دوباره تلاش کنید.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center galaxy-background">
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>
      <div className="absolute top-0 left-0 w-full py-6 px-4 flex justify-between items-center z-10">
        <button 
          onClick={() => navigate("/phone-login")} 
          className="text-white hover:text-gray-200 transition-colors"
        >
          برگشت
        </button>
      </div>
      <Card className={`w-full max-w-md mx-4 backdrop-blur-md border-0 shadow-2xl ${theme === 'dark' ? 'bg-black/70' : 'bg-white/70'}`}>
        <CardContent className="p-6">
          <VerifyCodeStep
            verificationCode={verificationCode}
            updateVerificationCode={setVerificationCode}
            onVerifyCode={handleVerifyCode}
            phoneNumber={phoneNumber}
            isLoading={isLoading}
            isDarkTheme={theme === 'dark'}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyCode;
