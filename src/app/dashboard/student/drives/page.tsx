"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Briefcase,
  MapPin,
  Calendar,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  FileCheck2,
} from "lucide-react";
import { usePlacementStore } from "@/lib/store";
import { evaluateStudentEligibility } from "@/lib/eligibility-engine";
import { PlacementDrive, EligibilityCheckResult } from "@/types";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { EligibilityBadge } from "@/components/eligibility/EligibilityBadge";
import { EligibilityBreakdownModal } from "@/components/eligibility/EligibilityBreakdownModal";
import { AIJobAnalysisPanel } from "@/components/ai/AIJobAnalysisPanel";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";
import { formatDate } from "@/lib/utils";

export default function StudentDrivesPage() {
  const { currentStudent, drives, applications, applyToDrive } = usePlacementStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [eligibilityFilter, setEligibilityFilter] = useState<"all" | "eligible" | "ineligible">("all");
  const [tierFilter, setTierFilter] = useState<string>("all");
  const [selectedDrive, setSelectedDrive] = useState<PlacementDrive | null>(null);
  const [activeDriveTab, setActiveDriveTab] = useState<"overview" | "eligibility" | "ai" | "rounds">("overview");
  const [isBreakdownModalOpen, setIsBreakdownModalOpen] = useState(false);
  const [applicationFeedback, setApplicationFeedback] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  // Evaluate eligibility for all drives
  const driveEvaluations = useMemo(() => {
    const map = new Map<string, EligibilityCheckResult>();
    drives.forEach((d) => {
      map.set(d.id, evaluateStudentEligibility(currentStudent, d));
    });
    return map;
  }, [drives, currentStudent]);

  // Filtered drives
  const filteredDrives = useMemo(() => {
    return drives.filter((drive) => {
      // Search
      const searchMatch =
        drive.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        drive.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        drive.jobLocation.toLowerCase().includes(searchTerm.toLowerCase());

      if (!searchMatch) return false;

      // Tier
      if (tierFilter !== "all" && drive.companyTier !== tierFilter) return false;

      // Eligibility
      const evalRes = driveEvaluations.get(drive.id);
      if (eligibilityFilter === "eligible" && !evalRes?.isEligible) return false;
      if (eligibilityFilter === "ineligible" && evalRes?.isEligible) return false;

      return true;
    });
  }, [drives, searchTerm, tierFilter, eligibilityFilter, driveEvaluations]);

  const handleApply = (driveId: string) => {
    const res = applyToDrive(driveId);
    setApplicationFeedback(res);
  };

  const selectedDriveEval = selectedDrive ? driveEvaluations.get(selectedDrive.id) : null;
  const isSelectedDriveApplied = selectedDrive
    ? applications.some((a) => a.driveId === selectedDrive.id)
    : false;

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-primary-ink font-sans">
            Campus Placement Drives
          </h1>
          <p className="text-xs text-muted-sage mt-0.5">
            Institutional recruitment schedule for academic batch {currentStudent.graduationYear}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-sage">
            Showing <strong className="text-primary-ink">{filteredDrives.length}</strong> of{" "}
            {drives.length} drives
          </span>
        </div>
      </div>

      {/* Filter and Search Strip */}
      <div className="bg-white border border-stone-border rounded-[8px] p-4 shadow-2xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {/* Search */}
          <div className="sm:col-span-2 relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-sage" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search company, job role, or location..."
              className="w-full pl-8.5 pr-3 py-1.5 text-xs bg-stone-light/30 border border-stone-border rounded-[5px] focus:outline-hidden focus:border-deep-forest text-primary-ink placeholder:text-muted-sage"
            />
          </div>

          {/* Eligibility Filter */}
          <div>
            <select
              value={eligibilityFilter}
              onChange={(e) => setEligibilityFilter(e.target.value as any)}
              className="w-full px-3 py-1.5 text-xs bg-stone-light/30 border border-stone-border rounded-[5px] focus:outline-hidden focus:border-deep-forest text-primary-ink"
            >
              <option value="all">All Drives (Eligibility Filter: Off)</option>
              <option value="eligible">Only My Eligible Drives</option>
              <option value="ineligible">Only Ineligible Drives</option>
            </select>
          </div>

          {/* Tier Filter */}
          <div>
            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-stone-light/30 border border-stone-border rounded-[5px] focus:outline-hidden focus:border-deep-forest text-primary-ink"
            >
              <option value="all">All Company Tiers</option>
              <option value="Tier 1 (Dream)">Tier 1 (Dream)</option>
              <option value="Tier 2 (Super Dream)">Tier 2 (Super Dream)</option>
              <option value="Tier 3 (Core/Mass)">Tier 3 (Core/Mass)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Drives Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDrives.map((drive) => {
          const evalResult = driveEvaluations.get(drive.id);
          const hasApplied = applications.some((a) => a.driveId === drive.id);

          return (
            <div
              key={drive.id}
              className="bg-white border border-stone-border rounded-[8px] p-5 flex flex-col justify-between hover:border-muted-sage/80 transition-all shadow-2xs"
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <div className="w-10 h-10 rounded-[4px] bg-stone-light border border-stone-border flex items-center justify-center font-bold text-xs text-deep-forest shrink-0">
                      {drive.companyLogo || drive.companyName.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-primary-ink font-sans line-clamp-1">
                        {drive.companyName}
                      </h3>
                      <span className="text-[10px] uppercase font-semibold text-muted-sage">
                        {drive.companyTier}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-bold text-deep-forest font-sans">
                      ₹{drive.ctcLpa} LPA
                    </div>
                    <span className="text-[10px] text-muted-sage block">
                      {drive.employmentType}
                    </span>
                  </div>
                </div>

                {/* Job Title & Location */}
                <div className="mt-3">
                  <h4 className="text-xs font-semibold text-primary-ink line-clamp-1">
                    {drive.jobTitle}
                  </h4>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-muted-sage">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-deep-forest/70" /> {drive.jobLocation}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-deep-forest/70" /> {formatDate(drive.driveDate)}
                    </span>
                  </div>
                </div>

                {/* Eligibility Check Strip */}
                {evalResult && (
                  <div className="mt-3.5 pt-3 border-t border-stone-border/60">
                    <div className="flex items-center justify-between">
                      <EligibilityBadge
                        isEligible={evalResult.isEligible}
                        score={evalResult.score}
                        size="sm"
                        onClick={() => {
                          setSelectedDrive(drive);
                          setIsBreakdownModalOpen(true);
                        }}
                      />
                      <button
                        onClick={() => {
                          setSelectedDrive(drive);
                          setIsBreakdownModalOpen(true);
                        }}
                        className="text-[11px] text-muted-sage hover:text-primary-ink underline cursor-pointer"
                      >
                        Checklist Details
                      </button>
                    </div>

                    <div className="mt-2 text-[10px] text-ink-muted">
                      Min CGPA: <strong>{drive.minCgpa}</strong> • Max Backlogs: <strong>{drive.maxBacklogs}</strong>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button Strip */}
              <div className="mt-4 pt-3 border-t border-stone-border/70 flex items-center justify-between gap-2">
                <button
                  onClick={() => {
                    setSelectedDrive(drive);
                    setActiveDriveTab("overview");
                  }}
                  className="text-xs font-semibold text-deep-forest hover:underline inline-flex items-center gap-0.5 cursor-pointer"
                >
                  View Details <ChevronRight className="w-3 h-3" />
                </button>

                {hasApplied ? (
                  <span className="px-3 py-1 text-xs font-semibold rounded-[4px] bg-forest-subtle text-deep-forest border border-forest-border flex items-center gap-1">
                    <FileCheck2 className="w-3 h-3" /> Applied
                  </span>
                ) : (
                  <Button
                    variant={evalResult?.isEligible ? "primary" : "secondary"}
                    size="sm"
                    onClick={() => {
                      setSelectedDrive(drive);
                      setActiveDriveTab("overview");
                    }}
                  >
                    {evalResult?.isEligible ? "Apply Now" : "Review Terms"}
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredDrives.length === 0 && (
        <div className="p-12 text-center bg-white border border-stone-border rounded-[8px]">
          <Briefcase className="w-8 h-8 text-muted-sage mx-auto mb-2" />
          <h3 className="text-sm font-semibold text-primary-ink">No placement drives found</h3>
          <p className="text-xs text-muted-sage mt-1">
            Try resetting your search or adjusting the eligibility filter.
          </p>
        </div>
      )}

      {/* Comprehensive Drive Details Modal with AI Panel & Eligibility Tab */}
      {selectedDrive && (
        <Modal
          isOpen={Boolean(selectedDrive)}
          onClose={() => {
            setSelectedDrive(null);
            setApplicationFeedback(null);
          }}
          title={selectedDrive.companyName}
          subtitle={`${selectedDrive.jobTitle} • ₹${selectedDrive.ctcLpa} LPA • Drive Date: ${formatDate(selectedDrive.driveDate)}`}
          maxWidth="3xl"
        >
          <div className="space-y-5">
            {/* Tabs */}
            <Tabs
              activeTab={activeDriveTab}
              onChange={(tab) => setActiveDriveTab(tab as any)}
              tabs={[
                { id: "overview", label: "Job Description" },
                { id: "eligibility", label: "Eligibility Checklist" },
                { id: "ai", label: "AI Analysis & Prep" },
                { id: "rounds", label: "Selection Rounds" },
              ]}
            />

            {/* TAB 1: OVERVIEW */}
            {activeDriveTab === "overview" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 bg-ivory-light border border-stone-border rounded-[6px] text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-muted-sage block">Package</span>
                    <strong className="text-deep-forest text-sm font-sans">₹{selectedDrive.ctcLpa} LPA</strong>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-muted-sage block">Job Location</span>
                    <strong className="text-primary-ink">{selectedDrive.jobLocation}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-muted-sage block">Employment Type</span>
                    <strong className="text-primary-ink">{selectedDrive.employmentType}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-muted-sage block">Deadline</span>
                    <strong className="text-brand-error">{formatDate(selectedDrive.applicationDeadline)}</strong>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-sage mb-2">
                    Official Job Description
                  </h4>
                  <div className="text-xs leading-relaxed text-ink-muted bg-stone-light/20 p-4 border border-stone-border/80 rounded-[6px] whitespace-pre-line max-h-60 overflow-y-auto">
                    {selectedDrive.jobDescription}
                  </div>
                </div>

                {/* Quick Eligibility Notice */}
                {selectedDriveEval && (
                  <div className="p-3 bg-stone-light/40 border border-stone-border rounded-[6px] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <EligibilityBadge
                        isEligible={selectedDriveEval.isEligible}
                        score={selectedDriveEval.score}
                        size="sm"
                      />
                      <span className="text-xs text-ink-muted">
                        {selectedDriveEval.isEligible
                          ? "Your profile meets all minimum university requirements."
                          : selectedDriveEval.explanation}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: ELIGIBILITY CHECKLIST */}
            {activeDriveTab === "eligibility" && selectedDriveEval && (
              <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-sage">
                  Criteria Evaluation vs. Your Academic Records ({currentStudent.fullName} • {currentStudent.universityId})
                </h4>

                <div className="divide-y divide-stone-border border border-stone-border rounded-[6px] overflow-hidden bg-white">
                  {selectedDriveEval.checks.map((chk, i) => (
                    <div key={i} className="p-3 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-medium text-primary-ink flex items-center gap-2">
                          <span
                            className={chk.passed ? "text-brand-success font-bold" : "text-brand-error font-bold"}
                          >
                            {chk.passed ? "✓" : "✕"}
                          </span>
                          <span>{chk.label}</span>
                        </div>
                        <div className="text-[11px] text-muted-sage ml-4 mt-0.5">
                          Threshold: {chk.requirement}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={chk.passed ? "font-semibold text-brand-success" : "font-semibold text-brand-error"}>
                          {chk.actual}
                        </span>
                        <div className="text-[10px] text-muted-sage">Your Record</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: AI ANALYSIS */}
            {activeDriveTab === "ai" && (
              <AIJobAnalysisPanel jobDescription={selectedDrive.jobDescription} />
            )}

            {/* TAB 4: SELECTION ROUNDS */}
            {activeDriveTab === "rounds" && (
              <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-sage">
                  Hiring Round Blueprint
                </h4>
                <div className="space-y-2">
                  {selectedDrive.selectionRounds.map((rnd, i) => (
                    <div
                      key={i}
                      className="p-3 bg-stone-light/30 border border-stone-border rounded-[6px] flex items-center gap-3 text-xs"
                    >
                      <span className="w-6 h-6 rounded-full bg-deep-forest text-warm-ivory text-xs font-semibold flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <div>
                        <div className="font-semibold text-primary-ink">{rnd}</div>
                        <div className="text-[11px] text-muted-sage">Standard Corporate Evaluation Stage</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Application Feedback message */}
            {applicationFeedback && (
              <div
                className={`p-3 text-xs rounded-[6px] border flex items-center gap-2 ${
                  applicationFeedback.success
                    ? "bg-success-subtle text-brand-success border-success-border"
                    : "bg-error-subtle text-brand-error border-error-border"
                }`}
              >
                {applicationFeedback.success ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0" />
                )}
                <span>{applicationFeedback.message}</span>
              </div>
            )}

            {/* Footer Application Bar */}
            <div className="pt-4 border-t border-stone-border flex items-center justify-between">
              <span className="text-xs text-muted-sage">
                Resume on file: <strong className="text-primary-ink">{currentStudent.fullName}_Resume.pdf</strong>
              </span>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedDrive(null);
                    setApplicationFeedback(null);
                  }}
                >
                  Close
                </Button>

                {isSelectedDriveApplied ? (
                  <Button variant="secondary" size="sm" disabled>
                    Already Applied
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    disabled={!selectedDriveEval?.isEligible}
                    onClick={() => handleApply(selectedDrive.id)}
                  >
                    {selectedDriveEval?.isEligible ? "Confirm & Submit Application" : "Ineligible for this Drive"}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Standalone Breakdown Modal */}
      {selectedDrive && isBreakdownModalOpen && selectedDriveEval && (
        <EligibilityBreakdownModal
          isOpen={isBreakdownModalOpen}
          onClose={() => setIsBreakdownModalOpen(false)}
          result={selectedDriveEval}
          drive={selectedDrive}
          student={currentStudent}
        />
      )}
    </div>
  );
}
