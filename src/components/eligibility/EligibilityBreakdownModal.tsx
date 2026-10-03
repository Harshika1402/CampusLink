import React from "react";
import { Check, X, ShieldAlert, Award } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { EligibilityCheckResult, PlacementDrive, StudentProfile } from "@/types";
import { cn } from "@/lib/utils";

interface EligibilityBreakdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: EligibilityCheckResult;
  drive: PlacementDrive;
  student: StudentProfile;
}

export function EligibilityBreakdownModal({
  isOpen,
  onClose,
  result,
  drive,
  student,
}: EligibilityBreakdownModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Automated Eligibility Evaluation"
      subtitle={`${drive.companyName} • ${drive.jobTitle}`}
      maxWidth="lg"
    >
      <div className="space-y-6">
        {/* Top Summary Banner */}
        <div
          className={cn(
            "p-4 rounded-[6px] border flex items-start gap-3.5",
            result.isEligible
              ? "bg-success-subtle/80 border-success-border text-brand-success"
              : "bg-error-subtle/80 border-error-border text-brand-error"
          )}
        >
          {result.isEligible ? (
            <div className="w-8 h-8 rounded-full bg-brand-success/15 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-brand-success" />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-brand-error/15 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-5 h-5 text-brand-error" />
            </div>
          )}

          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-sm tracking-tight font-sans">
                {result.isEligible
                  ? "Profile Eligible for Application"
                  : "Profile Ineligible for this Drive"}
              </h4>
              <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-white/70 border border-current">
                {result.score}% Profile Fit
              </span>
            </div>
            <p className="text-xs mt-1 leading-relaxed opacity-90 text-primary-ink">
              {result.explanation}
            </p>
          </div>
        </div>

        {/* Evaluation Checklist */}
        <div>
          <h5 className="text-xs font-semibold uppercase tracking-wider text-muted-sage mb-2.5">
            Institutional Criteria Verification ({student.fullName} • {student.universityId})
          </h5>

          <div className="divide-y divide-stone-border/80 border border-stone-border rounded-[6px] bg-white overflow-hidden">
            {result.checks.map((chk, idx) => (
              <div
                key={idx}
                className={cn(
                  "p-3.5 flex items-center justify-between gap-4 transition-colors",
                  !chk.passed && "bg-error-subtle/25"
                )}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-white text-xs font-bold",
                      chk.passed ? "bg-brand-success" : "bg-brand-error"
                    )}
                  >
                    {chk.passed ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                  </div>

                  <div>
                    <div className="text-xs font-medium text-primary-ink">
                      {chk.label}
                    </div>
                    <div className="text-[11px] text-muted-sage mt-0.5">
                      Required: <span className="font-medium text-primary-ink">{chk.requirement}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div
                    className={cn(
                      "text-xs font-semibold font-sans",
                      chk.passed ? "text-brand-success" : "text-brand-error"
                    )}
                  >
                    {chk.actual}
                  </div>
                  <div className="text-[10px] text-ink-muted">Your Profile</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Alignment */}
        {drive.requiredSkills.length > 0 && (
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-muted-sage mb-2">
              Technical Skill Alignment
            </h5>
            <div className="p-3.5 bg-stone-light/40 border border-stone-border rounded-[6px] space-y-2">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-medium text-ink-muted mr-1">Matched Skills:</span>
                {result.matchedSkills.length > 0 ? (
                  result.matchedSkills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-[4px] text-[11px] font-medium bg-success-subtle text-brand-success border border-success-border flex items-center gap-1"
                    >
                      <Check className="w-3 h-3" /> {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-muted-sage italic">No exact skill matches</span>
                )}
              </div>

              {result.missingSkills.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-stone-border/50">
                  <span className="text-xs font-medium text-ink-muted mr-1">Recommended to Brush Up:</span>
                  {result.missingSkills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-[4px] text-[11px] font-medium bg-brass-subtle text-antique-brass border border-brass-border"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer info note */}
        <div className="text-[11px] text-muted-sage bg-ivory-light p-3 rounded-[6px] border border-stone-border/60">
          <strong>Institutional Policy Note:</strong> Eligibility status is automatically evaluated
          using official university academic records. If you believe your backlogs or CGPA have recently
          been updated after re-evaluation, please contact the Placement Officer.
        </div>
      </div>
    </Modal>
  );
}
