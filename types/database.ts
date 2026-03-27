export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type UserRole = 'private' | 'realtor' | 'agent';
export type PropertyType = 'residential' | 'commercial' | 'land' | 'industrial';
export type ListingStatus = 'draft' | 'active' | 'sold' | 'leased' | 'archived';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          username: string | null
          role: UserRole
          trust_score: number
          is_verified: boolean
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          username?: string | null
          role?: UserRole
          trust_score?: number
          is_verified?: boolean
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          username?: string | null
          role?: UserRole
          trust_score?: number
          is_verified?: boolean
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      listings: {
        Row: {
          id: string
          owner_id: string
          title: string
          description: string | null
          price: number
          currency: string
          property_type: PropertyType
          listing_type: string
          status: ListingStatus
          address: string | null
          city: string | null
          country: string | null
          latitude: number | null
          longitude: number | null
          amenities: Json
          images: string[]
          is_featured: boolean
          translations: Json
          expires_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          owner_id: string
          title: string
          description?: string | null
          price: number
          currency?: string
          property_type: PropertyType
          listing_type: string
          status?: ListingStatus
          address?: string | null
          city?: string | null
          country?: string | null
          latitude?: number | null
          longitude?: number | null
          amenities?: Json
          images?: string[]
          is_featured?: boolean
          translations?: Json
          expires_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          owner_id?: string
          title?: string
          description?: string | null
          price?: number
          currency?: string
          property_type?: PropertyType
          listing_type?: string
          status?: ListingStatus
          address?: string | null
          city?: string | null
          country?: string | null
          latitude?: number | null
          longitude?: number | null
          amenities?: Json
          images?: string[]
          is_featured?: boolean
          translations?: Json
          expires_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      transactions: {
        Row: {
          id: string
          listing_id: string | null
          user_id: string | null
          amount: number
          currency: string
          provider: string
          provider_id: string | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          listing_id?: string | null
          user_id?: string | null
          amount: number
          currency: string
          provider: string
          provider_id?: string | null
          status: string
          created_at?: string
        }
        Update: {
          id?: string
          listing_id?: string | null
          user_id?: string | null
          amount?: number
          currency?: string
          provider?: string
          provider_id?: string | null
          status?: string
          created_at?: string
        }
      }
      video_calls: {
        Row: {
          id: string
          listing_id: string | null
          requester_id: string | null
          owner_id: string | null
          room_name: string
          status: string
          scheduled_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          listing_id?: string | null
          requester_id?: string | null
          owner_id?: string | null
          room_name: string
          status?: string
          scheduled_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          listing_id?: string | null
          requester_id?: string | null
          owner_id?: string | null
          room_name?: string
          status?: string
          scheduled_at?: string | null
          created_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          listing_id: string | null
          sender_id: string
          receiver_id: string
          content: string
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          listing_id?: string | null
          sender_id: string
          receiver_id: string
          content: string
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          listing_id?: string | null
          sender_id?: string
          receiver_id?: string
          content?: string
          is_read?: boolean
          created_at?: string
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
      user_role: UserRole
      property_type: PropertyType
      listing_status: ListingStatus
    }
  }
}
