import { HeroSection } from "@/components/hero-section";
import { ProblemSection } from "@/components/problem-section";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { GuaranteesSection } from "@/components/guarantees-section";
import { FAQSection } from "@/components/faq-section";
import { CTASection } from "@/components/cta-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <GuaranteesSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
