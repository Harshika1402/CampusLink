"use client";

import React, { useState } from "react";
import {
  GraduationCap,
  Search,
  ExternalLink,
  Mail,
  Phone,
  FileText,
  CheckCircle2,
  AlertCircle,
  Download,
} from "lucide-react";
import { usePlacementStore } from "@/lib/store";
import { StudentProfile } from "@/types";
import { DataTable, Column } from "@/components/ui/DataTable";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

export default function AdminStudentsPage() {
  const { students } = usePlacementStore();
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null);

  const columns: Column<StudentProfile & Record<string, unknown>>[] = [
    {
      key: "fullName",
      header: "Candidate Name",
      sortable: true,
      render: (item) => (
        <div>
          <span className="font-semibold text-primary-ink block">{item.fullName}</span>
          <span className="text-[11px] text-muted-sage font-mono">{item.universityId}</span>
        </div>
      ),
    },
    {
      key: "branch",
      header: "Discipline",
      sortable: true,
      render: (item) => <span className="text-xs text-ink-muted">{item.branch}</span>,
    },
    {
      key: "cgpa",
      header: "CGPA",
      sortable: true,
      render: (item) => (
        <span className="font-bold text-deep-forest font-sans">
          {item.cgpa.toFixed(2)}
        </span>
      ),
    },
    {
      key: "activeBacklogs",
      header: "Backlogs",
      sortable: true,
      render: (item) => (
        <span
          className={`text-xs font-semibold ${
            item.activeBacklogs === 0 ? "text-brand-success" : "text-brand-error"
          }`}
        >
          {item.activeBacklogs === 0 ? "0 Active" : `${item.activeBacklogs} Active`}
        </span>
      ),
    },
    {
      key: "scores",
      header: "10th / 12th %",
      render: (item) => (
        <span className="text-[11px] text-muted-sage">
          {item.tenthPercentage}% / {item.twelfthPercentage}%
        </span>
      ),
    },
    {
      key: "placementStatus",
      header: "Status",
      sortable: true,
      render: (item) => (
        <span
          className={`px-2 py-0.5 rounded-[4px] text-[11px] font-semibold ${
            item.placementStatus === "Placed"
              ? "bg-success-subtle text-brand-success border border-success-border"
              : "bg-stone-light text-ink-muted border border-stone-border"
          }`}
        >
          {item.placementStatus}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Profile Dossier",
      render: (item) => (
        <Button
          size="sm"
          variant="outline"
          onClick={() => setSelectedStudent(item)}
        >
          View Dossier
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-primary-ink font-sans">
          Institutional Student Directory
        </h1>
        <p className="text-xs text-muted-sage mt-0.5">
          Comprehensive academic registry, backlog records, candidate resumes, and placement standing
        </p>
      </div>

      <DataTable
        title="Student Registry (Graduating Class 2026)"
        subtitle="Filter by CGPA, branch, active backlogs, or placement status"
        data={students as any}
        columns={columns as any}
        keyField="id"
        exportFilename="University_Student_Registry"
      />

      {/* Student Profile Dossier Modal */}
      {selectedStudent && (
        <Modal
          isOpen={Boolean(selectedStudent)}
          onClose={() => setSelectedStudent(null)}
          title={`Candidate Dossier: ${selectedStudent.fullName}`}
          subtitle={`${selectedStudent.universityId} • ${selectedStudent.branch}`}
          maxWidth="2xl"
        >
          <div className="space-y-4 text-xs">
            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 bg-ivory-light border border-stone-border rounded-[6px]">
              <div>
                <span className="text-[10px] uppercase font-semibold text-muted-sage block">CGPA</span>
                <strong className="text-deep-forest text-sm font-sans">{selectedStudent.cgpa} / 10.0</strong>
              </div>
              <div>
                <span className="text-[10px] uppercase font-semibold text-muted-sage block">Backlogs</span>
                <strong className={selectedStudent.activeBacklogs === 0 ? "text-brand-success" : "text-brand-error"}>
                  {selectedStudent.activeBacklogs} Active ({selectedStudent.historyOfBacklogs} History)
                </strong>
              </div>
              <div>
                <span className="text-[10px] uppercase font-semibold text-muted-sage block">10th / 12th</span>
                <strong className="text-primary-ink">{selectedStudent.tenthPercentage}% / {selectedStudent.twelfthPercentage}%</strong>
              </div>
              <div>
                <span className="text-[10px] uppercase font-semibold text-muted-sage block">Placement Status</span>
                <strong className="text-deep-forest">{selectedStudent.placementStatus}</strong>
              </div>
            </div>

            {/* Contact Info */}
            <div className="p-3 bg-white border border-stone-border rounded-[6px] space-y-1">
              <div className="flex items-center gap-2 text-ink-muted">
                <Mail className="w-3.5 h-3.5 text-deep-forest" />
                <span>Email: <strong className="text-primary-ink">{selectedStudent.email}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-ink-muted">
                <Phone className="w-3.5 h-3.5 text-deep-forest" />
                <span>Phone: <strong className="text-primary-ink">{selectedStudent.phone}</strong></span>
              </div>
            </div>

            {/* Skills */}
            <div>
              <span className="text-[11px] font-semibold uppercase text-muted-sage block mb-1.5">
                Technical Skills
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedStudent.skills.map((s, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-[4px] bg-forest-subtle text-deep-forest border border-forest-border font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Projects */}
            {selectedStudent.projects && selectedStudent.projects.length > 0 && (
              <div>
                <span className="text-[11px] font-semibold uppercase text-muted-sage block mb-1.5">
                  Academic & Personal Projects
                </span>
                <div className="space-y-2">
                  {selectedStudent.projects.map((proj, idx) => (
                    <div key={idx} className="p-2.5 bg-stone-light/30 border border-stone-border rounded-[5px]">
                      <strong className="text-primary-ink">{proj.title}</strong>
                      <p className="text-[11px] text-muted-sage mt-0.5">{proj.description}</p>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {proj.technologies.map((t, i) => (
                          <span key={i} className="text-[9px] px-1.5 py-0.2 bg-white rounded-xs border border-stone-border text-ink-muted">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Resume Attachment */}
            <div className="pt-2 border-t border-stone-border flex items-center justify-between">
              <span className="text-muted-sage">
                Verified Document: <strong>{selectedStudent.fullName}_Resume.pdf</strong>
              </span>
              <a
                href={selectedStudent.resumeUrl || "#"}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 bg-deep-forest text-warm-ivory rounded-[4px] font-semibold inline-flex items-center gap-1 hover:bg-forest-hover"
              >
                <span>Download Resume</span>
                <Download className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
