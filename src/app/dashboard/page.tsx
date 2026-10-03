"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePlacementStore } from "@/lib/store";

export default function DashboardIndexPage() {
  const router = useRouter();
  const { currentRole } = usePlacementStore();

  useEffect(() => {
    if (currentRole === "STUDENT") {
      router.replace("/dashboard/student");
    } else if (currentRole === "PLACEMENT_ADMIN" || currentRole === "PLACEMENT_OFFICER") {
      router.replace("/dashboard/admin");
    } else if (currentRole === "RECRUITER") {
      router.replace("/dashboard/admin/applications");
    } else if (currentRole === "ALUMNI") {
      router.replace("/dashboard/student/alumni-referrals");
    } else if (currentRole === "INTERNSHIP_COORDINATOR") {
      router.replace("/dashboard/student/internships");
    } else {
      router.replace("/dashboard/student");
    }
  }, [currentRole, router]);

  return (
    <div className="py-24 text-center">
      <div className="w-8 h-8 border-2 border-deep-forest border-t-transparent rounded-full animate-spin mx-auto mb-3" />
      <p className="text-xs text-muted-sage font-medium">
        Connecting to Institutional Portal...
      </p>
    </div>
  );
}
