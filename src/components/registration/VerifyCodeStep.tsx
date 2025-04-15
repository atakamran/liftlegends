
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";

interface VerifyCodeStepProps {
  verificationCode: string;
  updateVerificationCode: (value: string) => void;
  onVerifyCode: () => void;
  isLoading: boolean;
  phoneNumber: string;
  isDarkTheme: boolean;
}

const VerifyCodeStep: React.FC<VerifyCodeStepProps> = ({
  verificationCode,
  updateVerificationCode,
  onVerifyCode,
  isLoading,
  phoneNumber,
  isDarkTheme
}) => {
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);

  const handleVerifyCode = async () => {
    try {
      await onVerifyCode();
    } catch (err: any) {
      setError(err.message);
      toast({
        title: "خطا در تایید کد",
        description: "کد وارد شده صحیح نیست.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full max-w-md flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4 text-center">کد تایید را وارد کنید</h1>
      <p className={`text-sm mb-8 text-center ${isDarkTheme ? 'text-white' : 'text-black'}`}>
        کد تایید به شماره {phoneNumber} ارسال شد
      </p>
      
      <div className="w-full mb-8 flex justify-center">
        <InputOTP
          value={verificationCode}
          onChange={updateVerificationCode}
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
      
      <div className="w-full mb-4 flex justify-between items-center">
        <Button 
          onClick={handleVerifyCode} 
          className={`w-full h-14 text-lg rounded-full ${isDarkTheme ? 'bg-white text-black' : 'bg-black text-white'} hover:opacity-90`}
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
      </div>
      
      <p className="text-sm text-center">
        <Button variant="link" className={`${isDarkTheme ? 'text-white' : 'text-black'} p-0`}>
          ارسال مجدد کد
        </Button>
      </p>
    </div>
  );
};

export default VerifyCodeStep;
