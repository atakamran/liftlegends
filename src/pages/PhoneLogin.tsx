
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import PhoneStep from "@/components/registration/PhoneStep";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/context/ThemeContext";
import "./Login.css";

// User interface based on the application's user structure
interface User {
  phoneNumber: string;
  password: string;
  name?: string;
  age?: number;
  gender?: string;
  currentWeight?: string;
  height?: string;
  targetWeight?: string;
  activityLevel?: string;
  goal?: string;
  subscription_plan?: string;
  permissions?: string;
  createdAt?: string;
}

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
    const storedUsers: User[] = localStorage.getItem("users") ? 
      JSON.parse(localStorage.getItem("users") || "[]") : [];
    
    // Find user by phone number
    const user = storedUsers.find((u: User) => u.phoneNumber === phoneNumber);
    
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
    <div className="flex flex-col min-h-screen galaxy-background">
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>
      <div className="relative w-full py-6 px-4 flex justify-between items-center z-10">
        <button 
          onClick={() => navigate("/")} 
          className="text-white hover:text-gray-200 transition-colors flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          برگشت
        </button>
        <div className="text-white text-lg font-bold">ورود با شماره</div>
      </div>
      
      <div className="flex-1 flex items-center justify-center">
      <Card className={`w-full max-w-md mx-4 mb-16 backdrop-blur-md border-0 shadow-2xl ${theme === 'dark' ? 'bg-black/70' : 'bg-white/70'}`}>
        <div className={`h-1 w-full ${theme === 'dark' ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' : 'bg-gradient-to-r from-gray-800 to-black'}`}></div>
        <CardContent className="p-6">
          <div className="text-center mb-8">
            <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              ورود به حساب کاربری
            </h1>
            <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              برای استفاده از امکانات لیفت لجندز وارد شوید
            </p>
          </div>
          
          <PhoneStep
            phoneNumber={phoneNumber}
            updatePhoneNumber={handlePhoneNumberChange}
            password={password}
            updatePassword={handlePasswordChange}
            onSendCode={handleLogin}
            isLoading={isLoading}
            isDarkTheme={theme === 'dark'}
          />
          
          <div className="mt-6 text-center">
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              حساب کاربری ندارید؟{" "}
              <button 
                onClick={() => navigate("/registration")} 
                className={`${theme === 'dark' ? 'text-yellow-400' : 'text-black'} font-semibold hover:underline`}
              >
                ثبت‌نام کنید
              </button>
            </p>
            <button 
              onClick={() => toast({ title: "به زودی", description: "این قابلیت به زودی اضافه خواهد شد." })} 
              className={`text-sm mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} hover:underline`}
            >
              رمز عبور خود را فراموش کرده‌اید؟
            </button>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
};

export default PhoneLogin;
