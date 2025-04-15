import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Login = () => {
  const navigate = useNavigate();
  const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const textColor = isDarkMode ? "text-white" : "text-black";

  const goToNewRegistrationFlow = () => {
    navigate("/register");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-cover bg-center">
      <div className="absolute inset-0 pointer-events-none"></div>
      <Card className="w-full max-w-md bg-white/70 backdrop-blur-md border-gray-200 shadow-lg mx-4 my-8">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img 
              src={window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "/lovable-uploads/white-logo.png" : "/lovable-uploads/black-logo.png"} 
              alt="Lift Legends" 
              className="h-16 w-16" 
            />
          </div>
          <CardTitle className={`text-2xl font-extrabold ${textColor}`}>لیفت لجندز</CardTitle>
          <CardDescription className={`text-lg text-muted-foreground ${textColor}`}>هدف خود را انتخاب کنید: کاهش، حفظ یا افزایش وزن</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            className="w-full bg-white text-black rounded-full text-lg font-semibold py-3 transition-colors hover:bg-gray-100"
            onClick={goToNewRegistrationFlow}
          >
            بزن بریم
          </Button>
          <Button 
            variant="outline" 
            className="w-full rounded-full text-lg font-semibold py-3 border-white text-white hover:bg-gray-800"
            onClick={() => navigate('/phone-login')}
          >
            من اکانت دارم
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
