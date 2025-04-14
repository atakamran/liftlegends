
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Calendar } from "lucide-react";

interface NameStepProps {
  name: string;
  updateName: (value: string) => void;
  birthDate: string;
  updateBirthDate: (value: string) => void;
  onNext: () => void;
  isLoading: boolean;
}

const NameStep: React.FC<NameStepProps> = ({
  name,
  updateName,
  birthDate,
  updateBirthDate,
  onNext,
  isLoading
}) => {
  return (
    <div className="w-full max-w-md flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-8 text-center">دوست داری چی صدات کنیم؟</h1>
      
      <div className="w-full mb-6">
        <Input
          type="text"
          value={name}
          onChange={(e) => updateName(e.target.value)}
          placeholder="نام شما"
          className="bg-gray-800 border-gray-700 text-right h-14 mb-2"
        />
      </div>
      
      <div className="w-full mb-8">
        <label className="block text-lg mb-2 text-right">تاریخ تولد</label>
        <div className="relative">
          <Input
            type="text"
            value={birthDate}
            onChange={(e) => updateBirthDate(e.target.value)}
            placeholder="1380/01/01"
            className="bg-gray-800 border-gray-700 text-right h-14 mb-2 pl-10"
          />
          <Calendar className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
        </div>
      </div>
      
      <div className="w-full">
        <Button 
          onClick={onNext} 
          className="w-full h-14 text-lg rounded-full bg-blue-500 hover:bg-blue-600"
          disabled={isLoading}
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

export default NameStep;
