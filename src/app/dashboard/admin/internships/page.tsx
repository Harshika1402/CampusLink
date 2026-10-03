"use client";

import React, { useState } from "react";
import { Compass, Plus, Users, MapPin } from "lucide-react";
import { usePlacementStore } from "@/lib/store";
import { InternshipOpportunity } from "@/types";
import { DataTable, Column } from "@/components/ui/DataTable";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { formatDate } from "@/lib/utils";

export default function AdminInternshipsPage() {
  const { internships, createInternship } = usePlacementStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [companyName, setCompanyName] = useState("");
  const [roleTitle, setRoleTitle] = useState("");
  const [duration, setDuration] = useState("6 Months");
  const [stipendMonthly, setStipendMonthly] = useState(50000);
  const [location, setLocation] = useState("Bengaluru, India");
  const [skills, setSkills] = useState("Python, SQL, Cloud Fundamentals");
  const [eligibility, setEligibility] = useState("Min CGPA 7.00, No active backlogs");
  const [description, setDescription] = useState("Full-time industry training and hands-on software development under engineering mentorship.");
  const [openings, setOpenings] = useState(5);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createInternship({
      companyName,
      roleTitle,
      duration,
      stipendMonthly: Number(stipendMonthly),
      location,
      type: "Hybrid",
      requiredSkills: skills.split(",").map((s) => s.trim()),
      eligibilitySummary: eligibility,
      applicationDeadline: "2026-11-20T23:59:59Z",
      description,
      openings: Number(openings),
      status: "Open",
    });
    setIsModalOpen(false);
  };

  const columns: Column<InternshipOpportunity & Record<string, unknown>>[] = [
    {
      key: "companyName",
      header: "Company & Role",
      sortable: true,
      render: (item) => (
        <div>
          <span className="font-semibold text-primary-ink block">{item.companyName}</span>
          <span className="text-[11px] text-ink-muted">{item.roleTitle}</span>
        </div>
      ),
    },
    {
      key: "stipendMonthly",
      header: "Monthly Stipend",
      sortable: true,
      render: (item) => (
        <span className="font-bold text-deep-forest font-sans">
          ₹{item.stipendMonthly.toLocaleString("en-IN")}/mo
        </span>
      ),
    },
    {
      key: "duration",
      header: "Duration & Mode",
      render: (item) => (
        <span className="text-xs text-ink-muted">
          {item.duration} • {item.location} ({item.type})
        </span>
      ),
    },
    {
      key: "appliedCount",
      header: "Submissions",
      sortable: true,
      render: (item) => (
        <span className="font-semibold text-deep-forest">{item.appliedCount} Candidates</span>
      ),
    },
    {
      key: "status",
      header: "Listing Status",
      sortable: true,
      render: (item) => (
        <span className="px-2 py-0.5 rounded-[4px] bg-success-subtle text-brand-success border border-success-border text-[11px] font-semibold">
          {item.status}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-primary-ink font-sans">
            Internship Cell Management
          </h1>
          <p className="text-xs text-muted-sage mt-0.5">
            Coordinate semester-long internships, corporate stipends, and student industrial training
          </p>
        </div>

        <Button
          size="sm"
          variant="primary"
          icon={<Plus className="w-3.5 h-3.5" />}
          onClick={() => setIsModalOpen(true)}
        >
          Post Internship Opening
        </Button>
      </div>

      <DataTable
        title="Active Campus Internships"
        subtitle="Review applicant counts, corporate compensation benchmarks, and durations"
        data={internships as any}
        columns={columns as any}
        keyField="id"
        exportFilename="Campus_Internships_Registry"
      />

      {/* Create Internship Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Internship Opening"
        subtitle="Specify stipend benchmarks, duration, and eligible qualifications"
        maxWidth="2xl"
      >
        <form onSubmit={handleCreate} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-medium text-ink-muted block mb-1">Company Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-3 py-1.5 border border-stone-border rounded-[5px]"
                required
              />
            </div>
            <div>
              <label className="font-medium text-ink-muted block mb-1">Role Title</label>
              <input
                type="text"
                value={roleTitle}
                onChange={(e) => setRoleTitle(e.target.value)}
                className="w-full px-3 py-1.5 border border-stone-border rounded-[5px]"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="font-medium text-ink-muted block mb-1">Monthly Stipend (₹)</label>
              <input
                type="number"
                value={stipendMonthly}
                onChange={(e) => setStipendMonthly(Number(e.target.value))}
                className="w-full px-3 py-1.5 border border-stone-border rounded-[5px]"
                required
              />
            </div>
            <div>
              <label className="font-medium text-ink-muted block mb-1">Duration</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3 py-1.5 border border-stone-border rounded-[5px]"
                required
              />
            </div>
            <div>
              <label className="font-medium text-ink-muted block mb-1">Openings</label>
              <input
                type="number"
                value={openings}
                onChange={(e) => setOpenings(Number(e.target.value))}
                className="w-full px-3 py-1.5 border border-stone-border rounded-[5px]"
                required
              />
            </div>
          </div>

          <div>
            <label className="font-medium text-ink-muted block mb-1">Required Skills (Comma separated)</label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full px-3 py-1.5 border border-stone-border rounded-[5px]"
              required
            />
          </div>

          <div>
            <label className="font-medium text-ink-muted block mb-1">Eligibility Summary</label>
            <input
              type="text"
              value={eligibility}
              onChange={(e) => setEligibility(e.target.value)}
              className="w-full px-3 py-1.5 border border-stone-border rounded-[5px]"
              required
            />
          </div>

          <div>
            <label className="font-medium text-ink-muted block mb-1">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2.5 border border-stone-border rounded-[5px]"
              required
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-border">
            <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Publish Internship
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
