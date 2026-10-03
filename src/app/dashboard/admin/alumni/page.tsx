"use client";

import React from "react";
import { Users, Mail, MapPin, Calendar, CheckCircle2 } from "lucide-react";
import { usePlacementStore } from "@/lib/store";
import { AlumniReferral } from "@/types";
import { DataTable, Column } from "@/components/ui/DataTable";
import { formatDate } from "@/lib/utils";

export default function AdminAlumniPage() {
  const { alumniReferrals } = usePlacementStore();

  const columns: Column<AlumniReferral & Record<string, unknown>>[] = [
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
      key: "alumniName",
      header: "Alumni Contributor",
      sortable: true,
      render: (item) => (
        <div>
          <span className="font-semibold text-primary-ink block">{item.alumniName}</span>
          <span className="text-[11px] text-muted-sage">{item.alumniBatch} • {item.alumniCurrentRole}</span>
        </div>
      ),
    },
    {
      key: "openings",
      header: "Referral Slots",
      render: (item) => (
        <span className="font-bold text-deep-forest font-sans">
          {item.openings} Slots Available
        </span>
      ),
    },
    {
      key: "referralDeadline",
      header: "Valid Until",
      sortable: true,
      render: (item) => formatDate(item.referralDeadline),
    },
    {
      key: "status",
      header: "Listing Status",
      sortable: true,
      render: (item) => (
        <span className="px-2 py-0.5 rounded-[4px] bg-forest-subtle text-deep-forest border border-forest-border text-[11px] font-semibold">
          {item.status}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-primary-ink font-sans">
          Alumni Corporate Referral Oversight
        </h1>
        <p className="text-xs text-muted-sage mt-0.5">
          Review alumni referral campaigns, corporate postings, and junior batch mentorship connections
        </p>
      </div>

      <DataTable
        title="Alumni Corporate Referral Registry"
        subtitle="Manage verified alumni mentorship openings, contact emails, and referral quotas"
        data={alumniReferrals as any}
        columns={columns as any}
        keyField="id"
        exportFilename="Alumni_Referrals_Registry"
      />
    </div>
  );
}
