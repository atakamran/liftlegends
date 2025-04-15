
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import PhoneStep from "@/components/registration/PhoneStep";
import VerifyCodeStep from "@/components/registration/VerifyCodeStep";
import ActivityLevelStep from "@/components/registration/ActivityLevelStep";
import PhysicalInfoStep from "@/components/registration/PhysicalInfoStep";
import NameStep from "@/components/registration/NameStep";
import GenderStep from "@/components/registration/GenderStep";
import GoalStep from "@/components/registration/GoalStep";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/integrations/firebase/firebaseConfig";
import { useTheme } from "@/context/ThemeContext";
import "./Login.css"; // Reuse the galaxy animation

const Registration = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme, getCardGradient } = useTheme();
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  const totalSteps = 7;
  
  // Form data state
  const [formData, setFormData] = useState({
    phoneNumber: "",
    verificationCode: "",
    name: "",
    birthDate: "",
    gender: "",
    currentWeight: "",
    height: "",
    targetWeight: "",
    activityLevel: "",
    goal: ""
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
  
  const sendVerificationCode = () => {
    if (!formData.phoneNumber || formData.phoneNumber.length < 10) {
      toast({
        title: "شماره تلفن نامعتبر",
        description: "لطفاً یک شماره تلفن معتبر وارد کنید.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate sending a verification code
    setTimeout(() => {
      toast({
        title: "کد تأیید ارسال شد",
        description: `کد تأیید به شماره ${formData.phoneNumber} ارسال شد.`,
      });
      setFormData((prev) => ({ ...prev, verificationCode: "1234" })); // Set the code to 1234 for now
      setCurrentStep(2);
      setProgress((1 / totalSteps) * 100);
      setIsLoading(false);
    }, 1500);
  };
  
  const verifyCode = () => {
    if (!formData.verificationCode || formData.verificationCode.length < 4) {
      toast({
        title: "کد تأیید نامعتبر",
        description: "لطفاً کد تأیید معتبر را وارد کنید.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate verification
    setTimeout(() => {
      if (formData.verificationCode === "1234") { // Check if the code is correct
        toast({
          title: "کد تأیید شد",
          description: "کد تأیید با موفقیت تأیید شد.",
        });
        handleNextStep(); // Automatically go to the next step
      } else {
        toast({
          title: "کد تأیید اشتباه است",
          description: "لطفاً کد صحیح را وارد کنید.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1500);
  };
  
  const handleCompleteRegistration = async () => {
    setIsLoading(true);

    const profileData = {
      phoneNumber: formData.phoneNumber,
      name: formData.name,
      birthDate: formData.birthDate,
      gender: formData.gender,
      currentWeight: formData.currentWeight,
      height: formData.height,
      targetWeight: formData.targetWeight,
      activityLevel: formData.activityLevel,
      goal: formData.goal,
    };

    try {
      const userDoc = doc(db, "user_profiles", formData.phoneNumber);
      await setDoc(userDoc, profileData);
      
      // Set login status
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userPhoneNumber", formData.phoneNumber);
      
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
            onSendCode={sendVerificationCode}
            isLoading={isLoading}
            isDarkTheme={theme === 'dark'} // Use the theme prop
          />
        );
      case 2:
        return (
          <VerifyCodeStep 
            verificationCode={formData.verificationCode}
            updateVerificationCode={(value) => updateFormData("verificationCode", value)}
            onVerifyCode={verifyCode}
            isLoading={isLoading}
            phoneNumber={formData.phoneNumber}
            isDarkTheme={theme === 'dark'} // Use the theme prop
          />
        );
      case 3:
        return (
          <NameStep
            name={formData.name}
            updateName={(value) => updateFormData("name", value)}
            birthDate={formData.birthDate}
            updateBirthDate={(value) => updateFormData("birthDate", value)}
            onNext={handleNextStep}
            isLoading={isLoading}
            isDarkTheme={theme === 'dark'} // Use the theme prop
          />
        );
      case 4:
        return (
          <GenderStep
            gender={formData.gender}
            updateGender={(value) => updateFormData("gender", value)}
            onNext={handleNextStep}
            isLoading={isLoading}
            isDarkTheme={theme === 'dark'} // Use the theme prop
          />
        );
      case 5:
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
            isDarkTheme={theme === 'dark'} // Use the theme prop
          />
        );
      case 6:
        return (
          <ActivityLevelStep
            activityLevel={formData.activityLevel}
            updateActivityLevel={(value) => updateFormData("activityLevel", value)}
            onNext={handleNextStep}
            isLoading={isLoading}
            isDarkTheme={theme === 'dark'} // Use the theme prop
          />
        );
      case 7:
        return (
          <GoalStep
            goal={formData.goal}
            isDarkTheme={theme === 'dark'} // Use the theme prop
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
      <Card className={`w-full max-w-md backdrop-blur-md border-0 shadow-2xl ${getCardGradient()} ${theme === 'dark' ? 'bg-black/70' : 'bg-white/70'} mx-4 my-8`}>
        <div className="absolute top-0 left-0 w-full flex items-center px-4 py-2 space-x-4">
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
