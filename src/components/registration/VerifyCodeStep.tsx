
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

interface VerifyCodeStepProps {
  verificationCode: string;
  updateVerificationCode: (value: string) => void;
  onVerifyCode: () => void;
  isLoading: boolean;
  phoneNumber: string;
}

const VerifyCodeStep: React.FC<VerifyCodeStepProps> = ({
  verificationCode,
  updateVerificationCode,
  onVerifyCode,
  isLoading,
  phoneNumber
}) => {
  return (
    <div className="w-full max-w-md flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4 text-center">کد تایید را وارد کنید</h1>
      <p className="text-gray-400 text-sm mb-8 text-center">
        کد تایید به شماره {phoneNumber} ارسال شد
      </p>
      
      <div className="w-full mb-8 flex justify-center">
        <InputOTP
          value={verificationCode}
          onChange={updateVerificationCode}
          maxLength={4}
          className="gap-3"
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} className="h-16 w-14 text-xl bg-gray-800 border-gray-700" />
            <InputOTPSlot index={1} className="h-16 w-14 text-xl bg-gray-800 border-gray-700" />
            <InputOTPSlot index={2} className="h-16 w-14 text-xl bg-gray-800 border-gray-700" />
            <InputOTPSlot index={3} className="h-16 w-14 text-xl bg-gray-800 border-gray-700" />
          </InputOTPGroup>
        </InputOTP>
      </div>
      
      <div className="w-full mb-4">
        <Button 
          onClick={onVerifyCode} 
          className="w-full h-14 text-lg rounded-full bg-blue-500 hover:bg-blue-600"
          disabled={isLoading}
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
        <Button variant="link" className="text-blue-400 p-0">
          ارسال مجدد کد
        </Button>
      </p>
    </div>
  );
};

export default VerifyCodeStep;
