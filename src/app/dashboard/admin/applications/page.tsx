"use client";

import React, { useState, useMemo } from "react";
import {
  FileCheck2,
  Users,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Calendar,
  Send,
  Download,
  ExternalLink,
  Clock,
  Briefcase,
} from "lucide-react";
import { usePlacementStore } from "@/lib/store";
import { DriveApplication, ApplicationStatus } from "@/types";
import { DataTable, Column } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { ApplicationTimeline } from "@/components/applications/ApplicationTimeline";
import { formatDate } from "@/lib/utils";

export default function AdminApplicationsPage() {
  const {
    applications,
    drives,
    updateApplicationStatus,
    scheduleInterview,
    currentUser,
  } = usePlacementStore();

  const [selectedDriveFilter, setSelectedDriveFilter] = useState<string>("all");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>("all");
  const [activeAppForTimeline, setActiveAppForTimeline] = useState<DriveApplication | null>(null);
  const [activeAppForSchedule, setActiveAppForSchedule] = useState<DriveApplication | null>(null);

  // Interview schedule state
  const [interviewRound, setInterviewRound] = useState("Technical Interview 1");
  const [interviewDate, setInterviewDate] = useState("2026-10-15T14:30");
  const [interviewMode, setInterviewMode] = useState<"Virtual" | "In-Person (Campus)">("Virtual");
  const [interviewVenue, setInterviewVenue] = useState("https://university.zoom.us/j/84920491823");
  const [interviewerName, setInterviewerName] = useState("Corporate Technical Panel");

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      if (selectedDriveFilter !== "all" && app.driveId !== selectedDriveFilter) return false;
      if (selectedStatusFilter !== "all" && app.status !== selectedStatusFilter) return false;
      return true;
    });
  }, [applications, selectedDriveFilter, selectedStatusFilter]);

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeAppForSchedule) return;

    scheduleInterview({
      applicationId: activeAppForSchedule.id,
      driveId: activeAppForSchedule.driveId,
      studentId: activeAppForSchedule.studentId,
      studentName: activeAppForSchedule.student?.fullName || "Student",
      companyName: activeAppForSchedule.drive?.companyName || "Company",
      jobTitle: activeAppForSchedule.drive?.jobTitle || "Role",
      roundName: interviewRound,
      scheduledAt: new Date(interviewDate).toISOString(),
      mode: interviewMode,
      locationOrLink: interviewVenue,
      interviewerName,
    });

    updateApplicationStatus(
      activeAppForSchedule.id,
      interviewRound.toLowerCase().includes("hr") ? "HR Interview" : "Technical Interview",
      interviewRound,
      `Interview scheduled with ${interviewerName} for ${new Date(interviewDate).toLocaleDateString()}`
    );

    setActiveAppForSchedule(null);
  };

  const columns: Column<DriveApplication & Record<string, unknown>>[] = [
    {
      key: "student",
      header: "Candidate Name",
      sortable: true,
      render: (item) => (
        <div>
          <span className="font-semibold text-primary-ink block">
            {item.student?.fullName || "Aarav Sharma"}
          </span>
          <span className="text-[11px] text-muted-sage font-mono">
            {item.student?.universityId || "2022BCS0142"} • {item.student?.branch || "CSE"}
          </span>
        </div>
      ),
    },
    {
      key: "drive",
      header: "Company & Role",
      render: (item) => (
        <div>
          <span className="font-semibold text-primary-ink block">
            {item.drive?.companyName}
          </span>
          <span className="text-[11px] text-ink-muted">{item.drive?.jobTitle}</span>
        </div>
      ),
    },
    {
      key: "academics",
      header: "CGPA & Backlogs",
      render: (item) => (
        <div className="text-xs">
          <strong className="text-deep-forest font-sans">{item.student?.cgpa || 8.5} CGPA</strong>
          <span className="text-[11px] text-muted-sage block">
            {item.student?.activeBacklogs === 0 ? "0 Backlogs" : `${item.student?.activeBacklogs} Backlogs`}
          </span>
        </div>
      ),
    },
    {
      key: "status",
      header: "Current Stage",
      sortable: true,
      render: (item) => <StatusBadge status={item.status} size="sm" />,
    },
    {
      key: "appliedAt",
      header: "Applied On",
      sortable: true,
      render: (item) => formatDate(item.appliedAt),
    },
    {
      key: "actions",
      header: "Operations & Timeline",
      render: (item) => (
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveAppForTimeline(item)}
            className="px-2 py-1 bg-stone-light/60 hover:bg-stone-light border border-stone-border rounded-[4px] text-[11px] font-medium text-primary-ink cursor-pointer"
          >
            Timeline
          </button>

          <button
            onClick={() => {
              setActiveAppForSchedule(item);
              setInterviewRound(item.currentRound || "Technical Interview 1");
            }}
            className="px-2 py-1 bg-forest-subtle hover:bg-forest-border/40 text-deep-forest border border-forest-border rounded-[4px] text-[11px] font-semibold cursor-pointer"
          >
            Schedule
          </button>

          <select
            value={item.status}
            onChange={(e) =>
              updateApplicationStatus(
                item.id,
                e.target.value as ApplicationStatus,
                e.target.value,
                `Admin manually updated stage to ${e.target.value}`
              )
            }
            className="px-2 py-1 text-[11px] border border-stone-border rounded-[4px] bg-white cursor-pointer"
          >
            <option value="Applied">Applied</option>
            <option value="Under Review">Under Review</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Assessment">Assessment</option>
            <option value="Technical Interview">Tech Interview</option>
            <option value="HR Interview">HR Interview</option>
            <option value="Selected">Selected</option>
            <option value="Rejected">Rejected</option>
          </select>
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
            Applicant Tracking & Hiring Pipelines
          </h1>
          <p className="text-xs text-muted-sage mt-0.5">
            Stage-by-stage candidate review, technical rounds, interview scheduling, and offer releases
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Drive Filter */}
          <select
            value={selectedDriveFilter}
            onChange={(e) => setSelectedDriveFilter(e.target.value)}
            className="px-3 py-1.5 text-xs bg-white border border-stone-border rounded-[5px] text-primary-ink"
          >
            <option value="all">All Drives</option>
            {drives.map((d) => (
              <option key={d.id} value={d.id}>
                {d.companyName} ({d.jobTitle})
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatusFilter}
            onChange={(e) => setSelectedStatusFilter(e.target.value)}
            className="px-3 py-1.5 text-xs bg-white border border-stone-border rounded-[5px] text-primary-ink"
          >
            <option value="all">All Stages</option>
            <option value="Applied">Applied</option>
            <option value="Under Review">Under Review</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Assessment">Assessment</option>
            <option value="Technical Interview">Technical Interview</option>
            <option value="HR Interview">HR Interview</option>
            <option value="Selected">Selected</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Enterprise Data Table */}
      <DataTable
        title="Candidate Application Pipeline"
        subtitle="Manage progression, bulk shortlisting, and candidate interview clearances"
        data={filteredApplications as any}
        columns={columns as any}
        keyField="id"
        exportFilename="Candidate_Applications_Pipeline"
        bulkActions={(selectedIds) => (
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                selectedIds.forEach((id) =>
                  updateApplicationStatus(id, "Shortlisted", "Shortlisted for Assessments", "Bulk shortlisted by placement committee")
                );
              }}
              className="px-2.5 py-1 bg-white border border-stone-border rounded-[4px] text-[11px] font-semibold text-deep-forest cursor-pointer hover:bg-forest-subtle"
            >
              Bulk Shortlist Selected ({selectedIds.length})
            </button>
            <button
              onClick={() => {
                selectedIds.forEach((id) =>
                  updateApplicationStatus(id, "Selected", "Final Offer Released", "Selected by hiring committee")
                );
              }}
              className="px-2.5 py-1 bg-white border border-stone-border rounded-[4px] text-[11px] font-semibold text-brand-success cursor-pointer hover:bg-success-subtle"
            >
              Mark Selected ({selectedIds.length})
            </button>
          </div>
        )}
      />

      {/* Interactive Timeline Modal */}
      {activeAppForTimeline && (
        <Modal
          isOpen={Boolean(activeAppForTimeline)}
          onClose={() => setActiveAppForTimeline(null)}
          title={`Candidate Pipeline: ${activeAppForTimeline.student?.fullName}`}
          subtitle={`${activeAppForTimeline.drive?.companyName} • ${activeAppForTimeline.drive?.jobTitle}`}
          maxWidth="2xl"
        >
          <ApplicationTimeline application={activeAppForTimeline} />
        </Modal>
      )}

      {/* Schedule Interview Modal */}
      {activeAppForSchedule && (
        <Modal
          isOpen={Boolean(activeAppForSchedule)}
          onClose={() => setActiveAppForSchedule(null)}
          title="Schedule Candidate Interview"
          subtitle={`${activeAppForSchedule.student?.fullName} (${activeAppForSchedule.student?.universityId}) for ${activeAppForSchedule.drive?.companyName}`}
          maxWidth="md"
        >
          <form onSubmit={handleScheduleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-medium text-ink-muted block mb-1">Interview Round Title</label>
              <input
                type="text"
                value={interviewRound}
                onChange={(e) => setInterviewRound(e.target.value)}
                placeholder="e.g. Technical Round 1 (Data Structures)"
                className="w-full px-3 py-1.5 border border-stone-border rounded-[5px]"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-medium text-ink-muted block mb-1">Date & Time</label>
                <input
                  type="datetime-local"
                  value={interviewDate}
                  onChange={(e) => setInterviewDate(e.target.value)}
                  className="w-full px-3 py-1.5 border border-stone-border rounded-[5px]"
                  required
                />
              </div>

              <div>
                <label className="font-medium text-ink-muted block mb-1">Interview Mode</label>
                <select
                  value={interviewMode}
                  onChange={(e) => setInterviewMode(e.target.value as any)}
                  className="w-full px-3 py-1.5 border border-stone-border rounded-[5px] bg-white"
                >
                  <option value="Virtual">Virtual (Zoom/Teams)</option>
                  <option value="In-Person (Campus)">In-Person (Campus Block)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-medium text-ink-muted block mb-1">Interviewer Name / Panel</label>
              <input
                type="text"
                value={interviewerName}
                onChange={(e) => setInterviewerName(e.target.value)}
                placeholder="e.g. Vikram Malhotra (VP Engineering)"
                className="w-full px-3 py-1.5 border border-stone-border rounded-[5px]"
                required
              />
            </div>

            <div>
              <label className="font-medium text-ink-muted block mb-1">Virtual Link or Room Venue</label>
              <input
                type="text"
                value={interviewVenue}
                onChange={(e) => setInterviewVenue(e.target.value)}
                placeholder="https://zoom.us/j/... or Placement Block B, Room 102"
                className="w-full px-3 py-1.5 border border-stone-border rounded-[5px]"
                required
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-border">
              <Button variant="outline" size="sm" onClick={() => setActiveAppForSchedule(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Confirm & Dispatch Notification
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
