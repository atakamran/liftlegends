
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
    birthDate: "",
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
    const storedUsers = localStorage.getItem("users") ? 
      JSON.parse(localStorage.getItem("users") || "[]") : [];
    
    const userExists = storedUsers.some((user: any) => user.phoneNumber === formData.phoneNumber);
    
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
      birthDate: formData.birthDate,
      gender: formData.gender,
      currentWeight: formData.currentWeight,
      height: formData.height,
      targetWeight: formData.targetWeight,
      activityLevel: formData.activityLevel,
      goal: formData.goal,
      subscription_plan: "basic", // Default plan
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
            birthDate={formData.birthDate}
            updateBirthDate={(value) => updateFormData("birthDate", value)}
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
    <div className="flex min-h-screen items-center justify-center galaxy-background">
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>
      <Card className={`w-full max-w-md backdrop-blur-md border-0 shadow-2xl ${theme === 'dark' ? 'bg-black/70' : 'bg-white/70'} mx-4 my-8`}>
        <div className="absolute top-0 left-0 w-full flex items-center px-4 py-2 space-x-4 mb-4">
          <Button 
            onClick={handlePreviousStep} 
            className="h-10 w-10 rounded-full bg-transparent hover:bg-white/10 text-white"
            variant="ghost"
          >
            <ChevronRight className="h-6 w-6 font-bold" />
          </Button>
          <Progress value={progress} className={`flex-1 h-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`} />
        </div>
        <CardContent className="space-y-4 pt-12 p-6">
          {renderStep()}
        </CardContent>
      </Card>
    </div>
  );
};

export default Registration;
