import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col transition-colors duration-200">
      {/* Top Header */}
      <header className="h-16 border-b border-border px-6 md:px-12 flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-3">
          <span className="font-heading font-bold text-xl tracking-tight">
            ballot<span className="text-brand">.</span>
          </span>
          <span className="text-xs text-muted-foreground border-l border-border pl-3 font-medium hidden sm:inline">
            Institutional Voting
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="/design.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Design Showcase ↗
          </a>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero / Join Hub */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand/10 text-brand text-xs font-bold uppercase tracking-wider mb-8 border border-brand/30">
          <span className="w-1.5 h-1.5 bg-brand animate-pulse" />
          Zero Paper Ballots · Domain-Verified Elections
        </div>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-2xl font-heading">
          Institutional voting built on trust and clarity.
        </h1>

        <p className="text-muted-foreground text-base md:text-lg max-w-xl mb-12">
          Cast your ballot securely with your official school or organization
          email. Exactly one vote per verified account, tamper-resistant and
          private.
        </p>

        {/* Quick Join Box - Style 3: Editorial Grid / Ledger */}
        <div className="w-full max-w-md bg-card border-2 border-border p-6 mb-10 text-left">
          <label
            htmlFor="electionCode"
            className="field-label block uppercase tracking-widest text-xs font-bold mb-3 font-heading"
          >
            Enter Election Code
          </label>
          <div className="flex gap-2">
            <input
              id="electionCode"
              type="text"
              placeholder="e.g. OAU-ENG-24"
              className="text-input code-input flex-1 h-12"
            />
            <button
              type="button"
              className="btn btn-primary h-12 px-6"
            >
              Join →
            </button>
          </div>
        </div>

        {/* Action Links */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            className="btn btn-secondary px-6 py-3"
          >
            Create an Election
          </button>
          <button
            type="button"
            className="btn btn-ghost px-6 py-3"
          >
            Sign In with School Email
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 px-6 text-center text-xs text-subtle">
        Ballot Platform · Palette B (Obsidian & Electric Amber) · Self-hosted
        Satoshi & DM Sans
      </footer>
    </div>
  );
}
