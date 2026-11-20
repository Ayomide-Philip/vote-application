import Link from "next/link";

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

const PLATFORM_LINKS: FooterLink[] = [
  { label: "Browse Elections", href: "/#elections" },
  { label: "Verify a Ballot", href: "/#verify" },
  { label: "Create Election", href: "/login" },
  { label: "About Ballot", href: "/#about" },
];

const LEGAL_LINKS: FooterLink[] = [
  { label: "Secret Ballot Protocol", href: "/#about" },
  { label: "Privacy Notice", href: "/#privacy" },
  { label: "Terms of Service", href: "/#terms" },
];

const VERIFICATION_LINKS: FooterLink[] = [
  { label: "Public Audit Ledger", href: "/#verify" },
  { label: "Design System Showcase", href: "/design.html", external: true },
];

export function Footer() {
  return (
    <footer className="w-full border-t-2 border-border bg-card text-foreground transition-colors">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pb-12 border-b-2 border-border">
          {/* Brand & Mission Column */}
          <div className="lg:col-span-2 flex flex-col items-start text-left">
            <Link
              href="/"
              className="font-heading capitalize font-bold text-2xl tracking-tight text-foreground hover:opacity-90 transition-opacity mb-3"
            >
              ballot<span className="text-brand">.</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-sm leading-relaxed mb-4">
              Institutional voting platform for schools, student unions, and
              organizations. Domain-verified, private, and tamper-resistant.
            </p>
          </div>

          {/* Column 1: Platform */}
          <div>
            <h3 className="font-heading text-xs font-bold uppercase tracking-widest text-foreground mb-4">
              Platform
            </h3>
            <ul className="space-y-2.5 text-sm">
              {PLATFORM_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Legal & Privacy */}
          <div>
            <h3 className="font-heading text-xs font-bold uppercase tracking-widest text-foreground mb-4">
              Legal & Privacy
            </h3>
            <ul className="space-y-2.5 text-sm">
              {LEGAL_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Verification */}
          <div>
            <h3 className="font-heading text-xs font-bold uppercase tracking-widest text-foreground mb-4">
              Verification
            </h3>
            <ul className="space-y-2.5 text-sm">
              {VERIFICATION_LINKS.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                    >
                      <span>{link.label}</span>
                      <span className="text-xs text-muted-foreground">↗</span>
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Architecture */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-muted-foreground">
          <p>© 2026 Ballot Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
