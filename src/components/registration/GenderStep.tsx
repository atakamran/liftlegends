
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface GenderStepProps {
  gender: string;
  updateGender: (value: string) => void;
  onNext: () => void;
  isLoading: boolean;
}

const GenderStep: React.FC<GenderStepProps> = ({
  gender,
  updateGender,
  onNext,
  isLoading
}) => {
  return (
    <div className="w-full max-w-md flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-8 text-center">جنسیت</h1>
      
      <div className="w-full space-y-4 mb-8">
        <button
          className={`w-full p-4 rounded-lg flex items-center justify-between transition-colors
            ${gender === "female" ? "bg-blue-500 border-2 border-blue-400" : "bg-gray-800 border-2 border-gray-700"}`}
          onClick={() => updateGender("female")}
        >
          <div className="flex items-center">
            <span className="text-lg">زن</span>
            <span className="text-2xl ml-2">👩</span>
          </div>
          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
            ${gender === "female" ? "border-white" : "border-gray-400"}`}>
            {gender === "female" && <div className="w-3 h-3 bg-white rounded-full"></div>}
          </div>
        </button>
        
        <button
          className={`w-full p-4 rounded-lg flex items-center justify-between transition-colors
            ${gender === "male" ? "bg-blue-500 border-2 border-blue-400" : "bg-gray-800 border-2 border-gray-700"}`}
          onClick={() => updateGender("male")}
        >
          <div className="flex items-center">
            <span className="text-lg">مرد</span>
            <span className="text-2xl ml-2">🧔</span>
          </div>
          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
            ${gender === "male" ? "border-white" : "border-gray-400"}`}>
            {gender === "male" && <div className="w-3 h-3 bg-white rounded-full"></div>}
          </div>
        </button>
      </div>
      
      <div className="w-full">
        <Button 
          onClick={onNext} 
          className="w-full h-14 text-lg rounded-full bg-blue-500 hover:bg-blue-600"
          disabled={isLoading || !gender}
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

export default GenderStep;
