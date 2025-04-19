// سرویس مدیریت پیشرفت تمرین‌ها
import { supabase } from "@/integrations/supabase/client";
import { CompletedExercise } from "@/types";

// کلید ذخیره‌سازی در localStorage (برای پشتیبانی از نسخه‌های قدیمی)
const COMPLETED_EXERCISES_KEY = 'completed_exercises';

// کش برای بهبود عملکرد
let exercisesCache: CompletedExercise[] | null = null;
let currentUserId: string | null = null;

/**
 * دریافت شناسه کاربر فعلی
 */
async function getCurrentUserId(): Promise<string | null> {
  try {
    const { data } = await supabase.auth.getUser();
    return data.user?.id || null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

/**
 * دریافت تمام تمرین‌های انجام شده
 */
export async function getCompletedExercises(): Promise<CompletedExercise[]> {
  try {
    // اگر کاربر وارد نشده باشد، از localStorage استفاده می‌کنیم
    const userId = await getCurrentUserId();
    if (!userId) {
      // استفاده از localStorage به عنوان پشتیبان
      const savedData = localStorage.getItem(COMPLETED_EXERCISES_KEY);
      if (savedData) {
        return JSON.parse(savedData);
      }
      return [];
    }

    // اگر کش معتبر داریم، از آن استفاده می‌کنیم
    if (exercisesCache && currentUserId === userId) {
      return exercisesCache;
    }

    // دریافت داده‌ها از Supabase
    const { data, error } = await supabase
      .from('completed_exercises')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;

    // تبدیل فرمت داده‌ها
    const exercises = data.map(item => ({
      day: item.day,
      exerciseName: item.exercise_name,
      completedAt: item.completed_at
    }));

    // به‌روزرسانی کش
    exercisesCache = exercises;
    currentUserId = userId;

    return exercises;
  } catch (error) {
    console.error('Error loading completed exercises:', error);
    return [];
  }
}

/**
 * ذخیره تمرین انجام شده
 */
export async function saveCompletedExercise(day: string, exerciseName: string): Promise<boolean> {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      // اگر کاربر وارد نشده باشد، از localStorage استفاده می‌کنیم
      const completedExercises = await getCompletedExercises();
      
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
      return true;
    }

    // بررسی آیا این تمرین قبلاً انجام شده است
    const { data: existingData, error: checkError } = await supabase
      .from('completed_exercises')
      .select('id')
      .eq('user_id', userId)
      .eq('day', day)
      .eq('exercise_name', exerciseName);

    if (checkError) throw checkError;

    // اگر قبلاً انجام شده، آن را حذف می‌کنیم (toggle)
    if (existingData && existingData.length > 0) {
      const { error: deleteError } = await supabase
        .from('completed_exercises')
        .delete()
        .eq('id', existingData[0].id);

      if (deleteError) throw deleteError;
    } else {
      // اضافه کردن تمرین جدید
      const { error: insertError } = await supabase
        .from('completed_exercises')
        .insert({
          user_id: userId,
          day,
          exercise_name: exerciseName,
          completed_at: new Date().toISOString()
        });

      if (insertError) throw insertError;
    }

    // پاک کردن کش
    exercisesCache = null;
    
    return true;
  } catch (error) {
    console.error('Error saving completed exercise:', error);
    return false;
  }
}

/**
 * بررسی آیا تمرین انجام شده است
 */
export async function isExerciseCompleted(day: string, exerciseName: string): Promise<boolean> {
  const completedExercises = await getCompletedExercises();
  return completedExercises.some(
    item => item.day === day && item.exerciseName === exerciseName
  );
}

/**
 * دریافت تمرین‌های انجام شده یک روز خاص
 */
export async function getDayCompletedExercises(day: string): Promise<string[]> {
  const completedExercises = await getCompletedExercises();
  return completedExercises
    .filter(item => item.day === day)
    .map(item => item.exerciseName);
}

/**
 * محاسبه درصد پیشرفت روز
 */
export async function calculateDayProgress(day: string, totalExercises: number): Promise<number> {
  if (totalExercises === 0) return 0;
  
  const completedExercises = await getDayCompletedExercises(day);
  const completedCount = completedExercises.length;
  return Math.round((completedCount / totalExercises) * 100);
}

/**
 * پاک کردن تمام تمرین‌های انجام شده
 */
export async function clearAllCompletedExercises(): Promise<boolean> {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      // اگر کاربر وارد نشده باشد، از localStorage استفاده می‌کنیم
      localStorage.removeItem(COMPLETED_EXERCISES_KEY);
      return true;
    }

    const { error } = await supabase
      .from('completed_exercises')
      .delete()
      .eq('user_id', userId);

    if (error) throw error;
    
    // پاک کردن کش
    exercisesCache = null;
    
    return true;
  } catch (error) {
    console.error('Error clearing completed exercises:', error);
    return false;
  }
}