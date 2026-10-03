import React from "react";
import { Check, Clock, AlertCircle, Award } from "lucide-react";
import { DriveApplication, ApplicationStatus } from "@/types";
import { formatDateTime, cn } from "@/lib/utils";

interface ApplicationTimelineProps {
  application: DriveApplication;
  className?: string;
}

const STAGES: ApplicationStatus[] = [
  "Applied",
  "Under Review",
  "Shortlisted",
  "Assessment",
  "Technical Interview",
  "HR Interview",
  "Selected",
];

export function ApplicationTimeline({ application, className }: ApplicationTimelineProps) {
  const isRejected = application.status === "Rejected";
  const currentIndex = STAGES.indexOf(application.status);

  return (
    <div className={cn("p-5 bg-white border border-stone-border rounded-[8px]", className)}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-sage">
            Application Progress Tracker
          </h4>
          <p className="text-sm font-semibold text-primary-ink font-sans mt-0.5">
            {application.drive?.companyName} • {application.drive?.jobTitle}
          </p>
        </div>

        <div className="text-right">
          <span className="text-[11px] text-muted-sage block">Current Stage</span>
          <span
            className={cn(
              "text-xs font-bold font-sans",
              isRejected ? "text-brand-error" : "text-deep-forest"
            )}
          >
            {application.currentRound}
          </span>
        </div>
      </div>

      {/* Horizontal Step Progression Indicator */}
      <div className="py-4 border-y border-stone-border/70 overflow-x-auto">
        <div className="flex items-center min-w-[620px] justify-between relative px-2">
          {STAGES.map((stage, idx) => {
            let state: "completed" | "current" | "upcoming" | "rejected" = "upcoming";

            if (isRejected) {
              if (idx <= (currentIndex === -1 ? 1 : currentIndex)) state = "completed";
              if (idx === (currentIndex === -1 ? 1 : currentIndex) + 1) state = "rejected";
            } else {
              if (idx < currentIndex) state = "completed";
              else if (idx === currentIndex) state = "current";
            }

            return (
              <div key={stage} className="flex flex-col items-center relative z-10 flex-1">
                {/* Connector line */}
                {idx !== 0 && (
                  <div
                    className={cn(
                      "absolute top-3.5 -left-1/2 w-full h-[2px] -z-10",
                      state === "completed" || state === "current"
                        ? "bg-deep-forest"
                        : "bg-stone-border"
                    )}
                  />
                )}

                {/* Node icon */}
                <div
                  className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all",
                    state === "completed" && "bg-deep-forest text-warm-ivory",
                    state === "current" &&
                      "bg-antique-brass text-white ring-4 ring-antique-brass/20",
                    state === "upcoming" && "bg-stone-light text-muted-sage border border-stone-border",
                    state === "rejected" && "bg-brand-error text-white"
                  )}
                >
                  {state === "completed" ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : state === "current" ? (
                    <Clock className="w-3.5 h-3.5 animate-pulse" />
                  ) : state === "rejected" ? (
                    <AlertCircle className="w-3.5 h-3.5" />
                  ) : (
                    <span>{idx + 1}</span>
                  )}
                </div>

                {/* Stage Label */}
                <span
                  className={cn(
                    "text-[10px] text-center mt-2 font-medium tracking-tight max-w-[80px] leading-tight",
                    state === "current"
                      ? "text-deep-forest font-bold"
                      : state === "completed"
                      ? "text-primary-ink"
                      : "text-muted-sage"
                  )}
                >
                  {stage}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Audit History Log */}
      <div className="mt-5">
        <h5 className="text-[11px] font-semibold uppercase tracking-wider text-muted-sage mb-3">
          Stage Transition History
        </h5>

        <div className="space-y-2.5 relative before:absolute before:inset-0 before:left-2 before:w-[1px] before:bg-stone-border">
          {application.history.map((hist, i) => (
            <div key={i} className="flex items-start gap-3 relative pl-6">
              <div className="w-2 h-2 rounded-full bg-deep-forest absolute left-1 top-1.5 ring-2 ring-white" />
              <div className="flex-1 bg-stone-light/30 border border-stone-border/80 rounded-[4px] p-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-primary-ink font-sans">
                    {hist.status} ({hist.roundName})
                  </span>
                  <span className="text-[10px] text-muted-sage">
                    {formatDateTime(hist.timestamp)}
                  </span>
                </div>
                {hist.remarks && (
                  <p className="text-xs text-ink-muted mt-1">{hist.remarks}</p>
                )}
                <span className="text-[10px] text-muted-sage/80 block mt-1">
                  Updated by: {hist.updatedBy}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {application.status === "Selected" && (
        <div className="mt-4 p-3 bg-success-subtle border border-success-border rounded-[6px] flex items-center gap-3">
          <Award className="w-5 h-5 text-brand-success shrink-0" />
          <div className="text-xs text-brand-success">
            <strong>Congratulations!</strong> You have received a formal offer for this role. The Placement Cell will issue your letter of intent upon verification.
          </div>
        </div>
      )}
    </div>
  );
}
