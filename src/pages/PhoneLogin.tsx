import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import PhoneStep from "@/components/registration/PhoneStep";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/context/ThemeContext";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/integrations/firebase/firebaseConfig";
import "./Login.css";

const PhoneLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
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
    localStorage.setItem("phoneNumberForVerification", phoneNumber);
    localStorage.setItem("redirectAfterLogin", getRedirectUrl());

    setTimeout(() => {
      setIsLoading(false);
      checkAndLoginWithPassword(phoneNumber);
    }, 1000);
  };

  const checkAndLoginWithPassword = async (phoneNumber: string) => {
    try {
      const docRef = doc(db, "user_profiles", phoneNumber);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("User found, logging in with password...");
        navigate("/home"); // Directly navigate to the home page
      } else {
        console.log("User not found, please register.");
        // Optionally handle the case where the user does not exist
      }
    } catch (error) {
      console.error("Error logging in with password:", error);
    }
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
