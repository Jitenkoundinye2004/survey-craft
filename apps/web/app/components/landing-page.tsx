import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Code2,
  Database,
  Globe,
  Layers,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { InteractiveSurveyDemo } from "@/app/components/interactive-survey-demo";
import { Logo } from "@/modules/ui/components/logo";

interface LandingPageProps {
  workspaceHref: string;
  isAuthenticated: boolean;
}

export const LandingPage = ({ workspaceHref, isAuthenticated }: Readonly<LandingPageProps>) => {
  const features = [
    {
      icon: Sparkles,
      title: "Google Gemini AI Builder",
      description:
        "Prompt-to-survey generation powered by Gemini 2.5 Flash. Turn any natural language description into structured, multi-step surveys in seconds.",
      tag: "AI Engine",
    },
    {
      icon: Globe,
      title: "Multi-Channel Distribution",
      description:
        "Seamlessly deploy surveys via shareable public links, in-app modal popups, embedded web widgets, or direct email distributions.",
      tag: "Omnichannel",
    },
    {
      icon: BarChart3,
      title: "Real-Time Insights & Analytics",
      description:
        "Instant completion rate tracking, drop-off step identification, response breakdowns, and sentiment analysis built right into your dashboard.",
      tag: "Analytics",
    },
    {
      icon: Database,
      title: "Neon Serverless PostgreSQL",
      description:
        "Cloud-native PostgreSQL storage with automatic connection pooling, 30s timeout resilience, and instant branch-based scaling.",
      tag: "Database",
    },
    {
      icon: Layers,
      title: "Advanced Logic & Branching",
      description:
        "Sophisticated conditional routing, custom variable piping, hidden query param capture, and personalized question flows.",
      tag: "Logic Engine",
    },
    {
      icon: ShieldCheck,
      title: "Decoupled & Self-Contained",
      description:
        "Eliminated heavy external Docker, Redis, and SpiceDB requirements. Runs lightweight, ultra-fast, and cleanly on Windows or modern cloud environments.",
      tag: "Architecture",
    },
  ];

  const techStack = [
    { name: "Next.js 15", desc: "App Router & Turbopack" },
    { name: "React 19", desc: "Modern UI & Hooks" },
    { name: "TypeScript", desc: "Strict Type Safety" },
    { name: "Tailwind CSS", desc: "Modern Utility Styling" },
    { name: "Google Gemini", desc: "Gemini 2.5 Flash AI" },
    { name: "Neon Postgres", desc: "Serverless Database" },
    { name: "Prisma ORM", desc: "Type-safe Data Access" },
    { name: "Turborepo", desc: "Monorepo Task Graph" },
  ];

  return (
    <div className="w-full flex-1 overflow-y-auto scroll-smooth bg-slate-50/50 text-slate-900">
      {/* 1. Header / Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <Link href="/" className="group flex items-center gap-2">
              <Logo className="h-7 w-auto" />
            </Link>

            <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
              <a href="#features" className="transition-colors hover:text-slate-900">
                Features
              </a>
              <a href="#ai-builder" className="transition-colors hover:text-slate-900">
                AI Builder
              </a>
              <a href="#demo" className="transition-colors hover:text-slate-900">
                Live Demo
              </a>
              <a href="#tech-stack" className="transition-colors hover:text-slate-900">
                Tech Stack
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {!isAuthenticated ? (
              <Link
                href="/auth/login"
                className="px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900">
                Sign In
              </Link>
            ) : null}

            <Link
              href={workspaceHref}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 focus-visible:outline-hidden">
              <span>{isAuthenticated ? "Open Workspace" : "Go to app"}</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.teal.100),white)] opacity-60" />

        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          {/* Changelog Banner */}
          <div className="mb-8 inline-flex cursor-pointer items-center gap-2 rounded-full border border-teal-200 bg-teal-50/80 px-3.5 py-1 text-xs font-medium text-teal-800 shadow-xs transition hover:bg-teal-100">
            <span className="font-semibold text-teal-700">Changelog:</span>
            <span>SurveyCraft 6.0 is live with Gemini 2.5 Flash AI Engine</span>
            <ChevronRight className="size-3 text-teal-600" />
          </div>

          {/* Trust Badges Bar */}
          <div className="mb-8 flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-slate-500 sm:gap-10">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-emerald-600" />
              <span>Privacy-First</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Code2 className="size-4 text-slate-700" />
              <span>Open Architecture</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-semibold text-slate-700">5.0 Star Feedback</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="size-4 text-indigo-600" />
              <span>Google Gemini AI</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Database className="size-4 text-teal-600" />
              <span>Neon PostgreSQL</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl sm:leading-tight">
            The{" "}
            <span className="bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent">
              Open Source
            </span>{" "}
            Experience Management Platform
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-600 sm:text-xl">
            A modern, privacy-first Experience Management suite built for seamless user feedback. Generate
            intelligent surveys with <strong>Google Gemini AI</strong>, distribute across web & apps, and
            analyze real-time insights on <strong>Neon PostgreSQL</strong>.
          </p>

          {/* Hero Action Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={workspaceHref}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-7 py-3.5 text-base font-semibold text-white shadow-md transition hover:scale-[1.02] hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 focus-visible:outline-hidden">
              <span>{isAuthenticated ? "Launch Dashboard" : "Go to app"}</span>
              <ArrowRight className="size-5" />
            </Link>

            <a
              href="#demo"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-3.5 text-base font-semibold text-slate-700 shadow-xs transition hover:bg-slate-50 hover:text-slate-900">
              <span>Try Live Demo</span>
              <ChevronRight className="size-4" />
            </a>
          </div>

          {/* Technologies Marquee strip */}
          <div className="mt-16 border-t border-slate-200/60 pt-8">
            <p className="mb-6 text-xs font-semibold tracking-wider text-slate-400 uppercase">
              Engineered with modern, production-grade technologies
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold text-slate-600 sm:gap-10">
              <span className="flex items-center gap-1.5">⚡ Next.js 15 App Router</span>
              <span className="flex items-center gap-1.5">⚛️ React 19</span>
              <span className="flex items-center gap-1.5">🔷 TypeScript</span>
              <span className="flex items-center gap-1.5">🎨 Tailwind CSS</span>
              <span className="flex items-center gap-1.5">✨ Google Gemini AI</span>
              <span className="flex items-center gap-1.5">🐘 Neon PostgreSQL</span>
              <span className="flex items-center gap-1.5">📦 Turborepo</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive Live Demo & AI Builder Section */}
      <section id="demo" className="border-y border-slate-200/80 bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-3 text-xs font-bold tracking-widest text-teal-600 uppercase">
              Interactive Showcase
            </h2>
            <p className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              See SurveyCraft in Action
            </p>
            <p className="mt-4 text-base text-slate-600">
              Experience the power of prompt-driven survey creation and test an interactive live survey widget
              in real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2">
            {/* Left: AI Generator Mockup */}
            <div
              id="ai-builder"
              className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 p-6 text-white shadow-xl sm:p-8">
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

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-xs font-semibold tracking-wider text-slate-400 uppercase">
                    Natural Language Prompt
                  </label>
                  <div className="rounded-lg border border-slate-700/80 bg-slate-800/90 p-3.5 font-mono text-sm text-teal-300">
                    &quot;Generate a customer onboarding feedback survey for my SaaS platform with rating
                    scale, feature preferences, and open text suggestions.&quot;
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <CheckCircle2 className="size-4 text-teal-400" />
                  <span>
                    Schema validated in <strong>1.2s</strong> · 3 questions generated
                  </span>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="rounded-lg border border-slate-700 bg-slate-800/60 p-3">
                    <div className="mb-1 flex items-center justify-between text-xs text-slate-400">
                      <span className="font-semibold text-slate-200">Q1: Overall Experience</span>
                      <span className="font-mono text-teal-400">Rating (1-5)</span>
                    </div>
                    <p className="text-xs text-slate-300">How would you rate your onboarding experience?</p>
                  </div>

                  <div className="rounded-lg border border-slate-700 bg-slate-800/60 p-3">
                    <div className="mb-1 flex items-center justify-between text-xs text-slate-400">
                      <span className="font-semibold text-slate-200">Q2: Primary Value Driver</span>
                      <span className="font-mono text-indigo-400">Multiple Choice</span>
                    </div>
                    <p className="text-xs text-slate-300">
                      Which capability provided the most immediate value?
                    </p>
                  </div>

                  <div className="rounded-lg border border-slate-700 bg-slate-800/60 p-3">
                    <div className="mb-1 flex items-center justify-between text-xs text-slate-400">
                      <span className="font-semibold text-slate-200">Q3: Open Feedback</span>
                      <span className="font-mono text-amber-400">Open Text</span>
                    </div>
                    <p className="text-xs text-slate-300">
                      What is one thing we could do to make SurveyCraft better?
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Interactive Survey Card (Clickable!) */}
            <InteractiveSurveyDemo />
          </div>
        </div>
      </section>

      {/* 4. Core Capabilities & Feature Grid */}
      <section id="features" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-3 text-xs font-bold tracking-widest text-teal-600 uppercase">
              Platform Features
            </h2>
            <p className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Everything Needed for Modern Feedback
            </p>
            <p className="mt-4 text-base text-slate-600">
              Designed from the ground up for seamless developer experience, fast execution, and privacy-first
              data handling.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="group rounded-2xl border border-slate-200/90 bg-white p-7 shadow-xs transition-all hover:-translate-y-1 hover:shadow-md">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-slate-100 text-slate-800 transition-colors group-hover:bg-slate-900 group-hover:text-white">
                      <Icon className="size-5" />
                    </div>
                    <span className="rounded-md border border-slate-100 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-400">
                      {feature.tag}
                    </span>
                  </div>

                  <h3 className="mb-2 text-lg font-bold text-slate-900">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Architecture & Monorepo Engineering */}
      <section id="tech-stack" className="bg-slate-900 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-3 text-xs font-bold tracking-widest text-teal-400 uppercase">
              Engineering Architecture
            </h2>
            <p className="text-3xl font-bold tracking-tight sm:text-4xl">Clean Monorepo & Zero Bloat</p>
            <p className="mt-4 text-sm text-slate-400 sm:text-base">
              Decoupled from complex external dependencies to deliver a lightweight, high-performance platform
              on Windows and modern cloud infrastructure.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-4">
            {techStack.map((tech, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-800 bg-slate-800/60 p-5 text-center transition hover:border-slate-700">
                <p className="mb-1 text-base font-bold text-white">{tech.name}</p>
                <p className="text-xs text-slate-400">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Bottom Call to Action */}
      <section className="border-t border-slate-200/80 bg-gradient-to-b from-white to-slate-50 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Ready to Build Better Feedback Journeys?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
            Launch SurveyCraft now to create your first AI-powered survey or explore existing workspace
            analytics.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={workspaceHref}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-8 py-4 text-base font-semibold text-white shadow-md transition hover:scale-[1.02] hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 focus-visible:outline-hidden">
              <span>{isAuthenticated ? "Open Workspace" : "Go to app"}</span>
              <ArrowRight className="size-5" />
            </Link>

            {!isAuthenticated ? (
              <Link
                href="/auth/login"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-8 py-4 text-base font-semibold text-slate-700 shadow-xs transition hover:bg-slate-50">
                <span>Sign In with Credentials</span>
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="border-t border-slate-200 bg-white py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 text-xs text-slate-500 sm:flex-row sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Logo className="h-6 w-auto" />
            <span>© 2026 SurveyCraft · All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6 font-medium text-slate-600">
            <a href="#features" className="transition-colors hover:text-slate-900">
              Features
            </a>
            <a href="#demo" className="transition-colors hover:text-slate-900">
              Live Demo
            </a>
            <Link href={workspaceHref} className="transition-colors hover:text-slate-900">
              App
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
