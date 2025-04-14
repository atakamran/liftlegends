
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface GoalStepProps {
  goal: string;
  updateGoal: (value: string) => void;
  onComplete: () => void;
  isLoading: boolean;
}

const GoalStep: React.FC<GoalStepProps> = ({
  goal,
  updateGoal,
  onComplete,
  isLoading
}) => {
  const goalOptions = [
    { id: "lose", label: "کاهش وزن", emoji: "🍃" },
    { id: "maintain", label: "تثبیت وزن", emoji: "🍏" },
    { id: "gain", label: "افزایش وزن", emoji: "💪" }
  ];

  return (
    <div className="w-full max-w-md flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-8 text-center">هدف اصلی شما چیه؟</h1>
      
      <div className="w-full space-y-4 mb-8">
        {goalOptions.map(option => (
          <button
            key={option.id}
            className={`w-full p-4 rounded-lg flex items-center justify-between transition-colors
              ${goal === option.id ? "bg-blue-500 border-2 border-blue-400" : "bg-gray-800 border-2 border-gray-700"}`}
            onClick={() => updateGoal(option.id)}
          >
            <div className="text-right flex items-center">
              <span className="text-lg">{option.label}</span>
              <span className="text-2xl mr-2">{option.emoji}</span>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
              ${goal === option.id ? "border-white" : "border-gray-400"}`}>
              {goal === option.id && <div className="w-3 h-3 bg-white rounded-full"></div>}
            </div>
          </button>
        ))}
      </div>
      
      <div className="w-full">
        <Button 
          onClick={onComplete} 
          className="w-full h-14 text-lg rounded-full bg-blue-500 hover:bg-blue-600"
          disabled={isLoading || !goal}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              در حال پردازش...
            </>
          ) : (
            "تکمیل ثبت‌نام"
          )}
        </Button>
      </div>
    </div>
  );
};

export default GoalStep;
