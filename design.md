# Ballot Design System Specification

## 1. Overview & Design Philosophy

**Ballot** is an institutional-grade voting platform designed for schools, universities, and organizations. The design system is built to convey **uncompromising trust, civic authority, procedural impartiality, and effortless clarity**.

### Core Design Principles
- **Cognitive Impartiality:** The interface is an objective canvas. Colors, typography, and card layouts must never favor one candidate or contest over another.
- **Lightness Separation Over Hue:** Legibility is strictly driven by perceptual lightness variation ($\Delta L$ in OKLCH), ensuring high visibility outdoors on mobile devices.
- **The 60-30-10 Rule:**
  - **60% Dominant Canvas:** Impartial slate neutrals and clean card surfaces.
  - **30% Structural Hierarchy:** Deep typography, dividers, and card borders.
  - **10% Semantic Accent:** Royal Civic Blue for active selections and Emerald for certified ballot confirmations.
- **Zero Ambiguity in Feedback:** Status states (Accepted, Rejected, In Progress, Submitted) are visually unmistakable through paired iconography and accessible color tokens.

---

## 2. Color System (Perceptually Uniform OKLCH)

### 2.1 Surfaces & Canvas (Palette B: Obsidian & Electric Amber / Topaz)
| Token | Role | OKLCH Value | Light Mode Hex | Dark Mode Hex |
| :--- | :--- | :--- | :--- | :--- |
| `--background` | Page background canvas | `oklch(0.98 0.006 80)` | `#faf8f4` | `#0c0d12` |
| `--card` | Card & container surface | `oklch(1.00 0.000 0)` | `#ffffff` | `#13141c` |
| `--muted` | Subdued surface / input fill | `oklch(0.95 0.010 80)` | `#f3f0e8` | `#1c1e29` |
| `--border` | Dividers & card boundaries | `oklch(0.89 0.015 80)` | `#e3ded2` | `#292a3a` |

### 2.2 Ink & Typography
| Token | Role | OKLCH Value | Light Mode Hex | Dark Mode Hex |
| :--- | :--- | :--- | :--- | :--- |
| `--foreground` | Primary text & headings | `oklch(0.20 0.015 60)` | `#1c1917` | `#fcfbf9` |
| `--muted-foreground` | Secondary labels & metadata | `oklch(0.48 0.015 60)` | `#5c5750` | `#a4a5b5` |
| `--subtle` | Placeholder text & disabled icons | `oklch(0.62 0.015 60)` | `#8a857b` | `#6c6d80` |
| `--brand` | Electric Amber / Warm Topaz (Action / Focus ring) | `oklch(0.74 0.170 70)` | `#d97706` | `#f59e0b` |

### 2.3 Status Tokens
| Token | Status Role | OKLCH Value | Light Hex | Dark Hex | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `--status-draft` | Draft / Inactive | `oklch(0.60 0.015 60)` | `#8a857b` | `#6c6d80` | Unreleased election draft |
| `--status-upcoming`| Scheduled / Countdown | `oklch(0.65 0.140 230)` | `#0284c7` | `#38bdf8` | Election opens soon |
| `--status-active` | Active Voting Open | `oklch(0.74 0.170 70)` | `#d97706` | `#f59e0b` | Voting currently live |
| `--status-confirmed`| Ballot Counted / Verified | `oklch(0.58 0.160 155)` | `#059669` | `#10b981` | Submission receipt badge |
| `--status-rejected` | Domain Denied / Closed | `oklch(0.57 0.210 25)` | `#dc2626` | `#f43f5e` | Non-matching domain / error |

---

## 3. Typography Scale & Font Families

- **Display & Headings:** `Satoshi, sans-serif` (Geometric, clean, modern neo-grotesque authority from Fontshare)
- **Body & Controls:** `DM Sans, sans-serif` (Highly legible geometric sans-serif from Google Fonts optimized for mobile screens)
- **Code & Hashes:** `JetBrains Mono, monospace` (For election codes, cryptographic hashes, and timestamps)

| Token | Size | Line Height | Weight | Font Family | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `text-display` | 32px / 2rem | 1.2 | 700 (Bold) | Satoshi | Hero headlines, "Ballot" brand title |
| `text-h1` | 24px / 1.5rem | 1.25 | 600 (Semi-bold) | Satoshi | Section titles, contest question headings |
| `text-h2` | 20px / 1.25rem | 1.3 | 600 (Semi-bold) | Satoshi | Candidate names, modal headers |
| `text-body` | 15px / 0.9375rem| 1.5 | 400 (Regular) | DM Sans | General body, candidate manifesto text |
| `text-caption` | 13px / 0.8125rem| 1.4 | 500 (Medium) | DM Sans | Timestamps, domain tags, input hints |
| `text-code` | 12px / 0.75rem | 1.4 | 600 (Mono) | JetBrains Mono | Election codes (`VOTE-8492`), token names |

---

## 4. Surface Styling & Button Paradigms (Beyond Glassmorphism)

To maintain seriousness and civic trust, glassmorphism (frosted blurs and glowing transparency) has been eliminated. The platform explores three distinct structural paradigms:

### Style 1: Swiss Razor-Sharp (Clean & Architectural)
- **Geometry:** Strict `0px` radius.
- **Surfaces:** 100% matte opaque surfaces (`#0c0d12` → `#13141c` → `#1c1e29`).
- **Feel:** High-security government terminal, constitutional registry.

### Style 2: Tactile Chiseled (Embossed & Mechanical Stamp)
- **Geometry:** Micro-chamfered `3px` radius.
- **Lighting:** Inset top-edge highlight (`box-shadow: inset 0 1px 0 rgba(255,255,255,0.25)`).
- **Feel:** Physical voting booth push-button, cast brass stamp.

### Style 3: Neo-Editorial / Official Ballot Grid (Print & Ledger Style) — *Currently Active*
- **Geometry:** Strict `0px` rectangular cells with defined `1.5px` and `2px` solid architectural borders.
- **Buttons:** Boxed cells framed with bold `1.5px` borders, letterspaced Satoshi bold uppercase typography (`letter-spacing: 0.08em`), with high-contrast hover inversion (e.g. solid amber inverts to transparent outline, framed outline inverts to solid text ink).
- **Candidate Cards:** Structured like official perforated ballot slips with a `4px` left indicator bar and a classic square ballot checkbox (`[ ]` → `[ ✓ ]`).
- **Feel:** Official parliamentary gazette, audited legislative ledger, authentic paper ballot tally.

---

## 5. Core Component Specs

### 5.1 Candidate Selection Card
- **Resting State:** White surface (`--card`), 1px border (`--border`), subtle shadow.
- **Hover State:** Border transitions to `--muted-foreground` with slight lift.
- **Selected State:** Border turns `--brand` (`#2563eb`, 2px solid), background tints to `rgba(37, 99, 235, 0.04)`, and selection indicator glows blue with a white checkmark.
- **Disabled State:** Opacity `0.5`, non-interactive (used when `maxSelections` limit is reached in multiple-choice contests).

### 5.2 Dynamic Join Input Box
- Prominent input field supporting automatic uppercase formatting (`OAU-ENG-24`).
- Real-time feedback validation button: "Join Election →".

### 5.3 Eligibility Result Banner
- **Accepted:** Green shield icon, institutional domain confirmed, "Eligible to Vote".
- **Rejected:** Red warning shield, descriptive message indicating exact domain required.

---

## 6. Living Showcase (`design.html`)
The interactive HTML companion to this document is located at:
`design.html` (in the project root)

Open `design.html` in any browser to inspect live swatches, interactive candidate cards, buttons, form fields, and toggle between Light and Dark modes.
