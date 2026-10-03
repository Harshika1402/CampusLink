"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  Briefcase,
  FileCheck2,
  Award,
  CheckCircle2,
  TrendingUp,
  Compass,
  FileText,
  Building2,
  Calendar,
  Layers,
  ArrowUpRight,
  Filter,
} from "lucide-react";
import { usePlacementStore } from "@/lib/store";
import { StatCard } from "@/components/ui/StatCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";

export default function AdminDashboardPage() {
  const {
    students,
    drives,
    applications,
    internships,
    alumniReferrals,
    currentUser,
  } = usePlacementStore();

  const totalStudents = students.length * 450; // Scaled for enterprise institutional context (e.g. 1,350 candidates)
  const eligibleStudents = Math.round(totalStudents * 0.88); // 88% eligibility rate
  const activeDrives = drives.filter((d) => d.status === "Applications Open").length;
  const totalApps = applications.length * 95; // 190 submissions
  const shortlistedTotal = Math.round(totalApps * 0.35);
  const selectedTotal = 62;

  // Branch statistics
  const branchData = [
    { branch: "Computer Science & Engineering", placed: 248, total: 270, pct: 91.8, avgCtc: 18.4 },
    { branch: "Information Technology", placed: 182, total: 205, pct: 88.7, avgCtc: 15.2 },
    { branch: "Electronics & Communication", placed: 165, total: 195, pct: 84.6, avgCtc: 13.8 },
    { branch: "Electrical & Electronics", placed: 98, total: 130, pct: 75.3, avgCtc: 10.5 },
    { branch: "Mechanical Engineering", placed: 85, total: 120, pct: 70.8, avgCtc: 8.9 },
  ];

  // CTC Bracket Distribution
  const ctcDistribution = [
    { tier: "Tier 1: > 20 LPA (Dream Super)", count: 85, pct: 24, color: "bg-deep-forest" },
    { tier: "Tier 2: 12 - 20 LPA (Product/FinTech)", count: 142, pct: 40, color: "bg-forest-light" },
    { tier: "Tier 3: 6 - 12 LPA (Core/Enterprise)", count: 126, pct: 36, color: "bg-muted-sage" },
  ];

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white border border-stone-border rounded-[8px] p-5 sm:p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-deep-forest px-2 py-0.5 bg-forest-subtle rounded-xs border border-forest-border">
                Placement & Training Cell
              </span>
              <span className="text-xs text-muted-sage">
                Dean / Placement Officer Console
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-primary-ink font-sans mt-1">
              Campus Placement Analytics & Executive Overview
            </h1>
            <p className="text-xs sm:text-sm text-ink-muted mt-0.5">
              Academic Year 2025–2026 • Real-time hiring funnel, drive status, and institutional compliance
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/dashboard/admin/drives">
              <Button size="sm" variant="primary" icon={<Briefcase className="w-3.5 h-3.5" />}>
                Create New Drive
              </Button>
            </Link>
            <Link href="/dashboard/admin/reports">
              <Button size="sm" variant="outline" icon={<FileText className="w-3.5 h-3.5" />}>
                Accreditation Reports
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Primary KPI Grid (8 Restrained Metric Cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          label="Total Registered Students"
          value="1,350"
          subtext="Graduating batch 2026"
          icon={<Users className="w-4 h-4" />}
        />
        <StatCard
          label="Placement Eligible"
          value="1,188"
          subtext="88.0% institutional clearance"
          icon={<CheckCircle2 className="w-4 h-4" />}
        />
        <StatCard
          label="Active Campus Drives"
          value={drives.length}
          subtext="5 currently in round pipelines"
          icon={<Briefcase className="w-4 h-4" />}
          accent
        />
        <StatCard
          label="Total Applications"
          value="1,420"
          subtext="Processed through portal"
          icon={<FileCheck2 className="w-4 h-4" />}
        />
        <StatCard
          label="Shortlisted Candidates"
          value="486"
          subtext="Cleared screening & coding"
          icon={<Layers className="w-4 h-4" />}
        />
        <StatCard
          label="Offers Released"
          value="318"
          subtext="Unique placed students: 284"
          icon={<Award className="w-4 h-4" />}
          accent
        />
        <StatCard
          label="Average CTC Benchmark"
          value="₹14.8 LPA"
          subtext="Median package: ₹12.5 LPA"
          icon={<TrendingUp className="w-4 h-4" />}
        />
        <StatCard
          label="Highest Package (Domestic)"
          value="₹54.0 LPA"
          subtext="Tier-1 Quantitative Trading"
          icon={<Award className="w-4 h-4" />}
        />
      </div>

      {/* Analytics Charts & Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Branch-Wise Placement Rate Table & Hiring Funnel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Departmental Performance Matrix */}
          <div className="bg-white border border-stone-border rounded-[8px] p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-primary-ink font-sans tracking-tight">
                  Departmental Placement Progress
                </h3>
                <p className="text-xs text-muted-sage">
                  Batch placement conversion, candidate headcounts, and average CTC
                </p>
              </div>
              <span className="text-[11px] text-muted-sage font-medium">
                Target: 95% Institutional Placement
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-stone-border text-muted-sage uppercase tracking-wider text-[10px] bg-stone-light/40">
                    <th className="py-2.5 px-3">Discipline</th>
                    <th className="py-2.5 px-3 text-center">Placed / Total</th>
                    <th className="py-2.5 px-3">Conversion Rate</th>
                    <th className="py-2.5 px-3 text-right">Avg CTC</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-border/60">
                  {branchData.map((b) => (
                    <tr key={b.branch} className="hover:bg-ivory-light/50">
                      <td className="py-3 px-3 font-semibold text-primary-ink">{b.branch}</td>
                      <td className="py-3 px-3 text-center text-ink-muted">
                        <strong className="text-primary-ink">{b.placed}</strong> / {b.total}
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-stone-border h-2 rounded-full overflow-hidden">
                            <div
                              className="bg-deep-forest h-full rounded-full"
                              style={{ width: `${b.pct}%` }}
                            />
                          </div>
                          <span className="font-semibold text-deep-forest font-sans">{b.pct}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-right font-bold text-primary-ink font-sans">
                        ₹{b.avgCtc} LPA
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Hiring Funnel Analysis */}
          <div className="bg-white border border-stone-border rounded-[8px] p-5 shadow-2xs">
            <h3 className="text-sm font-bold text-primary-ink font-sans tracking-tight mb-1">
              Recruitment Conversion Funnel (All Drives)
            </h3>
            <p className="text-xs text-muted-sage mb-4">
              Progression metrics from application submission to final offer acceptance
            </p>

            <div className="space-y-3">
              {[
                { stage: "Applications Submitted", count: 1420, pct: 100, drop: "Baseline" },
                { stage: "Shortlisted for Assessments", count: 852, pct: 60, drop: "-40% academic & skill screen" },
                { stage: "Assessment Qualified", count: 486, pct: 34, drop: "-43% coding assessment cutoff" },
                { stage: "Technical Interview Cleared", count: 372, pct: 26, drop: "-23% technical evaluation" },
                { stage: "HR / Final Selection", count: 318, pct: 22, drop: "-15% leadership round" },
              ].map((step, idx) => (
                <div key={step.stage} className="p-3 bg-ivory-light/60 border border-stone-border/80 rounded-[6px]">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold text-primary-ink">
                      {idx + 1}. {step.stage}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] text-muted-sage">{step.drop}</span>
                      <strong className="text-deep-forest font-sans text-sm">{step.count} candidates ({step.pct}%)</strong>
                    </div>
                  </div>
                  <div className="w-full bg-stone-border h-2 rounded-full overflow-hidden">
                    <div className="bg-deep-forest h-full" style={{ width: `${step.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: CTC Bracket Breakdown & Quick Admin Management Actions */}
        <div className="space-y-6">
          {/* Compensation Bracket Breakdown */}
          <div className="bg-white border border-stone-border rounded-[8px] p-5 shadow-2xs">
            <h3 className="text-sm font-bold text-primary-ink font-sans tracking-tight mb-1">
              Compensation Distribution (CTC)
            </h3>
            <p className="text-xs text-muted-sage mb-4">
              Placement categorization according to institutional tier standards
            </p>

            <div className="space-y-3.5">
              {ctcDistribution.map((item) => (
                <div key={item.tier} className="text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-primary-ink">{item.tier}</span>
                    <span className="font-bold text-deep-forest font-sans">{item.count} offers ({item.pct}%)</span>
                  </div>
                  <div className="w-full bg-stone-border h-2 rounded-full overflow-hidden">
                    <div className={`${item.color} h-full`} style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 p-3 bg-brass-subtle/80 border border-antique-brass/40 rounded-[6px] text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-antique-brass block mb-1">
                NIRF & NAAC Accreditation Note
              </span>
              <p className="text-[11px] text-ink-muted leading-relaxed">
                Median compensation is up by 16.4% YoY. Average Tier-1 placement density satisfies criteria for highest NIRF ranking bands.
              </p>
            </div>
          </div>

          {/* Quick Active Drives Pipeline */}
          <div className="bg-white border border-stone-border rounded-[8px] p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-3.5">
              <h3 className="text-sm font-bold text-primary-ink font-sans tracking-tight">
                Active Placement Drives
              </h3>
              <Link
                href="/dashboard/admin/drives"
                className="text-xs font-semibold text-deep-forest hover:underline"
              >
                Manage
              </Link>
            </div>

            <div className="space-y-3">
              {drives.map((d) => (
                <div
                  key={d.id}
                  className="p-3 bg-stone-light/20 border border-stone-border rounded-[6px] text-xs hover:border-muted-sage transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-bold text-primary-ink block">{d.companyName}</span>
                      <span className="text-[11px] text-muted-sage truncate block max-w-[180px]">
                        {d.jobTitle}
                      </span>
                    </div>
                    <StatusBadge status={d.status} size="sm" />
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-stone-border/60 flex items-center justify-between text-[11px] text-ink-muted">
                    <span>Package: ₹{d.ctcLpa} LPA</span>
                    <span>{d.totalApplicants} Applicants</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
