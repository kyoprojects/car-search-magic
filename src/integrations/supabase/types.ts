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
      car_colors: {
        Row: {
          color_name: string
          created_at: string
          hex_code: string
          id: number
        }
        Insert: {
          color_name: string
          created_at?: string
          hex_code: string
          id?: number
        }
        Update: {
          color_name?: string
          created_at?: string
          hex_code?: string
          id?: number
        }
        Relationships: []
      }
      cars: {
        Row: {
          brand: string | null
          id: number
          make: string | null
          model: string
          name: string | null
          thumbnail: string | null
          year: string | null
        }
        Insert: {
          brand?: string | null
          id?: never
          make?: string | null
          model: string
          name?: string | null
          thumbnail?: string | null
          year?: string | null
        }
        Update: {
          brand?: string | null
          id?: never
          make?: string | null
          model?: string
          name?: string | null
          thumbnail?: string | null
          year?: string | null
        }
        Relationships: []
      }
      renders: {
        Row: {
          base: boolean | null
          car_brand: string | null
          car_model: string | null
          color: string
          file_path: string | null
          id: number
          image: string | null
          model: string | null
          type: string | null
          view: string
        }
        Insert: {
          base?: boolean | null
          car_brand?: string | null
          car_model?: string | null
          color: string
          file_path?: string | null
          id?: never
          image?: string | null
          model?: string | null
          type?: string | null
          view: string
        }
        Update: {
          base?: boolean | null
          car_brand?: string | null
          car_model?: string | null
          color?: string
          file_path?: string | null
          id?: never
          image?: string | null
          model?: string | null
          type?: string | null
          view?: string
        }
        Relationships: [
          {
            foreignKeyName: "car_scenes_car_model_fkey"
            columns: ["car_model"]
            isOneToOne: false
            referencedRelation: "cars"
            referencedColumns: ["model"]
          },
        ]
      }
      wheel_models: {
        Row: {
          created_at: string
          id: number
          model: string | null
          series: string | null
          thumbnail: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          model?: string | null
          series?: string | null
          thumbnail?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          model?: string | null
          series?: string | null
          thumbnail?: string | null
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
