-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS user_preferences (
  id                         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  theme                      VARCHAR(20)  DEFAULT 'light',
  language                   VARCHAR(10)  DEFAULT 'en',
  email_notifications        BOOLEAN      DEFAULT true,
  push_notifications         BOOLEAN      DEFAULT true,
  marketing_notifications    BOOLEAN      DEFAULT false,
  privacy_profile_visibility VARCHAR(20)  DEFAULT 'public',
  created_at                 TIMESTAMPTZ  DEFAULT NOW(),
  updated_at                 TIMESTAMPTZ  DEFAULT NOW(),
  UNIQUE(user_id)
);
