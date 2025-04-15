import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";
import { auth, db } from "@/integrations/firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const PhoneLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [alert, setAlert] = useState({ type: "", message: "" });
  const navigate = useNavigate();

  const handlePhoneLogin = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      setAlert({ type: "error", message: "لطفاً یک شماره تلفن معتبر وارد کنید." });
      return;
    }

    try {
      const userDoc = doc(db, "user_profiles", phoneNumber);
      const userSnap = await getDoc(userDoc);

      if (userSnap.exists()) {
        setAlert({ type: "success", message: "کد تأیید ارسال شد." });
        navigate("/phone-login/verify", { state: { phoneNumber } });
      } else {
        setAlert({ type: "error", message: "کاربر یافت نشد. لطفاً ابتدا ثبت‌نام کنید." });
        navigate("/register");
      }
    } catch (error) {
      console.error("Error checking user profile: ", error);
      setAlert({ type: "error", message: "مشکلی در بررسی شماره تلفن پیش آمد." });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-cover bg-center">
      <div className="absolute inset-0 pointer-events-none"></div>
      <Card className="w-full max-w-md bg-white/70 backdrop-blur-md border-gray-200 shadow-lg mx-4 my-8">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img 
              src="/lovable-uploads/white-logo.png" 
              alt="Lift Legends" 
              className="h-16 w-16" 
            />
          </div>
          <CardTitle className="text-2xl font-extrabold text-black">ورود با شماره تلفن</CardTitle>
          <CardDescription className="text-lg text-muted-foreground text-black">شماره تلفن خود را وارد کنید</CardDescription>
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
            className="w-full rounded-lg border-gray-300 text-lg p-3"
          />
          <Button 
            className="w-full rounded-full text-lg font-semibold py-3 bg-black text-white hover:bg-gray-800"
            onClick={handlePhoneLogin}
          >
            ادامه
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PhoneLogin;