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
            className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 font-heading"
          >
            Enter Election Code
          </label>
          <div className="flex gap-2">
            <input
              id="electionCode"
              type="text"
              placeholder="e.g. OAU-ENG-24"
              className="flex-1 h-12 px-4 rounded-none bg-muted border-2 border-border text-foreground font-mono font-semibold uppercase placeholder:normal-case placeholder:font-normal placeholder:text-subtle focus:outline-none focus:border-brand transition-colors text-sm"
            />
            <button
              type="button"
              className="h-12 px-6 rounded-none bg-brand hover:bg-transparent text-black hover:text-brand border-2 border-brand font-bold uppercase tracking-widest text-xs transition-colors cursor-pointer whitespace-nowrap active:translate-y-[1px] font-heading"
            >
              Join →
            </button>
          </div>
        </div>

        {/* Action Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold uppercase tracking-widest font-heading">
          <button
            type="button"
            className="px-6 py-3 border-2 border-border bg-transparent hover:bg-foreground hover:text-background hover:border-foreground text-foreground transition-all cursor-pointer active:translate-y-[1px]"
          >
            Create an Election
          </button>
          <button
            type="button"
            className="px-6 py-3 border-2 border-transparent hover:border-border text-muted-foreground hover:text-foreground transition-all cursor-pointer"
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
