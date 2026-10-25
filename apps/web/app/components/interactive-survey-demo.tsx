"use client";

import { ArrowLeft, ArrowRight, Check, CheckCircle2, RefreshCw, Send, Sparkles, Star } from "lucide-react";
import React, { useState } from "react";

export const InteractiveSurveyDemo = () => {
  const [step, setStep] = useState<number>(1);
  const [rating, setRating] = useState<number | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(["Gemini AI Builder"]);
  const [feedback, setFeedback] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const toggleFeature = (feature: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]
    );
  };

  const handleRatingSelect = (score: number) => {
    setRating(score);
    // Smoothly auto-advance to step 2 after selecting rating
    setTimeout(() => {
      setStep(2);
    }, 280);
  };

  const handleFinalSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(4); // Completion step
    }, 600);
  };

  const resetSurvey = () => {
    setStep(1);
    setRating(null);
    setSelectedFeatures(["Gemini AI Builder"]);
    setFeedback("");
    setIsSubmitting(false);
  };

  const emojis = ["😡", "🙁", "😐", "😊", "🤩"];
  const labels = ["Poor", "Fair", "Good", "Great", "Loved It!"];

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xl transition-all duration-300 sm:p-8">
      {/* Header bar */}
      <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <span className="size-2.5 animate-pulse rounded-full bg-emerald-500" />
          <span className="text-xs font-bold tracking-wider text-slate-600 uppercase">
            Live Survey Simulator
          </span>
        </div>
        <div className="flex items-center gap-2">
          {step <= 3 && (
            <span className="rounded-full border border-teal-200/80 bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-700">
              Step {step} of 3
            </span>
          )}
          {step > 1 && (
            <button
              type="button"
              onClick={resetSurvey}
              title="Restart Survey"
              className="rounded-md p-1 text-slate-400 transition-colors hover:text-slate-700">
              <RefreshCw className="size-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Progress Line */}
      {step <= 3 && (
        <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 transition-all duration-300 ease-out"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      )}

      {/* Step 1: Rating */}
      {step === 1 && (
        <div className="animate-fadeIn space-y-6">
          <div>
            <span className="mb-1 block text-xs font-semibold tracking-wider text-teal-600 uppercase">
              Question 1
            </span>
            <h3 className="text-lg leading-snug font-bold text-slate-900 sm:text-xl">
              How would you rate your overall experience with SurveyCraft?
            </h3>
            <p className="mt-1.5 text-xs text-slate-500">
              Select a score from 1 to 5 to auto-advance to the next question:
            </p>
          </div>

          <div className="grid grid-cols-5 gap-2 pt-2 sm:gap-3">
            {[1, 2, 3, 4, 5].map((score, idx) => (
              <button
                key={score}
                type="button"
                onClick={() => handleRatingSelect(score)}
                className={`group flex cursor-pointer flex-col items-center justify-center rounded-xl border px-1 py-3.5 transition-all duration-200 ${
                  rating === score
                    ? "scale-105 border-teal-600 bg-teal-500 text-white shadow-md"
                    : "border-slate-200/90 bg-slate-50/70 text-slate-700 hover:scale-105 hover:border-teal-400 hover:bg-white"
                }`}>
                <span className="mb-1 text-2xl transition-transform group-hover:scale-125">
                  {emojis[idx]}
                </span>
                <span className="text-sm font-bold">{score}</span>
                <span className="mt-0.5 text-[10px] font-medium opacity-75">{labels[idx]}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 pt-2 text-xs text-slate-400">
            <span>Powered by SurveyCraft Engine</span>
            <span>Single-choice rating</span>
          </div>
        </div>
      )}

      {/* Step 2: Feature Multiselect */}
      {step === 2 && (
        <div className="animate-fadeIn space-y-6">
          <div>
            <span className="mb-1 block text-xs font-semibold tracking-wider text-teal-600 uppercase">
              Question 2
            </span>
            <h3 className="text-lg leading-snug font-bold text-slate-900 sm:text-xl">
              Which features matter most for your workflow?
            </h3>
            <p className="mt-1.5 text-xs text-slate-500">
              Select all options that apply (interactive multiselect):
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {[
              { id: "Gemini AI Builder", desc: "Prompt-to-survey creation" },
              { id: "Neon Cloud Postgres", desc: "Serverless resilient DB" },
              { id: "Decoupled Architecture", desc: "No Docker or Redis bloat" },
              { id: "Real-Time Analytics", desc: "Drop-off & completion stats" },
              { id: "Omnichannel Delivery", desc: "In-app, link & email" },
              { id: "Logic Jumps", desc: "Conditional branching flows" },
            ].map((item) => {
              const isChecked = selectedFeatures.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleFeature(item.id)}
                  className={`flex cursor-pointer items-start gap-2.5 rounded-xl border p-3 text-left transition-all ${
                    isChecked
                      ? "border-teal-500 bg-teal-50/70 text-teal-900 shadow-xs"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                  }`}>
                  <div
                    className={`mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-md border transition-colors ${
                      isChecked ? "border-teal-600 bg-teal-600 text-white" : "border-slate-300 bg-white"
                    }`}>
                    {isChecked && <Check className="size-3 stroke-[3]" />}
                  </div>
                  <div>
                    <p className="text-xs leading-tight font-bold">{item.id}</p>
                    <p className="mt-0.5 text-[11px] text-slate-500">{item.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-slate-500 transition-colors hover:text-slate-800">
              <ArrowLeft className="size-3.5" />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={() => setStep(3)}
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-teal-700">
              <span>Next Step</span>
              <ArrowRight className="size-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Open Feedback */}
      {step === 3 && (
        <div className="animate-fadeIn space-y-6">
          <div>
            <span className="mb-1 block text-xs font-semibold tracking-wider text-teal-600 uppercase">
              Question 3
            </span>
            <h3 className="text-lg leading-snug font-bold text-slate-900 sm:text-xl">
              Any specific thoughts or suggestions for the author?
            </h3>
            <p className="mt-1.5 text-xs text-slate-500">
              Enter feedback below to see the instant submission preview:
            </p>
          </div>

          <div>
            <textarea
              rows={3}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="e.g., The Gemini AI integration is smooth and the UI responsiveness is outstanding!"
              className="w-full resize-none rounded-xl border border-slate-200/90 p-3 text-sm text-slate-800 placeholder-slate-400 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-hidden"
            />
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 pt-2">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-slate-500 transition-colors hover:text-slate-800">
              <ArrowLeft className="size-3.5" />
              <span>Back</span>
            </button>

            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleFinalSubmit}
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-teal-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-teal-700 disabled:opacity-50">
              {isSubmitting ? (
                <>
                  <RefreshCw className="size-3.5 animate-spin" />
                  <span>Recording Response...</span>
                </>
              ) : (
                <>
                  <Send className="size-3.5" />
                  <span>Submit Feedback</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Submission Success Card */}
      {step === 4 && (
        <div className="animate-fadeIn space-y-5 py-8 text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-teal-100 text-teal-600 shadow-xs">
            <CheckCircle2 className="size-8" />
          </div>

          <div>
            <h4 className="text-xl font-bold text-slate-900">Response Successfully Captured!</h4>
            <p className="mt-1 text-xs text-slate-500">Simulated real-time ingestion into Neon PostgreSQL.</p>
          </div>

          {/* Captured summary chip */}
          <div className="mx-auto max-w-sm space-y-1.5 rounded-xl border border-slate-200/80 bg-slate-50 p-3.5 text-left text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Rating:</span>
              <span className="font-bold text-teal-700">{rating} / 5 ⭐</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Selected Features:</span>
              <span className="font-semibold text-slate-800">{selectedFeatures.length} chosen</span>
            </div>
            {feedback ? (
              <div className="border-t border-slate-200/60 pt-1">
                <span className="mb-0.5 block text-slate-500">Note:</span>
                <span className="font-mono text-[11px] text-slate-700 italic">&quot;{feedback}&quot;</span>
              </div>
            ) : null}
          </div>

          <button
            type="button"
            onClick={resetSurvey}
            className="inline-flex cursor-pointer items-center gap-1.5 pt-2 text-xs font-semibold text-teal-600 underline hover:text-teal-700">
            <RefreshCw className="size-3.5" />
            <span>Test Again (Reset State)</span>
          </button>
        </div>
      )}
    </div>
  );
};
