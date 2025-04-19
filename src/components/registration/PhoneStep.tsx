
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

  return (
    <div className="w-full flex flex-col">
      <div className="w-full space-y-4">
        <div className="space-y-2">
          <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-right`}>
            شماره موبایل
          </label>
          <div className="relative">
            <Input
              type="tel"
              value={phoneNumber}
              onChange={(e) => updatePhoneNumber(e.target.value)}
              placeholder="مثال: 09123456789"
              className={`bg-transparent ${theme === 'dark' ? 'border-gray-700 text-white focus:border-yellow-500' : 'border-gray-300 text-gray-800 focus:border-gray-800'} text-right text-lg ltr h-12 pr-10 transition-all duration-200`}
              dir="ltr"
              required
            />
            <span className="absolute right-3 top-3 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            </span>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-right`}>
            رمز عبور
          </label>
          <div className="relative">
            <Input
              type="password"
              value={password}
              onChange={(e) => updatePassword(e.target.value)}
              placeholder="رمز عبور خود را وارد کنید"
              className={`bg-transparent ${theme === 'dark' ? 'border-gray-700 text-white focus:border-yellow-500' : 'border-gray-300 text-gray-800 focus:border-gray-800'} text-right text-lg ltr h-12 pr-10 transition-all duration-200`}
              dir="ltr"
              required
            />
            <span className="absolute right-3 top-3 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </span>
          </div>
        </div>
      </div>
      
      <div className="w-full mt-8">
        <Button 
          onClick={onSendCode} 
          className={`w-full h-12 text-lg rounded-lg ${theme === 'dark' ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700' : 'bg-gradient-to-r from-gray-800 to-black hover:from-black hover:to-gray-900'} text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]`}
          disabled={isLoading || !phoneNumber || phoneNumber.length < 11 || !password || password.length < 4}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              در حال پردازش...
            </>
          ) : (
            "ورود به حساب"
          )}
        </Button>
      </div>
      
      <div className="w-full mt-4 flex justify-center">
        <p className="text-sm text-gray-400 text-center">
          <a href="#" className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} hover:underline`}>قوانین و مقررات</a>
          {" | "}
          <a href="#" className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} hover:underline`}>حریم خصوصی</a>
        </p>
      </div>
    </div>
  );
};

export default PhoneStep;
