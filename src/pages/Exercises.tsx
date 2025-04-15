import React, { useState } from "react";
import AppLayout from "@/components/Layout/AppLayout";
import { exercises } from "@/data/exercises";
import { MuscleGroup, Exercise } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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

const ExercisesPage = () => {
  const [selectedTab, setSelectedTab] = useState<MuscleGroup | "همه">("همه");
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  return (
    <AppLayout>
      <h1 className="text-2xl font-bold mb-6">کتابخانه تمرین‌ها</h1>

      <Tabs defaultValue="شنبه" value={selectedTab} onValueChange={(value) => setSelectedTab(value as any)}>
        <TabsList className="mb-6 w-full flex flex-col items-end gap-4 bg-gray-100 p-2 rounded-lg shadow-md">
          {weeklyPlan.map((day) => (
            <TabsTrigger
              key={day.day}
              value={day.day}
              className="px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 hover:bg-yellow-500 hover:text-black focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
            >
              {day.day}
            </TabsTrigger>
          ))}
        </TabsList>

        {weeklyPlan.map((day) => (
          <TabsContent key={day.day} value={day.day} className="mt-0">
            {day.exercises.map((exercise, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-bold">{exercise.name}</h3>
                <p>ست‌ها: {exercise.sets} | تکرار: {exercise.reps} | استراحت: {exercise.rest}</p>
                <p className="text-muted-foreground">{exercise.description}</p>
              </div>
            ))}
          </TabsContent>
        ))}
      </Tabs>

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
