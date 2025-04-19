import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useNavigate } from "react-router-dom";

interface EmailStepProps {
  email: string;
  updateEmail: (value: string) => void;
  password: string;
  updatePassword: (value: string) => void;
  onSendCode: () => void;
  isLoading: boolean;
  isDarkTheme: boolean;
}

const EmailStep: React.FC<EmailStepProps> = ({
  email,
  updateEmail,
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
            ایمیل
          </label>
          <div className="relative">
            <Input
              type="email"
              value={email}
              onChange={(e) => updateEmail(e.target.value)}
              placeholder="مثال: example@gmail.com"
              className={`bg-transparent ${theme === 'dark' ? 'border-gray-700 text-white focus:border-yellow-500' : 'border-gray-300 text-gray-800 focus:border-gray-800'} text-right text-lg ltr h-12 pr-10 transition-all duration-200`}
              dir="ltr"
              required
            />
            <span className="absolute right-3 top-3 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
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
          disabled={isLoading || !email || !email.includes('@') || !password || password.length < 4}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              در حال پردازش...
            </>
          ) : (
            "ثبت نام"
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

export default EmailStep;