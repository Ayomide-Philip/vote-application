# Technical Specifications Reference Guide

This reference provides conventions and standards for documenting technical architecture, data schemas, API contracts, and non-functional engineering constraints within a PRD.

---

## 1. Differentiating Technical Confidence Levels

In every technical section of the PRD, technical statements must be explicitly labeled with one of three confidence tiers:

1. **[CONFIRMED]:** The user has explicitly chosen or the codebase strictly mandates this (e.g., *"[CONFIRMED] Next.js 16 App Router with React 19 and Tailwind CSS v4"*).
2. **[RECOMMENDED]:** An agent recommendation backed by technical rationale, subject to user review (e.g., *"[RECOMMENDED] Use Zod for runtime schema validation on contact form inputs"*).
3. **[OPEN DECISION]:** An unresolved architecture choice that requires explicit user input before coding begins (e.g., *"[OPEN DECISION] Send contact emails via Resend API vs Formspree webhook"*).

---

## 2. Documenting Data Models & Entities

Data models should be documented in TypeScript interfaces (or database schema format if ORMs like Prisma are used), including field types, nullability, and primary/foreign keys.

```typescript
/**
 * Core Project Entity Schema
 */
export interface ProjectItem {
  id: string;               // Unique slug (e.g., 'ecommerce-engine')
  title: string;            // Display title
  tagline: string;          // 1-sentence elevator pitch
  description: string;      // Comprehensive problem-solution breakdown
  coverImage: string;       // Path to WebP/AVIF asset in public/
  techStack: string[];      // ['Next.js', 'TypeScript', 'Tailwind']
  liveUrl?: string;         // Optional deployment URL
  githubUrl?: string;       // Optional public repository URL
  featured: boolean;        // Whether highlighted in Hero / Bento grid
  order: number;            // Display sort order
  publishedAt: string;      // ISO 8601 Date string
}
```

---

## 3. API Contract Specifications

Every endpoint must document the HTTP method, route, authentication requirements, request payload schema, and possible HTTP status codes.

```markdown
### Endpoint: POST /api/contact

- **Authentication:** Public (Protected by Cloudflare Turnstile / Honeypot)
- **Rate Limit:** Max 5 requests per IP per 10 minutes (HTTP 429)

#### Request Payload
| Field | Type | Required | Constraints |
| :--- | :--- | :--- | :--- |
| `name` | string | Yes | Min 2 chars, max 80 chars |
| `email` | string | Yes | Valid email format, max 100 chars |
| `message`| string | Yes | Min 10 chars, max 2000 chars |

#### Response Codes
- `200 OK`: `{"success": true, "message": "Email sent successfully"}`
- `400 Bad Request`: `{"error": "Validation failed", "details": [...]}`
- `429 Too Many Requests`: `{"error": "Rate limit exceeded. Try again in 10 minutes."}`
- `500 Internal Error`: `{"error": "Failed to deliver message"}`
```

---

## 4. Performance & Core Web Vitals Budgets

Define concrete, testable thresholds for web performance:

| Metric | Target | Measurement Tool | Strategy |
| :--- | :--- | :--- | :--- |
| **LCP (Largest Contentful Paint)** | `< 2.0s` | Google Lighthouse / PageSpeed | Preload critical hero assets, modern image formats (AVIF/WebP) |
| **FCP (First Contentful Paint)** | `< 1.0s` | DevTools Performance panel | Static Site Generation (SSG), minimal blocking JS |
| **CLS (Cumulative Layout Shift)**| `< 0.05` | Lighthouse | Explicit `width` and `height` attributes on all images and media containers |
| **FID / INP (Interaction)** | `< 100ms` | Chrome DevTools | Debounced event listeners, offloaded heavy calculations |
| **Initial JS Bundle Size** | `< 150KB` gzip | Next.js bundle analyzer | Tree-shaking, lazy-loading non-critical interactive components |

---

## 5. Security & Privacy Guardrails

Every technical specification must account for standard web security:

1. **Input Sanitization & Validation:** Never trust client-supplied input. Sanitize all form submissions and API payloads to prevent Cross-Site Scripting (XSS) and injection attacks.
2. **Environment Variables & Secrets:**
   - Client-accessible variables must carry the explicit framework prefix (e.g., `NEXT_PUBLIC_`).
   - Server-only secrets (API keys, private tokens) must never be bundled into client-side JS or checked into Git (`.env*.local` in `.gitignore`).
3. **Content Security Policy (CSP):** Specify allowed script, style, and font origins in Next.js response headers.
4. **CORS & HTTP Headers:** Enable `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and `Strict-Transport-Security`.
