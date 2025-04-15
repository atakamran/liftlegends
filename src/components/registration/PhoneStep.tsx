import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { auth, db } from "@/integrations/firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

interface PhoneStepProps {
  phoneNumber: string;
  updatePhoneNumber: (value: string) => void;
  password: string;
  updatePassword: (value: string) => void;
  onSendCode: () => void;
  isLoading: boolean;
  isDarkTheme: boolean;
}

const PhoneStep: React.FC<PhoneStepProps> = ({
  phoneNumber,
  updatePhoneNumber,
  password,
  updatePassword,
  onSendCode,
  isLoading,
}) => {
  const { getButtonGradient, getTextColor, theme } = useTheme();
  const navigate = useNavigate();


  return (
    <div className="w-full max-w-md flex flex-col items-center">
      <h1 className={`text-2xl font-bold mb-8 text-center ${getTextColor()}`}>شماره موبایلتون رو وارد کنید</h1>
      
      <div className="w-full mb-8">
        <Input
          type="tel"
          value={phoneNumber}
          onChange={(e) => updatePhoneNumber(e.target.value)}
          placeholder="09123456789"
          className={`bg-transparent border-gray-700 text-right text-lg ltr h-14 mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}
          dir="ltr"
          required
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => updatePassword(e.target.value)}
          placeholder="رمز عبور"
          className={`bg-transparent border-gray-700 text-right text-lg ltr h-14 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}
          dir="ltr"
          required
        />
      </div>
      
      <div className="w-full mb-8">
        <Button 
          onClick={onSendCode} 
          className={`w-full h-14 text-lg rounded-full ${getButtonGradient()} text-white shadow-lg hover:shadow-xl transition-all duration-300`}
          disabled={isLoading || !phoneNumber || phoneNumber.length < 11 || !password || password.length < 6}
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
        <a href="#" className={`${theme === 'dark' ? 'text-white' : 'text-black'} hover:opacity-90`}>قوانین و مقررات</a>
      </p>
    </div>
  );
};

export default PhoneStep;
