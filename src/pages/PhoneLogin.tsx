
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";
import { auth, db } from "@/integrations/firebase/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useTheme } from "@/context/ThemeContext";
import { Loader2 } from "lucide-react";

const PhoneLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handlePhoneLogin = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      setAlert({ type: "error", message: "لطفاً یک شماره تلفن معتبر وارد کنید." });
      return;
    }

    setIsLoading(true);
    
    try {
      const userDoc = doc(db, "user_profiles", phoneNumber);
      const userSnap = await getDoc(userDoc);

      // Check if user exists
      if (userSnap.exists()) {
        setAlert({ type: "success", message: "کد تأیید ارسال شد." });
        navigate("/phone-login/verify", { state: { phoneNumber } });
      } else {
        // If user doesn't exist, create a new account
        await setDoc(userDoc, { 
          phoneNumber,
          createdAt: new Date().toISOString(),
        });
        setAlert({ type: "success", message: "حساب کاربری جدید ایجاد شد. کد تأیید ارسال شد." });
        navigate("/phone-login/verify", { state: { phoneNumber } });
      }
    } catch (error) {
      console.error("Error checking user profile: ", error);
      setAlert({ type: "error", message: "مشکلی در بررسی شماره تلفن پیش آمد." });
    } finally {
      setIsLoading(false);
    }
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
          <CardTitle className="text-2xl font-extrabold">ورود با شماره تلفن</CardTitle>
          <CardDescription className="text-lg">شماره تلفن خود را وارد کنید</CardDescription>
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
          <Input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="09123456789"
            dir="ltr"
            className="w-full rounded-lg text-lg p-3 bg-transparent"
          />
          <Button 
            className={`w-full rounded-full text-lg font-semibold py-3 ${theme === 'dark' ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}
            onClick={handlePhoneLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                در حال پردازش...
              </>
            ) : (
              "ادامه"
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PhoneLogin;
