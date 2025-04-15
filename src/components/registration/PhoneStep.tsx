import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

interface PhoneStepProps {
  phoneNumber: string;
  updatePhoneNumber: (value: string) => void;
  onSendCode: () => void;
  isLoading: boolean;
  isDarkTheme: boolean;
}

const PhoneStep: React.FC<PhoneStepProps> = ({
  phoneNumber,
  updatePhoneNumber,
  onSendCode,
  isLoading,
  isDarkTheme
}) => {
  return (
    <div className="w-full max-w-md flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-8 text-center">شماره موبایلتون رو وارد کنید</h1>
      
      <div className="w-full mb-8">
        <Input
          type="tel"
          value={phoneNumber}
          onChange={(e) => updatePhoneNumber(e.target.value)}
          placeholder="09123456789"
          className="bg-gray-800 border-gray-700 text-right text-lg ltr h-14 mb-2"
          dir="ltr"
          required
        />
      </div>
      
      <div className="w-full mb-8">
        <Button 
          onClick={onSendCode} 
          className={`w-full h-14 text-lg rounded-full ${isDarkTheme ? 'bg-white text-black' : 'bg-black text-white'} hover:opacity-90`}
          disabled={isLoading || !phoneNumber}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              در حال پردازش...
            </>
          ) : (
            "بعدی"
          )}
        </Button>
      </div>
      
      <p className="text-sm text-gray-400 text-center">
        <a href="#" className={`${isDarkTheme ? 'text-white' : 'text-black'} hover:opacity-90`}>قوانین و مقررات</a>
      </p>
    </div>
  );
};

export default PhoneStep;
