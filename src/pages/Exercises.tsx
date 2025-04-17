import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/Layout/AppLayout";
import { MuscleGroup, Exercise } from "@/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, EffectCards, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "@/styles/swiper-custom.css";
import { weeklyPlan, daysOfWeek, getTodayDay } from "@/services/exerciseService";
import { getDayCompletedExercises, calculateDayProgress } from "@/services/workoutProgressService";
import { useTheme } from "@/context/ThemeContext";
import { CheckCircle } from "lucide-react";

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

  // به‌روزرسانی روز انتخاب شده و وضعیت تمرین‌ها
  useEffect(() => {
    setSelectedDay(getTodayDay());
    
    // یک تایمر برای به‌روزرسانی مداوم وضعیت تمرین‌ها
    const interval = setInterval(() => {
      // این خط باعث می‌شود کامپوننت دوباره رندر شود و وضعیت تمرین‌ها به‌روز شود
      setSelectedDay(prevDay => prevDay);
    }, 5000); // هر 5 ثانیه
    
    return () => clearInterval(interval);
  }, []);
  
  // Function to handle slide change
  const handleSlideChange = (swiper) => {
    const newIndex = swiper.activeIndex;
    if (weeklyPlan[newIndex]) {
      setSelectedDay(weeklyPlan[newIndex].day);
    }
  };
  
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
      <div className="space-y-6 mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">برنامه هفتگی تمرین‌ها</h1>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span className="animate-pulse">⟸</span>
            <span>اسلاید کنید</span>
            <span className="animate-pulse">⟹</span>
          </div>
        </div>
        
        <div className="bg-gray-800/30 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-full rounded-full transition-all duration-500"
            style={{ 
              width: `${(daysOfWeek.indexOf(selectedDay) + 1) / daysOfWeek.length * 100}%` 
            }}
          ></div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">شنبه</span>
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-500">پیشرفت هفتگی</span>
            <span className="text-xs bg-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded-full">
              {daysOfWeek.indexOf(selectedDay) + 1}/{daysOfWeek.length}
            </span>
          </div>
          <span className="text-xs text-gray-500">جمعه</span>
        </div>
      </div>

      <Swiper 
        spaceBetween={10} 
        slidesPerView={1.15} 
        centeredSlides={true}
        initialSlide={daysOfWeek.indexOf(selectedDay)}
        className="w-full py-4" 
        modules={[Pagination, Navigation, EffectCoverflow]}
        effect="coverflow"
        coverflowEffect={{
          rotate: 5,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        onSlideChange={handleSlideChange}
        breakpoints={{
          640: {
            slidesPerView: 1.2,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 1.5,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 2.2,
            spaceBetween: 30,
          },
        }}
      >
        {weeklyPlan.map((dayPlan, index) => (
          <SwiperSlide key={index} className="pb-4">
            <div 
              className={`workout-card rounded-2xl border ${getCardTextColor()} ${getCardBgColor()} ${getCardBorderColor()} overflow-hidden shadow-lg p-5 h-[350px] flex flex-col cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl backdrop-blur-sm bg-opacity-90`}
              onClick={() => handleDayClick(dayPlan.day)}
              style={{
                transform: dayPlan.day === selectedDay ? 'translateY(-8px)' : 'translateY(0)',
              }}
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-bold">{dayPlan.day}</h3>
                {dayPlan.day === getTodayDay() && (
                  <span className="text-xs bg-yellow-500 text-black px-2 py-1 rounded-full animate-pulse">امروز</span>
                )}
              </div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-6 bg-yellow-500 rounded-full"></div>
                <p className="text-sm text-gray-400">تمرین {dayPlan.muscleGroup}</p>
              </div>
              <div className="mt-2 overflow-y-auto flex-grow scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent pr-1">
                <ul className="space-y-2">
                  {dayPlan.exercises.map((exercise, idx) => {
                    // بررسی آیا تمرین انجام شده است
                    const isCompleted = getDayCompletedExercises(dayPlan.day).includes(exercise.name);
                    
                    return (
                      <li 
                        key={idx} 
                        className={`flex justify-between items-center ${getHoverBgColor()} p-2.5 rounded-lg ${
                          isCompleted 
                            ? 'bg-green-500/20 border border-green-500/30' 
                            : dayPlan.day === selectedDay ? 'bg-yellow-500/10' : ''
                        } transition-colors duration-200`}
                      >
                        <div className="flex items-center gap-1.5 truncate">
                          {isCompleted && (
                            <CheckCircle className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />
                          )}
                          <span className={`truncate ${
                            isCompleted 
                              ? 'text-green-500' 
                              : dayPlan.day === selectedDay ? 'text-yellow-500 font-bold' : ''
                          }`}>{exercise.name}</span>
                        </div>
                        <span className={`text-xs whitespace-nowrap px-2 py-1 rounded-full bg-gray-800/50 ${
                          isCompleted 
                            ? 'text-green-400' 
                            : dayPlan.day === selectedDay ? 'text-yellow-400' : 'text-gray-400'
                        }`}>{exercise.sets} × {exercise.reps}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-800/50 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">{dayPlan.exercises.length} تمرین</span>
                  {(() => {
                    // محاسبه درصد پیشرفت
                    const progress = calculateDayProgress(dayPlan.day, dayPlan.exercises.length);
                    return (
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        progress > 0 
                          ? progress === 100 
                            ? 'bg-green-500/20 text-green-500' 
                            : 'bg-yellow-500/20 text-yellow-500'
                          : 'bg-gray-800 text-gray-400'
                      }`}>
                        {progress > 0 ? `${progress}% انجام شده` : 'مشاهده جزئیات'}
                      </span>
                    );
                  })()}
                </div>
                {(() => {
                  // محاسبه درصد پیشرفت
                  const progress = calculateDayProgress(dayPlan.day, dayPlan.exercises.length);
                  return progress > 0 ? (
                    <div className="w-full bg-gray-800/50 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          progress === 100 ? 'bg-green-500' : 'bg-yellow-500'
                        }`}
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  ) : null;
                })()}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </AppLayout>
  );
};

export default ExercisesPage;
