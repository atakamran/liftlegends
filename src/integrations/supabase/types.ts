export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          age: number | null
          created_at: string | null
          dietary_restrictions: boolean | null
          dietary_restrictions_details: string | null
          fitness_level: string | null
          gender: string | null
          height: number | null
          id: string
          name: string | null
          primary_goal: string | null
          steroids_interest: string | null
          subscription_end_date: string | null
          subscription_plan: string | null
          subscription_start_date: string | null
          takes_supplements: boolean | null
          target_weight: number | null
          training_days_per_week: string | null
          training_place: string | null
          updated_at: string | null
          user_id: string | null
          weight: number | null
        }
        Insert: {
          age?: number | null
          created_at?: string | null
          dietary_restrictions?: boolean | null
          dietary_restrictions_details?: string | null
          fitness_level?: string | null
          gender?: string | null
          height?: number | null
          id?: string
          name?: string | null
          primary_goal?: string | null
          steroids_interest?: string | null
          subscription_end_date?: string | null
          subscription_plan?: string | null
          subscription_start_date?: string | null
          takes_supplements?: boolean | null
          target_weight?: number | null
          training_days_per_week?: string | null
          training_place?: string | null
          updated_at?: string | null
          user_id?: string | null
          weight?: number | null
        }
        Update: {
          age?: number | null
          created_at?: string | null
          dietary_restrictions?: boolean | null
          dietary_restrictions_details?: string | null
          fitness_level?: string | null
          gender?: string | null
          height?: number | null
          id?: string
          name?: string | null
          primary_goal?: string | null
          steroids_interest?: string | null
          subscription_end_date?: string | null
          subscription_plan?: string | null
          subscription_start_date?: string | null
          takes_supplements?: boolean | null
          target_weight?: number | null
          training_days_per_week?: string | null
          training_place?: string | null
          updated_at?: string | null
          user_id?: string | null
          weight?: number | null
        }
        Relationships: []
      }
      completed_exercises: {
        Row: {
          id: string
          user_id: string
          day: string
          exercise_name: string
          completed_at: string
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          day: string
          exercise_name: string
          completed_at: string
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          day?: string
          exercise_name?: string
          completed_at?: string
          created_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
