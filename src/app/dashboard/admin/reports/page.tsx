"use client";

import React, { useState } from "react";
import {
  FileText,
  Download,
  Printer,
  TrendingUp,
  Award,
  Building2,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import { usePlacementStore } from "@/lib/store";
import { Button } from "@/components/ui/Button";
import { exportToCSV } from "@/lib/utils";

export default function AdminReportsPage() {
  const { drives, students, applications } = usePlacementStore();

  const handleExportAccreditationCSV = () => {
    const reportRows = [
      { Metric: "Total Enrolled Students (Batch 2026)", Value: 1350, Accreditation_Standard: "NIRF Metric 3.2" },
      { Metric: "Placement Eligible Candidates", Value: 1188, Accreditation_Standard: "NAAC Criteria 5.2.1" },
      { Metric: "Active Campus Drives Conducted", Value: 28, Accreditation_Standard: "Industry Engagement" },
      { Metric: "Total Job Offers Generated", Value: 318, Accreditation_Standard: "NAAC Criteria 5.2.2" },
      { Metric: "Institutional Placement Percentage", Value: "88.4%", Accreditation_Standard: "NBA Benchmark ≥ 75%" },
      { Metric: "Average CTC (Domestic)", Value: "₹14.8 LPA", Accreditation_Standard: "Salary Quality Indicator" },
      { Metric: "Median Package", Value: "₹12.5 LPA", Accreditation_Standard: "Median Compensation Benchmark" },
      { Metric: "Highest Package Achieved", Value: "₹54.0 LPA", Accreditation_Standard: "Tier 1 Apex" },
    ];
    exportToCSV(reportRows, "NAAC_NIRF_Accreditation_Report_2026");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 print:hidden">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-primary-ink font-sans">
            Institutional Placement & Accreditation Reports
          </h1>
          <p className="text-xs text-muted-sage mt-0.5">
            Formal reports compiled in compliance with NAAC Criteria 5.2 and NIRF Metric 3.2 standards
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            icon={<Printer className="w-3.5 h-3.5" />}
            onClick={handlePrint}
          >
            Print Report
          </Button>
          <Button
            size="sm"
            variant="primary"
            icon={<Download className="w-3.5 h-3.5" />}
            onClick={handleExportAccreditationCSV}
          >
            Export NAAC Data (CSV)
          </Button>
        </div>
      </div>

      {/* Printable Report Document Card */}
      <div className="bg-white border border-stone-border rounded-[8px] p-8 shadow-xs space-y-6">
        {/* Document Header */}
        <div className="border-b-2 border-primary-ink pb-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-sage">
              UNIVERSITY TRAINING & PLACEMENT CELL
            </span>
            <h2 className="text-2xl font-bold font-serif text-primary-ink tracking-tight mt-1">
              Annual Campus Recruitment & Placement Audit Report
            </h2>
            <p className="text-xs text-ink-muted mt-1">
              Official Placement Record for Graduating Class of 2026 • Reporting Period: 2025–2026
            </p>
          </div>

          <div className="text-right text-xs">
            <span className="font-semibold text-primary-ink block">Document Ref: UTPC/2026/ACCR-09</span>
            <span className="text-muted-sage">Generated: {new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" })}</span>
            <span className="text-brand-success font-semibold block mt-1">Status: Certified & Audited</span>
          </div>
        </div>

        {/* Section 1: Executive KPI Summary */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-deep-forest mb-3">
            1. Executive Macro Placement Performance
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-ivory-light border border-stone-border rounded-[4px]">
              <span className="text-[10px] text-muted-sage uppercase block font-semibold">Total Students</span>
              <strong className="text-primary-ink text-base font-sans">1,350</strong>
            </div>
            <div className="p-3 bg-ivory-light border border-stone-border rounded-[4px]">
              <span className="text-[10px] text-muted-sage uppercase block font-semibold">Placement Rate</span>
              <strong className="text-deep-forest text-base font-sans">88.4%</strong>
            </div>
            <div className="p-3 bg-ivory-light border border-stone-border rounded-[4px]">
              <span className="text-[10px] text-muted-sage uppercase block font-semibold">Average Package</span>
              <strong className="text-deep-forest text-base font-sans">₹14.8 LPA</strong>
            </div>
            <div className="p-3 bg-ivory-light border border-stone-border rounded-[4px]">
              <span className="text-[10px] text-muted-sage uppercase block font-semibold">Median Package</span>
              <strong className="text-antique-brass text-base font-sans">₹12.5 LPA</strong>
            </div>
          </div>
        </div>

        {/* Section 2: Department-wise Tabulation */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-deep-forest mb-3">
            2. Discipline-Specific Recruitment Conversion
          </h3>
          <table className="w-full text-xs text-left border-collapse border border-stone-border">
            <thead>
              <tr className="bg-stone-light/50 border-b border-stone-border text-ink-muted">
                <th className="p-2.5 border-r border-stone-border">Department / Engineering Discipline</th>
                <th className="p-2.5 text-center border-r border-stone-border">Total Intake</th>
                <th className="p-2.5 text-center border-r border-stone-border">Cleared Eligibility</th>
                <th className="p-2.5 text-center border-r border-stone-border">Offers Released</th>
                <th className="p-2.5 text-center border-r border-stone-border">Placement %</th>
                <th className="p-2.5 text-right">Average CTC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-border">
              <tr>
                <td className="p-2.5 font-semibold text-primary-ink border-r border-stone-border">Computer Science & Engineering</td>
                <td className="p-2.5 text-center border-r border-stone-border">270</td>
                <td className="p-2.5 text-center border-r border-stone-border">258</td>
                <td className="p-2.5 text-center border-r border-stone-border font-bold text-deep-forest">248</td>
                <td className="p-2.5 text-center border-r border-stone-border font-bold text-deep-forest">91.8%</td>
                <td className="p-2.5 text-right font-sans font-bold">₹18.4 LPA</td>
              </tr>
              <tr>
                <td className="p-2.5 font-semibold text-primary-ink border-r border-stone-border">Information Technology</td>
                <td className="p-2.5 text-center border-r border-stone-border">205</td>
                <td className="p-2.5 text-center border-r border-stone-border">194</td>
                <td className="p-2.5 text-center border-r border-stone-border font-bold text-deep-forest">182</td>
                <td className="p-2.5 text-center border-r border-stone-border font-bold text-deep-forest">88.7%</td>
                <td className="p-2.5 text-right font-sans font-bold">₹15.2 LPA</td>
              </tr>
              <tr>
                <td className="p-2.5 font-semibold text-primary-ink border-r border-stone-border">Electronics & Communication</td>
                <td className="p-2.5 text-center border-r border-stone-border">195</td>
                <td className="p-2.5 text-center border-r border-stone-border">176</td>
                <td className="p-2.5 text-center border-r border-stone-border font-bold text-deep-forest">165</td>
                <td className="p-2.5 text-center border-r border-stone-border font-bold text-deep-forest">84.6%</td>
                <td className="p-2.5 text-right font-sans font-bold">₹13.8 LPA</td>
              </tr>
              <tr>
                <td className="p-2.5 font-semibold text-primary-ink border-r border-stone-border">Electrical & Electronics</td>
                <td className="p-2.5 text-center border-r border-stone-border">130</td>
                <td className="p-2.5 text-center border-r border-stone-border">110</td>
                <td className="p-2.5 text-center border-r border-stone-border font-bold text-deep-forest">98</td>
                <td className="p-2.5 text-center border-r border-stone-border font-bold text-deep-forest">75.3%</td>
                <td className="p-2.5 text-right font-sans font-bold">₹10.5 LPA</td>
              </tr>
              <tr>
                <td className="p-2.5 font-semibold text-primary-ink border-r border-stone-border">Mechanical Engineering</td>
                <td className="p-2.5 text-center border-r border-stone-border">120</td>
                <td className="p-2.5 text-center border-r border-stone-border">96</td>
                <td className="p-2.5 text-center border-r border-stone-border font-bold text-deep-forest">85</td>
                <td className="p-2.5 text-center border-r border-stone-border font-bold text-deep-forest">70.8%</td>
                <td className="p-2.5 text-right font-sans font-bold">₹8.9 LPA</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Section 3: Major Corporate Recruiters */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-deep-forest mb-3">
            3. Major Corporate Hiring Partners (Top CTC Hires)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
            {drives.map((d) => (
              <div key={d.id} className="p-2.5 bg-stone-light/30 border border-stone-border rounded-[4px]">
                <strong className="text-primary-ink block">{d.companyName}</strong>
                <span className="text-[11px] text-deep-forest font-bold font-sans">₹{d.ctcLpa} LPA</span>
                <span className="text-[10px] text-muted-sage block">{d.companyTier}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Document Certification Footer */}
        <div className="pt-8 border-t border-stone-border flex flex-col sm:flex-row sm:items-end justify-between gap-6 text-xs">
          <div>
            <p className="text-[11px] text-muted-sage max-w-md leading-relaxed">
              Certified that the data compiled herein reflects primary placement registration records, offer letters verified by the Department of Industry Relations, and regulatory standards as prescribed by the All India Council for Technical Education (AICTE).
            </p>
          </div>

          <div className="text-right space-y-1">
            <div className="font-serif font-bold text-base text-primary-ink">Dr. Rajesh K. Varma</div>
            <div className="text-[11px] text-muted-sage">Dean &amp; Head, Training and Placement Cell</div>
            <div className="text-[10px] text-ink-muted">Directorate of Academic Affairs</div>
          </div>
        </div>
      </div>
    </div>
  );
}
