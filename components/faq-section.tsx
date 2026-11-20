"use client";

import { useState } from "react";
import { MinusSignIcon, PlusSignIcon } from "hugeicons-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "Can an administrator see who I voted for?",
    answer:
      "No. The system records that your email participated to prevent duplicate votes, but your candidate choices are stored in a separate table without any link to your identity. Even the database administrator cannot connect your account to your choices.",
  },
  {
    id: "faq-2",
    question: "What happens if I try to vote with a personal email?",
    answer:
      "The election gate checks your email against the allowed domain list set by the organizer. If an election requires @oauife.edu.ng or @unilag.edu.ng and you enter a personal address like @gmail.com, access is denied immediately.",
  },
  {
    id: "faq-3",
    question: "Do I need to install an app to vote?",
    answer:
      "No. Ballot works in any modern mobile or desktop browser. You only need an internet connection and access to your official school email inbox.",
  },
  {
    id: "faq-4",
    question: "Can I create an election for my student group or faculty?",
    answer:
      "Yes. Any registered user can create an election. You set the contest titles, add candidates, define allowed domains, and choose start and end dates.",
  },
  {
    id: "faq-5",
    question: "Can one account vote in multiple elections?",
    answer:
      "Yes. Your account works across elections. You can vote in your faculty election, vote in your departmental election, and manage an election for your student club from the same login.",
  },
];

export function FAQSection() {
  // First item open by default (per frontend-unslop specification)
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="relative w-full border-t-2 border-border py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header: Centralized */}
        <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16 flex flex-col items-center">
          <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-medium font-heading tracking-tight text-foreground leading-[1.15]">
            Frequently asked questions
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg font-normal leading-relaxed mt-4 max-w-xl text-center">
            Everything you need to know about domain gating, voting secrecy, and election setup.
          </p>
        </div>

        {/* Calm, Narrow-Column Editorial Accordion (Plain Dividers) */}
        <div className="max-w-3xl mx-auto border-y-2 border-border divide-y-2 divide-border">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id} className="transition-colors hover:bg-muted/20">
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full py-5 sm:py-6 px-2 sm:px-4 flex items-center justify-between gap-4 text-left cursor-pointer focus-visible:outline-none focus-visible:bg-muted/40"
                >
                  <span className="text-base sm:text-lg font-medium font-heading text-foreground leading-snug">
                    {faq.question}
                  </span>
                  <span className="text-brand shrink-0 p-1">
                    {isOpen ? (
                      <MinusSignIcon size={18} />
                    ) : (
                      <PlusSignIcon size={18} />
                    )}
                  </span>
                </button>

                {isOpen && (
                  <div className="pb-6 px-2 sm:px-4 text-sm sm:text-base text-muted-foreground leading-relaxed animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
