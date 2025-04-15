import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ActivityLevelStepProps {
  activityLevel: string;
  updateActivityLevel: (value: string) => void;
  onNext: () => void;
  isLoading: boolean;
  isDarkTheme: boolean;
}

const ActivityLevelStep: React.FC<ActivityLevelStepProps> = ({
  activityLevel,
  updateActivityLevel,
  onNext,
  isLoading,
  isDarkTheme
}) => {
  const activityOptions = [
    { id: "sedentary", label: "خیلی کم", description: "بدون تحرک", emoji: "🚶" },
    { id: "light", label: "کم", description: "فعالیت کم روزانه ", emoji: "👨‍💼" },
    { id: "moderate", label: "متوسط", description: "ورزش سبک روزانه", emoji: "🚶" },
    { id: "active", label: "زیاد", description: "روزانه دو ساعت ورزش", emoji: "👷" }
  ];

  return (
    <div className="w-full max-w-md flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-8 text-center">هدف اصلی شما چیه؟</h1>
      
      <div className="w-full space-y-4 mb-8">
        {activityOptions.map(option => (
          <button
            key={option.id}
            className={`w-full p-4 rounded-lg flex items-center justify-between transition-colors
              ${activityLevel === option.id ? "bg-blue-500 border-2 border-blue-400" : "bg-gray-800 border-2 border-gray-700"}`}
            onClick={() => updateActivityLevel(option.id)}
          >
            <div className="flex items-center">
              <span className="text-2xl ml-2">{option.emoji}</span>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="text-lg font-medium">{option.label}</div>
              <div className="text-sm text-gray-300">{option.description}</div>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
              ${activityLevel === option.id ? "border-white" : "border-gray-400"}`}>
              {activityLevel === option.id && <div className="w-3 h-3 bg-white rounded-full"></div>}
            </div>
          </button>
        ))}
      </div>
      
      <div className="w-full">
        <Button 
          onClick={onNext} 
          className={`w-full h-14 text-lg rounded-full ${isDarkTheme ? 'bg-white text-black' : 'bg-black text-white'} hover:opacity-90`}
          disabled={isLoading || !activityLevel}
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

export default ActivityLevelStep;
