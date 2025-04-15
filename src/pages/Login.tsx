
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "@/context/ThemeContext";
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { theme, getButtonGradient, getTextColor } = useTheme();
  
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

  const goToNewRegistrationFlow = () => {
    navigate("/register");
  };

  return (
    <div className="flex min-h-screen items-center justify-center galaxy-background relative">
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>
      <Card className={`w-full max-w-md backdrop-blur-md border-gray-800 shadow-2xl mx-4 my-8 ${theme === 'dark' ? 'bg-black/70' : 'bg-white/70'}`}>
        <CardHeader className="text-center pt-8">
          <div className="flex justify-center mb-6">
            <div className="h-24 w-24 rounded-full bg-yellow-500 flex items-center justify-center shadow-lg">
              <img 
                src="/lovable-uploads/black-logo.png" 
                alt="Lift Legends" 
                className="h-16 w-16" 
              />
            </div>
          </div>
          <CardTitle className={`text-3xl font-extrabold ${getTextColor()}`}>لیفت لجندز</CardTitle>
          <CardDescription className={`text-lg mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            قدرتمندترین اپلیکیشن بدنسازی
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 px-8 pb-8">
          <Button 
            className={`w-full py-6 text-white text-lg font-bold rounded-xl shadow-lg ${getButtonGradient()}`}
            onClick={goToNewRegistrationFlow}
          >
            بزن بریم
          </Button>
          
          <Button 
            variant="outline" 
            className={`w-full py-6 text-lg font-bold rounded-xl border ${theme === 'dark' ? 'text-white border-gray-700 hover:bg-gray-800' : 'text-black border-gray-300 hover:bg-gray-100'}`}
            onClick={goToPhoneLogin}
          >
            من اکانت دارم
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
