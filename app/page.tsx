import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { ProblemSection } from "@/components/problem-section";
import { HowItWorksSection } from "@/components/how-it-works-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col transition-colors duration-200 site-grid-bg">
      <Navbar />

      <main className="flex-1">
        <HeroSection />
        <ProblemSection />
        <HowItWorksSection />
      </main>

      <footer className="border-t-2 border-border py-6 px-6 text-center text-xs text-subtle font-mono">
        Ballot Platform · Institutional Ledger Architecture · Self-hosted
        Satoshi & DM Sans
      </footer>
    </div>
  );
}
