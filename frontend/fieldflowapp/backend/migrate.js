const pool = require("./config/db");
require("dotenv").config();

const sql = `
CREATE TABLE IF NOT EXISTS users (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(100)  NOT NULL,
  email       VARCHAR(150)  UNIQUE NOT NULL,
  phone       VARCHAR(20)   NOT NULL,
  password    TEXT          NOT NULL,
  role        VARCHAR(20)   NOT NULL CHECK (role IN ('customer', 'technician', 'dispatcher', 'admin')),
  address     TEXT,
  city        VARCHAR(100),
  pincode     VARCHAR(10),
  category    VARCHAR(100),
  experience  INTEGER,
  working_area VARCHAR(100),
  available_today BOOLEAN DEFAULT FALSE,
  employee_id  VARCHAR(50),
  office_branch VARCHAR(100),
  invite_code  VARCHAR(100),
  created_at  TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  theme VARCHAR(20) DEFAULT 'dark',
  language VARCHAR(10) DEFAULT 'en',
  email_notifications BOOLEAN DEFAULT true,
  push_notifications BOOLEAN DEFAULT true,
  marketing_notifications BOOLEAN DEFAULT false,
  privacy_profile_visibility VARCHAR(20) DEFAULT 'public',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
`;

pool.query(sql)
  .then(() => { console.log("✅ users and user_preferences tables created successfully"); process.exit(0); })
  .catch((err) => { console.error("❌ Migration failed:", err.message); process.exit(1); });

