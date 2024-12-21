/*
  # Initial Schema for E-Business Card Maker

  1. New Tables
    - `business_cards`: Stores the main card information
    - `social_media_links`: Stores social media links for each card
    - `business_links`: Stores business-related links for each card
    - `card_analytics`: Tracks views and interactions with cards

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Allow public read access to published cards
*/

-- Business Cards Table
CREATE TABLE business_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  full_name TEXT NOT NULL,
  job_title TEXT,
  company TEXT,
  email TEXT,
  phone TEXT,
  website TEXT,
  personal_description TEXT,
  profile_image TEXT,
  theme TEXT DEFAULT 'default',
  public_url TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Social Media Links Table
CREATE TABLE social_media_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  card_id UUID REFERENCES business_cards(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  custom_icon TEXT,
  is_visible BOOLEAN DEFAULT true,
  display_order INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Business Links Table
CREATE TABLE business_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  card_id UUID REFERENCES business_cards(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  description TEXT,
  custom_logo TEXT,
  display_order INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Analytics Table
CREATE TABLE card_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  card_id UUID REFERENCES business_cards(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  event_data JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE business_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_media_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE card_analytics ENABLE ROW LEVEL SECURITY;

-- Policies for business_cards
CREATE POLICY "Users can create their own cards"
  ON business_cards FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own cards"
  ON business_cards FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Public can view published cards"
  ON business_cards FOR SELECT
  TO anon
  USING (public_url IS NOT NULL);

CREATE POLICY "Users can update their own cards"
  ON business_cards FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own cards"
  ON business_cards FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for social_media_links
CREATE POLICY "Users can manage their card's social links"
  ON social_media_links FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM business_cards
    WHERE business_cards.id = card_id
    AND business_cards.user_id = auth.uid()
  ));

CREATE POLICY "Public can view published card's social links"
  ON social_media_links FOR SELECT
  TO anon
  USING (EXISTS (
    SELECT 1 FROM business_cards
    WHERE business_cards.id = card_id
    AND business_cards.public_url IS NOT NULL
  ));

-- Policies for business_links
CREATE POLICY "Users can manage their card's business links"
  ON business_links FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM business_cards
    WHERE business_cards.id = card_id
    AND business_cards.user_id = auth.uid()
  ));

CREATE POLICY "Public can view published card's business links"
  ON business_links FOR SELECT
  TO anon
  USING (EXISTS (
    SELECT 1 FROM business_cards
    WHERE business_cards.id = card_id
    AND business_cards.public_url IS NOT NULL
  ));

-- Policies for card_analytics
CREATE POLICY "Users can view their card's analytics"
  ON card_analytics FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM business_cards
    WHERE business_cards.id = card_id
    AND business_cards.user_id = auth.uid()
  ));

CREATE POLICY "Allow inserting analytics for public cards"
  ON card_analytics FOR INSERT
  TO anon
  WITH CHECK (EXISTS (
    SELECT 1 FROM business_cards
    WHERE business_cards.id = card_id
    AND business_cards.public_url IS NOT NULL
  ));