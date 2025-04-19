import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import PhoneStep from "@/components/registration/PhoneStep";
import NameStep from "@/components/registration/NameStep";
import GenderStep from "@/components/registration/GenderStep";
import PhysicalInfoStep from "@/components/registration/PhysicalInfoStep";
import ActivityLevelStep from "@/components/registration/ActivityLevelStep";
import GoalStep from "@/components/registration/GoalStep";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import "./Login.css"; // Reuse the galaxy animation

const Registration = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme } = useTheme();
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  // We removed the verification step, so now we have 6 steps instead of 7
  const totalSteps = 6;
  
  // Form data state
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
    name: "",
    age: "",
    gender: "",
    currentWeight: "",
    height: "",
    targetWeight: "",
    activityLevel: "",
    goal: "",
  });

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleNextStep = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      if (currentStep < totalSteps) {
        setCurrentStep(prevStep => prevStep + 1);
        setProgress(((currentStep) / totalSteps) * 100);
      } else {
        // Final step - register the user
        handleCompleteRegistration();
      }
      setIsLoading(false);
    }, 700); // Simulate network request
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prevStep => prevStep - 1);
      setProgress(((currentStep - 2) / totalSteps) * 100);
    } else {
      // If we're at the first step, navigate back to the home page
      navigate("/");
    }
  };
  
  const handlePhoneStep = () => {
    if (!formData.phoneNumber || formData.phoneNumber.length < 11 || !formData.phoneNumber.startsWith("09")) {
      toast({
        title: "شماره تلفن نامعتبر",
        description: "لطفاً یک شماره تلفن معتبر وارد کنید.",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.password || formData.password.length < 4) {
      toast({
        title: "رمز عبور نامعتبر",
        description: "لطفاً یک رمز عبور با حداقل ۴ کاراکتر وارد کنید.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Check if user already exists in localStorage
    // Define a type for user data
    interface UserData {
      phoneNumber: string;
      password: string;
      name: string;
      age: number | string;
      gender: string;
      currentWeight: string;
      height: string;
      targetWeight: string;
      activityLevel: string;
      goal: string;
      subscription_plan?: string;
      permissions?: string;
      createdAt?: string;
    }
    
    const storedUsers = localStorage.getItem("users") ? 
      JSON.parse(localStorage.getItem("users") || "[]") as UserData[] : [];
    
    const userExists = storedUsers.some((user: UserData) => user.phoneNumber === formData.phoneNumber);
    
    setTimeout(() => {
      if (userExists) {
        toast({
          title: "خطا در ثبت نام",
          description: "این شماره تلفن قبلا ثبت شده است.",
          variant: "destructive",
        });
      } else {
        handleNextStep(); // Go to the next step if phone number is valid and not registered
      }
      setIsLoading(false);
    }, 1000);
  };
  
  const handleCompleteRegistration = async () => {
    setIsLoading(true);

    // Create user profile object
    const profileData = {
      phoneNumber: formData.phoneNumber,
      password: formData.password,
      name: formData.name,
      age: parseInt(formData.age) || 0, // تبدیل به عدد
      gender: formData.gender,
      currentWeight: formData.currentWeight,
      height: formData.height,
      targetWeight: formData.targetWeight,
      activityLevel: formData.activityLevel,
      goal: formData.goal,
      subscription_plan: "ultimate", // Default plan
      permissions: "all", // Temporarily grant all permissions
      createdAt: new Date().toISOString()
    };

    try {
      // Get existing users from localStorage
      const storedUsers = localStorage.getItem("users") ? 
        JSON.parse(localStorage.getItem("users") || "[]") : [];
      
      // Add new user
      storedUsers.push(profileData);
      
      // Save updated users list
      localStorage.setItem("users", JSON.stringify(storedUsers));
      
      // Set login status
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userPhoneNumber", formData.phoneNumber);
      localStorage.setItem("currentUser", JSON.stringify(profileData));
      
      toast({
        title: "ثبت نام موفقیت‌آمیز",
        description: "حساب کاربری شما با موفقیت ایجاد شد.",
      });
      
      navigate("/home");
    } catch (error) {
      console.error("Error saving user profile: ", error);
      toast({
        title: "خطا در ثبت نام",
        description: "مشکلی در ذخیره اطلاعات پیش آمد. لطفاً دوباره تلاش کنید.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PhoneStep 
            phoneNumber={formData.phoneNumber}
            updatePhoneNumber={(value) => updateFormData("phoneNumber", value)}
            onSendCode={handlePhoneStep}
            isLoading={isLoading}
            password={formData.password}
            updatePassword={(value) => updateFormData("password", value)}
            isDarkTheme={theme === 'dark'}
          />
        );
      case 2:
        return (
          <NameStep
            name={formData.name}
            updateName={(value) => updateFormData("name", value)}
            age={formData.age}
            updateAge={(value) => updateFormData("age", value)}
            onNext={handleNextStep}
            isLoading={isLoading}
            isDarkTheme={theme === 'dark'}
          />
        );
      case 3:
        return (
          <GenderStep
            gender={formData.gender}
            updateGender={(value) => updateFormData("gender", value)}
            onNext={handleNextStep}
            isLoading={isLoading}
            isDarkTheme={theme === 'dark'}
          />
        );
      case 4:
        return (
          <PhysicalInfoStep
            currentWeight={formData.currentWeight}
            updateCurrentWeight={(value) => updateFormData("currentWeight", value)}
            height={formData.height}
            updateHeight={(value) => updateFormData("height", value)}
            targetWeight={formData.targetWeight}
            updateTargetWeight={(value) => updateFormData("targetWeight", value)}
            onNext={handleNextStep}
            isLoading={isLoading}
            isDarkTheme={theme === 'dark'}
          />
        );
      case 5:
        return (
          <ActivityLevelStep
            activityLevel={formData.activityLevel}
            updateActivityLevel={(value) => updateFormData("activityLevel", value)}
            onNext={handleNextStep}
            isLoading={isLoading}
            isDarkTheme={theme === 'dark'}
          />
        );
      case 6:
        return (
          <GoalStep
            goal={formData.goal}
            isDarkTheme={theme === 'dark'}
            updateGoal={(value) => updateFormData("goal", value)}
            onComplete={handleCompleteRegistration}
            isLoading={isLoading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen galaxy-background">
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>
      
      <div className="relative w-full py-6 px-4 flex justify-between items-center z-10">
        <button 
          onClick={handlePreviousStep} 
          className="text-white hover:text-gray-200 transition-colors flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          برگشت
        </button>
        <div className="text-white text-lg font-bold">ثبت‌نام با شماره</div>
      </div>
      
      <div className="flex-1 flex items-center justify-center">
      
      <Card className={`w-full max-w-md backdrop-blur-md border-0 shadow-2xl ${theme === 'dark' ? 'bg-black/70' : 'bg-white/70'} mx-4 my-8 mb-16`}>
        <div className={`h-1 w-full ${theme === 'dark' ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' : 'bg-gradient-to-r from-gray-800 to-black'}`}></div>
        <div className="w-full flex items-center px-4 py-2 space-x-4 mb-4">
          <Progress value={progress} className={`flex-1 h-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`} />
        </div>
        <div className="h-6"></div>
        <CardContent className="space-y-4 pt-12 p-6">
          {renderStep()}
          
          {currentStep === 1 && (
            <div className="mt-8 text-center">
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                حساب کاربری دارید؟{" "}
                <button 
                  onClick={() => navigate("/phone-login")} 
                  className={`${theme === 'dark' ? 'text-yellow-400' : 'text-black'} font-semibold hover:underline`}
                >
                  ورود به حساب
                </button>
              </p>
              <button 
                onClick={() => toast({ title: "به زودی", description: "این قابلیت به زودی اضافه خواهد شد." })} 
                className={`text-sm mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} hover:underline`}
              >
                رمز عبور خود را فراموش کرده‌اید؟
              </button>
            </div>
          )}
        </CardContent>
      </Card>
      </div>
    </div>
  );
};

export default Registration;
