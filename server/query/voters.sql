DROP TABLE IF EXISTS voters CASCADE;

CREATE TABLE IF NOT EXISTS voters (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
    election_id uuid NOT NULL REFERENCES elections (id) ON DELETE CASCADE,
    user_id uuid NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    joined_at TIMESTAMPTZ DEFAULT NOW (),
    updated_at TIMESTAMPTZ DEFAULT NOW (),
    UNIQUE (election_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_voters_election_id ON voters (election_id);

CREATE INDEX IF NOT EXISTS idx_voters_user_id ON voters (user_id);

CREATE INDEX IF NOT EXISTS idx_voters_election_status ON voters (election_id, status);
