
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "@/context/ThemeContext";

const Login = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  useEffect(() => {
    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      navigate("/home");
    }
  }, [navigate]);

  const goToPhoneLogin = () => {
    navigate("/phone-login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-cover bg-center">
      <div className="absolute inset-0 pointer-events-none"></div>
      <Card className={`w-full max-w-md backdrop-blur-md border-gray-200 shadow-lg mx-4 my-8 ${theme === 'dark' ? 'bg-black/70 text-white' : 'bg-white/70 text-black'}`}>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img 
              src={theme === 'dark' ? "/lovable-uploads/white-logo.png" : "/lovable-uploads/black-logo.png"} 
              alt="Lift Legends" 
              className="h-16 w-16" 
            />
          </div>
          <CardTitle className={`text-2xl font-extrabold`}>لیفت لجندز</CardTitle>
          <CardDescription className={`text-lg`}>هدف خود را انتخاب کنید: کاهش، حفظ یا افزایش وزن</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            className={`w-full rounded-full text-lg font-semibold py-3 ${theme === 'dark' ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}
            onClick={goToPhoneLogin}
          >
            شروع با شماره موبایل
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
