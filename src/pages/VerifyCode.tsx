
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import VerifyCodeStep from "@/components/registration/VerifyCodeStep";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/context/ThemeContext";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/integrations/firebase/firebaseConfig";
import "./Login.css"; // Re-use the galaxy animation

const VerifyCode = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { theme, getCardGradient } = useTheme();

  useEffect(() => {
    // Get the phone number from localStorage
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
      // For development purposes, we're accepting "1234" as a valid code
      if (verificationCode !== "1234") {
        toast({
          title: "کد تأیید اشتباه",
          description: "کد وارد شده صحیح نیست.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Check if the user already exists in Firestore
      const userRef = doc(db, "user_profiles", phoneNumber);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        // If user doesn't exist, create a new profile
        await setDoc(userRef, {
          phoneNumber,
          registeredAt: new Date().toISOString(),
          name: "",
        });
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
      
      // Check if there's a pending subscription
      const pendingSubscription = localStorage.getItem("pendingSubscription");
      if (pendingSubscription) {
        localStorage.removeItem("pendingSubscription");
        navigate("/subscription-plans");
        return;
      }
      
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
      <Card className={`w-full max-w-md mx-4 backdrop-blur-md border-0 shadow-2xl ${getCardGradient()} ${theme === 'dark' ? 'bg-black/70' : 'bg-white/70'}`}>
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
