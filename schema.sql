-- Relational schema for well readings (works in SQLite and PostgreSQL with minimal changes)

-- Table: readings
CREATE TABLE IF NOT EXISTS readings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,           -- use SERIAL in Postgres if you prefer
  reading_date DATE NOT NULL,                     -- YYYY-MM-DD
  reading_time TIME,                              -- HH:MM:SS (nullable)
  forage1_index TEXT,                             -- keep TEXT to preserve '***' or '****'
  forage1_consumption INTEGER,
  forage2_index TEXT,
  forage2_consumption INTEGER,
  forage3_index TEXT,
  forage3_consumption INTEGER,
  total_consumption INTEGER,                      -- if available; else can be computed
  notes TEXT,
  source TEXT,                                    -- e.g. '2025-array' or filename
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Optional users table for login/auth
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,    -- store a hashed password (bcrypt)
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_readings_date ON readings (reading_date);
CREATE INDEX IF NOT EXISTS idx_readings_source ON readings (source);