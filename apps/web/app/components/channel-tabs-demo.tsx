"use client";

import { ArrowRight, Code2, Globe, Mail, Smartphone, Terminal } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

interface ChannelTabsDemoProps {
  workspaceHref: string;
}

export const ChannelTabsDemo = ({ workspaceHref }: Readonly<ChannelTabsDemoProps>) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const channels = [
    {
      id: "in-app",
      name: "In-App Popups",
      icon: Smartphone,
      title: "Targeted In-App Popups",
      desc: "Trigger surveys based on specific user actions, button clicks, page visits, or user attributes without writing backend code.",
      badge: "Targeted Delivery",
      previewSnippet: `<SurveyModal\n  trigger="completed_checkout"\n  delay={1200}\n  surveyId="srv_neon_gemini_01"\n/>`,
    },
    {
      id: "public-link",
      name: "Shareable Links",
      icon: Globe,
      title: "Standalone Public Link Surveys",
      desc: "Generate clean, distraction-free URLs with custom branding, Open Graph social cards, and URL parameter pre-filling.",
      badge: "Zero Setup",
      previewSnippet: `https://surveycraft.dev/s/onboarding-feedback?user_id=usr_492&plan=pro`,
    },
    {
      id: "email",
      name: "Email Embeds",
      icon: Mail,
      title: "One-Click Email Rating Embeds",
      desc: "Embed interactive 1-5 stars or NPS buttons directly into transactional emails with instant response recording on first click.",
      badge: "High Conversion",
      previewSnippet: `<!-- SurveyCraft Email Block -->\n<table class="fb-survey-stars">\n  <tr>\n    <td><a href="...">⭐ 1</a></td>\n    <td><a href="...">⭐ 5</a></td>\n  </tr>\n</table>`,
    },
    {
      id: "widget",
      name: "Web Widget",
      icon: Code2,
      title: "Lightweight Website Slide-In",
      desc: "Embed an unobtrusive feedback tab or slide-in widget in any website with a single `<script>` tag.",
      badge: "Universal Web",
      previewSnippet: `<script\n  src="https://surveycraft.dev/js/surveycraft.umd.cjs"\n  data-workspace="ws_prod_01"\n  async>\n</script>`,
    },
  ];

  return (
    <div>
      <div className="mx-auto mb-10 flex max-w-3xl flex-wrap items-center justify-center gap-2 sm:gap-3">
        {channels.map((channel, cIdx) => {
          const Icon = channel.icon;
          const isSelected = activeTab === cIdx;
          return (
            <button
              key={channel.id}
              type="button"
              onClick={() => setActiveTab(cIdx)}
              className={`inline-flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all sm:text-sm ${
                isSelected
                  ? "scale-105 bg-slate-900 text-white shadow-md"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
              }`}>
              <Icon className="size-4" />
              <span>{channel.name}</span>
            </button>
          );
        })}
      </div>

      <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-slate-50/70 p-6 shadow-sm sm:p-10">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div>
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-teal-100 px-3 py-1 text-xs font-bold text-teal-800">
              {channels[activeTab].badge}
            </span>
            <h3 className="mb-3 text-2xl font-bold text-slate-900">{channels[activeTab].title}</h3>
            <p className="mb-6 text-sm leading-relaxed text-slate-600">{channels[activeTab].desc}</p>
            <Link
              href={workspaceHref}
              className="inline-flex items-center gap-2 text-xs font-bold text-teal-700 underline hover:text-teal-900">
              <span>Create a {channels[activeTab].name} in App</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 text-white shadow-md">
            <div className="mb-3 flex items-center justify-between border-b border-slate-800 pb-3 font-mono text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Terminal className="size-3.5 text-teal-400" />
                Integration snippet
              </span>
              <span className="text-[11px] text-slate-500">Copy & Paste</span>
            </div>
            <pre className="overflow-x-auto font-mono text-xs leading-relaxed whitespace-pre-wrap text-teal-300">
              {channels[activeTab].previewSnippet}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
