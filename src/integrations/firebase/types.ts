import { FirestoreDataConverter } from "firebase/firestore";

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type FirebaseDatabase = {
  user_profiles: {
    age: number | null;
    created_at: string | null;
    dietary_restrictions: boolean | null;
    dietary_restrictions_details: string | null;
    fitness_level: string | null;
    gender: string | null;
    height: number | null;
    id: string;
    name: string | null;
    primary_goal: string | null;
    steroids_interest: string | null;
    subscription_end_date: string | null;
    subscription_plan: string | null;
    subscription_start_date: string | null;
    takes_supplements: boolean | null;
    training_days_per_week: string | null;
    training_place: string | null;
    updated_at: string | null;
    user_id: string | null;
    weight: number | null;
  };
};

export const userProfilesConverter: FirestoreDataConverter<FirebaseDatabase["user_profiles"]> = {
  toFirestore: (data) => data,
  fromFirestore: (snapshot) => {
    const data = snapshot.data();
    return {
      age: data.age ?? null,
      created_at: data.created_at ?? null,
      dietary_restrictions: data.dietary_restrictions ?? null,
      dietary_restrictions_details: data.dietary_restrictions_details ?? null,
      fitness_level: data.fitness_level ?? null,
      gender: data.gender ?? null,
      height: data.height ?? null,
      id: data.id,
      name: data.name ?? null,
      primary_goal: data.primary_goal ?? null,
      steroids_interest: data.steroids_interest ?? null,
      subscription_end_date: data.subscription_end_date ?? null,
      subscription_plan: data.subscription_plan ?? null,
      subscription_start_date: data.subscription_start_date ?? null,
      takes_supplements: data.takes_supplements ?? null,
      training_days_per_week: data.training_days_per_week ?? null,
      training_place: data.training_place ?? null,
      updated_at: data.updated_at ?? null,
      user_id: data.user_id ?? null,
      weight: data.weight ?? null,
    };
  },
};