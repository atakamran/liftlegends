// Import exercises from data file
import { exercises } from '../data/exercises';

// Define days of the week in Persian
export const daysOfWeek = [
  "شنبه",
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنج‌شنبه",
  "جمعه",
];

// Define weekly workout plans in array format for the Exercises page
export const weeklyPlan = [
  {
    day: "شنبه",
    muscleGroup: "سینه و جلو بازو",
    exercises: [
      {
        name: "پرس سینه با هالتر",
        sets: 4,
        reps: 10,
        rest: "90 ثانیه",
        description: "هالتر را با فاصله مناسب از شانه‌ها بگیرید و به آرامی پایین بیاورید و سپس به بالا فشار دهید."
      },
      {
        name: "شنا سوئدی",
        sets: 3,
        reps: 15,
        rest: "60 ثانیه",
        description: "دست‌ها را به عرض شانه باز کنید و بدن را پایین و بالا ببرید."
      },
      {
        name: "جلو بازو با هالتر",
        sets: 3,
        reps: 12,
        rest: "60 ثانیه",
        description: "هالتر را با دو دست بگیرید و به آرامی به سمت شانه‌ها بالا بیاورید."
      }
    ]
  },
  {
    day: "یکشنبه",
    muscleGroup: "پا و شکم",
    exercises: [
      {
        name: "اسکوات با هالتر",
        sets: 4,
        reps: 12,
        rest: "120 ثانیه",
        description: "هالتر را روی شانه‌ها قرار دهید و به آرامی پایین بروید و بالا بیایید."
      },
      {
        name: "ددلیفت",
        sets: 3,
        reps: 10,
        rest: "90 ثانیه",
        description: "هالتر را با دست‌ها بگیرید و با صاف کردن کمر آن را بالا بیاورید."
      },
      {
        name: "کرانچ شکم",
        sets: 4,
        reps: 15,
        rest: "30 ثانیه",
        description: "به پشت بخوابید و شانه‌ها را به سمت زانوها بالا بیاورید."
      }
    ]
  },
  {
    day: "دوشنبه",
    muscleGroup: "استراحت فعال",
    exercises: [
      {
        name: "پیاده روی",
        sets: 1,
        reps: "30 دقیقه",
        rest: "-",
        description: "با سرعت متوسط پیاده روی کنید."
      },
      {
        name: "حرکات کششی",
        sets: 2,
        reps: 10,
        rest: "30 ثانیه",
        description: "حرکات کششی برای تمام عضلات بدن انجام دهید."
      }
    ]
  },
  {
    day: "سه‌شنبه",
    muscleGroup: "پشت و شانه",
    exercises: [
      {
        name: "زیربغل با دمبل",
        sets: 4,
        reps: 12,
        rest: "90 ثانیه",
        description: "دمبل را با یک دست بگیرید و به آرامی به سمت پهلو بکشید."
      },
      {
        name: "پرس سرشانه با هالتر",
        sets: 4,
        reps: 10,
        rest: "90 ثانیه",
        description: "هالتر را جلوی شانه‌ها نگه دارید و به سمت بالا فشار دهید."
      },
      {
        name: "پارویی با دمبل",
        sets: 3,
        reps: 12,
        rest: "60 ثانیه",
        description: "با کمر خم شده، دمبل را به سمت شکم بکشید."
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
      },
      {
        name: "ساعد با دمبل",
        sets: 3,
        reps: 15,
        rest: "60 ثانیه",
        description: "دمبل را در دست بگیرید و مچ دست را بالا و پایین ببرید."
      }
    ]
  },
  {
    day: "پنج‌شنبه",
    muscleGroup: "کل بدن",
    exercises: [
      {
        name: "پرس سینه با دمبل",
        sets: 3,
        reps: 10,
        rest: "90 ثانیه",
        description: "دمبل‌ها را در دست بگیرید و به آرامی پایین بیاورید و سپس به بالا فشار دهید."
      },
      {
        name: "اسکوات با هالتر",
        sets: 3,
        reps: 12,
        rest: "120 ثانیه",
        description: "هالتر را روی شانه‌ها قرار دهید و به آرامی پایین بروید و بالا بیایید."
      },
      {
        name: "زیربغل با دمبل",
        sets: 3,
        reps: 12,
        rest: "90 ثانیه",
        description: "دمبل را با یک دست بگیرید و به آرامی به سمت پهلو بکشید."
      },
      {
        name: "ددلیفت",
        sets: 3,
        reps: 8,
        rest: "120 ثانیه",
        description: "هالتر را با دست‌ها بگیرید و با صاف کردن کمر آن را بالا بیاورید."
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

// Define weekly workout plans in object format for the Index page
const weeklyWorkouts = {
  // شنبه - Saturday
  0: {
    duration: 45,
    intensity: "شدت بالا",
    description: "تمرین سینه و جلو بازو",
    exercises: [
      {
        name: "پرس سینه با هالتر",
        sets: 4,
        reps: 10,
        equipment: "هالتر",
      },
      {
        name: "شنا سوئدی",
        sets: 3,
        reps: 15,
        equipment: "وزن بدن",
      },
      {
        name: "جلو بازو با هالتر",
        sets: 3,
        reps: 12,
        equipment: "هالتر",
      }
    ],
  },
  // یکشنبه - Sunday
  1: {
    duration: 40,
    intensity: "شدت متوسط",
    description: "تمرین پا و شکم",
    exercises: [
      {
        name: "اسکوات با هالتر",
        sets: 4,
        reps: 12,
        equipment: "هالتر",
      },
      {
        name: "ددلیفت",
        sets: 3,
        reps: 10,
        equipment: "هالتر",
      },
      {
        name: "کرانچ شکم",
        sets: 4,
        reps: 15,
        equipment: "وزن بدن",
      },
    ],
  },
  // دوشنبه - Monday
  2: {
    duration: 30,
    intensity: "شدت کم",
    description: "استراحت فعال",
    exercises: [
      {
        name: "پیاده روی",
        sets: 1,
        reps: 30,
        equipment: "بدون تجهیزات",
      },
      {
        name: "حرکات کششی",
        sets: 2,
        reps: 10,
        equipment: "بدون تجهیزات",
      },
    ],
  },
  // سه شنبه - Tuesday
  3: {
    duration: 50,
    intensity: "شدت بالا",
    description: "تمرین پشت و شانه",
    exercises: [
      {
        name: "زیربغل با دمبل",
        sets: 4,
        reps: 12,
        equipment: "دمبل",
      },
      {
        name: "پرس سرشانه با هالتر",
        sets: 4,
        reps: 10,
        equipment: "هالتر",
      },
      {
        name: "پارویی با دمبل",
        sets: 3,
        reps: 12,
        equipment: "دمبل",
      },
    ],
  },
  // چهارشنبه - Wednesday
  4: {
    duration: 45,
    intensity: "شدت متوسط",
    description: "تمرین بازو و ساعد",
    exercises: [
      {
        name: "جلو بازو با هالتر",
        sets: 3,
        reps: 12,
        equipment: "هالتر",
      },
      {
        name: "پشت بازو دیپ",
        sets: 3,
        reps: 10,
        equipment: "نیمکت",
      },
      {
        name: "ساعد با دمبل",
        sets: 3,
        reps: 15,
        equipment: "دمبل",
      },
    ],
  },
  // پنج شنبه - Thursday
  5: {
    duration: 60,
    intensity: "شدت بالا",
    description: "تمرین کل بدن",
    exercises: [
      {
        name: "پرس سینه با دمبل",
        sets: 3,
        reps: 10,
        equipment: "دمبل",
      },
      {
        name: "اسکوات با هالتر",
        sets: 3,
        reps: 12,
        equipment: "هالتر",
      },
      {
        name: "زیربغل با دمبل",
        sets: 3,
        reps: 12,
        equipment: "دمبل",
      },
      {
        name: "ددلیفت",
        sets: 3,
        reps: 8,
        equipment: "هالتر",
      },
    ],
  },
  // جمعه - Friday
  6: {
    duration: 30,
    intensity: "شدت کم",
    description: "ریکاوری",
    exercises: [
      {
        name: "حرکات کششی کل بدن",
        sets: 1,
        reps: 10,
        equipment: "بدون تجهیزات",
      },
      {
        name: "مدیتیشن",
        sets: 1,
        reps: 15,
        equipment: "بدون تجهیزات",
      },
    ],
  },
};

// Function to get today's day in Persian calendar
export const getTodayDay = () => {
  const today = new Date();
  // In JavaScript, getDay() returns 0 for Sunday, 1 for Monday, etc.
  // We need to adjust it for the Persian calendar where the week starts with Saturday (6)
  // Saturday: 6 -> 0, Sunday: 0 -> 1, Monday: 1 -> 2, ..., Friday: 5 -> 6
  const dayIndex = today.getDay() === 6 ? 0 : today.getDay() + 1;
  return daysOfWeek[dayIndex];
};

export const getTodayExercise = () => {
  // Get current day of week (0 = Saturday, 1 = Sunday, ..., 6 = Friday in Persian calendar)
  const today = new Date().getDay();
  
  // Convert from JavaScript day (0 = Sunday) to Persian calendar day (0 = Saturday)
  // Sunday (0) -> 1, Monday (1) -> 2, ..., Saturday (6) -> 0
  const persianDay = today === 0 ? 6 : today - 1;
  
  // Return the workout for today
  return weeklyWorkouts[persianDay];
};