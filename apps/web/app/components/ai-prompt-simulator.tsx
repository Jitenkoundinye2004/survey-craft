"use client";

import { CheckCircle2, RefreshCw, Sparkles } from "lucide-react";
import React, { useState } from "react";

export const AiPromptSimulator = () => {
  const aiPrompts = [
    {
      label: "Customer Onboarding",
      prompt:
        "Generate a customer onboarding feedback survey for my SaaS platform with rating scale, feature preferences, and open text suggestions.",
      time: "1.1s",
      q1: {
        title: "Q1: Overall Experience",
        type: "Rating (1-5)",
        desc: "How would you rate your onboarding experience?",
      },
      q2: {
        title: "Q2: Value Driver",
        type: "Multiple Choice",
        desc: "Which capability provided the most immediate value?",
      },
      q3: {
        title: "Q3: Open Feedback",
        type: "Open Text",
        desc: "What is one thing we could do to make SurveyCraft better?",
      },
    },
    {
      label: "NPS & Brand Loyalty",
      prompt:
        "Create an NPS survey to measure brand loyalty with 0-10 score, primary reason selection, and permission to quote follow-up.",
      time: "0.9s",
      q1: {
        title: "Q1: Net Promoter Score",
        type: "NPS (0-10)",
        desc: "How likely are you to recommend SurveyCraft to a colleague?",
      },
      q2: {
        title: "Q2: Primary Driver",
        type: "Multiple Choice",
        desc: "What was the main reason for your score?",
      },
      q3: {
        title: "Q3: Testimonial Permission",
        type: "Yes / No",
        desc: "May we feature your feedback on our portfolio showcase?",
      },
    },
    {
      label: "Website Exit Intent",
      prompt:
        "Design a quick 2-question micro-survey triggered before visitors leave the website to capture hesitation reasons.",
      time: "1.3s",
      q1: {
        title: "Q1: Reason for Leaving",
        type: "Single Choice",
        desc: "Did you find what you were looking for today?",
      },
      q2: {
        title: "Q2: Missing Info",
        type: "Open Text",
        desc: "What could we add to make this page more useful?",
      },
      q3: {
        title: "Q3: Stay in Touch",
        type: "Email Capture",
        desc: "Leave your email if you'd like us to notify you on launch.",
      },
    },
    {
      label: "Roadmap Prioritization",
      prompt:
        "Build a product roadmap voting survey where users rank upcoming integrations and explain their business use-case.",
      time: "1.0s",
      q1: {
        title: "Q1: Priority Integrations",
        type: "Ranking",
        desc: "Rank the top 3 integrations you need most.",
      },
      q2: {
        title: "Q2: Team Size",
        type: "Multiple Choice",
        desc: "How many team members will use this tool?",
      },
      q3: {
        title: "Q3: Workflow Impact",
        type: "Open Text",
        desc: "Describe the specific workflow this integration unlocks.",
      },
    },
  ];

  const [activePromptIdx, setActivePromptIdx] = useState<number>(0);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleSelectPrompt = (idx: number) => {
    if (idx === activePromptIdx) return;
    setIsGenerating(true);
    setTimeout(() => {
      setActivePromptIdx(idx);
      setIsGenerating(false);
    }, 400);
  };

  return (
    <div
      id="ai-builder"
      className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-6 text-white shadow-xl sm:p-8">
      <div className="mb-6 flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="size-3 rounded-full bg-rose-500" />
          <div className="size-3 rounded-full bg-amber-500" />
          <div className="size-3 rounded-full bg-emerald-500" />
          <span className="ml-2 font-mono text-xs text-slate-400">surveycraft-ai-builder</span>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/20 px-2.5 py-0.5 text-xs font-medium text-indigo-300">
          <Sparkles className="size-3 text-indigo-400" />
          Gemini 2.5 Flash
        </span>
      </div>

      {/* Prompt selector chips */}
      <div className="mb-4">
        <label className="mb-2 block text-xs font-semibold tracking-wider text-slate-400 uppercase">
          Click an AI Prompt Template:
        </label>
        <div className="flex flex-wrap gap-2">
          {aiPrompts.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectPrompt(idx)}
              className={`cursor-pointer rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
                activePromptIdx === idx
                  ? "bg-teal-500 font-semibold text-white shadow-xs"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
              }`}>
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-xs font-semibold tracking-wider text-slate-400 uppercase">
            Active Natural Language Prompt
          </label>
          <div className="min-h-[64px] rounded-lg border border-slate-700/80 bg-slate-800/90 p-3.5 font-mono text-xs leading-relaxed text-teal-300 transition-all sm:text-sm">
            &quot;{aiPrompts[activePromptIdx].prompt}&quot;
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          {isGenerating ? (
            <div className="flex items-center gap-2 text-amber-400">
              <RefreshCw className="size-3.5 animate-spin" />
              <span>Gemini 2.5 Flash is structuring questions...</span>
            </div>
          ) : (
            <>
              <CheckCircle2 className="size-4 text-teal-400" />
              <span>
                Schema validated in <strong>{aiPrompts[activePromptIdx].time}</strong> · 3 questions generated
              </span>
            </>
          )}
        </div>

        {/* Generated questions cards */}
        <div className="space-y-2.5 pt-2">
          {[aiPrompts[activePromptIdx].q1, aiPrompts[activePromptIdx].q2, aiPrompts[activePromptIdx].q3].map(
            (q, qIdx) => (
              <div
                key={qIdx}
                className="rounded-lg border border-slate-700/90 bg-slate-800/60 p-3 transition-all hover:border-slate-600">
                <div className="mb-1 flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold text-slate-200">{q.title}</span>
                  <span className="rounded border border-teal-800/50 bg-teal-950/60 px-2 py-0.5 font-mono text-[11px] text-teal-400">
                    {q.type}
                  </span>
                </div>
                <p className="text-xs text-slate-300">{q.desc}</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
