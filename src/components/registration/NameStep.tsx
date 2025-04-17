import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, User } from "lucide-react";

interface NameStepProps {
  name: string;
  updateName: (value: string) => void;
  age: string;
  updateAge: (value: string) => void;
  onNext: () => void;
  isLoading: boolean;
  isDarkTheme: boolean;
}

const NameStep: React.FC<NameStepProps> = ({
  name,
  updateName,
  age,
  updateAge,
  onNext,
  isLoading,
  isDarkTheme
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
          required
          className="bg-gray-800 border-gray-700 text-right h-14 mb-2"
        />
      </div>
      
      <div className="w-full mb-8">
        <label className="block text-lg mb-2 text-right">سن شما</label>
        <div className="relative">
          <Input
            type="number"
            value={age}
            onChange={(e) => updateAge(e.target.value)}
            placeholder="مثال: 25"
            min="10"
            max="100"
            required
            className="bg-gray-800 border-gray-700 text-right h-14 mb-2 pl-10"
          />
          <User className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
        </div>
      </div>
      
      <div className="w-full">
        <Button 
          onClick={onNext} 
          className={`w-full h-14 text-lg rounded-full ${isDarkTheme ? 'bg-white text-black' : 'bg-black text-white'} hover:opacity-90`}
          disabled={isLoading || !name || !age}
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
