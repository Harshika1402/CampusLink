"use client";

import React from "react";
import { Modal } from "@/components/ui/Modal";
import { usePlacementStore } from "@/lib/store";
import { UserRole } from "@/types";
import { GraduationCap, ShieldCheck, UserCheck, Briefcase, Users, Award, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface RoleSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ROLES_INFO: Array<{
  role: UserRole;
  title: string;
  badge: string;
  description: string;
  icon: React.ReactNode;
}> = [
  {
    role: "STUDENT",
    title: "Student Portal",
    badge: "Candidate View",
    description: "View eligible drives, automated criteria checks, apply with 1-click, track application timeline, view mock drive percentiles.",
    icon: <GraduationCap className="w-5 h-5" />,
  },
  {
    role: "PLACEMENT_ADMIN",
    title: "Placement Admin",
    badge: "Full Institutional Control",
    description: "Manage drives, update rounds, bulk shortlist, schedule interviews, view audit logs, export NAAC accreditation reports.",
    icon: <ShieldCheck className="w-5 h-5" />,
  },
  {
    role: "PLACEMENT_OFFICER",
    title: "Placement Officer",
    badge: "Recruitment Coordinator",
    description: "Verify candidate academic qualifications, manage active campus interviews, communicate with corporate HRs.",
    icon: <UserCheck className="w-5 h-5" />,
  },
  {
    role: "RECRUITER",
    title: "Corporate Recruiter",
    badge: "Company HR Partner",
    description: "Review applied candidate profiles, download resumes, update technical interview scores, submit feedback.",
    icon: <Briefcase className="w-5 h-5" />,
  },
  {
    role: "ALUMNI",
    title: "Alumni Network",
    badge: "Career Mentorship",
    description: "Post corporate referral openings at top tech firms, review junior batches, share internal job links.",
    icon: <Users className="w-5 h-5" />,
  },
  {
    role: "INTERNSHIP_COORDINATOR",
    title: "Internship Cell",
    badge: "Industry Relations",
    description: "Manage 6-month & summer industry internships, track stipend benchmarks and student off-campus NOCs.",
    icon: <Award className="w-5 h-5" />,
  },
];

export function RoleSwitcherModal({ isOpen, onClose }: RoleSwitcherModalProps) {
  const { currentRole, switchRole } = usePlacementStore();

  const handleSelectRole = (role: UserRole) => {
    switchRole(role);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Switch Operational Persona & Access Role"
      subtitle="Select a role to preview and interact with the platform from that specific perspective"
      maxWidth="2xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
        {ROLES_INFO.map((item) => {
          const isSelected = currentRole === item.role;
          return (
            <button
              key={item.role}
              type="button"
              onClick={() => handleSelectRole(item.role)}
              className={cn(
                "text-left p-4 rounded-[8px] border transition-all cursor-pointer flex flex-col justify-between group",
                isSelected
                  ? "border-deep-forest bg-forest-subtle/50 ring-1 ring-deep-forest/40"
                  : "border-stone-border bg-white hover:border-muted-sage hover:bg-stone-light/30"
              )}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={cn(
                      "p-2 rounded-[4px] transition-colors",
                      isSelected
                        ? "bg-deep-forest text-warm-ivory"
                        : "bg-stone-light text-deep-forest group-hover:bg-deep-forest group-hover:text-warm-ivory"
                    )}
                  >
                    {item.icon}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-stone-light text-muted-sage border border-stone-border">
                      {item.badge}
                    </span>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-deep-forest text-warm-ivory flex items-center justify-center">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                </div>

                <h4 className="text-sm font-semibold text-primary-ink font-sans">
                  {item.title}
                </h4>
                <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-stone-border/60 text-[11px] font-medium text-muted-sage group-hover:text-primary-ink flex items-center justify-between">
                <span>Role Code: {item.role}</span>
                <span className="text-deep-forest group-hover:translate-x-0.5 transition-transform">
                  {isSelected ? "Active Persona" : "Switch Persona →"}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </Modal>
  );
}
