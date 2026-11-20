import Link from "next/link";

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

const PLATFORM_LINKS: FooterLink[] = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Guarantees", href: "/#guarantees" },
  { label: "FAQ", href: "/#faq" },
  { label: "Sign In", href: "/login" },
  { label: "Create Account", href: "/register" },
];

const LEGAL_LINKS: FooterLink[] = [
  { label: "Voter Anonymity Protocol", href: "/#guarantees" },
  { label: "Audit Receipt Verification", href: "/#how-it-works" },
  { label: "Campus Domain Policy", href: "/#guarantees" },
  { label: "Institutional Security", href: "/#guarantees" },
];

const VERIFICATION_LINKS: FooterLink[] = [
  { label: "Official Design System", href: "/design.html", external: true },
  { label: "Audited Ledger Specification", href: "/#how-it-works" },
  { label: "Receipt Cryptographic Seal", href: "/#how-it-works" },
];

export function Footer() {
  return (
    <footer className="w-full border-t-2 border-border bg-card text-foreground transition-colors">
      {/* Visually Hidden Semantic Heading Level 2 to prevent skipped heading levels */}
      <h2 className="sr-only">Footer Directory and Institutional Policies</h2>

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
              organizations. Domain-verified, private, and mathematically
              verifiable.
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

        {/* Bottom Bar: Copyright & Institutional Status */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-muted-foreground">
          <p>© 2026 Ballot Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
