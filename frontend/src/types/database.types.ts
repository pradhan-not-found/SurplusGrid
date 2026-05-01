export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          email: string
          role: 'producer' | 'consumer' | null
          company_name: string | null
          state_location: string | null
          shiftable_hours: Json
          onboarding_complete: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          email: string
          role?: 'producer' | 'consumer' | null
          company_name?: string | null
          state_location?: string | null
          shiftable_hours?: Json
          onboarding_complete?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          email?: string
          role?: 'producer' | 'consumer' | null
          company_name?: string | null
          state_location?: string | null
          shiftable_hours?: Json
          onboarding_complete?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      user_settings: {
        Row: {
          id: string
          user_id: string
          api_key: string | null
          email_alerts_enabled: boolean
          auto_match_enabled: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          api_key?: string | null
          email_alerts_enabled?: boolean
          auto_match_enabled?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          api_key?: string | null
          email_alerts_enabled?: boolean
          auto_match_enabled?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      surplus_windows: {
        Row: {
          id: string
          producer_id: string
          date: string
          start_time: string
          end_time: string
          predicted_kw: number
          status: 'seeking' | 'matched' | 'partial' | 'expired' | 'curtailed'
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          producer_id: string
          date: string
          start_time: string
          end_time: string
          predicted_kw: number
          status?: 'seeking' | 'matched' | 'partial' | 'expired' | 'curtailed'
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          producer_id?: string
          date?: string
          start_time?: string
          end_time?: string
          predicted_kw?: number
          status?: 'seeking' | 'matched' | 'partial' | 'expired' | 'curtailed'
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      matches: {
        Row: {
          id: string
          window_id: string
          consumer_id: string
          matched_kw: number
          consumer_savings_inr: number
          producer_revenue_inr: number
          status: 'pending' | 'accepted' | 'completed' | 'rejected'
          confidence_score: 'Low' | 'Medium' | 'High'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          window_id: string
          consumer_id: string
          matched_kw: number
          consumer_savings_inr?: number
          producer_revenue_inr?: number
          status?: 'pending' | 'accepted' | 'completed' | 'rejected'
          confidence_score?: 'Low' | 'Medium' | 'High'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          window_id?: string
          consumer_id?: string
          matched_kw?: number
          consumer_savings_inr?: number
          producer_revenue_inr?: number
          status?: 'pending' | 'accepted' | 'completed' | 'rejected'
          confidence_score?: 'Low' | 'Medium' | 'High'
          created_at?: string
          updated_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          message: string
          is_read: boolean
          type: 'alert' | 'match' | 'system'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          message: string
          is_read?: boolean
          type?: 'alert' | 'match' | 'system'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          message?: string
          is_read?: boolean
          type?: 'alert' | 'match' | 'system'
          created_at?: string
          updated_at?: string
        }
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
  }
}
