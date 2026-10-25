"use client";

import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

export const FaqAccordion = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does Google Gemini AI survey generation work in SurveyCraft?",
      a: "SurveyCraft connects to Google's Gemini 2.5 Flash model through structured JSON schema enforcement. When you provide a natural language prompt, Gemini returns typed questions (single choice, multiple choice, rating scale, open text) with automated validation in under 1.5 seconds.",
    },
    {
      q: "How is SurveyCraft decoupled from Docker, Redis, and SpiceDB?",
      a: "We stripped out heavy external enterprise dependencies, replacing Redis caching with safe in-memory fallbacks, and replacing external SpiceDB authorization with direct Prisma-level multi-tenant role filtering. This allows SurveyCraft to boot and run natively on Windows or modern cloud environments.",
    },
    {
      q: "How does Neon PostgreSQL connection pooling handle cold starts?",
      a: "Neon serverless databases enter idle sleep to conserve compute. SurveyCraft's Prisma adapter has been configured with a 30-second acquire timeout and connect_timeout parameters, ensuring zero dropped requests even when waking from cold slumber.",
    },
    {
      q: "Is SurveyCraft free and open source?",
      a: "Yes! SurveyCraft is built as an open-source, privacy-first alternative to Typeform and Qualtrics, licensed for developer customization and personal deployment.",
    },
  ];

  return (
    <div className="space-y-4">
      {faqs.map((faq, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div
            key={idx}
            className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50/50 transition-all">
            <button
              type="button"
              onClick={() => setOpenIdx(isOpen ? null : idx)}
              className="flex w-full cursor-pointer items-center justify-between px-6 py-4 text-left text-base font-bold text-slate-900 transition hover:text-teal-700">
              <span>{faq.q}</span>
              <ChevronDown
                className={`ml-4 size-4 shrink-0 text-slate-500 transition-transform duration-200 ${
                  isOpen ? "rotate-180 text-teal-600" : ""
                }`}
              />
            </button>

            {isOpen && (
              <div className="animate-fadeIn border-t border-slate-200/60 px-6 pt-1 pb-5 text-sm leading-relaxed text-slate-600">
                {faq.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
