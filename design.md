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

### 2.1 Surfaces & Canvas (Palette A: Nordic Deep Teal & Aegean Cyan)
| Token | Role | OKLCH Value | Light Mode Hex | Dark Mode Hex |
| :--- | :--- | :--- | :--- | :--- |
| `--background` | Page background canvas | `oklch(0.97 0.008 210)` | `#f4f8fa` | `#060d13` |
| `--card` | Card & container surface | `oklch(1.00 0.000 0)` | `#ffffff` | `#0c161f` |
| `--muted` | Subdued surface / input fill | `oklch(0.94 0.012 210)` | `#eaf1f4` | `#13202c` |
| `--border` | Dividers & card boundaries | `oklch(0.88 0.018 210)` | `#d3e2e8` | `#1c2e3f` |

### 2.2 Ink & Typography
| Token | Role | OKLCH Value | Light Mode Hex | Dark Mode Hex |
| :--- | :--- | :--- | :--- | :--- |
| `--foreground` | Primary text & headings | `oklch(0.24 0.035 210)` | `#082f49` | `#f0fdfa` |
| `--muted-foreground` | Secondary labels & metadata | `oklch(0.50 0.025 210)` | `#486577` | `#8faec2` |
| `--subtle` | Placeholder text & disabled icons | `oklch(0.65 0.020 210)` | `#7b97a7` | `#587588` |
| `--brand` | Nordic Teal / Aegean Cyan (Action / Focus ring) | `oklch(0.62 0.140 210)` | `#0891b2` | `#06b6d4` |

### 2.3 Status Tokens
| Token | Status Role | OKLCH Value | Light Hex | Dark Hex | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `--status-draft` | Draft / Inactive | `oklch(0.60 0.020 210)` | `#7b97a7` | `#587588` | Unreleased election draft |
| `--status-upcoming`| Scheduled / Countdown | `oklch(0.68 0.150 75)` | `#d97706` | `#f59e0b` | Election opens soon |
| `--status-active` | Active Voting Open | `oklch(0.62 0.140 210)` | `#0891b2` | `#06b6d4` | Voting currently live |
| `--status-confirmed`| Ballot Counted / Verified | `oklch(0.58 0.160 155)` | `#059669` | `#10b981` | Submission receipt badge |
| `--status-rejected` | Domain Denied / Closed | `oklch(0.57 0.210 25)` | `#e11d48` | `#f43f5e` | Non-matching domain / error |

---

## 3. Typography Scale

Font Family: `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`

| Token | Size | Line Height | Weight | Usage |
| :--- | :--- | :--- | :--- | :--- |
| `text-display` | 32px / 2rem | 1.2 | 700 (Bold) | Hero headlines, "Ballot" brand title |
| `text-h1` | 24px / 1.5rem | 1.25 | 600 (Semi-bold) | Section titles, contest question headings |
| `text-h2` | 20px / 1.25rem | 1.3 | 600 (Semi-bold) | Candidate names, modal headers |
| `text-body` | 15px / 0.9375rem| 1.5 | 400 (Regular) | General body, candidate manifesto text |
| `text-caption` | 13px / 0.8125rem| 1.4 | 500 (Medium) | Timestamps, domain tags, input hints |
| `text-code` | 12px / 0.75rem | 1.4 | 600 (Mono) | Election codes (`VOTE-8492`), token names |

---

## 4. Spacing, Borders & Elevation

### Radius Scale
- `radius-sm`: `6px` (Badges, tags, token pills)
- `radius-md`: `10px` (Input fields, standard buttons)
- `radius-lg`: `16px` (Candidate selection cards, modals, preview containers)
- `radius-full`: `9999px` (Pills, round icons, user avatars)

### Elevation & Shadows
- `shadow-subtle`: `0 1px 3px rgba(15, 23, 42, 0.05)` (Default card resting state)
- `shadow-hover`: `0 6px 16px -2px rgba(15, 23, 42, 0.08)` (Card hover / interactive)
- `shadow-focus`: `0 0 0 3px rgba(37, 99, 235, 0.25)` (Accessible keyboard focus ring)

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
