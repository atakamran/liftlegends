import React, { useState, useEffect } from "react";
import AppLayout from "@/components/Layout/AppLayout";
import { exercises } from "@/data/exercises";
import { MuscleGroup, Exercise } from "@/types";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const muscleGroups: MuscleGroup[] = [
  'کل بدن',
  'سینه',
  'پشت',
  'شانه',
  'پا',
  'بازو',
  'شکم',
];

const weeklyPlan = [
  {
    day: "شنبه",
    muscleGroup: "سینه",
    exercises: [
      {
        name: "پرس سینه با هالتر",
        sets: 4,
        reps: 10,
        rest: "90 ثانیه",
        description: "هالتر را با فاصله مناسب از شانه‌ها بگیرید و به آرامی پایین بیاورید و سپس به بالا فشار دهید."
      },
      {
        name: "پرس بالا سینه با دمبل",
        sets: 3,
        reps: 12,
        rest: "60 ثانیه",
        description: "دمبل‌ها را در زاویه ۳۰ درجه نگه دارید و به آرامی بالا و پایین ببرید."
      }
    ]
  },
  {
    day: "یکشنبه",
    muscleGroup: "پشت",
    exercises: [
      {
        name: "بارفیکس دست باز",
        sets: 3,
        reps: 8,
        rest: "90 ثانیه",
        description: "دست‌ها را به عرض شانه باز کنید و به آرامی بالا و پایین بروید."
      },
      {
        name: "زیربغل هالتر خم",
        sets: 4,
        reps: 10,
        rest: "90 ثانیه",
        description: "هالتر را با دو دست بگیرید و به آرامی به سمت شکم بکشید."
      }
    ]
  },
  {
    day: "دوشنبه",
    muscleGroup: "پا",
    exercises: [
      {
        name: "اسکوات با هالتر",
        sets: 4,
        reps: 10,
        rest: "120 ثانیه",
        description: "هالتر را روی شانه‌ها قرار دهید و به آرامی پایین بروید و بالا بیایید."
      },
      {
        name: "لانج با دمبل",
        sets: 3,
        reps: 12,
        rest: "60 ثانیه",
        description: "دمبل‌ها را در دست بگیرید و یک پا را به جلو ببرید و پایین بروید."
      }
    ]
  },
  {
    day: "سه‌شنبه",
    muscleGroup: "شکم و هوازی",
    exercises: [
      {
        name: "کرانچ شکم",
        sets: 3,
        reps: 15,
        rest: "30 ثانیه",
        description: "به پشت بخوابید و شانه‌ها را به سمت زانوها بالا بیاورید."
      },
      {
        name: "دویدن روی تردمیل",
        sets: 1,
        reps: "15 دقیقه",
        rest: "-",
        description: "با سرعت متوسط روی تردمیل بدوید."
      }
    ]
  },
  {
    day: "چهارشنبه",
    muscleGroup: "بازو و ساعد",
    exercises: [
      {
        name: "جلو بازو با هالتر",
        sets: 4,
        reps: 12,
        rest: "60 ثانیه",
        description: "هالتر را با دو دست بگیرید و به آرامی به سمت شانه‌ها بالا بیاورید."
      },
      {
        name: "پشت بازو دیپ",
        sets: 3,
        reps: 10,
        rest: "90 ثانیه",
        description: "روی نیمکت بنشینید و با دست‌ها بدن را بالا و پایین ببرید."
      }
    ]
  },
  {
    day: "پنج‌شنبه",
    muscleGroup: "سرشانه",
    exercises: [
      {
        name: "پرس سرشانه با دمبل",
        sets: 4,
        reps: 10,
        rest: "90 ثانیه",
        description: "دمبل‌ها را در کنار گوش‌ها نگه دارید و به سمت بالا فشار دهید."
      },
      {
        name: "نشر جانب با دمبل",
        sets: 3,
        reps: 12,
        rest: "60 ثانیه",
        description: "دمبل‌ها را در کنار بدن نگه دارید و به آرامی به طرفین بالا ببرید."
      }
    ]
  },
  {
    day: "جمعه",
    muscleGroup: "ریکاوری",
    exercises: [
      {
        name: "حرکات کششی کل بدن",
        sets: 1,
        reps: "10 دقیقه",
        rest: "-",
        description: "حرکات کششی برای تمام عضلات بدن انجام دهید."
      },
      {
        name: "مدیتیشن",
        sets: 1,
        reps: "15 دقیقه",
        rest: "-",
        description: "در یک محیط آرام بنشینید و تمرکز کنید."
      }
    ]
  }
];

const daysOfWeek = [
  "شنبه",
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنج‌شنبه",
  "جمعه",
];

const getTodayDay = () => {
  const daysOfWeek = ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه"];
  const today = new Date();
  const adjustedDay = (today.getDay() + 1) % 7; // Adjust to start the week from Saturday
  return daysOfWeek[adjustedDay];
};

const ExercisesPage = () => {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [selectedDay, setSelectedDay] = useState(getTodayDay());

  useEffect(() => {
    setSelectedDay(getTodayDay());
  }, []);

  return (
    <AppLayout>
      <h1 className="text-2xl font-bold mb-6">برنامه هفتگی تمرین‌ها</h1>

      <Swiper spaceBetween={20} slidesPerView={1} className="w-full" initialSlide={new Date().getDay()}>
        {daysOfWeek.map((day, index) => (
          <SwiperSlide key={index}>
            <div className={`rounded-lg border text-card-foreground bg-gray-900 border-gray-800 overflow-hidden shadow-lg p-6 ${day === selectedDay ? 'ring-2 ring-yellow-500' : ''}`}>
              <h3 className="text-xl font-bold mb-2">{day}</h3>
              <p className="text-sm text-gray-400">برنامه تمرین برای این روز</p>
              <ul className="mt-4 space-y-2">
                <li className="flex justify-between items-center">
                  <span>تمرین ۱</span>
                  <span className="text-xs text-gray-500">۴ ست × ۱۲ تکرار</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>تمرین ۲</span>
                  <span className="text-xs text-gray-500">۳ ست × ۱۰ تکرار</span>
                </li>
              </ul>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Dialog open={!!selectedExercise} onOpenChange={() => setSelectedExercise(null)}>
        {selectedExercise && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedExercise.name}</DialogTitle>
              <DialogDescription>{selectedExercise.muscleGroup} - {selectedExercise.level}</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p>{selectedExercise.description}</p>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </AppLayout>
  );
};

export default ExercisesPage;
