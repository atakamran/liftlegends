import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

interface PhysicalInfoStepProps {
  currentWeight: string;
  updateCurrentWeight: (value: string) => void;
  height: string;
  updateHeight: (value: string) => void;
  targetWeight: string;
  updateTargetWeight: (value: string) => void;
  onNext: () => void;
  isLoading: boolean;
  isDarkTheme: boolean;
}

const PhysicalInfoStep: React.FC<PhysicalInfoStepProps> = ({
  currentWeight,
  updateCurrentWeight,
  height,
  updateHeight,
  targetWeight,
  updateTargetWeight,
  onNext,
  isLoading,
  isDarkTheme
}) => {
  return (
    <div className="w-full max-w-md flex flex-col items-center">
      <div className="w-full mb-6">
        <div className="flex justify-end mb-2">
          <label className="text-lg">وزن فعلی</label>
        </div>
        <div className="relative">
          <Input
            type="number"
            value={currentWeight}
            onChange={(e) => updateCurrentWeight(e.target.value)}
            className="bg-gray-800 border-gray-700 text-right h-14 pr-4 pl-24"
            required
          />
          <span className="absolute left-4 top-0 h-14 flex items-center text-gray-400">
            کیلوگرم
          </span>
        </div>
      </div>
      
      <div className="w-full mb-6">
        <div className="flex justify-end mb-2">
          <label className="text-lg">قد (سانتی‌متر)</label>
        </div>
        <div className="relative">
          <Input
            type="number"
            value={height}
            onChange={(e) => updateHeight(e.target.value)}
            className="bg-gray-800 border-gray-700 text-right h-14 pr-4 pl-24"
            required
          />
          <span className="absolute left-4 top-0 h-14 flex items-center text-gray-400">
            سانتی‌متر
          </span>
        </div>
      </div>
      
      <div className="w-full mb-8">
        <div className="flex justify-end mb-2">
          <label className="text-lg">وزن هدف</label>
        </div>
        <div className="relative">
          <Input
            type="number"
            value={targetWeight}
            onChange={(e) => updateTargetWeight(e.target.value)}
            className="bg-gray-800 border-gray-700 text-right h-14 pr-4 pl-24"
            required
          />
          <span className="absolute left-4 top-0 h-14 flex items-center text-gray-400">
            کیلوگرم
          </span>
        </div>
      </div>
      
      <div className="w-full">
        <Button 
          onClick={onNext} 
          className={`w-full h-14 text-lg rounded-full ${isDarkTheme ? 'bg-white text-black' : 'bg-black text-white'} hover:opacity-90`}
          disabled={isLoading || !currentWeight || !height || !targetWeight}
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
    </div>
  );
};

export default PhysicalInfoStep;
