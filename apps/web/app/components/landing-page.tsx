import {
  ArrowRight,
  BarChart3,
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
import { AiPromptSimulator } from "@/app/components/ai-prompt-simulator";
import { ChannelTabsDemo } from "@/app/components/channel-tabs-demo";
import { FaqAccordion } from "@/app/components/faq-accordion";
import { InteractiveSurveyDemo } from "@/app/components/interactive-survey-demo";
import { ScrollReveal } from "@/app/components/landing-scroll-reveal";
import { ReadingProgressBar } from "@/app/components/reading-progress-bar";
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
      color: "border-indigo-500/20 bg-indigo-50/40 text-indigo-700",
    },
    {
      icon: Globe,
      title: "Omnichannel Distribution",
      description:
        "Deploy surveys via shareable public links, in-app modal popups, embedded web widgets, or direct email distributions seamlessly.",
      tag: "Distribution",
      color: "border-teal-500/20 bg-teal-50/40 text-teal-700",
    },
    {
      icon: BarChart3,
      title: "Real-Time Insights & Analytics",
      description:
        "Instant completion rate tracking, drop-off step identification, response breakdowns, and sentiment analysis built right into your dashboard.",
      tag: "Analytics",
      color: "border-blue-500/20 bg-blue-50/40 text-blue-700",
    },
    {
      icon: Database,
      title: "Neon Serverless PostgreSQL",
      description:
        "Cloud-native PostgreSQL storage with automatic connection pooling, 30s timeout resilience, and instant branch-based scaling.",
      tag: "Database",
      color: "border-emerald-500/20 bg-emerald-50/40 text-emerald-700",
    },
    {
      icon: Layers,
      title: "Advanced Logic & Branching",
      description:
        "Sophisticated conditional routing, custom variable piping, hidden query param capture, and personalized question flows.",
      tag: "Logic Engine",
      color: "border-amber-500/20 bg-amber-50/40 text-amber-700",
    },
    {
      icon: ShieldCheck,
      title: "Decoupled & Self-Contained",
      description:
        "Eliminated heavy external Docker, Redis, and SpiceDB requirements. Runs lightweight, ultra-fast, and cleanly on Windows or modern cloud environments.",
      tag: "Architecture",
      color: "border-rose-500/20 bg-rose-50/40 text-rose-700",
    },
  ];

  const techStack = [
    { name: "Next.js 15", desc: "App Router & Turbopack", icon: "⚡" },
    { name: "React 19", desc: "Modern UI & State Hooks", icon: "⚛️" },
    { name: "TypeScript", desc: "Strict Type Safety", icon: "🔷" },
    { name: "Tailwind CSS", desc: "Utility-First Styling", icon: "🎨" },
    { name: "Google Gemini", desc: "Gemini 2.5 Flash AI", icon: "✨" },
    { name: "Neon Postgres", desc: "Serverless Database", icon: "🐘" },
    { name: "Prisma ORM", desc: "Type-safe Data Access", icon: "💎" },
    { name: "Turborepo", desc: "Monorepo Task Graph", icon: "📦" },
  ];

  return (
    <div className="relative min-h-dvh w-full bg-slate-50/50 text-slate-900">
      {/* Top Reading Progress Bar */}
      <ReadingProgressBar />

      {/* 1. Header / Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md transition-all">
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
                Interactive Demo
              </a>
              <a href="#distribution" className="transition-colors hover:text-slate-900">
                Channels
              </a>
              <a href="#faq" className="transition-colors hover:text-slate-900">
                FAQ
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
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:scale-105 hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 focus-visible:outline-hidden active:scale-95">
              <span>{isAuthenticated ? "Open Workspace" : "Go to app"}</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Hero Section (One-by-One Staggered Entry) */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.teal.100),white)] opacity-60" />

        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          {/* Changelog Pill (Reveals First) */}
          <ScrollReveal delay={0.05}>
            <div className="mb-8 inline-flex cursor-pointer items-center gap-2 rounded-full border border-teal-200 bg-teal-50/80 px-3.5 py-1 text-xs font-medium text-teal-800 shadow-xs transition hover:bg-teal-100">
              <span className="font-semibold text-teal-700">Changelog:</span>
              <span>SurveyCraft 6.0 is live with Gemini 2.5 Flash AI Engine</span>
              <ChevronRight className="size-3 text-teal-600" />
            </div>
          </ScrollReveal>

          {/* Trust Badges Bar (Reveals Second) */}
          <ScrollReveal delay={0.15}>
            <div className="mb-8 flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-slate-500 sm:gap-10">
              <div className="flex items-center gap-1.5 transition hover:text-slate-800">
                <ShieldCheck className="size-4 text-emerald-600" />
                <span>Privacy-First</span>
              </div>
              <div className="flex items-center gap-1.5 transition hover:text-slate-800">
                <Code2 className="size-4 text-slate-700" />
                <span>Open Architecture</span>
              </div>
              <div className="flex items-center gap-1.5 transition hover:text-slate-800">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="font-semibold text-slate-700">5.0 Star Feedback</span>
              </div>
              <div className="flex items-center gap-1.5 transition hover:text-slate-800">
                <Sparkles className="size-4 text-indigo-600" />
                <span>Google Gemini AI</span>
              </div>
              <div className="flex items-center gap-1.5 transition hover:text-slate-800">
                <Database className="size-4 text-teal-600" />
                <span>Neon PostgreSQL</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Main Headline (Reveals Third) */}
          <ScrollReveal delay={0.25}>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl sm:leading-tight">
              The{" "}
              <span className="bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent">
                Open Source
              </span>{" "}
              Experience Management Platform
            </h1>
          </ScrollReveal>

          {/* Subheadline (Reveals Fourth) */}
          <ScrollReveal delay={0.35}>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-600 sm:text-xl">
              A modern, privacy-first Experience Management suite built for seamless user feedback. Generate
              intelligent surveys with <strong>Google Gemini AI</strong>, distribute across web & apps, and
              analyze real-time insights on <strong>Neon PostgreSQL</strong>.
            </p>
          </ScrollReveal>

          {/* Hero Action Buttons (Reveals Fifth) */}
          <ScrollReveal delay={0.45}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href={workspaceHref}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-7 py-3.5 text-base font-semibold text-white shadow-md transition-all hover:scale-105 hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 focus-visible:outline-hidden active:scale-95">
                <span>{isAuthenticated ? "Launch Dashboard" : "Go to app"}</span>
                <ArrowRight className="size-5" />
              </Link>

              <a
                href="#demo"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-3.5 text-base font-semibold text-slate-700 shadow-xs transition hover:scale-105 hover:bg-slate-50 hover:text-slate-900">
                <span>Try Live Demo</span>
                <ChevronRight className="size-4" />
              </a>
            </div>
          </ScrollReveal>

          {/* Technologies Marquee strip (Reveals Sixth) */}
          <ScrollReveal delay={0.55}>
            <div className="mt-16 border-t border-slate-200/60 pt-8">
              <p className="mb-6 text-xs font-semibold tracking-wider text-slate-400 uppercase">
                Engineered with modern, production-grade technologies
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold text-slate-600 sm:gap-10">
                <span className="flex items-center gap-1.5 transition hover:text-teal-600">
                  ⚡ Next.js 15 App Router
                </span>
                <span className="flex items-center gap-1.5 transition hover:text-teal-600">⚛️ React 19</span>
                <span className="flex items-center gap-1.5 transition hover:text-teal-600">
                  🔷 TypeScript
                </span>
                <span className="flex items-center gap-1.5 transition hover:text-teal-600">
                  🎨 Tailwind CSS
                </span>
                <span className="flex items-center gap-1.5 transition hover:text-teal-600">
                  ✨ Google Gemini AI
                </span>
                <span className="flex items-center gap-1.5 transition hover:text-teal-600">
                  🐘 Neon PostgreSQL
                </span>
                <span className="flex items-center gap-1.5 transition hover:text-teal-600">📦 Turborepo</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. Interactive Showcase Section: AI Builder & Live Simulator */}
      <section id="demo" className="border-y border-slate-200/80 bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="mb-3 text-xs font-bold tracking-widest text-teal-600 uppercase">
                Interactive Showcase
              </h2>
              <p className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                See SurveyCraft in Action
              </p>
              <p className="mt-4 text-base text-slate-600">
                Experience prompt-driven survey creation with Google Gemini and interact with the live survey
                widget in real-time.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2">
            {/* Left: AI Generator Mockup with Clickable Prompt Chips */}
            <ScrollReveal delay={0.1}>
              <AiPromptSimulator />
            </ScrollReveal>

            {/* Right: Live Interactive Multi-Step Survey Simulator */}
            <ScrollReveal delay={0.2}>
              <InteractiveSurveyDemo />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 4. Core Capabilities (Reveals One by One on Scroll) */}
      <section id="features" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="mb-3 text-xs font-bold tracking-widest text-teal-600 uppercase">
                Platform Features
              </h2>
              <p className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Everything Needed for Modern Feedback
              </p>
              <p className="mt-4 text-base text-slate-600">
                Engineered for maximum developer experience, instant serverless execution, and privacy-first
                data storage.
              </p>
            </div>
          </ScrollReveal>

          {/* Grid with staggered entry: each card displays one by one */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <ScrollReveal key={idx} delay={idx * 0.1}>
                  <div className="group flex h-full flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-7 shadow-xs transition-all hover:-translate-y-1.5 hover:shadow-lg">
                    <div>
                      <div className="mb-5 flex items-center justify-between">
                        <div className="flex size-11 items-center justify-center rounded-xl bg-slate-100 text-slate-800 transition-colors group-hover:bg-slate-900 group-hover:text-white">
                          <Icon className="size-5" />
                        </div>
                        <span
                          className={`rounded-md border px-2.5 py-1 text-[11px] font-semibold ${feature.color}`}>
                          {feature.tag}
                        </span>
                      </div>

                      <h3 className="mb-2 text-lg font-bold text-slate-900 transition-colors group-hover:text-teal-700">
                        {feature.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-slate-600">{feature.description}</p>
                    </div>

                    <div className="mt-4 flex items-center border-t border-slate-100 pt-4 text-xs font-semibold text-slate-400 transition-colors group-hover:text-teal-600">
                      <span>Explore feature</span>
                      <ChevronRight className="ml-1 size-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Interactive Omnichannel Distribution Tabs */}
      <section id="distribution" className="border-y border-slate-200/80 bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-14 max-w-3xl text-center">
              <h2 className="mb-3 text-xs font-bold tracking-widest text-teal-600 uppercase">
                Distribution Channels
              </h2>
              <p className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Deliver Surveys Wherever Your Users Are
              </p>
              <p className="mt-4 text-base text-slate-600">
                Switch tabs below to see code snippets and integration details for each channel:
              </p>
            </div>
          </ScrollReveal>

          {/* Interactive Channel Tabs */}
          <ScrollReveal delay={0.1}>
            <ChannelTabsDemo workspaceHref={workspaceHref} />
          </ScrollReveal>
        </div>
      </section>

      {/* 6. Architecture & Monorepo Engineering (Displays One by One) */}
      <section id="tech-stack" className="bg-slate-900 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="mb-3 text-xs font-bold tracking-widest text-teal-400 uppercase">
                Engineering Architecture
              </h2>
              <p className="text-3xl font-bold tracking-tight sm:text-4xl">Clean Monorepo & Zero Bloat</p>
              <p className="mt-4 text-sm text-slate-400 sm:text-base">
                Decoupled from complex external dependencies to deliver a lightweight, high-performance
                platform on Windows and modern cloud infrastructure.
              </p>
            </div>
          </ScrollReveal>

          {/* Tech stack items staggered on scroll */}
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-4">
            {techStack.map((tech, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.08}>
                <div className="cursor-default rounded-xl border border-slate-800 bg-slate-800/60 p-5 text-center transition-all hover:-translate-y-1 hover:border-teal-400/50">
                  <span className="mb-2 block text-2xl">{tech.icon}</span>
                  <p className="mb-1 text-base font-bold text-white">{tech.name}</p>
                  <p className="text-xs text-slate-400">{tech.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Interactive FAQ Section (Accordion) */}
      <section id="faq" className="border-b border-slate-200/80 bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <h2 className="mb-3 text-xs font-bold tracking-widest text-teal-600 uppercase">
                Frequently Asked Questions
              </h2>
              <p className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Common Technical Inquiries
              </p>
              <p className="mt-4 text-base text-slate-600">
                Click any question below to see detailed architectural answers:
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <FaqAccordion />
          </ScrollReveal>
        </div>
      </section>

      {/* 8. Bottom Call to Action */}
      <section className="bg-gradient-to-b from-white to-slate-100 py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Ready to Build Better Feedback Journeys?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">
              Launch SurveyCraft now to create your first AI-powered survey or explore existing workspace
              analytics.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href={workspaceHref}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-8 py-4 text-base font-semibold text-white shadow-md transition-all hover:scale-105 hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 focus-visible:outline-hidden active:scale-95">
                <span>{isAuthenticated ? "Open Workspace" : "Go to app"}</span>
                <ArrowRight className="size-5" />
              </Link>

              {!isAuthenticated ? (
                <Link
                  href="/auth/login"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-8 py-4 text-base font-semibold text-slate-700 shadow-xs transition hover:scale-105 hover:bg-slate-50">
                  <span>Sign In with Credentials</span>
                </Link>
              ) : null}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 9. Footer */}
      <footer className="border-t border-slate-200 bg-white py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 text-xs text-slate-500 sm:flex-row sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Logo className="h-6 w-auto" />
            <span>© 2026 SurveyCraft · Designed by Jiten Koundinye.</span>
          </div>

          <div className="flex items-center gap-6 font-medium text-slate-600">
            <a href="#features" className="transition-colors hover:text-slate-900">
              Features
            </a>
            <a href="#ai-builder" className="transition-colors hover:text-slate-900">
              AI Builder
            </a>
            <a href="#demo" className="transition-colors hover:text-slate-900">
              Simulator
            </a>
            <a href="#distribution" className="transition-colors hover:text-slate-900">
              Channels
            </a>
            <a href="#faq" className="transition-colors hover:text-slate-900">
              FAQ
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
