// سرویس مدیریت پیشرفت تمرین‌ها

// کلید ذخیره‌سازی در localStorage
const COMPLETED_EXERCISES_KEY = 'completed_exercises';

// نوع داده برای تمرین‌های انجام شده
export interface CompletedExercise {
  day: string;
  exerciseName: string;
  completedAt: string; // تاریخ و زمان به صورت ISO string
}

/**
 * دریافت تمام تمرین‌های انجام شده
 */
export function getCompletedExercises(): CompletedExercise[] {
  try {
    const savedData = localStorage.getItem(COMPLETED_EXERCISES_KEY);
    if (savedData) {
      return JSON.parse(savedData);
    }
  } catch (error) {
    console.error('Error loading completed exercises:', error);
  }
  return [];
}

/**
 * ذخیره تمرین انجام شده
 */
export function saveCompletedExercise(day: string, exerciseName: string): void {
  try {
    const completedExercises = getCompletedExercises();
    
    // بررسی آیا این تمرین قبلاً انجام شده است
    const existingIndex = completedExercises.findIndex(
      item => item.day === day && item.exerciseName === exerciseName
    );
    
    // اگر قبلاً انجام شده، آن را حذف می‌کنیم (toggle)
    if (existingIndex !== -1) {
      completedExercises.splice(existingIndex, 1);
    } else {
      // اضافه کردن تمرین جدید
      completedExercises.push({
        day,
        exerciseName,
        completedAt: new Date().toISOString()
      });
    }
    
    // ذخیره در localStorage
    localStorage.setItem(COMPLETED_EXERCISES_KEY, JSON.stringify(completedExercises));
  } catch (error) {
    console.error('Error saving completed exercise:', error);
  }
}

/**
 * بررسی آیا تمرین انجام شده است
 */
export function isExerciseCompleted(day: string, exerciseName: string): boolean {
  const completedExercises = getCompletedExercises();
  return completedExercises.some(
    item => item.day === day && item.exerciseName === exerciseName
  );
}

/**
 * دریافت تمرین‌های انجام شده یک روز خاص
 */
export function getDayCompletedExercises(day: string): string[] {
  const completedExercises = getCompletedExercises();
  return completedExercises
    .filter(item => item.day === day)
    .map(item => item.exerciseName);
}

/**
 * محاسبه درصد پیشرفت روز
 */
export function calculateDayProgress(day: string, totalExercises: number): number {
  if (totalExercises === 0) return 0;
  
  const completedCount = getDayCompletedExercises(day).length;
  return Math.round((completedCount / totalExercises) * 100);
}

/**
 * پاک کردن تمام تمرین‌های انجام شده
 */
export function clearAllCompletedExercises(): void {
  localStorage.removeItem(COMPLETED_EXERCISES_KEY);
}