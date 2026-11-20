# Product Requirements Document (PRD)

## Ballot: Institutional Online Voting Platform

- **Document Version:** 1.0.0
- **Status:** Draft (Pending User Approval)
- **Scope Tier:** Standard Tier
- **Author:** Product & Engineering Team
- **Target Release:** MVP v1.0
- **Repository / Workspace:** `vote-application`

---

### 1. Executive Summary & Vision

#### 1.1 Problem Statement
Schools, universities, student unions, and professional organizations currently rely on cumbersome, manual paper-ballot voting processes. Paper elections are plagued by slow manual vote counting, vulnerability to ballot-box stuffing, human error, geographic limitations, and high administrative overhead. Meanwhile, existing public online polling tools lack strict identity verification and institutional domain isolation, allowing unauthorized outsiders to vote.

#### 1.2 Product Vision
Ballot provides an institutional-grade, modern digital voting platform tailored for educational institutions and organizations. By leveraging institutional email domain validation (e.g., `@oauife.edu.ng`, `@school.edu`), Ballot empowers organizers to run transparent, tamper-resistant elections and enables eligible members to cast their ballots securely from any device with a single click.

#### 1.3 Value Proposition
- **Institutional Domain Gating:** Automatic verification restricting ballot access strictly to confirmed organization members and students.
- **Vote Integrity Guarantee:** Exactly one ballot per verified account, enforced by database ACID transactions and unique constraints.
- **Flexible Ballot Configurator:** Native support for both single-choice (e.g., Executive President) and multiple-choice (e.g., elect up to $N$ Faculty Representatives) contests.
- **Ballot Secrecy & Real-Time Auditing:** Decoupled voter participation tracking (`hasVoted`) from ballot records to protect voter privacy while preventing double voting.

#### 1.4 Goals & Non-Goals

- **Goals:**
  - Provide a responsive Next.js 16 web application with Tailwind CSS for seamless mobile and desktop voting.
  - Enable organizers to create elections with customized eligibility criteria (whitelisted email domains).
  - Support single-choice and multiple-choice voting with customizable selection caps.
  - Guarantee 100% prevention of duplicate voting at the database level.
  - Provide an intuitive results dashboard with live/final vote tallies.

- **Non-Goals (Out of Scope for MVP):**
  - Complex cryptographic zero-knowledge voting proofs (ZK-SNARKs).
  - Integration with legacy paper ballot optical mark recognition scanners.
  - SMS/OTP authentication (MVP uses email magic links / verification tokens).
  - Paid election ticketing or billing tiers.

---

### 2. Target Users & Contextual User Roles

Ballot utilizes a **unified, multi-role account model**. A user is not restricted to being only a "Voter" or only an "Admin"; roles are contextual per election:

| Contextual Role | Description | Permissions & Capabilities |
| :--- | :--- | :--- |
| **Unified User Account** | Any registered student, faculty, or organization member. | Can create and administer their own elections, and can join other elections as a voter. |
| **Election Admin (Creator)** | The user who created a specific election. | Full administrative control over *that* election: configure contests/questions, candidates, dates, allowed email domains, access election code/link, and monitor turnout. |
| **Voter (Participant)** | Any authenticated user joining an election via its code or link. | Can participate in an election if their verified email domain matches the election's allowed domains, casting exactly one ballot. |

---

### 3. User Journeys & Workflows

#### 3.1 Authentication Journey: Email & Password Signup & Verification
1. **Registration:** User signs up with Full Name, Institutional Email (e.g. `student@oauife.edu.ng`), and Password.
2. **Domain Recognition & Verification:** The system parses the email domain, stores the hashed password (bcrypt/argon2), and sends a verification link/code.
3. **Login:** Once verified, the user logs in seamlessly with email and password from any mobile or desktop browser.

#### 3.2 Voter Journey: Joining by Code or Link & Dynamic Eligibility Validation
1. **Entry Point:** Voter either enters an **Election Code** (e.g., `OAU-ENG-24`) on the homepage or clicks a direct **Shareable Invite Link** (e.g., `/join/OAU-ENG-24`).
2. **Authentication Check:** If not logged in, user is prompted to log in or register, then redirected back to the join flow.
3. **Dynamic Eligibility Gate (Accept or Reject):**
   - **Step 1 - Domain Check:** Does the user's verified email domain match the election's `allowed_domains`?
     - *If No:* **REJECT.** Display clear error: *"Access Denied: Your email domain (@gmail.com) is not permitted. This election is restricted to: @oauife.edu.ng"*.
   - **Step 2 - Timing Check:** Is the current time between `start_time` and `end_time`?
     - *If Not Started:* **REJECT.** Display countdown notice.
     - *If Ended:* **REJECT.** Display: *"This election has concluded."* (with link to results if available).
   - **Step 3 - Double Voting Check:** Has the user already voted in this election (`voter_records` check)?
     - *If Yes:* **REJECT.** Display: *"You have already cast your ballot in this election."* with submission receipt timestamp.
   - **Step 4 - Acceptance:** If all checks pass, the user is **ACCEPTED** and routed directly to the active ballot.
4. **Casting Ballot:** Voter selects candidates (single-choice or multiple-choice up to allowed max), reviews summary, and submits.
5. **Confirmation:** System atomically records the ballot, logs voter participation, and displays a confirmed voting receipt.

#### 3.3 Organizer Journey: Election Creation & Sharing
1. **Creation:** Any logged-in user clicks "Create Election", providing Title, Description, Start & End times, and Allowed Email Domains (e.g. `oauife.edu.ng`).
2. **Code & Link Generation:** The system generates a unique **Election Code** and shareable URL.
3. **Contest & Candidate Setup:** Organizer configures contests/questions and candidate profiles.
4. **Distribution:** Organizer shares the Election Code or Link with their student body or organization members.
5. **Turnout & Results:** Organizer monitors live turnout stats and certifies final tallies once the election concludes.

---

### 4. Functional Requirements

#### FR-001: Email & Password Authentication with Institutional Domain Tracking
- **Priority:** Must Have (MVP)
- **Description:** Unified user registration and authentication using standard email and password with domain extraction.
- **Business Rules:**
  - Password must be hashed using industry-standard algorithms (bcrypt / argon2).
  - System extracts and normalizes the email domain on registration (e.g. `oauife.edu.ng`).
  - Users must verify email address via token or code to confirm institutional affiliation.
- **Acceptance Criteria:**
  - [ ] User can register with Name, Institutional Email, and Password.
  - [ ] User can log in with Email and Password; authenticated session is stored in secure HTTP-only cookie.
  - [ ] System accurately stores the user's domain for election eligibility checks.

#### FR-002: Election Creation with Unique Code & Invite Link Generation
- **Priority:** Must Have (MVP)
- **Description:** Any authenticated user can create an election, becoming its creator/admin.
- **Business Rules:**
  - System automatically generates a unique, human-friendly Election Code (e.g. `VOTE-8492`) and shareable URL (`/join/[code]`).
  - Creator defines: Title, Description, Start DateTime, End DateTime, and Allowed Email Domains array.
  - Creator permissions for that election are verified by matching `session.user.id == election.creator_id`.
- **Acceptance Criteria:**
  - [ ] Generated election codes are unique across the database.
  - [ ] Only the election creator can edit contests and settings before the election goes active.

#### FR-003: Contest & Ballot Option Configuration (Single & Multiple Choice)
- **Priority:** Must Have (MVP)
- **Description:** Each election contains one or more voting contests/questions.
- **Business Rules:**
  - Supported Contest Types:
    1. `SINGLE_CHOICE`: Exactly 1 option can be selected.
    2. `MULTIPLE_CHOICE`: Between 1 and `maxSelections` options can be selected (e.g., select up to 3 candidates).
  - Each contest must have at least 2 distinct options/candidates.
- **Acceptance Criteria:**
  - [ ] In single-choice contests, selecting an option automatically deselects any previously selected option.
  - [ ] In multiple-choice contests, selecting more than `maxSelections` disables additional checkboxes or triggers inline validation blocking submission.

#### FR-004: Dynamic Eligibility Gate (Join by Code or Link)
- **Priority:** Must Have (MVP)
- **Description:** Validates user eligibility when attempting to access an election via code or URL.
- **Business Rules:**
  - User entering an invalid code is shown a "Code not found" error.
  - User whose verified domain is not in `allowed_domains` is rejected with an explicit explanation.
  - User who has already voted is rejected with an existing receipt view.
  - User attempting to join before `start_time` or after `end_time` is rejected with appropriate timing status.
- **Acceptance Criteria:**
  - [ ] Given a valid code and eligible, un-voted user, system accepts and renders the ballot.
  - [ ] Given a non-matching email domain, system displays rejection message showing allowed domains.
  - [ ] Given an expired or already-voted ballot, system blocks voting interface.

#### FR-005: Atomic Ballot Submission & Double-Voting Prevention
- **Priority:** Must Have (MVP)
- **Description:** Voters submit selections. The system ensures atomicity and strictly blocks duplicate votes.
- **Business Rules:**
  - A user may vote exactly once per election.
  - Double voting is prevented at the database level (`UNIQUE(election_id, user_id)` on `voter_records`).
  - Secret ballot: candidate vote records do not store `user_id`.
- **Acceptance Criteria:**
  - [ ] Given an eligible voter who has not yet voted, vote submission succeeds and returns a timestamped confirmation.
  - [ ] Given a voter who has already cast a ballot, subsequent submission attempts fail with HTTP 409 Conflict.
  - [ ] Concurrent submission attempts from the same account cannot create duplicate vote tallies (ACID transaction isolation).

#### FR-006: Results Tally & Live/Final Dashboard
- **Priority:** Must Have (MVP)
- **Description:** Aggregates and displays vote counts and percentages for each candidate/option.
- **Business Rules:**
  - Organizers can configure results visibility: `REAL_TIME` (visible during voting) or `POST_ELECTION` (revealed only after `endTime`).
- **Acceptance Criteria:**
  - [ ] Results show total ballots cast, total turnout percentage, and individual candidate counts + percentages.
  - [ ] If `POST_ELECTION` visibility is selected, voters visiting results before the end date see a countdown notice.

---

### 5. UI/UX Specifications

#### 5.1 Screen & Navigation Inventory
- `/` - **Home & Quick-Join Hub:** Hero section with instant **"Enter Election Code"** input box, platform value points, and direct links to Sign In or Create Election.
- `/join/[code]` - **Eligibility Gate Screen:** Evaluates user eligibility upon following a link or submitting a code:
  - *If Accepted:* Displays election overview, rules, and "Proceed to Ballot" CTA.
  - *If Rejected:* Displays clear explanation card (e.g. "Your email domain `@gmail.com` is not permitted in this election. Allowed domains: `@oauife.edu.ng`").
- `/auth/login` - **Sign In:** Standard Email + Password login with link to registration and forgot password.
- `/auth/register` - **Registration:** Full Name, Institutional Email, Password, automatic domain detection, and email verification notice.
- `/dashboard` - **Unified User Dashboard:** Displays:
  - **"My Created Elections"** (elections created by the user, with manage buttons, shareable codes/links, and live turnout).
  - **"My Voting History"** (elections the user has voted in, with submission receipts and results links).
- `/elections/create` - **Election Builder:** Multi-step wizard to set election title, short code, allowed domains, schedule, and contest questions.
- `/elections/[id]/vote` - **Ballot Screen:** Multi-contest ballot with interactive candidate selection cards, selection counter, and submission confirmation modal.
- `/elections/[id]/receipt` - **Vote Confirmation:** Timestamped cryptographic confirmation receipt proving ballot submission.
- `/elections/[id]/results` - **Results Dashboard:** Visual charts (bar graphs, turnout statistics, candidate percentages).

#### 5.2 Key UI States
- **Loading State:** Skeleton cards for elections and candidate profiles while queries resolve.
- **Empty State:** Friendly guidance when a user has not created or joined any elections yet.
- **Eligibility Rejection State:** Clear warning alert detailing why entry was rejected (Domain Mismatch, Election Closed, or Already Voted) with next steps.
- **Success State:** Instant toast alerts, animated checkmarks on vote casting, and copyable share-link modals.

#### 5.3 Responsive & Accessibility Expectations
- Responsive design tailored for mobile browsers (where the majority of students cast votes).
- Fully accessible keyboard navigation and ARIA attributes for radio/checkbox ballot selection.

---

### 6. Technical Architecture & Data Recommendations

#### 6.1 Database & Query Layer: PostgreSQL with Native SQL (`node-postgres` / `pg`)

> **Confirmed Decision:** **PostgreSQL with Raw / Standard SQL (`pg` connection pool)**

**Why PostgreSQL with Native SQL is ideal for Ballot:**
1. **Direct SQL Control & Learning:** Write explicit, standard SQL queries (`SELECT`, `INSERT`, `UPDATE`, `JOIN`, `GROUP BY`) without abstract ORM layers.
2. **ACID Transactions & Atomicity:** Uses explicit SQL transactions (`BEGIN`, `COMMIT`, `ROLLBACK`) with `SELECT FOR UPDATE` to lock user eligibility checks and insert votes atomically.
3. **Engine-Level Integrity:** Real relational foreign keys (`REFERENCES ... ON DELETE CASCADE`), unique constraints on election codes, and compound constraints on voter records prevent duplicate ballots.
4. **Contextual Role Security:** Ownership is determined by checking `election.creator_id = session.user.id`. Any user can be a creator of their elections and a voter in other elections.

#### 6.2 Relational Data Model (Standard PostgreSQL DDL)

```sql
-- Enable UUID extension (optional, or use TEXT/CUID)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users Table (Unified account model - no static global role)
CREATE TABLE users (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    domain VARCHAR(255) NOT NULL, -- e.g. "oauife.edu.ng" extracted from email
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_domain ON users(domain);

-- 2. Elections Table (Includes unique join code and creator relationship)
CREATE TABLE elections (
    id VARCHAR(64) PRIMARY KEY,
    code VARCHAR(16) NOT NULL UNIQUE, -- e.g. "OAU-ENG-24" or "VOTE-8491"
    title VARCHAR(255) NOT NULL,
    description TEXT,
    allowed_domains TEXT[] NOT NULL, -- Array of allowed domains, e.g. ARRAY['oauife.edu.ng']
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    results_visibility VARCHAR(30) NOT NULL DEFAULT 'POST_ELECTION' CHECK (results_visibility IN ('REAL_TIME', 'POST_ELECTION')),
    creator_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_elections_code ON elections(code);
CREATE INDEX idx_elections_dates ON elections(start_time, end_time);
CREATE INDEX idx_elections_creator ON elections(creator_id);

-- 3. Contests Table (Positions / Questions, e.g. "President", "Faculty Senator")
CREATE TABLE contests (
    id VARCHAR(64) PRIMARY KEY,
    election_id VARCHAR(64) NOT NULL REFERENCES elections(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('SINGLE_CHOICE', 'MULTIPLE_CHOICE')),
    max_selections INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_contests_election ON contests(election_id);

-- 4. Options Table (Candidates or Ballot Choices)
CREATE TABLE options (
    id VARCHAR(64) PRIMARY KEY,
    contest_id VARCHAR(64) NOT NULL REFERENCES contests(id) ON DELETE CASCADE,
    label VARCHAR(255) NOT NULL, -- Candidate name or proposal choice
    bio TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_options_contest ON options(contest_id);

-- 5. Voter Participation Audit Table (Tracks WHO voted in which election to prevent double voting)
CREATE TABLE voter_records (
    id VARCHAR(64) PRIMARY KEY,
    election_id VARCHAR(64) NOT NULL REFERENCES elections(id) ON DELETE CASCADE,
    user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    voted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_election_voter UNIQUE (election_id, user_id) -- Strict physical barrier against double voting
);

CREATE INDEX idx_voter_records_lookup ON voter_records(election_id, user_id);

-- 6. Votes Table (Decoupled anonymous ballot entries preserving secret ballot)
CREATE TABLE votes (
    id VARCHAR(64) PRIMARY KEY,
    contest_id VARCHAR(64) NOT NULL REFERENCES contests(id) ON DELETE CASCADE,
    option_id VARCHAR(64) NOT NULL REFERENCES options(id) ON DELETE CASCADE,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_votes_option ON votes(option_id);
CREATE INDEX idx_votes_contest ON votes(contest_id);
```

---

### 7. Non-Functional Requirements

- **Integrity & Concurrency:** Zero tolerance for duplicate voting under concurrent network load.
- **Performance:** Sub-500ms response time for ballot submission; results calculation under 1s for up to 10,000 votes per election.
- **Security:**
  - Standard Email + Password with secure cryptographic hashing (bcrypt / argon2).
  - CSRF protection on state-modifying requests and HTTP-only session cookies.
  - Rate limiting on authentication and vote endpoints to thwart brute force and DoS.
- **Privacy (Secret Ballot):** Individual candidate selections in `votes` are not tied to the `user_id`; only the `voter_records` confirms that the user has completed their ballot.

---

### 8. Prioritization & MVP Scope (MoSCoW)

- **Must Have (MVP):**
  - [FR-001] Email & Password authentication with institutional email domain recognition and verification.
  - [FR-002] Multi-role capability & Election builder with unique Election Code and shareable link generator (`/join/[code]`).
  - [FR-003] Contest configurator supporting both Single-Choice and Multiple-Choice (up to $N$).
  - [FR-004] Dynamic Eligibility Gate: Validate user domain and timing on join; reject with explanation or accept into ballot.
  - [FR-005] Atomic ballot submission with strict 1-vote-per-user enforcement (`UNIQUE(election_id, user_id)`).
  - [FR-006] Results dashboard with vote counts, percentages, and turnout stats.
- **Should Have (v1.1):**
  - Candidate profile pages with manifestos and photo uploads.
  - Email reminders to eligible voters before election closing.
  - CSV export of certified election results for school administrators.
- **Could Have (v1.2):**
  - Multi-tenant organization branding (school logo & primary color).
  - Real-time live vote update via WebSockets or Server-Sent Events.
- **Won't Have (Excluded for MVP):**
  - Paid voting / monetization.
  - SMS OTP authentication.
  - Biometric or government ID verification.

---

### 9. Assumptions, Risks & Open Questions

| Type | Description | Impact | Mitigation / Status |
| :--- | :--- | :--- | :--- |
| **Confirmed Decision** | Unified user accounts: Users can create elections (admin for their own) and vote in other elections. | High | Role is contextual based on `creator_id` and election membership. |
| **Confirmed Decision** | Standard Email + Password authentication with domain verification. | High | Familiar and reliable for students and members across devices. |
| **Confirmed Decision** | PostgreSQL with native SQL (`pg` driver) chosen over ORMs. | High | Provides direct SQL learning, full query transparency, and eliminates ORM abstractions. |
| **Risk** | High concurrent traffic spike in the final minutes of an election. | Medium | Use standard PostgreSQL connection pooling (`pg.Pool`) and indexed queries. |

---

### 10. Document Revision History

| Version | Date | Author | Description of Changes |
| :--- | :--- | :--- | :--- |
| 1.0.0 | 2026-11-20 | Product & Engineering Team | Initial Standard Tier PRD draft created as "Ballot". |
| 1.0.1 | 2026-11-20 | Product & Engineering Team | Updated database architecture to native PostgreSQL with standard SQL DDL and `pg` pool. |
| 1.0.2 | 2026-11-20 | Product & Engineering Team | Added unified multi-role account model, join-by-code/link with dynamic accept/reject gate, and email+password login. |
