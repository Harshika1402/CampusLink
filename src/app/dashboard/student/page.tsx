"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileCheck2,
  Calendar,
  Briefcase,
  CheckCircle2,
  Compass,
  Users,
  Award,
  ArrowRight,
  Sparkles,
  AlertCircle,
  Clock,
  ExternalLink,
} from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { EligibilityBadge } from "@/components/eligibility/EligibilityBadge";
import { EligibilityBreakdownModal } from "@/components/eligibility/EligibilityBreakdownModal";
import { evaluateStudentEligibility } from "@/lib/eligibility-engine";
import { usePlacementStore } from "@/lib/store";
import { PlacementDrive, EligibilityCheckResult } from "@/types";
import { formatDate, formatCurrency } from "@/lib/utils";

export default function StudentDashboardPage() {
  const {
    currentStudent,
    drives,
    applications,
    interviews,
    internships,
    alumniReferrals,
    mockResults,
  } = usePlacementStore();

  const [selectedDriveForModal, setSelectedDriveForModal] = useState<{
    drive: PlacementDrive;
    result: EligibilityCheckResult;
  } | null>(null);

  // Statistics calculation
  const totalApplied = applications.length;
  const shortlistedCount = applications.filter((a) =>
    ["Shortlisted", "Assessment", "Technical Interview", "HR Interview", "Selected"].includes(a.status)
  ).length;
  const scheduledInterviewsCount = interviews.filter((i) => i.status === "Scheduled").length;

  const eligibleDrives = drives.filter((d) => {
    const res = evaluateStudentEligibility(currentStudent, d);
    return res.isEligible;
  });

  const latestMock = mockResults[0];

  return (
    <div className="space-y-6">
      {/* 1. Welcome Section & Placement Eligibility Alert */}
      <div className="bg-white border border-stone-border rounded-[8px] p-5 sm:p-6 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-deep-forest px-2 py-0.5 bg-forest-subtle rounded-xs border border-forest-border">
                {currentStudent.branch}
              </span>
              <span className="text-xs text-muted-sage">
                Roll No: <span className="font-semibold text-primary-ink">{currentStudent.universityId}</span>
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-primary-ink font-sans mt-1.5">
              Welcome back, {currentStudent.fullName}
            </h1>
            <p className="text-xs sm:text-sm text-ink-muted mt-1 max-w-2xl leading-relaxed">
              Academic Standing: <strong className="text-primary-ink">{currentStudent.cgpa.toFixed(2)} CGPA</strong> •{" "}
              {currentStudent.activeBacklogs === 0 ? (
                <span className="text-brand-success font-medium">Zero Active Backlogs (Clean Record)</span>
              ) : (
                <span className="text-brand-error font-medium">{currentStudent.activeBacklogs} Active Backlog(s)</span>
              )}{" "}
              • Class of {currentStudent.graduationYear}
            </p>
          </div>

          {/* Profile Completion Bar */}
          <div className="min-w-[240px] bg-stone-light/40 border border-stone-border/80 rounded-[6px] p-3">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-primary-ink">Profile Readiness</span>
              <span className="font-bold text-deep-forest">{currentStudent.profileCompletionPercentage}%</span>
            </div>
            <div className="w-full bg-stone-border h-2 rounded-full overflow-hidden">
              <div
                className="bg-deep-forest h-full transition-all duration-300"
                style={{ width: `${currentStudent.profileCompletionPercentage}%` }}
              />
            </div>
            <div className="flex items-center justify-between mt-2 text-[11px]">
              <span className="text-muted-sage">Resume & Projects Verified</span>
              <Link
                href="/dashboard/student/profile"
                className="text-deep-forest font-medium hover:underline flex items-center gap-0.5"
              >
                Update <ArrowRight className="w-2.5 h-2.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Global Placement Status Banner */}
        <div className="mt-5 pt-4 border-t border-stone-border/70 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-success" />
            <span className="font-semibold text-primary-ink">Institutional Drive Status:</span>
            <span className="text-ink-muted">
              {eligibleDrives.length} active drive{eligibleDrives.length === 1 ? "" : "s"} match your academic qualifications
            </span>
          </div>
          <Link
            href="/dashboard/student/drives"
            className="text-deep-forest font-semibold hover:underline inline-flex items-center gap-1"
          >
            Explore all placement drives →
          </Link>
        </div>
      </div>

      {/* 2. Key Restrained Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Applications"
          value={totalApplied}
          subtext="Active company submissions"
          icon={<Briefcase className="w-4 h-4" />}
        />
        <StatCard
          label="Shortlisted Drives"
          value={shortlistedCount}
          subtext="Cleared screening & assessments"
          icon={<FileCheck2 className="w-4 h-4" />}
          accent
        />
        <StatCard
          label="Interviews Scheduled"
          value={scheduledInterviewsCount}
          subtext="Rounds on active calendar"
          icon={<Calendar className="w-4 h-4" />}
        />
        <StatCard
          label="Eligible Drives"
          value={eligibleDrives.length}
          subtext="Direct auto-eligibility confirmed"
          icon={<CheckCircle2 className="w-4 h-4" />}
        />
      </div>

      {/* 3. Upcoming Placement Drives & Live Applications Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Live Placement Drives */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-primary-ink font-sans tracking-tight">
                Featured Placement Drives
              </h2>
              <p className="text-xs text-muted-sage">
                Automatically verified against your degree, CGPA, and backlog record
              </p>
            </div>
            <Link
              href="/dashboard/student/drives"
              className="text-xs font-semibold text-deep-forest hover:underline"
            >
              View All ({drives.length})
            </Link>
          </div>

          <div className="space-y-3">
            {drives.slice(0, 3).map((drive) => {
              const evalResult = evaluateStudentEligibility(currentStudent, drive);
              const hasApplied = applications.some((a) => a.driveId === drive.id);

              return (
                <div
                  key={drive.id}
                  className="bg-white border border-stone-border rounded-[8px] p-4.5 transition-all hover:border-muted-sage/80 shadow-2xs"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-[4px] bg-stone-light border border-stone-border flex items-center justify-center font-bold text-xs text-deep-forest shrink-0">
                        {drive.companyLogo || drive.companyName.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-semibold text-primary-ink font-sans">
                            {drive.companyName}
                          </h3>
                          <span className="text-[10px] font-medium text-muted-sage px-1.5 py-0.2 bg-stone-light rounded-xs border border-stone-border">
                            {drive.companyTier}
                          </span>
                        </div>
                        <p className="text-xs text-ink-muted mt-0.5">{drive.jobTitle}</p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-sm font-bold text-deep-forest font-sans">
                        ₹{drive.ctcLpa} LPA
                      </div>
                      <span className="text-[11px] text-muted-sage">{drive.employmentType}</span>
                    </div>
                  </div>

                  {/* Criteria Strip & Badges */}
                  <div className="mt-3.5 pt-3 border-t border-stone-border/60 flex flex-wrap items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2">
                      <EligibilityBadge
                        isEligible={evalResult.isEligible}
                        score={evalResult.score}
                        size="sm"
                        onClick={() =>
                          setSelectedDriveForModal({ drive, result: evalResult })
                        }
                      />
                      <span className="text-[11px] text-muted-sage">
                        Min CGPA: <strong className="text-primary-ink">{drive.minCgpa}</strong> • Max Backlogs: <strong className="text-primary-ink">{drive.maxBacklogs}</strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setSelectedDriveForModal({ drive, result: evalResult })
                        }
                        className="text-xs font-medium text-muted-sage hover:text-primary-ink underline cursor-pointer"
                      >
                        Criteria Breakdown
                      </button>
                      <Link
                        href={`/dashboard/student/drives`}
                        className="px-3 py-1 bg-deep-forest text-warm-ivory text-xs font-semibold rounded-[4px] hover:bg-forest-hover transition-colors"
                      >
                        {hasApplied ? "View Status" : "View & Apply"}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Applications Tracker & Upcoming Interviews */}
        <div className="space-y-6">
          {/* Active Application Status Tracker */}
          <div className="bg-white border border-stone-border rounded-[8px] p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-3.5">
              <h3 className="text-sm font-bold text-primary-ink font-sans tracking-tight">
                My Active Applications
              </h3>
              <Link
                href="/dashboard/student/applications"
                className="text-xs font-semibold text-deep-forest hover:underline"
              >
                Track All
              </Link>
            </div>

            {applications.length === 0 ? (
              <p className="text-xs text-muted-sage py-4 text-center">
                No active applications submitted yet.
              </p>
            ) : (
              <div className="space-y-3">
                {applications.map((app) => (
                  <div
                    key={app.id}
                    className="p-3 bg-ivory-light/50 border border-stone-border/80 rounded-[6px]"
                  >
                    <div className="flex items-start justify-between">
                      <span className="text-xs font-semibold text-primary-ink">
                        {app.drive?.companyName}
                      </span>
                      <StatusBadge status={app.status} size="sm" />
                    </div>
                    <p className="text-[11px] text-muted-sage mt-1 truncate">
                      {app.drive?.jobTitle}
                    </p>
                    <div className="mt-2 text-[10px] text-ink-muted flex items-center justify-between">
                      <span>Round: {app.currentRound}</span>
                      <span>Applied: {formatDate(app.appliedAt)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Interview Schedule Widget */}
          <div className="bg-white border border-stone-border rounded-[8px] p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-3.5">
              <h3 className="text-sm font-bold text-primary-ink font-sans tracking-tight flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-deep-forest" /> Scheduled Interviews
              </h3>
              <Link
                href="/dashboard/student/interviews"
                className="text-xs font-semibold text-deep-forest hover:underline"
              >
                Calendar
              </Link>
            </div>

            {interviews.length === 0 ? (
              <p className="text-xs text-muted-sage py-3 text-center">
                No upcoming interviews scheduled.
              </p>
            ) : (
              <div className="space-y-2.5">
                {interviews.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-forest-subtle/50 border border-forest-border/80 rounded-[6px]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-deep-forest">
                        {item.companyName}
                      </span>
                      <span className="text-[10px] font-semibold text-primary-ink px-1.5 py-0.2 bg-white rounded-xs border border-forest-border">
                        {item.mode}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-primary-ink mt-1">
                      {item.roundName}
                    </p>
                    <div className="flex items-center gap-1.5 text-[11px] text-muted-sage mt-1.5">
                      <Clock className="w-3 h-3 text-deep-forest" />
                      <span>{new Date(item.scheduledAt).toLocaleString("en-IN", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}</span>
                    </div>
                    {item.locationOrLink && (
                      <a
                        href={item.locationOrLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] text-deep-forest font-semibold mt-2 inline-flex items-center gap-1 hover:underline"
                      >
                        Join Room / Session <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Mock Drive Readiness Benchmark */}
          {latestMock && (
            <div className="bg-brass-subtle/70 border border-antique-brass/40 rounded-[8px] p-4.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-antique-brass uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-antique-brass" /> Mock Simulation Score
                </span>
                <span className="text-xs font-bold px-2 py-0.5 bg-white text-antique-brass border border-antique-brass/30 rounded-full">
                  {latestMock.percentile}th Percentile
                </span>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-primary-ink font-sans">
                  {latestMock.totalScore}
                </span>
                <span className="text-xs text-muted-sage">/ 100 Marks</span>
              </div>
              <p className="text-xs text-ink-muted mt-1 leading-snug">
                {latestMock.overallAssessment}
              </p>
              <Link
                href="/dashboard/student/mock-drives"
                className="mt-2.5 text-xs font-semibold text-antique-brass hover:underline inline-block"
              >
                View detailed feedback & weak areas →
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* 4. Bottom Grid: Internships & Alumni Referrals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* Recommended Internships */}
        <div className="bg-white border border-stone-border rounded-[8px] p-5 shadow-2xs">
          <div className="flex items-center justify-between mb-3.5">
            <div>
              <h3 className="text-sm font-bold text-primary-ink font-sans tracking-tight flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-deep-forest" /> Industry Internships
              </h3>
              <p className="text-xs text-muted-sage">
                Pre-placement 6-month & summer industry programs
              </p>
            </div>
            <Link
              href="/dashboard/student/internships"
              className="text-xs font-semibold text-deep-forest hover:underline"
            >
              Browse Cell
            </Link>
          </div>

          <div className="space-y-3">
            {internships.slice(0, 2).map((intern) => (
              <div
                key={intern.id}
                className="p-3.5 bg-stone-light/30 border border-stone-border rounded-[6px] hover:border-muted-sage transition-colors"
              >
                <div className="flex items-start justify-between">
                  <span className="text-xs font-bold text-primary-ink">
                    {intern.companyName}
                  </span>
                  <span className="text-xs font-bold text-deep-forest">
                    ₹{intern.stipendMonthly.toLocaleString("en-IN")}/mo
                  </span>
                </div>
                <div className="text-xs font-medium text-ink-muted mt-0.5">
                  {intern.roleTitle}
                </div>
                <div className="flex items-center gap-2 mt-2 text-[11px] text-muted-sage">
                  <span>{intern.duration}</span>
                  <span>•</span>
                  <span>{intern.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Corporate Alumni Referrals */}
        <div className="bg-white border border-stone-border rounded-[8px] p-5 shadow-2xs">
          <div className="flex items-center justify-between mb-3.5">
            <div>
              <h3 className="text-sm font-bold text-primary-ink font-sans tracking-tight flex items-center gap-1.5">
                <Users className="w-4 h-4 text-antique-brass" /> Alumni Referral Network
              </h3>
              <p className="text-xs text-muted-sage">
                Direct hiring manager referrals posted by university alumni
              </p>
            </div>
            <Link
              href="/dashboard/student/alumni-referrals"
              className="text-xs font-semibold text-deep-forest hover:underline"
            >
              Browse Board
            </Link>
          </div>

          <div className="space-y-3">
            {alumniReferrals.slice(0, 2).map((ref) => (
              <div
                key={ref.id}
                className="p-3.5 bg-stone-light/30 border border-stone-border rounded-[6px] hover:border-muted-sage transition-colors"
              >
                <div className="flex items-start justify-between">
                  <span className="text-xs font-bold text-primary-ink">
                    {ref.companyName}
                  </span>
                  <span className="text-[10px] font-semibold text-antique-brass px-1.5 py-0.2 bg-brass-subtle border border-brass-border rounded-xs">
                    {ref.openings} Openings
                  </span>
                </div>
                <div className="text-xs font-medium text-ink-muted mt-0.5">
                  {ref.roleTitle}
                </div>
                <p className="text-[11px] text-muted-sage mt-1">
                  Posted by <strong className="text-primary-ink">{ref.alumniName}</strong> ({ref.alumniBatch})
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Eligibility Breakdown Modal */}
      {selectedDriveForModal && (
        <EligibilityBreakdownModal
          isOpen={Boolean(selectedDriveForModal)}
          onClose={() => setSelectedDriveForModal(null)}
          result={selectedDriveForModal.result}
          drive={selectedDriveForModal.drive}
          student={currentStudent}
        />
      )}
    </div>
  );
}
