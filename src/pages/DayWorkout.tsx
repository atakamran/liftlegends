import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AppLayout from "@/components/Layout/AppLayout";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Circle, Clock, Dumbbell, Award } from "lucide-react";
import { weeklyPlan, daysOfWeek } from "@/services/exerciseService";
import { useTheme } from "@/context/ThemeContext";
import { 
  saveCompletedExercise, 
  getDayCompletedExercises, 
  calculateDayProgress 
} from "@/services/workoutProgressService";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

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
  const [progress, setProgress] = useState(0);
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
        
        // دریافت تمرین‌های انجام شده از localStorage
        const savedCompletedExercises = getDayCompletedExercises(decodedDay);
        setCompletedExercises(savedCompletedExercises);
        
        // محاسبه درصد پیشرفت
        if (foundDayPlan.exercises.length > 0) {
          const progressPercent = calculateDayProgress(
            decodedDay, 
            foundDayPlan.exercises.length
          );
          setProgress(progressPercent);
        }
      } else {
        // If day not found, navigate back to exercises page
        navigate("/exercises");
      }
    }
  }, [day, navigate]);

  // Function to handle clicking on an exercise
  const handleExerciseClick = (exercise: WeeklyPlanExercise) => {
    if (!dayPlan) return;
    
    // ذخیره در localStorage
    saveCompletedExercise(dayPlan.day, exercise.name);
    
    // به‌روزرسانی state
    setCompletedExercises(prev => {
      // If already completed, remove it (toggle functionality)
      if (prev.includes(exercise.name)) {
        const newCompleted = prev.filter(name => name !== exercise.name);
        // به‌روزرسانی درصد پیشرفت
        setProgress(dayPlan.exercises.length > 0 
          ? Math.round((newCompleted.length / dayPlan.exercises.length) * 100) 
          : 0);
        return newCompleted;
      }
      // Otherwise add it to completed exercises
      const newCompleted = [...prev, exercise.name];
      // به‌روزرسانی درصد پیشرفت
      setProgress(dayPlan.exercises.length > 0 
        ? Math.round((newCompleted.length / dayPlan.exercises.length) * 100) 
        : 0);
      return newCompleted;
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
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Dumbbell className="h-6 w-6 text-yellow-500" />
            <h1 className="text-2xl font-bold">تمرین {dayPlan.day}</h1>
          </div>
          <Button variant="outline" onClick={() => navigate("/exercises")}>
            <ArrowRight className="ml-2 h-4 w-4" />
            بازگشت به برنامه هفتگی
          </Button>
        </div>

        <div className="mb-6 space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">پیشرفت امروز</span>
              <span className="text-sm bg-green-500/20 text-green-500 px-2 py-0.5 rounded-full">
                {progress}%
              </span>
            </div>
            {progress === 100 && (
              <div className="flex items-center gap-1 text-yellow-500">
                <Award className="h-4 w-4" />
                <span className="text-sm">تمام تمرین‌ها انجام شد!</span>
              </div>
            )}
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className={`rounded-2xl border ${getCardTextColor()} ${getCardBgColor()} ${getCardBorderColor()} overflow-hidden shadow-lg p-6 backdrop-blur-sm bg-opacity-90`}>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1.5 h-6 bg-yellow-500 rounded-full"></div>
            <h2 className="text-xl font-bold">تمرین {dayPlan.muscleGroup}</h2>
          </div>
          
          <div className="space-y-4">
            {dayPlan.exercises.map((exercise, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-xl cursor-pointer transition-all hover:shadow-md ${
                  completedExercises.includes(exercise.name) 
                    ? 'bg-green-600/20 border border-green-500/50' 
                    : theme === 'dark' ? 'bg-gray-800/70' : 'bg-gray-700/70'
                }`}
                onClick={() => handleExerciseClick(exercise)}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {completedExercises.includes(exercise.name) ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <Circle className="h-5 w-5 text-gray-500" />
                    )}
                    <h3 className={`font-bold text-lg ${completedExercises.includes(exercise.name) ? 'text-green-400' : ''}`}>
                      {exercise.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      completedExercises.includes(exercise.name) 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-gray-800/50 text-gray-400'
                    }`}>
                      {exercise.sets} × {exercise.reps}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
                      completedExercises.includes(exercise.name) 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-gray-800/50 text-gray-400'
                    }`}>
                      <Clock className="h-3 w-3" />
                      {exercise.rest}
                    </span>
                  </div>
                </div>
                <p className={`text-sm mt-3 ${
                  completedExercises.includes(exercise.name) 
                    ? 'text-green-400/80' 
                    : 'text-gray-400'
                }`}>
                  {exercise.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </AppLayout>
  );
};

export default DayWorkoutPage;