
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

// User interface based on the application's user structure
export interface User {
  email: string;
  password?: string;
  name?: string;
  age?: number | string;
  gender?: string;
  currentWeight?: string;
  height?: string;
  targetWeight?: string;
  activityLevel?: string;
  goal?: string;
  fitnessLevel?: string;
  subscription_plan?: string;
  subscription_start_date?: string;
  subscription_end_date?: string;
  permissions?: string;
  createdAt?: string;
  updatedAt?: string;
  // Additional fields from the database schema
  dietary_restrictions?: boolean | null;
  dietary_restrictions_details?: string | null;
  steroids_interest?: string | null;
  takes_supplements?: boolean | null;
  training_days_per_week?: string | null;
  training_place?: string | null;
}

// Completed exercise interface
export interface CompletedExercise {
  day: string;
  exerciseName: string;
  completedAt: string;
}

// Supabase user profile interface (matches database schema)
export interface SupabaseUserProfile {
  id?: string;
  user_id?: string;
  name?: string;
  age?: number | null;
  gender?: string | null;
  height?: number | null;
  weight?: number | null;
  target_weight?: number | null;
  primary_goal?: string | null;
  fitness_level?: string | null;
  subscription_plan?: string | null;
  subscription_start_date?: string | null;
  subscription_end_date?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// Supabase completed exercise interface (matches database schema)
export interface CompletedExerciseRecord {
  id?: string;
  user_id: string;
  day: string;
  exercise_name: string;
  completed_at: string;
  created_at?: string;
}
