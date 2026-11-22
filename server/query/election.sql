drop table if exists elections cascade;

create table if not exists elections (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
    creator_id uuid NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    election_code VARCHAR(30) UNIQUE NOT NULL,
    allowed_domain_patterns TEXT NOT NULL,
    domain_label VARCHAR(100) NOT NULL,
 eligibility_criteria JSONB DEFAULT '{"domain": "","sample_email": "","departments": [],"years": [],"is_all_departments": true,"is_all_years": true}'::jsonb,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    election_type VARCHAR(10) NOT NULL CHECK (election_type IN ('private', 'public')),
    created_at TIMESTAMPTZ DEFAULT NOW (),
    updated_at TIMESTAMPTZ DEFAULT NOW ()
);

CREATE INDEX IF NOT EXISTS idx_elections_code ON elections (election_code);

CREATE INDEX IF NOT EXISTS idx_elections_creator ON elections (creator_id);
