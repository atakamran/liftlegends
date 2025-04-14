
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

const Registration = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
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
      handleNextStep();
    }, 1500);
  };
  
  const handleCompleteRegistration = () => {
    setIsLoading(true);
    
    // Simulate API call to register user
    setTimeout(() => {
      // Here you would normally call your API to register the user
      toast({
        title: "ثبت نام موفقیت‌آمیز",
        description: "حساب کاربری شما با موفقیت ایجاد شد.",
      });
      
      // Navigate to the profile form or home page
      navigate("/profile-form");
      setIsLoading(false);
    }, 2000);
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
          />
        );
      case 4:
        return (
          <GenderStep
            gender={formData.gender}
            updateGender={(value) => updateFormData("gender", value)}
            onNext={handleNextStep}
            isLoading={isLoading}
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
          />
        );
      case 6:
        return (
          <ActivityLevelStep
            activityLevel={formData.activityLevel}
            updateActivityLevel={(value) => updateFormData("activityLevel", value)}
            onNext={handleNextStep}
            isLoading={isLoading}
          />
        );
      case 7:
        return (
          <GoalStep
            goal={formData.goal}
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
    <div className="flex min-h-screen flex-col bg-black text-white">
      <div className="px-4 py-2 fixed top-0 left-0 right-0 z-10 bg-black">
        <Progress value={progress} className="h-2 mb-2" />
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center px-4 pt-14 pb-8">
        {renderStep()}
      </div>
    </div>
  );
};

export default Registration;
