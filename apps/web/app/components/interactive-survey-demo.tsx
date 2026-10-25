"use client";

import { CheckCircle2, Send } from "lucide-react";
import React, { useState } from "react";

export const InteractiveSurveyDemo = () => {
  const [rating, setRating] = useState<number>(5);
  const [selectedFeature, setSelectedFeature] = useState<string>("Gemini AI Builder");
  const [comment, setComment] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8">
      <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <span className="size-2 animate-pulse rounded-full bg-emerald-500" />
          <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
            Live Interactive Widget
          </span>
        </div>
        <span className="text-xs font-medium text-slate-400">Step 1 of 1</span>
      </div>

      {!submitted ? (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              How would you rate your experience with SurveyCraft?
            </h3>
            <p className="mt-1 text-xs text-slate-500">Click a score below to test real-time state:</p>

            <div className="mt-4 flex max-w-sm items-center justify-between gap-2">
              {[1, 2, 3, 4, 5].map((score) => (
                <button
                  key={score}
                  type="button"
                  onClick={() => setRating(score)}
                  className={`flex flex-1 flex-col items-center justify-center rounded-lg border py-2.5 text-sm font-semibold transition-all ${
                    rating === score
                      ? "scale-105 border-teal-600 bg-teal-500 text-white shadow-sm"
                      : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                  }`}>
                  <span>{score}</span>
                  <span className="text-[10px] opacity-80">
                    {score === 1 ? "Poor" : score === 5 ? "Great" : ""}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">
              Which aspect stands out to you the most?
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                "Gemini AI Builder",
                "Neon Cloud Postgres",
                "Decoupled Architecture",
                "Real-Time Analytics",
              ].map((feature) => (
                <button
                  key={feature}
                  type="button"
                  onClick={() => setSelectedFeature(feature)}
                  className={`rounded-lg border px-3 py-2 text-left text-xs font-medium transition-all ${
                    selectedFeature === feature
                      ? "border-teal-500 bg-teal-50 font-semibold text-teal-900"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}>
                  ✓ {feature}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-900">
              Additional Suggestions (Optional)
            </label>
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="e.g., Ultra fast and clean!"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-hidden"
            />
          </div>

          <button
            type="button"
            onClick={() => setSubmitted(true)}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-teal-600 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700">
            <Send className="size-4" />
            <span>Submit Test Response</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4 py-12 text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-teal-100 text-teal-600">
            <CheckCircle2 className="size-8" />
          </div>
          <h4 className="text-xl font-bold text-slate-900">Thank you for testing!</h4>
          <p className="mx-auto max-w-sm text-sm text-slate-600">
            Your response (Rating: <strong>{rating}/5</strong>, Feature: <strong>{selectedFeature}</strong>)
            has been verified in the interactive preview.
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="cursor-pointer pt-2 text-xs font-semibold text-teal-600 underline hover:text-teal-700">
            Reset Survey Preview
          </button>
        </div>
      )}
    </div>
  );
};
