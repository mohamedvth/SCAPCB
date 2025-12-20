-- Relational schema for well readings (works in SQLite and PostgreSQL with minimal changes)

-- Table: readings
CREATE TABLE IF NOT EXISTS readings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  reading_date TEXT NOT NULL,    -- YYYY-MM-DD
  reading_time TEXT,             -- HH:MM:SS (nullable)
  forage1_index TEXT,
  forage1_consumption INTEGER,
  forage2_index TEXT,
  forage2_consumption INTEGER,
  forage3_index TEXT,
  forage3_consumption INTEGER,
  total_consumption INTEGER,
  notes TEXT,
  source TEXT,
  created_at DATETIME DEFAULT (datetime('now'))
);

-- Optional users table for login/auth
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'user',
  created_at DATETIME DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_readings_date ON readings (reading_date);
CREATE INDEX IF NOT EXISTS idx_readings_source ON readings (source);