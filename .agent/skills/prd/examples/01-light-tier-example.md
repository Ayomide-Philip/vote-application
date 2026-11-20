# PRD: QuickClip - Markdown Link & Note Clipper CLI

- **Tier:** Light Tier
- **Status:** Approved
- **Document Destination:** `PRD.md`

---

## 1. Problem & Solution

### 1.1 Problem Statement

Developers frequently encounter articles, documentation links, and code snippets while browsing or working in the terminal. Saving them requires switching to a heavy GUI notes app or manually copying and formatting markdown links in an editor, interrupting workflow momentum.

### 1.2 Proposed Solution

`quickclip` is an ultra-fast, zero-config Node.js CLI tool. With a single terminal command, it fetches a web page title, converts the URL into a formatted Markdown bookmark or captures inline notes, and appends them to a designated daily log file (`~/notes/daily-YYYY-MM-DD.md`).

---

## 2. Primary User Journey

1. **Invocation:** User runs `quickclip https://example.com/guide "Great reference on CSS grid"` in terminal.
2. **Title Fetching:** CLI sends a fast HTTP GET request (max 1.5s timeout) to scrape `<title>`.
3. **Markdown Formatting:** CLI formats the entry:
   `- [Page Title](https://example.com/guide) - Great reference on CSS grid`
4. **Append:** Entry is appended with a timestamp to today's daily note file.
5. **Confirmation:** CLI prints a clean single-line confirmation:
   `✔ Saved to ~/notes/daily-2026-11-15.md`

---

## 3. Functional Requirements

#### FR-001: URL Title Scraping & Formatting

- **Priority:** Must Have
- **Description:** When provided a URL, the CLI must retrieve the page HTML, parse the `<title>` element, and assemble a Markdown bookmark item.
- **Business Rules:**
  - Network timeout is strictly capped at 2000ms.
  - If title retrieval fails (HTTP error, timeout, or missing `<title>`), fall back gracefully to the raw URL or domain hostname as the anchor text.
  - HTML entities in titles (e.g., `&amp;`, `&#39;`) must be decoded to plain text.
- **Acceptance Criteria:**
  - [ ] Given a valid URL `https://github.com`, when `quickclip https://github.com` is executed, the tool extracts the page title and outputs markdown format `- [GitHub: Let's build from here](https://github.com)`.
  - [ ] Given an unreachable URL or timeout, when `quickclip https://offline-site.local` is executed, the tool does not crash, displays a warning `⚠ Title fetch timed out; using hostname`, and writes `- [offline-site.local](https://offline-site.local)`.

#### FR-002: Daily Note File Resolution & Appending

- **Priority:** Must Have
- **Description:** Resolved entries must append to a local Markdown file named after the current local date.
- **Business Rules:**
  - Default directory is `~/notes/` (configurable via `QUICKCLIP_DIR` environment variable).
  - File format must be `daily-YYYY-MM-DD.md`.
  - If target directory or file does not exist, create it recursively.
  - Append entries under an `## Inbound Clips` heading; create the heading if not present.
- **Acceptance Criteria:**
  - [ ] Given an existing `daily-2026-11-15.md` file, when an entry is clipped, it is appended to the bottom under `## Inbound Clips` without overwriting existing content.
  - [ ] Given a non-existent directory `~/notes/`, when executed, the tool creates the directory and file with `0644` permissions.

#### FR-003: Plain Text Snippet Capture

- **Priority:** Must Have
- **Description:** Allow capturing plain thought notes or code snippets without a URL.
- **Business Rules:**
  - If the first argument is not a valid HTTP/HTTPS URL, treat the entire string argument as a plain text bullet note.
- **Acceptance Criteria:**
  - [ ] Given the command `quickclip "Refactor token auth to use HttpOnly cookies"`, when executed, append `- [14:32] Refactor token auth to use HttpOnly cookies` to the daily note.

---

## 4. Technical Specifications

- **Runtime:** Node.js `>= 18.0.0`
- **Package Type:** ESM CLI executable (`bin/quickclip.js`)
- **Key Dependencies:**
  - `commander` (argument parsing)
  - `cheerio` (HTML title extraction)
  - `picocolors` (lightweight terminal coloring)
- **File Storage:** Local filesystem only. Zero cloud dependencies.

---

## 5. Assumptions & Open Questions

### Confirmed Decisions

- [CONFIRMED] Local date is formatted as ISO `YYYY-MM-DD`.
- [CONFIRMED] CLI operates offline for plain notes; URL scraping fails gracefully offline.

### Open Questions

- [OPEN DECISION] Should `quickclip` offer an interactive tag prompt (`#work`, `#ideas`) or keep CLI flags only (`--tag work`)? (Defaulted to flag-only for MVP).
