
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import PhoneStep from "@/components/registration/PhoneStep";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/context/ThemeContext";
import "./Login.css"; // Re-use the galaxy animation

const PhoneLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { theme, getCardGradient } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get redirect URL from query params if it exists
  const getRedirectUrl = () => {
    const params = new URLSearchParams(location.search);
    return params.get('redirect') || "/home";
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      navigate(getRedirectUrl());
    }
  }, [navigate]);

  const handlePhoneNumberChange = (value: string) => {
    // Only allow numbers
    const numbersOnly = value.replace(/[^0-9]/g, "");
    setPhoneNumber(numbersOnly);
  };

  const sendVerificationCode = () => {
    if (!phoneNumber || phoneNumber.length < 11 || !phoneNumber.startsWith("09")) {
      toast({
        title: "شماره موبایل نامعتبر",
        description: "لطفاً یک شماره موبایل معتبر وارد کنید.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Store the phone number in localStorage for later use
    localStorage.setItem("phoneNumberForVerification", phoneNumber);
    
    // Store redirect URL for after verification
    localStorage.setItem("redirectAfterLogin", getRedirectUrl());

    setTimeout(() => {
      setIsLoading(false);
      navigate(`/phone-login/verify`);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen items-center justify-center galaxy-background">
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>
      <div className="absolute top-0 left-0 w-full py-6 px-4 flex justify-between items-center z-10">
        <button 
          onClick={() => navigate("/")} 
          className="text-white hover:text-gray-200 transition-colors"
        >
          برگشت به صفحه اصلی
        </button>
      </div>
      <Card className={`w-full max-w-md mx-4 backdrop-blur-md border-0 shadow-2xl ${getCardGradient()} ${theme === 'dark' ? 'bg-black/70' : 'bg-white/70'}`}>
        <CardContent className="p-6">
          <PhoneStep
            phoneNumber={phoneNumber}
            updatePhoneNumber={handlePhoneNumberChange}
            onSendCode={sendVerificationCode}
            isLoading={isLoading}
            isDarkTheme={theme === 'dark'}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default PhoneLogin;
