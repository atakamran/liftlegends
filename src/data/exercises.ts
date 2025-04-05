
import { Exercise } from '../types';

export const exercises: Exercise[] = [
  {
    id: '1',
    name: 'پرس سینه',
    muscleGroup: 'سینه',
    description: 'پرس سینه یکی از پایه‌ای‌ترین تمرینات برای تقویت عضلات سینه است.',
    level: 'مبتدی',
  },
  {
    id: '2',
    name: 'اسکوات',
    muscleGroup: 'پا',
    description: 'اسکوات یک تمرین پایه‌ای و قدرتمند برای تقویت عضلات پایین تنه است.',
    level: 'متوسط',
  },
  {
    id: '3',
    name: 'زیر بغل با دمبل',
    muscleGroup: 'پشت',
    description: 'تمرین مناسب برای عضلات پشت با استفاده از دمبل.',
    level: 'مبتدی',
  },
  {
    id: '4',
    name: 'پرس سرشانه',
    muscleGroup: 'شانه',
    description: 'تمرین اصلی برای تقویت عضلات شانه.',
    level: 'متوسط',
  },
  {
    id: '5',
    name: 'جلو بازو با هالتر',
    muscleGroup: 'بازو',
    description: 'تمرین کلاسیک برای تقویت عضلات جلو بازو.',
    level: 'مبتدی',
  },
  {
    id: '6',
    name: 'حرکت کرانچ',
    muscleGroup: 'شکم',
    description: 'تمرین مناسب برای تقویت عضلات شکم.',
    level: 'مبتدی',
  },
  {
    id: '7',
    name: 'ددلیفت',
    muscleGroup: 'کل بدن',
    description: 'تمرین اصلی برای تقویت عضلات سراسری بدن با تمرکز بر پشت و پا.',
    level: 'پیشرفته',
  },
  {
    id: '8',
    name: 'شنا سوئدی',
    muscleGroup: 'سینه',
    description: 'تمرین پایه بدون نیاز به تجهیزات برای تقویت عضلات سینه، شانه و سه سر.',
    level: 'مبتدی',
  }
];

export const getMuscleGroupImage = (muscleGroup: string): string => {
  switch (muscleGroup) {
    case 'سینه':
      return '💪';
    case 'پشت':
      return '💪';
    case 'شانه':
      return '💪';
    case 'پا':
      return '🦵';
    case 'بازو':
      return '💪';
    case 'شکم':
      return '🧠';
    default:
      return '💪';
  }
};
