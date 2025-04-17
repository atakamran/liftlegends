import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/Layout/AppLayout";
import { exercises } from "@/data/exercises";
import { MuscleGroup, Exercise } from "@/types";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { weeklyPlan, daysOfWeek, getTodayDay } from "@/services/exerciseService";
import { useTheme } from "@/context/ThemeContext";

const muscleGroups: MuscleGroup[] = [
  'کل بدن',
  'سینه',
  'پشت',
  'شانه',
  'پا',
  'بازو',
  'شکم',
  'سرشانه',
  'ساعد',
  'ساق پا',
  'باسن',
];

// Define a type for the weekly plan exercise which is different from the Exercise type
type WeeklyPlanExercise = {
  name: string;
  sets: number;
  reps: number | string;
  rest: string;
  description: string;
};

const ExercisesPage = () => {
  const [selectedDay, setSelectedDay] = useState(getTodayDay());
  const { theme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedDay(getTodayDay());
  }, []);
  
  // Function to handle clicking on a day card
  const handleDayClick = (day: string) => {
    navigate(`/day-workout/${encodeURIComponent(day)}`);
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

  return (
    <AppLayout>
      <h1 className="text-2xl font-bold mb-6">برنامه هفتگی تمرین‌ها</h1>

      <Swiper 
        spaceBetween={20} 
        slidesPerView={1} 
        className="w-full" 
        initialSlide={daysOfWeek.indexOf(selectedDay)}
      >
        {weeklyPlan.map((dayPlan, index) => (
          <SwiperSlide key={index}>
            <div 
              className={`rounded-lg border ${getCardTextColor()} ${getCardBgColor()} ${getCardBorderColor()} overflow-hidden shadow-lg p-6 h-[400px] flex flex-col cursor-pointer transition-transform hover:scale-[1.01] hover:shadow-xl`}
              onClick={() => handleDayClick(dayPlan.day)}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold">{dayPlan.day}</h3>
                {dayPlan.day === selectedDay && (
                  <span className="text-xs bg-yellow-500 text-black px-2 py-1 rounded-full">امروز</span>
                )}
              </div>
              <p className="text-sm text-gray-400">تمرین {dayPlan.muscleGroup}</p>
              <div className="mt-4 overflow-y-auto flex-grow">
                <ul className="space-y-2">
                  {dayPlan.exercises.map((exercise, idx) => (
                    <li 
                      key={idx} 
                      className={`flex justify-between items-center ${getHoverBgColor()} p-2 rounded ${dayPlan.day === selectedDay ? 'bg-yellow-500/10' : ''}`}
                    >
                      <span className={`truncate ${dayPlan.day === selectedDay ? 'text-yellow-500 font-bold' : ''}`}>{exercise.name}</span>
                      <span className={`text-xs whitespace-nowrap ${dayPlan.day === selectedDay ? 'text-yellow-400' : 'text-gray-400'}`}>{exercise.sets} ست × {exercise.reps} تکرار</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </AppLayout>
  );
};

export default ExercisesPage;
