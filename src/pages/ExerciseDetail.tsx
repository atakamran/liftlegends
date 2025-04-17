import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AppLayout from "@/components/Layout/AppLayout";
import { weeklyPlan } from "@/services/exerciseService";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

// Define the type for the exercise
type WeeklyPlanExercise = {
  name: string;
  sets: number;
  reps: number | string;
  rest: string;
  description: string;
};

const ExerciseDetailPage = () => {
  const { day, exerciseName } = useParams<{ day: string; exerciseName: string }>();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState<WeeklyPlanExercise | null>(null);
  const [dayPlan, setDayPlan] = useState<{ day: string; muscleGroup: string } | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (day && exerciseName) {
      // Find the day plan
      const foundDayPlan = weeklyPlan.find(plan => plan.day === decodeURIComponent(day));
      
      if (foundDayPlan) {
        setDayPlan(foundDayPlan);
        
        // Find the exercise
        const foundExercise = foundDayPlan.exercises.find(
          ex => ex.name === decodeURIComponent(exerciseName)
        );
        
        if (foundExercise) {
          setExercise(foundExercise);
        }
      }
    }
  }, [day, exerciseName]);

  // Get card background color based on theme
  const getCardBgColor = () => {
    return theme === 'dark' ? 'bg-gray-900' : 'bg-gray-800';
  };

  // Get card text color based on theme
  const getCardTextColor = () => {
    return theme === 'dark' ? 'text-white' : 'text-white';
  };

  // Get card border color based on theme
  const getCardBorderColor = () => {
    return theme === 'dark' ? 'border-gray-800' : 'border-gray-700';
  };

  // Get section background color
  const getSectionBgColor = () => {
    return theme === 'dark' ? 'bg-gray-800' : 'bg-gray-700';
  };

  if (!exercise || !dayPlan) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center h-[70vh]">
          <h1 className="text-xl font-bold mb-4">تمرین یافت نشد</h1>
          <Button onClick={() => navigate("/exercises")}>
            <ArrowRight className="ml-2 h-4 w-4" />
            بازگشت به برنامه تمرین‌ها
          </Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="mb-4">
        <Button variant="outline" onClick={() => navigate("/exercises")}>
          <ArrowRight className="ml-2 h-4 w-4" />
          بازگشت به برنامه تمرین‌ها
        </Button>
      </div>

      <div className={`rounded-lg border ${getCardTextColor()} ${getCardBgColor()} ${getCardBorderColor()} overflow-hidden shadow-lg p-6`}>
        <div className="mb-6">
          <h1 className="text-2xl font-bold">{exercise.name}</h1>
          <p className="text-sm text-gray-400 mt-1">
            روز {dayPlan.day} - تمرین {dayPlan.muscleGroup}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className={`${getSectionBgColor()} p-4 rounded-lg text-center`}>
            <p className="text-sm text-gray-400">تعداد ست</p>
            <p className="text-xl font-bold">{exercise.sets}</p>
          </div>
          <div className={`${getSectionBgColor()} p-4 rounded-lg text-center`}>
            <p className="text-sm text-gray-400">تکرار</p>
            <p className="text-xl font-bold">{exercise.reps}</p>
          </div>
          <div className={`${getSectionBgColor()} p-4 rounded-lg text-center`}>
            <p className="text-sm text-gray-400">استراحت</p>
            <p className="text-xl font-bold">{exercise.rest}</p>
          </div>
        </div>

        <div className={`${getSectionBgColor()} p-4 rounded-lg`}>
          <h2 className="text-lg font-bold mb-2">توضیحات</h2>
          <p>{exercise.description}</p>
        </div>
      </div>
    </AppLayout>
  );
};

export default ExerciseDetailPage;