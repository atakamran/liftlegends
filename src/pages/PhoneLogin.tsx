
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import PhoneStep from "@/components/registration/PhoneStep";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/context/ThemeContext";
import "./Login.css";

const PhoneLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  
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
    const numbersOnly = value.replace(/[^0-9]/g, "");
    setPhoneNumber(numbersOnly);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleLogin = () => {
    if (!phoneNumber || phoneNumber.length < 11 || !phoneNumber.startsWith("09")) {
      toast({
        title: "شماره موبایل نامعتبر",
        description: "لطفاً یک شماره موبایل معتبر وارد کنید.",
        variant: "destructive",
      });
      return;
    }

    if (!password || password.length < 4) {
      toast({
        title: "رمز عبور نامعتبر",
        description: "لطفاً رمز عبور معتبر وارد کنید.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Get user data from localStorage
    const storedUsers = localStorage.getItem("users") ? 
      JSON.parse(localStorage.getItem("users") || "[]") : [];
    
    // Find user by phone number
    const user = storedUsers.find((u: any) => u.phoneNumber === phoneNumber);
    
    setTimeout(() => {
      if (user && user.password === password) {
        // Login successful
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userPhoneNumber", phoneNumber);
        localStorage.setItem("currentUser", JSON.stringify(user));
        
        toast({
          title: "ورود موفق",
          description: "به لیفت لجندز خوش آمدید!",
        });
        
        navigate(getRedirectUrl());
      } else {
        // Login failed
        toast({
          title: "خطای ورود",
          description: "شماره موبایل یا رمز عبور اشتباه است.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
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
      <Card className={`w-full max-w-md mx-4 backdrop-blur-md border-0 shadow-2xl ${theme === 'dark' ? 'bg-black/70' : 'bg-white/70'}`}>
        <CardContent className="p-6">
          <PhoneStep
            phoneNumber={phoneNumber}
            updatePhoneNumber={handlePhoneNumberChange}
            password={password}
            updatePassword={handlePasswordChange}
            onSendCode={handleLogin}
            isLoading={isLoading}
            isDarkTheme={theme === 'dark'}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default PhoneLogin;
