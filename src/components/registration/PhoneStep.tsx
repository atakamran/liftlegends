
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
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
  isDarkTheme
}) => {
  const { getButtonGradient, getTextColor, theme } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-md flex flex-col items-center">
      <h1 className={`text-2xl font-bold mb-8 text-center ${getTextColor()}`}>ورود به حساب کاربری</h1>
      
      <div className="w-full mb-8">
        <Input
          type="tel"
          value={phoneNumber}
          onChange={(e) => updatePhoneNumber(e.target.value)}
          placeholder="شماره موبایل"
          className={`bg-transparent border-gray-700 text-right text-lg ltr h-14 mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}
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
      
      <div className="w-full mb-6">
        <Button 
          onClick={onSendCode} 
          className={`w-full h-14 text-lg rounded-full ${theme === 'dark' ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-black hover:bg-gray-800'} text-white shadow-lg hover:shadow-xl transition-all duration-300`}
          disabled={isLoading || !phoneNumber || phoneNumber.length < 11 || !password || password.length < 4}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              در حال پردازش...
            </>
          ) : (
            "ورود"
          )}
        </Button>
      </div>
      
      <div className="text-center mb-4">
        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          حساب کاربری ندارید؟{" "}
          <button 
            onClick={() => navigate("/register")} 
            className={`${theme === 'dark' ? 'text-yellow-400' : 'text-black'} font-semibold hover:underline`}
          >
            ثبت‌نام
          </button>
        </p>
      </div>

      <p className="text-sm text-gray-400 text-center">
        <a href="#" className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} hover:underline`}>قوانین و مقررات</a>
      </p>
    </div>
  );
};

export default PhoneStep;
