DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE IF NOT EXISTS users (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
    fullname VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT,
    provider VARCHAR(50) DEFAULT 'credentials',
    domain VARCHAR(100) NOT NULL,
    is_verified BOOLEAN DEFAULT TRUE,
    image_url TEXT DEFAULT '',
    created_at TIMESTAMP DEFAULT NOW ()
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users (email);

CREATE INDEX IF NOT EXISTS idx_users_domain ON users (domain);
