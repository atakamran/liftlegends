import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Alert } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

const VerifyCode = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { phoneNumber } = location.state || {};
  const { toast } = useToast();

  const handleVerifyCode = async () => {
    if (!verificationCode || verificationCode.length < 4) {
      setAlert({ type: "error", message: "لطفاً کد تأیید معتبر را وارد کنید." });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      if (verificationCode === "1234") {
        setAlert({ type: "success", message: "کد تأیید شد." });
        toast({
          title: "کد تأیید شد",
          description: "کد تأیید با موفقیت تأیید شد.",
        });
        navigate("/home");
      } else {
        setAlert({ type: "error", message: "کد وارد شده صحیح نیست." });
        toast({
          title: "خطا در تایید کد",
          description: "کد وارد شده صحیح نیست.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1500);
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
          <CardTitle className="text-2xl font-extrabold text-black">تایید کد</CardTitle>
          <CardDescription className="text-lg text-muted-foreground text-black">کد تایید ارسال شده به شماره {phoneNumber} را وارد کنید</CardDescription>
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
                <InputOTPSlot index={0} className="h-16 w-14 text-xl bg-black/90 text-white border-gray-600" />
                <InputOTPSlot index={1} className="h-16 w-14 text-xl bg-black/90 text-white border-gray-600" />
                <InputOTPSlot index={2} className="h-16 w-14 text-xl bg-black/90 text-white border-gray-600" />
                <InputOTPSlot index={3} className="h-16 w-14 text-xl bg-black/90 text-white border-gray-600" />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <Button 
            className="w-full rounded-full text-lg font-semibold py-3 bg-black text-white hover:bg-gray-800"
            onClick={handleVerifyCode}
            disabled={isLoading || verificationCode.length < 4}
          >
            {isLoading ? "در حال بررسی..." : "تایید کد"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyCode;