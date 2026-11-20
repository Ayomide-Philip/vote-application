import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { ProblemSection } from "@/components/problem-section";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { GuaranteesSection } from "@/components/guarantees-section";
import { FAQSection } from "@/components/faq-section";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col transition-colors duration-200 site-grid-bg">
      <Navbar />

      <main className="flex-1">
        <HeroSection />
        <ProblemSection />
        <HowItWorksSection />
        <GuaranteesSection />
        <FAQSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
