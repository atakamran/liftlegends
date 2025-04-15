
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Alert } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/integrations/firebase/firebaseConfig";
import { useTheme } from "@/context/ThemeContext";
import { Loader2 } from "lucide-react";

const VerifyCode = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { phoneNumber } = location.state || {};
  const { toast } = useToast();
  const { theme } = useTheme();

  const handleVerifyCode = async () => {
    if (!verificationCode || verificationCode.length < 4) {
      setAlert({ type: "error", message: "لطفاً کد تأیید معتبر را وارد کنید." });
      return;
    }

    setIsLoading(true);
    
    try {
      // In a real app, you'd validate the code with Firebase Authentication
      // For demo purposes, we're using "1234" as the verification code
      if (verificationCode === "1234") {
        // Get existing user profile or create new one
        const userRef = doc(db, "user_profiles", phoneNumber);
        const userSnap = await getDoc(userRef);
        
        if (!userSnap.exists()) {
          // If user profile doesn't exist yet, initialize it
          await setDoc(userRef, {
            phoneNumber,
            lastLogin: new Date().toISOString(),
          }, { merge: true });
        } else {
          // Update last login time
          await setDoc(userRef, { 
            lastLogin: new Date().toISOString()
          }, { merge: true });
        }
        
        // Save user info to session/local storage
        localStorage.setItem("userPhoneNumber", phoneNumber);
        localStorage.setItem("isLoggedIn", "true");
        
        toast({
          title: "ورود موفق",
          description: "شما با موفقیت وارد شدید.",
        });
        
        // Check if user has completed their profile
        const userData = userSnap.exists() ? userSnap.data() : null;
        
        if (userData && userData.name) {
          // If profile is complete, go to home
          navigate("/home");
        } else {
          // If profile is incomplete, go to personal info page
          navigate("/personal-info");
        }
      } else {
        setAlert({ type: "error", message: "کد وارد شده صحیح نیست." });
        toast({
          title: "خطا در تایید کد",
          description: "کد وارد شده صحیح نیست.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error during verification:", error);
      setAlert({ type: "error", message: "مشکلی در تایید کد پیش آمد." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = () => {
    toast({
      title: "کد مجدد ارسال شد",
      description: `کد جدید به شماره ${phoneNumber} ارسال شد.`,
    });
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
          <CardTitle className="text-2xl font-extrabold">تایید کد</CardTitle>
          <CardDescription className="text-lg">
            کد تایید ارسال شده به شماره {phoneNumber} را وارد کنید
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {alert.message && (
            <Alert
              variant={alert.type === "error" ? "destructive" : "default"}
              className="mb-4"
            >
              {alert.message}
            </Alert>
          )}
          <div className="w-full mb-8 flex justify-center">
            <InputOTP
              value={verificationCode}
              onChange={setVerificationCode}
              maxLength={4}
              className="gap-3"
            >
              <InputOTPGroup className="rtl">
                <InputOTPSlot index={0} className={`h-16 w-14 text-xl ${theme === 'dark' ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`} />
                <InputOTPSlot index={1} className={`h-16 w-14 text-xl ${theme === 'dark' ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`} />
                <InputOTPSlot index={2} className={`h-16 w-14 text-xl ${theme === 'dark' ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`} />
                <InputOTPSlot index={3} className={`h-16 w-14 text-xl ${theme === 'dark' ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <Button 
            className={`w-full rounded-full text-lg font-semibold py-3 ${theme === 'dark' ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}
            onClick={handleVerifyCode}
            disabled={isLoading || verificationCode.length < 4}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                در حال بررسی...
              </>
            ) : (
              "تایید کد"
            )}
          </Button>
          
          <p className="text-sm text-center mt-4">
            <Button variant="link" className={theme === 'dark' ? 'text-white' : 'text-black'} onClick={handleResendCode}>
              ارسال مجدد کد
            </Button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyCode;
