import { ArrowLeft, Lock, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import React from "react";
import { AuthShowcaseTabs } from "@/modules/auth/components/auth-showcase-tabs";
import { Logo } from "@/modules/ui/components/logo";

interface AuthLayoutShellProps {
  children: React.ReactNode;
  activeTab?: "login" | "signup";
}

export const AuthLayoutShell = ({ children, activeTab = "login" }: Readonly<AuthLayoutShellProps>) => {
  const isLogin = activeTab === "login";
  const isSignup = activeTab === "signup";

  return (
    <div className="relative flex min-h-dvh w-full flex-col justify-center overflow-x-hidden bg-slate-900/5 py-6 sm:py-10">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-0 left-1/4 -z-10 size-96 rounded-full bg-teal-400/15 blur-3xl" />
      <div className="pointer-events-none absolute right-1/4 bottom-0 -z-10 size-96 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="mx-auto flex w-full max-w-6xl items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="grid w-full grid-cols-1 overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-2xl lg:grid-cols-12">
          {/* Left Column: Interactive Auth Form Card */}
          <div className="flex flex-col justify-between p-6 sm:p-10 lg:col-span-7 lg:p-12">
            <div>
              {/* Top Navigation Row: Back button + Brand Logo */}
              <div className="mb-8 flex items-center justify-between">
                <Link
                  href="/"
                  className="group inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition-colors hover:text-slate-900">
                  <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
                  <span>Back to Home</span>
                </Link>

                <Link href="/" className="inline-block">
                  <Logo className="h-7 w-auto" />
                </Link>
              </div>

              {/* Interactive Auth Tab Switcher */}
              <div className="mb-8 flex items-center justify-center">
                <div className="inline-flex rounded-xl border border-slate-200/60 bg-slate-100 p-1 text-xs font-semibold">
                  <Link
                    href="/auth/login"
                    className={`rounded-lg px-6 py-2 transition-all ${
                      isLogin
                        ? "bg-white font-bold text-slate-900 shadow-xs"
                        : "text-slate-500 hover:text-slate-800"
                    }`}>
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signup"
                    className={`rounded-lg px-6 py-2 transition-all ${
                      isSignup
                        ? "bg-white font-bold text-slate-900 shadow-xs"
                        : "text-slate-500 hover:text-slate-800"
                    }`}>
                    Create Account
                  </Link>
                </div>
              </div>

              {/* Form Content */}
              <div className="mx-auto w-full max-w-md">{children}</div>
            </div>

            {/* Bottom Security / Trust Footer */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-6 text-[11px] font-medium text-slate-400">
              <span className="flex items-center gap-1">
                <Lock className="size-3 text-emerald-600" />
                <span>256-bit SSL Encrypted</span>
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="size-3 text-teal-600" />
                <span>Privacy-First Architecture</span>
              </span>
              <span>© 2026 SurveyCraft</span>
            </div>
          </div>

          {/* Right Column: Interactive Tech & Capability Showcase (Desktop) */}
          <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 p-10 text-white lg:col-span-5 lg:flex">
            {/* Subtle floating background orb */}
            <div className="pointer-events-none absolute -top-12 -right-12 size-56 rounded-full bg-teal-500/20 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-12 -left-12 size-56 rounded-full bg-indigo-500/20 blur-2xl" />

            {/* Top Showcase Headline */}
            <div>
              <div className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-teal-500/30 bg-teal-500/20 px-3 py-1 text-xs font-semibold text-teal-300">
                <Zap className="size-3.5 text-teal-400" />
                <span>SurveyCraft Platform 6.0</span>
              </div>

              <h2 className="text-2xl leading-snug font-extrabold tracking-tight text-white">
                Intelligent Surveys. Built for Modern Teams.
              </h2>
              <p className="mt-2 mb-6 text-xs leading-relaxed text-slate-400">
                Connect directly to your feedback loop with Google Gemini AI question structuring and
                serverless PostgreSQL.
              </p>

              {/* Interactive Showcase Tabs Component */}
              <AuthShowcaseTabs />

              {/* Quick Platform Metrics */}
              <div className="mt-6 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-2.5">
                  <p className="text-base font-bold text-teal-400">&lt; 1.2s</p>
                  <p className="text-[10px] text-slate-400">AI Latency</p>
                </div>
                <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-2.5">
                  <p className="text-base font-bold text-cyan-400">30s</p>
                  <p className="text-[10px] text-slate-400">Pool Timeout</p>
                </div>
                <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-2.5">
                  <p className="text-base font-bold text-emerald-400">100%</p>
                  <p className="text-[10px] text-slate-400">Decoupled</p>
                </div>
              </div>
            </div>

            {/* Bottom Testimonial / Attribution */}
            <div className="mt-8 border-t border-slate-800/80 pt-6">
              <p className="text-xs leading-relaxed text-slate-300 italic">
                &quot;Craftsman-style survey platform engineered for ultra-fast local development and scalable
                cloud persistence.&quot;
              </p>
              <div className="mt-3 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-white">Jiten Koundinye</p>
                  <p className="text-[11px] text-slate-400">Creator & Lead Engineer</p>
                </div>
                <span className="font-mono text-[11px] text-teal-400">SurveyCraft</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
