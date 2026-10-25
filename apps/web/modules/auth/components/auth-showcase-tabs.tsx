"use client";

import { Database, ShieldCheck, Sparkles } from "lucide-react";
import React, { useState } from "react";

export const AuthShowcaseTabs = () => {
  const [activeHighlight, setActiveHighlight] = useState<number>(0);

  const highlights = [
    {
      icon: Sparkles,
      tag: "Gemini 2.5 Flash",
      title: "Prompt to Multi-Step Survey in Seconds",
      desc: "Describe your research goal in plain English. Google Gemini generates strictly validated question schemas and logic jumps.",
      badge: "AI Engine",
    },
    {
      icon: Database,
      tag: "Neon Serverless Postgres",
      title: "Zero Cold-Start Drop Resilience",
      desc: "Cloud PostgreSQL connection pooling configured with 30s acquire protection for instant response persistence.",
      badge: "Cloud DB",
    },
    {
      icon: ShieldCheck,
      tag: "Decoupled Monorepo Core",
      title: "Runs Natively on Windows & Modern Cloud",
      desc: "Eliminated heavy Redis, SpiceDB, and Docker constraints for an ultra-lightweight, high-performance architecture.",
      badge: "Decoupled",
    },
  ];

  return (
    <div>
      {/* Interactive Tabs */}
      <div className="mb-4 flex gap-2">
        {highlights.map((h, hIdx) => (
          <button
            key={hIdx}
            type="button"
            onClick={() => setActiveHighlight(hIdx)}
            className={`cursor-pointer rounded-md px-2.5 py-1 text-[11px] font-semibold transition-all ${
              activeHighlight === hIdx
                ? "bg-teal-500 text-white shadow-xs"
                : "bg-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}>
            {h.badge}
          </button>
        ))}
      </div>

      {/* Active Highlight Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-xs transition-all">
        <div className="mb-1.5 flex items-center gap-2 text-xs font-bold text-teal-400">
          <span className="size-2 animate-pulse rounded-full bg-teal-400" />
          <span>{highlights[activeHighlight].tag}</span>
        </div>
        <h3 className="mb-1.5 text-sm font-bold text-white">{highlights[activeHighlight].title}</h3>
        <p className="text-xs leading-relaxed text-slate-300">{highlights[activeHighlight].desc}</p>
      </div>
    </div>
  );
};
