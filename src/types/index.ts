
export type MuscleGroup = 
  | 'سینه' // chest
  | 'پشت' // back
  | 'شانه' // shoulders
  | 'پا' // legs
  | 'بازو' // arms
  | 'شکم' // abs
  | 'سرشانه' // traps
  | 'ساعد' // forearms
  | 'ساق پا' // calves
  | 'باسن' // glutes
  | 'کل بدن'; // full body

export type ExerciseLevel = 'مبتدی' | 'متوسط' | 'پیشرفته';

export type Exercise = {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  description: string;
  level: ExerciseLevel;
  imageUrl?: string;
};

export type WorkoutSet = {
  id: string;
  exerciseId: string;
  weight: number;
  reps: number;
  completed: boolean;
};

export type Workout = {
  id: string;
  name: string;
  date: Date;
  exercises: WorkoutExercise[];
  completed: boolean;
};

export type WorkoutExercise = {
  id: string;
  exerciseId: string;
  sets: WorkoutSet[];
};

export type UserProfile = {
  name: string;
  age: number;
  weight: number;
  height: number;
  fitnessLevel: ExerciseLevel;
  goals: string[];
};
