export interface BusinessCard {
  id: string;
  user_id: string;
  full_name: string;
  job_title?: string;
  company?: string;
  email?: string;
  phone?: string;
  website?: string;
  personal_description?: string;
  profile_image?: string;
  theme: string;
  public_url?: string;
  created_at: string;
  updated_at: string;
}

export interface SocialMediaLink {
  id: string;
  card_id: string;
  platform: string;
  url: string;
  custom_icon?: string;
  is_visible: boolean;
  display_order: number;
  created_at: string;
}

export interface BusinessLink {
  id: string;
  card_id: string;
  title: string;
  url: string;
  description?: string;
  custom_logo?: string;
  display_order: number;
  created_at: string;
}

export interface CardAnalytics {
  id: string;
  card_id: string;
  event_type: 'view' | 'click';
  event_data?: Record<string, any>;
  created_at: string;
}