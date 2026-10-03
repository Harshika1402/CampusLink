"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  FileCheck2,
  GraduationCap,
  Building2,
  Users,
  Compass,
  FileText,
  History,
  Settings,
  Calendar,
  Sparkles,
  Award,
} from "lucide-react";
import { usePlacementStore } from "@/lib/store";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { currentRole, applications, drives, notifications } = usePlacementStore();

  const unreadNotifs = notifications.filter((n) => !n.isRead).length;

  const isAdminOrOfficer =
    currentRole === "PLACEMENT_ADMIN" || currentRole === "PLACEMENT_OFFICER";
  const isRecruiter = currentRole === "RECRUITER";
  const isAlumni = currentRole === "ALUMNI";
  const isCoordinator = currentRole === "INTERNSHIP_COORDINATOR";

  // Build navigation items based on active role
  const getNavLinks = () => {
    if (isAdminOrOfficer) {
      return [
        { href: "/dashboard/admin", label: "Executive Dashboard", icon: LayoutDashboard },
        { href: "/dashboard/admin/drives", label: "Drive Management", icon: Briefcase, count: drives.length },
        { href: "/dashboard/admin/applications", label: "Applicant Tracking", icon: FileCheck2, count: applications.length },
        { href: "/dashboard/admin/students", label: "Student Directory", icon: GraduationCap },
        { href: "/dashboard/admin/interviews", label: "Interview Schedules", icon: Calendar },
        { href: "/dashboard/admin/internships", label: "Internship Cell", icon: Compass },
        { href: "/dashboard/admin/alumni", label: "Alumni Network", icon: Users },
        { href: "/dashboard/admin/mock-drives", label: "Mock Placement Drives", icon: Award },
        { href: "/dashboard/admin/reports", label: "Accreditation Reports", icon: FileText },
        { href: "/dashboard/admin/audit-logs", label: "Audit Logs", icon: History },
      ];
    }

    if (isRecruiter) {
      return [
        { href: "/dashboard/recruiter", label: "Recruiter Console", icon: LayoutDashboard },
        { href: "/dashboard/admin/drives", label: "Company Drives", icon: Briefcase },
        { href: "/dashboard/admin/applications", label: "Candidate Pipeline", icon: FileCheck2 },
        { href: "/dashboard/admin/interviews", label: "Scheduled Interviews", icon: Calendar },
        { href: "/dashboard/admin/students", label: "Eligible Profiles", icon: GraduationCap },
      ];
    }

    if (isAlumni) {
      return [
        { href: "/dashboard/alumni", label: "Alumni Console", icon: LayoutDashboard },
        { href: "/dashboard/student/alumni-referrals", label: "Corporate Referrals", icon: Users },
        { href: "/dashboard/student/drives", label: "Placement Drives", icon: Briefcase },
      ];
    }

    if (isCoordinator) {
      return [
        { href: "/dashboard/coordinator", label: "Internship Console", icon: LayoutDashboard },
        { href: "/dashboard/student/internships", label: "Campus Internships", icon: Compass },
        { href: "/dashboard/admin/students", label: "Student Directory", icon: GraduationCap },
      ];
    }

    // Default: STUDENT Navigation
    return [
      { href: "/dashboard/student", label: "Student Dashboard", icon: LayoutDashboard },
      { href: "/dashboard/student/drives", label: "Placement Drives", icon: Briefcase, count: drives.filter(d => d.status === "Applications Open").length },
      { href: "/dashboard/student/applications", label: "My Applications", icon: FileCheck2, count: applications.length },
      { href: "/dashboard/student/interviews", label: "Interview Schedule", icon: Calendar },
      { href: "/dashboard/student/internships", label: "Internship Cell", icon: Compass },
      { href: "/dashboard/student/alumni-referrals", label: "Alumni Referrals", icon: Users },
      { href: "/dashboard/student/mock-drives", label: "Mock Drives", icon: Award },
      { href: "/dashboard/student/profile", label: "Student Profile", icon: GraduationCap },
    ];
  };

  const navLinks = getNavLinks();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-primary-ink/50 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          "w-64 bg-ivory-light border-r border-stone-border flex flex-col justify-between shrink-0 fixed inset-y-0 left-0 z-40 lg:static transition-transform duration-200 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Navigation list */}
        <div className="flex-1 py-4 overflow-y-auto">
          {/* Section Heading */}
          <div className="px-5 mb-2">
            <span className="text-[10px] uppercase font-bold tracking-[0.16em] text-muted-sage">
              Navigation Menu
            </span>
          </div>

          <nav className="space-y-0.5 px-3">
            {navLinks.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard" &&
                  item.href !== "/dashboard/admin" &&
                  item.href !== "/dashboard/student" &&
                  pathname.startsWith(item.href));

              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 text-xs font-medium rounded-[5px] transition-all",
                    isActive
                      ? "bg-deep-forest text-warm-ivory font-semibold shadow-xs"
                      : "text-ink-muted hover:text-primary-ink hover:bg-stone-light/60"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className={cn(
                        "w-4 h-4 shrink-0",
                        isActive ? "text-warm-ivory" : "text-muted-sage"
                      )}
                    />
                    <span>{item.label}</span>
                  </div>

                  {typeof item.count === "number" && (
                    <span
                      className={cn(
                        "text-[10px] font-bold px-1.5 py-0.2 rounded-full",
                        isActive
                          ? "bg-forest-hover text-warm-ivory"
                          : "bg-stone-light text-ink-muted"
                      )}
                    >
                      {item.count}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Quick AI & Resource Callout */}
          <div className="mt-8 px-4">
            <div className="p-3 bg-forest-subtle/80 border border-forest-border/70 rounded-[6px]">
              <div className="flex items-center gap-1.5 text-deep-forest text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-deep-forest" />
                <span>AI Job Intelligence</span>
              </div>
              <p className="text-[11px] text-ink-muted mt-1 leading-snug">
                Gemini automated skill extraction and round blueprints enabled.
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar Footer info */}
        <div className="p-4 border-t border-stone-border/80 bg-stone-light/20 text-xs">
          <div className="flex items-center justify-between text-[11px] text-muted-sage">
            <span>Institutional Version</span>
            <span className="font-semibold text-primary-ink">v2.4 LTS</span>
          </div>
          <p className="text-[10px] text-muted-sage/80 mt-0.5">
            Accreditation: NAAC A++ / NBA
          </p>
        </div>
      </aside>
    </>
  );
}
