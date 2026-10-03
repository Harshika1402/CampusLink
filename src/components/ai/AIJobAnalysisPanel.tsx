"use client";

import React, { useState } from "react";
import { Sparkles, CheckCircle, Brain, BookOpen, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AIJobSummary } from "@/types";
import { cn } from "@/lib/utils";

interface AIJobAnalysisPanelProps {
  jobDescription: string;
  initialSummary?: AIJobSummary | null;
  className?: string;
  onAnalysisComplete?: (summary: AIJobSummary) => void;
}

export function AIJobAnalysisPanel({
  jobDescription,
  initialSummary,
  className,
  onAnalysisComplete,
}: AIJobAnalysisPanelProps) {
  const [summary, setSummary] = useState<AIJobSummary | null>(initialSummary || null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!jobDescription || jobDescription.trim().length < 20) {
      setError("Please provide a more detailed Job Description to generate AI analysis.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/ai/summarize-jd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription }),
      });

      if (!res.ok) throw new Error("Failed to process JD with AI engine");

      const data = await res.json();
      if (data.summary) {
        setSummary(data.summary);
        if (onAnalysisComplete) onAnalysisComplete(data.summary);
      }
    } catch (err) {
      console.error(err);
      setError("Could not complete AI analysis. Showing default structured profile.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "bg-white border border-stone-border rounded-[8px] overflow-hidden shadow-2xs",
        className
      )}
    >
      {/* Institutional AI Header Bar */}
      <div className="px-5 py-3.5 bg-ivory-light border-b border-stone-border flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-[4px] bg-deep-forest text-warm-ivory flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-semibold text-primary-ink uppercase tracking-wider font-sans">
                Job Description Intelligence Panel
              </h4>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 bg-stone-light text-muted-sage rounded-xs border border-stone-border">
                AI-Assisted
              </span>
            </div>
            <p className="text-[11px] text-muted-sage">
              Structural extraction, competency mapping & student preparation directives
            </p>
          </div>
        </div>

        <Button
          variant={summary ? "outline" : "primary"}
          size="sm"
          onClick={handleAnalyze}
          isLoading={isLoading}
          icon={summary ? <RefreshCw className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
        >
          {summary ? "Re-Analyze JD" : "Summarize with AI"}
        </Button>
      </div>

      {error && (
        <div className="p-3 mx-4 mt-4 bg-error-subtle border border-error-border text-brand-error text-xs rounded-[4px] flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Panel Content */}
      <div className="p-5">
        {!summary && !isLoading && (
          <div className="py-8 text-center border border-dashed border-stone-border rounded-[6px] bg-stone-light/20">
            <Brain className="w-8 h-8 text-muted-sage/60 mx-auto mb-2" />
            <p className="text-xs font-medium text-primary-ink">
              Ready to parse and extract structured requirements
            </p>
            <p className="text-[11px] text-muted-sage max-w-md mx-auto mt-0.5">
              Click &quot;Summarize with AI&quot; to automatically extract key skills, round blueprints, eligibility thresholds, and technical prep points.
            </p>
          </div>
        )}

        {isLoading && (
          <div className="py-12 flex flex-col items-center justify-center space-y-3">
            <div className="w-8 h-8 border-2 border-deep-forest border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-muted-sage font-medium">
              Gemini AI is parsing technical competencies and interview syllabus...
            </p>
          </div>
        )}

        {summary && !isLoading && (
          <div className="space-y-6">
            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-ivory-light/60 border border-stone-border rounded-[6px]">
                <div className="text-[10px] uppercase font-semibold text-muted-sage">Target Role</div>
                <div className="text-xs font-semibold text-primary-ink mt-0.5 truncate">{summary.role}</div>
              </div>
              <div className="p-3 bg-ivory-light/60 border border-stone-border rounded-[6px]">
                <div className="text-[10px] uppercase font-semibold text-muted-sage">Work Location</div>
                <div className="text-xs font-semibold text-primary-ink mt-0.5 truncate">{summary.location}</div>
              </div>
              <div className="p-3 bg-ivory-light/60 border border-stone-border rounded-[6px]">
                <div className="text-[10px] uppercase font-semibold text-muted-sage">Package Indication</div>
                <div className="text-xs font-semibold text-deep-forest mt-0.5 truncate">{summary.salary}</div>
              </div>
              <div className="p-3 bg-ivory-light/60 border border-stone-border rounded-[6px]">
                <div className="text-[10px] uppercase font-semibold text-muted-sage">Eligibility Window</div>
                <div className="text-xs font-semibold text-primary-ink mt-0.5 truncate">{summary.experienceRequirements}</div>
              </div>
            </div>

            {/* Core Responsibilities */}
            <div>
              <h5 className="text-xs font-semibold uppercase tracking-wider text-muted-sage mb-2">
                Core Engineering Responsibilities
              </h5>
              <ul className="space-y-1.5 text-xs text-ink-muted">
                {summary.responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-deep-forest mt-1.5 shrink-0" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills Grids */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Required Skills */}
              <div className="p-3.5 bg-forest-subtle/40 border border-forest-border/60 rounded-[6px]">
                <h5 className="text-xs font-semibold text-deep-forest uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-deep-forest" /> Required Technical Skills
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {summary.requiredSkills.map((sk, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-white border border-forest-border text-deep-forest rounded-[4px] text-[11px] font-medium"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Preferred Skills */}
              <div className="p-3.5 bg-stone-light/50 border border-stone-border rounded-[6px]">
                <h5 className="text-xs font-semibold text-muted-sage uppercase tracking-wider mb-2">
                  Preferred / Good-to-Have Competencies
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {summary.preferredSkills.map((sk, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-white border border-stone-border text-ink-muted rounded-[4px] text-[11px]"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Skills You Should Prepare (Dedicated Section) */}
            <div className="p-4 bg-brass-subtle/80 border border-antique-brass/40 rounded-[6px]">
              <h5 className="text-xs font-semibold text-antique-brass uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-antique-brass" /> Skills You Should Prepare (Student Directives)
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                {summary.skillsToPrepare.map((item, i) => (
                  <div key={i} className="text-xs text-primary-ink flex items-start gap-2 bg-white/70 p-2 rounded-[4px] border border-antique-brass/20">
                    <span className="font-semibold text-antique-brass text-[11px] mt-0.5">#{i + 1}</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Requirements & Selection Process */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="text-xs font-semibold uppercase tracking-wider text-muted-sage mb-2">
                  Key Non-Negotiables
                </h5>
                <ul className="space-y-1 text-xs text-ink-muted">
                  {summary.keyRequirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-brand-error font-bold">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="text-xs font-semibold uppercase tracking-wider text-muted-sage mb-2">
                  Extracted Selection Rounds
                </h5>
                <ol className="space-y-1 text-xs text-ink-muted list-decimal list-inside">
                  {summary.selectionProcess.map((step, i) => (
                    <li key={i} className="leading-snug">
                      <span className="font-medium text-primary-ink">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
