import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AppLayout from "@/components/Layout/AppLayout";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { weeklyPlan, daysOfWeek } from "@/services/exerciseService";
import { useTheme } from "@/context/ThemeContext";

// Define a type for the weekly plan exercise
type WeeklyPlanExercise = {
  name: string;
  sets: number;
  reps: number | string;
  rest: string;
  description: string;
};

const DayWorkoutPage = () => {
  const { day } = useParams<{ day: string }>();
  const navigate = useNavigate();
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [dayPlan, setDayPlan] = useState<{
    day: string;
    muscleGroup: string;
    exercises: WeeklyPlanExercise[];
  } | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (day) {
      const decodedDay = decodeURIComponent(day);
      const foundDayPlan = weeklyPlan.find(plan => plan.day === decodedDay);
      
      if (foundDayPlan) {
        setDayPlan(foundDayPlan);
      } else {
        // If day not found, navigate back to exercises page
        navigate("/exercises");
      }
    }
  }, [day, navigate]);

  // Function to handle clicking on an exercise
  const handleExerciseClick = (exercise: WeeklyPlanExercise) => {
    setCompletedExercises(prev => {
      // If already completed, remove it (toggle functionality)
      if (prev.includes(exercise.name)) {
        return prev.filter(name => name !== exercise.name);
      }
      // Otherwise add it to completed exercises
      return [...prev, exercise.name];
    });
  };

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

  // Get hover color for exercise items
  const getHoverBgColor = () => {
    return theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-700';
  };

  // Get dialog background color
  const getDialogBgColor = () => {
    return theme === 'dark' ? 'bg-gray-900' : 'bg-gray-800';
  };

  if (!dayPlan) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center h-[70vh]">
          <h1 className="text-xl font-bold mb-4">برنامه تمرین یافت نشد</h1>
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">تمرین {dayPlan.day}</h1>
        <Button variant="outline" onClick={() => navigate("/exercises")}>
          <ArrowRight className="ml-2 h-4 w-4" />
          بازگشت به برنامه هفتگی
        </Button>
      </div>

      <div className={`rounded-lg border ${getCardTextColor()} ${getCardBgColor()} ${getCardBorderColor()} overflow-hidden shadow-lg p-6`}>
        <h2 className="text-xl font-bold mb-4">تمرین {dayPlan.muscleGroup}</h2>
        
        <div className="space-y-4">
          {dayPlan.exercises.map((exercise, idx) => (
            <div 
              key={idx} 
              className={`p-4 rounded-lg cursor-pointer transition-all hover:shadow-md hover:scale-[1.01] ${
                completedExercises.includes(exercise.name) 
                  ? 'bg-green-600/20 border border-green-500' 
                  : theme === 'dark' ? 'bg-gray-800' : 'bg-gray-700'
              }`}
              onClick={() => handleExerciseClick(exercise)}
            >
              <div className="flex justify-between items-center">
                <h3 className={`font-bold text-lg ${completedExercises.includes(exercise.name) ? 'text-green-400' : ''}`}>
                  {exercise.name}
                </h3>
                <span className={`text-sm ${completedExercises.includes(exercise.name) ? 'text-green-400' : 'text-gray-400'}`}>
                  {exercise.sets} ست × {exercise.reps} تکرار
                </span>
              </div>
              <p className={`text-sm mt-2 line-clamp-2 ${completedExercises.includes(exercise.name) ? 'text-green-400/80' : 'text-gray-400'}`}>
                {exercise.description}
              </p>
            </div>
          ))}
        </div>


      </div>


    </AppLayout>
  );
};

export default DayWorkoutPage;