"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  Plus,
  Copy,
  Edit3,
  XCircle,
  CheckCircle2,
  Users,
  Download,
  Sparkles,
  Calendar,
  Layers,
  ArrowRight,
} from "lucide-react";
import { usePlacementStore } from "@/lib/store";
import { PlacementDrive, DriveStatus, EmploymentType } from "@/types";
import { DataTable, Column } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { AIJobAnalysisPanel } from "@/components/ai/AIJobAnalysisPanel";
import { formatDate } from "@/lib/utils";

export default function AdminDrivesPage() {
  const {
    drives,
    createDrive,
    updateDriveStatus,
    duplicateDrive,
    updateDrive,
    currentUser,
  } = usePlacementStore();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingDrive, setEditingDrive] = useState<PlacementDrive | null>(null);

  // Form state
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobLocation, setJobLocation] = useState("Bengaluru / Hyderabad");
  const [employmentType, setEmploymentType] = useState<EmploymentType>("Full-Time");
  const [companyTier, setCompanyTier] = useState<PlacementDrive["companyTier"]>("Tier 1 (Dream)");
  const [ctcLpa, setCtcLpa] = useState<number>(18.0);
  const [stipendMonthly, setStipendMonthly] = useState<number>(60000);
  const [applicationDeadline, setApplicationDeadline] = useState("2026-11-15T23:59:59Z");
  const [driveDate, setDriveDate] = useState("2026-11-22T09:00:00Z");
  const [minCgpa, setMinCgpa] = useState<number>(7.5);
  const [maxBacklogs, setMaxBacklogs] = useState<number>(0);
  const [minTenth, setMinTenth] = useState<number>(70);
  const [minTwelfth, setMinTwelfth] = useState<number>(70);
  const [eligibleBranches, setEligibleBranches] = useState("Computer Science & Engineering, Information Technology");
  const [requiredSkills, setRequiredSkills] = useState("Java, Python, Algorithms, Data Structures, SQL");
  const [selectionRounds, setSelectionRounds] = useState("Online Assessment, Technical Interview 1, Technical Interview 2, HR Round");
  const [jobDescription, setJobDescription] = useState(
    "Join our enterprise technology team building scalable high-throughput cloud services, low-latency microservices, and modern user platforms. Minimum 7.5 CGPA required. Selection includes coding assessment followed by 2 technical interview rounds."
  );

  const handleCreateDriveSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createDrive({
      companyName,
      companyTier,
      jobTitle,
      jobDescription,
      jobLocation,
      employmentType,
      ctcLpa: Number(ctcLpa),
      stipendMonthly: Number(stipendMonthly),
      applicationDeadline,
      driveDate,
      selectionRounds: selectionRounds.split(",").map((s) => s.trim()),
      eligibleBranches: eligibleBranches.split(",").map((s) => s.trim()),
      minCgpa: Number(minCgpa),
      maxBacklogs: Number(maxBacklogs),
      minTenthPercentage: Number(minTenth),
      minTwelfthPercentage: Number(minTwelfth),
      allowedGraduationYears: [2026],
      requiredSkills: requiredSkills.split(",").map((s) => s.trim()),
      status: "Applications Open",
      createdBy: currentUser.id,
    });

    setIsCreateModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setCompanyName("");
    setJobTitle("");
    setCtcLpa(18.0);
    setJobDescription("");
  };

  const columns: Column<PlacementDrive & Record<string, unknown>>[] = [
    {
      key: "companyName",
      header: "Company & Role",
      sortable: true,
      render: (item) => (
        <div>
          <div className="font-semibold text-primary-ink">{item.companyName}</div>
          <div className="text-[11px] text-ink-muted">{item.jobTitle}</div>
        </div>
      ),
    },
    {
      key: "companyTier",
      header: "Category",
      sortable: true,
      render: (item) => (
        <span className="text-[10px] font-semibold uppercase text-muted-sage px-1.5 py-0.5 bg-stone-light rounded-xs border border-stone-border">
          {item.companyTier}
        </span>
      ),
    },
    {
      key: "ctcLpa",
      header: "CTC (LPA)",
      sortable: true,
      render: (item) => (
        <span className="font-bold text-deep-forest font-sans">
          ₹{item.ctcLpa} LPA
        </span>
      ),
    },
    {
      key: "minCgpa",
      header: "Eligibility Criteria",
      render: (item) => (
        <div className="text-[11px] text-ink-muted">
          <span>Min CGPA: <strong>{item.minCgpa}</strong></span> • <span>Max Backlogs: <strong>{item.maxBacklogs}</strong></span>
        </div>
      ),
    },
    {
      key: "driveDate",
      header: "Drive Date",
      sortable: true,
      render: (item) => formatDate(item.driveDate),
    },
    {
      key: "status",
      header: "Drive Status",
      sortable: true,
      render: (item) => <StatusBadge status={item.status} size="sm" />,
    },
    {
      key: "totalApplicants",
      header: "Applicants",
      sortable: true,
      render: (item) => (
        <Link
          href={`/dashboard/admin/applications?driveId=${item.id}`}
          className="text-deep-forest font-semibold underline"
        >
          {item.totalApplicants} Applied
        </Link>
      ),
    },
    {
      key: "actions",
      header: "Operations",
      render: (item) => (
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => duplicateDrive(item.id)}
            title="Duplicate Drive"
            className="p-1 text-muted-sage hover:text-primary-ink hover:bg-stone-light rounded-[3px] cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>

          {item.status === "Applications Open" ? (
            <button
              onClick={() => updateDriveStatus(item.id, "Applications Closed")}
              title="Close Applications"
              className="p-1 text-muted-sage hover:text-brand-error hover:bg-error-subtle rounded-[3px] cursor-pointer"
            >
              <XCircle className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={() => updateDriveStatus(item.id, "Applications Open")}
              title="Re-open Applications"
              className="p-1 text-muted-sage hover:text-brand-success hover:bg-success-subtle rounded-[3px] cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
            </button>
          )}

          <Link
            href={`/dashboard/admin/applications?driveId=${item.id}`}
            className="p-1 text-deep-forest hover:bg-forest-subtle rounded-[3px]"
            title="View Pipeline"
          >
            <Users className="w-3.5 h-3.5" />
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-primary-ink font-sans">
            Placement Drive Management
          </h1>
          <p className="text-xs text-muted-sage mt-0.5">
            Configure recruitment drives, automatic eligibility cutoffs, hiring rounds, and candidate quotas
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={<Plus className="w-3.5 h-3.5" />}
          onClick={() => setIsCreateModalOpen(true)}
        >
          Create Placement Drive
        </Button>
      </div>

      {/* Enterprise Data Table */}
      <DataTable
        title="Institutional Placement Drives Directory"
        subtitle="Manage recruitment timelines, eligibility rules, and selection stages"
        data={drives as any}
        columns={columns as any}
        keyField="id"
        exportFilename="Placement_Drives_Master_Registry"
        bulkActions={(selectedIds) => (
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                selectedIds.forEach((id) => updateDriveStatus(id, "Applications Closed"));
              }}
              className="px-2 py-1 bg-white border border-stone-border rounded-[4px] text-[11px] font-semibold text-brand-error cursor-pointer hover:bg-error-subtle"
            >
              Close Selected Drives
            </button>
            <button
              onClick={() => {
                selectedIds.forEach((id) => updateDriveStatus(id, "Applications Open"));
              }}
              className="px-2 py-1 bg-white border border-stone-border rounded-[4px] text-[11px] font-semibold text-brand-success cursor-pointer hover:bg-success-subtle"
            >
              Open Selected Drives
            </button>
          </div>
        )}
      />

      {/* Create Placement Drive Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create Campus Recruitment Drive"
        subtitle="Specify institutional eligibility criteria, compensation packages, and hiring rounds"
        maxWidth="3xl"
      >
        <form onSubmit={handleCreateDriveSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="font-medium text-ink-muted block mb-1">Company Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Google India"
                className="w-full px-3 py-1.5 border border-stone-border rounded-[5px]"
                required
              />
            </div>
            <div>
              <label className="font-medium text-ink-muted block mb-1">Job Designation</label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g. Software Engineer"
                className="w-full px-3 py-1.5 border border-stone-border rounded-[5px]"
                required
              />
            </div>
            <div>
              <label className="font-medium text-ink-muted block mb-1">Company Tier</label>
              <select
                value={companyTier}
                onChange={(e) => setCompanyTier(e.target.value as any)}
                className="w-full px-3 py-1.5 border border-stone-border rounded-[5px] bg-white"
              >
                <option value="Tier 1 (Dream)">Tier 1 (Dream &gt; 20L)</option>
                <option value="Tier 2 (Super Dream)">Tier 2 (Super Dream 12-20L)</option>
                <option value="Tier 3 (Core/Mass)">Tier 3 (Core/Mass &lt; 12L)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="font-medium text-ink-muted block mb-1">Annual CTC (LPA)</label>
              <input
                type="number"
                step="0.1"
                value={ctcLpa}
                onChange={(e) => setCtcLpa(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-1.5 border border-stone-border rounded-[5px]"
                required
              />
            </div>
            <div>
              <label className="font-medium text-ink-muted block mb-1">Location</label>
              <input
                type="text"
                value={jobLocation}
                onChange={(e) => setJobLocation(e.target.value)}
                className="w-full px-3 py-1.5 border border-stone-border rounded-[5px]"
                required
              />
            </div>
            <div>
              <label className="font-medium text-ink-muted block mb-1">Employment Type</label>
              <select
                value={employmentType}
                onChange={(e) => setEmploymentType(e.target.value as any)}
                className="w-full px-3 py-1.5 border border-stone-border rounded-[5px] bg-white"
              >
                <option value="Full-Time">Full-Time</option>
                <option value="FTE + Internship">FTE + Internship</option>
                <option value="6-Month Internship">6-Month Internship</option>
              </select>
            </div>
          </div>

          {/* Automatic Eligibility Cutoff Configuration */}
          <div className="p-3.5 bg-ivory-light border border-stone-border rounded-[6px] space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-deep-forest block">
              Automated Eligibility Engine Thresholds
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="font-medium text-ink-muted block mb-1">Minimum CGPA</label>
                <input
                  type="number"
                  step="0.05"
                  value={minCgpa}
                  onChange={(e) => setMinCgpa(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-1.5 border border-stone-border rounded-[5px] bg-white"
                  required
                />
              </div>
              <div>
                <label className="font-medium text-ink-muted block mb-1">Max Active Backlogs</label>
                <input
                  type="number"
                  value={maxBacklogs}
                  onChange={(e) => setMaxBacklogs(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-1.5 border border-stone-border rounded-[5px] bg-white"
                  required
                />
              </div>
              <div>
                <label className="font-medium text-ink-muted block mb-1">Min 10th %</label>
                <input
                  type="number"
                  value={minTenth}
                  onChange={(e) => setMinTenth(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-1.5 border border-stone-border rounded-[5px] bg-white"
                />
              </div>
              <div>
                <label className="font-medium text-ink-muted block mb-1">Min 12th %</label>
                <input
                  type="number"
                  value={minTwelfth}
                  onChange={(e) => setMinTwelfth(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-1.5 border border-stone-border rounded-[5px] bg-white"
                />
              </div>
            </div>

            <div>
              <label className="font-medium text-ink-muted block mb-1">Eligible Disciplines / Branches (Comma separated)</label>
              <input
                type="text"
                value={eligibleBranches}
                onChange={(e) => setEligibleBranches(e.target.value)}
                className="w-full px-3 py-1.5 border border-stone-border rounded-[5px] bg-white"
              />
            </div>
          </div>

          <div>
            <label className="font-medium text-ink-muted block mb-1">Required Skills (Comma separated)</label>
            <input
              type="text"
              value={requiredSkills}
              onChange={(e) => setRequiredSkills(e.target.value)}
              className="w-full px-3 py-1.5 border border-stone-border rounded-[5px]"
            />
          </div>

          <div>
            <label className="font-medium text-ink-muted block mb-1">Selection Rounds (Comma separated)</label>
            <input
              type="text"
              value={selectionRounds}
              onChange={(e) => setSelectionRounds(e.target.value)}
              className="w-full px-3 py-1.5 border border-stone-border rounded-[5px]"
            />
          </div>

          {/* Job Description with Gemini AI Helper */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-medium text-ink-muted">Job Description</label>
              <span className="text-[10px] text-muted-sage">AI will automatically analyze JD upon publishing</span>
            </div>
            <textarea
              rows={4}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full p-2.5 border border-stone-border rounded-[5px]"
              required
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-border">
            <Button variant="outline" size="sm" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Publish Placement Drive
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
