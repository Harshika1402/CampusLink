"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  User,
  UserRole,
  StudentProfile,
  PlacementDrive,
  DriveApplication,
  InterviewSchedule,
  InternshipOpportunity,
  AlumniReferral,
  MockDrive,
  MockResult,
  InAppNotification,
  AuditLogEntry,
  ApplicationStatus,
  DriveStatus,
} from "@/types";
import {
  MOCK_USERS,
  MOCK_STUDENT_PROFILES,
  MOCK_PLACEMENT_DRIVES,
  MOCK_APPLICATIONS,
  MOCK_INTERVIEWS,
  MOCK_INTERNSHIPS,
  MOCK_ALUMNI_REFERRALS,
  MOCK_MOCK_DRIVES,
  MOCK_MOCK_RESULTS,
  MOCK_NOTIFICATIONS,
  MOCK_AUDIT_LOGS,
} from "./mock-data";

interface PlacementStoreContextType {
  currentUser: User;
  currentRole: UserRole;
  currentStudent: StudentProfile;
  users: User[];
  students: StudentProfile[];
  drives: PlacementDrive[];
  applications: DriveApplication[];
  interviews: InterviewSchedule[];
  internships: InternshipOpportunity[];
  alumniReferrals: AlumniReferral[];
  mockDrives: MockDrive[];
  mockResults: MockResult[];
  notifications: InAppNotification[];
  auditLogs: AuditLogEntry[];
  
  // Actions
  switchRole: (role: UserRole) => void;
  switchUser: (userId: string) => void;
  updateStudentProfile: (profile: Partial<StudentProfile>) => void;
  createDrive: (drive: Omit<PlacementDrive, "id" | "createdAt" | "updatedAt" | "totalApplicants" | "shortlistedCount" | "selectedCount">) => PlacementDrive;
  updateDrive: (id: string, updates: Partial<PlacementDrive>) => void;
  updateDriveStatus: (id: string, status: DriveStatus) => void;
  duplicateDrive: (id: string) => void;
  applyToDrive: (driveId: string) => { success: boolean; message: string };
  updateApplicationStatus: (applicationId: string, newStatus: ApplicationStatus, roundName?: string, remarks?: string) => void;
  scheduleInterview: (interview: Omit<InterviewSchedule, "id" | "status">) => void;
  createInternship: (internship: Omit<InternshipOpportunity, "id" | "createdAt" | "appliedCount">) => void;
  applyToInternship: (internshipId: string) => void;
  createAlumniReferral: (referral: Omit<AlumniReferral, "id" | "createdAt">) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  recordAuditLog: (action: string, targetType: AuditLogEntry["targetType"], targetId: string, targetTitle: string, details: string) => void;
  resetToDefaultData: () => void;
}

const PlacementStoreContext = createContext<PlacementStoreContextType | null>(null);

const STORAGE_KEY_PREFIX = "placement_portal_state_v1";

export function PlacementStoreProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USERS[0]); // Aarav Sharma (STUDENT)
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [students, setStudents] = useState<StudentProfile[]>(MOCK_STUDENT_PROFILES);
  const [drives, setDrives] = useState<PlacementDrive[]>(MOCK_PLACEMENT_DRIVES);
  const [applications, setApplications] = useState<DriveApplication[]>(MOCK_APPLICATIONS);
  const [interviews, setInterviews] = useState<InterviewSchedule[]>(MOCK_INTERVIEWS);
  const [internships, setInternships] = useState<InternshipOpportunity[]>(MOCK_INTERNSHIPS);
  const [alumniReferrals, setAlumniReferrals] = useState<AlumniReferral[]>(MOCK_ALUMNI_REFERRALS);
  const [mockDrives, setMockDrives] = useState<MockDrive[]>(MOCK_MOCK_DRIVES);
  const [mockResults, setMockResults] = useState<MockResult[]>(MOCK_MOCK_RESULTS);
  const [notifications, setNotifications] = useState<InAppNotification[]>(MOCK_NOTIFICATIONS);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(MOCK_AUDIT_LOGS);

  // Load from localStorage if present
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(`${STORAGE_KEY_PREFIX}_user`);
      const savedDrives = localStorage.getItem(`${STORAGE_KEY_PREFIX}_drives`);
      const savedApps = localStorage.getItem(`${STORAGE_KEY_PREFIX}_apps`);
      const savedStudents = localStorage.getItem(`${STORAGE_KEY_PREFIX}_students`);
      const savedInterviews = localStorage.getItem(`${STORAGE_KEY_PREFIX}_interviews`);
      const savedInternships = localStorage.getItem(`${STORAGE_KEY_PREFIX}_internships`);
      const savedReferrals = localStorage.getItem(`${STORAGE_KEY_PREFIX}_referrals`);
      const savedLogs = localStorage.getItem(`${STORAGE_KEY_PREFIX}_logs`);
      const savedNotifs = localStorage.getItem(`${STORAGE_KEY_PREFIX}_notifs`);

      if (savedUser) setCurrentUser(JSON.parse(savedUser));
      if (savedDrives) setDrives(JSON.parse(savedDrives));
      if (savedApps) setApplications(JSON.parse(savedApps));
      if (savedStudents) setStudents(JSON.parse(savedStudents));
      if (savedInterviews) setInterviews(JSON.parse(savedInterviews));
      if (savedInternships) setInternships(JSON.parse(savedInternships));
      if (savedReferrals) setAlumniReferrals(JSON.parse(savedReferrals));
      if (savedLogs) setAuditLogs(JSON.parse(savedLogs));
      if (savedNotifs) setNotifications(JSON.parse(savedNotifs));
    } catch (e) {
      console.error("Failed to load state from localStorage:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}_user`, JSON.stringify(currentUser));
      localStorage.setItem(`${STORAGE_KEY_PREFIX}_drives`, JSON.stringify(drives));
      localStorage.setItem(`${STORAGE_KEY_PREFIX}_apps`, JSON.stringify(applications));
      localStorage.setItem(`${STORAGE_KEY_PREFIX}_students`, JSON.stringify(students));
      localStorage.setItem(`${STORAGE_KEY_PREFIX}_interviews`, JSON.stringify(interviews));
      localStorage.setItem(`${STORAGE_KEY_PREFIX}_internships`, JSON.stringify(internships));
      localStorage.setItem(`${STORAGE_KEY_PREFIX}_referrals`, JSON.stringify(alumniReferrals));
      localStorage.setItem(`${STORAGE_KEY_PREFIX}_logs`, JSON.stringify(auditLogs));
      localStorage.setItem(`${STORAGE_KEY_PREFIX}_notifs`, JSON.stringify(notifications));
    } catch (e) {
      console.error("Failed to save state to localStorage:", e);
    }
  }, [
    isLoaded,
    currentUser,
    drives,
    applications,
    students,
    interviews,
    internships,
    alumniReferrals,
    auditLogs,
    notifications,
  ]);

  const currentStudent =
    students.find((s) => s.userId === currentUser.id) || students[0];

  const currentRole = currentUser.role;

  const recordAuditLog = (
    action: string,
    targetType: AuditLogEntry["targetType"],
    targetId: string,
    targetTitle: string,
    details: string
  ) => {
    const entry: AuditLogEntry = {
      id: `audit-${Date.now()}`,
      actorName: currentUser.name,
      actorRole: currentUser.role,
      action,
      targetType,
      targetId,
      targetTitle,
      details,
      ipAddress: "10.0.4.18 (Campus Net)",
      timestamp: new Date().toISOString(),
    };
    setAuditLogs((prev) => [entry, ...prev]);
  };

  const switchRole = (role: UserRole) => {
    const userForRole = users.find((u) => u.role === role) || {
      id: `user-${role.toLowerCase()}`,
      name: `${role.replace("_", " ")} Officer`,
      email: `${role.toLowerCase()}@university.edu.in`,
      role,
    };
    setCurrentUser(userForRole);
    recordAuditLog("ROLE_SWITCH", "System", userForRole.id, userForRole.name, `Active role switched to ${role}`);
  };

  const switchUser = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      setCurrentUser(user);
    }
  };

  const updateStudentProfile = (updates: Partial<StudentProfile>) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === currentStudent.id) {
          const updated = { ...s, ...updates };
          // Recalculate completion percentage
          let filledCount = 0;
          const totalFields = 12;
          if (updated.fullName) filledCount++;
          if (updated.universityId) filledCount++;
          if (updated.email && updated.phone) filledCount++;
          if (updated.branch && updated.degree) filledCount++;
          if (updated.cgpa) filledCount++;
          if (updated.tenthPercentage && updated.twelfthPercentage) filledCount++;
          if (updated.skills && updated.skills.length > 0) filledCount++;
          if (updated.projects && updated.projects.length > 0) filledCount++;
          if (updated.certifications && updated.certifications.length > 0) filledCount++;
          if (updated.internships && updated.internships.length > 0) filledCount++;
          if (updated.resumeUrl) filledCount++;
          if (updated.linkedinUrl || updated.githubUrl) filledCount++;

          updated.profileCompletionPercentage = Math.round((filledCount / totalFields) * 100);
          return updated;
        }
        return s;
      })
    );
    recordAuditLog(
      "PROFILE_UPDATED",
      "Student",
      currentStudent.id,
      currentStudent.fullName,
      "Updated student academic details or credentials"
    );
  };

  const createDrive = (
    driveData: Omit<
      PlacementDrive,
      "id" | "createdAt" | "updatedAt" | "totalApplicants" | "shortlistedCount" | "selectedCount"
    >
  ) => {
    const newDrive: PlacementDrive = {
      ...driveData,
      id: `drive-${Date.now()}`,
      totalApplicants: 0,
      shortlistedCount: 0,
      selectedCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setDrives((prev) => [newDrive, ...prev]);

    recordAuditLog(
      "DRIVE_CREATED",
      "Drive",
      newDrive.id,
      `${newDrive.companyName} - ${newDrive.jobTitle}`,
      `Created placement drive with CTC ${newDrive.ctcLpa} LPA and min CGPA ${newDrive.minCgpa}`
    );

    // Notify students
    const newNotif: InAppNotification = {
      id: `notif-${Date.now()}`,
      userId: currentStudent.userId,
      title: `New Placement Drive: ${newDrive.companyName}`,
      message: `${newDrive.companyName} has opened applications for ${newDrive.jobTitle} (₹${newDrive.ctcLpa} LPA).`,
      type: "drive",
      link: "/dashboard/student/drives",
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    setNotifications((prev) => [newNotif, ...prev]);

    return newDrive;
  };

  const updateDrive = (id: string, updates: Partial<PlacementDrive>) => {
    setDrives((prev) =>
      prev.map((d) => (d.id === id ? { ...d, ...updates, updatedAt: new Date().toISOString() } : d))
    );
    recordAuditLog("DRIVE_UPDATED", "Drive", id, "Drive Updates", "Updated placement drive terms or criteria");
  };

  const updateDriveStatus = (id: string, status: DriveStatus) => {
    const drive = drives.find((d) => d.id === id);
    if (!drive) return;
    setDrives((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status, updatedAt: new Date().toISOString() } : d))
    );
    recordAuditLog(
      "DRIVE_STATUS_CHANGED",
      "Drive",
      id,
      drive.companyName,
      `Changed status from ${drive.status} to ${status}`
    );
  };

  const duplicateDrive = (id: string) => {
    const original = drives.find((d) => d.id === id);
    if (!original) return;
    const duplicated: PlacementDrive = {
      ...original,
      id: `drive-${Date.now()}`,
      jobTitle: `${original.jobTitle} (Duplicate)`,
      status: "Draft",
      totalApplicants: 0,
      shortlistedCount: 0,
      selectedCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setDrives((prev) => [duplicated, ...prev]);
    recordAuditLog(
      "DRIVE_DUPLICATED",
      "Drive",
      duplicated.id,
      duplicated.jobTitle,
      `Cloned drive from ${original.companyName}`
    );
  };

  const applyToDrive = (driveId: string): { success: boolean; message: string } => {
    const existing = applications.find(
      (a) => a.driveId === driveId && a.studentId === currentStudent.id
    );
    if (existing) {
      return { success: false, message: "You have already submitted an application for this drive." };
    }

    const drive = drives.find((d) => d.id === driveId);
    if (!drive) {
      return { success: false, message: "Placement drive not found." };
    }

    const newApp: DriveApplication = {
      id: `app-${Date.now()}`,
      driveId,
      studentId: currentStudent.id,
      drive,
      student: currentStudent,
      status: "Applied",
      currentRound: "Application Submitted",
      appliedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      resumeUrl: currentStudent.resumeUrl,
      history: [
        {
          status: "Applied",
          roundName: "Application Submission",
          timestamp: new Date().toISOString(),
          updatedBy: currentStudent.fullName,
          remarks: "Candidate verified credentials and applied through portal.",
        },
      ],
    };

    setApplications((prev) => [newApp, ...prev]);

    // Update drive total applicants count
    setDrives((prev) =>
      prev.map((d) =>
        d.id === driveId ? { ...d, totalApplicants: d.totalApplicants + 1 } : d
      )
    );

    recordAuditLog(
      "APPLICATION_SUBMITTED",
      "Application",
      newApp.id,
      `${currentStudent.fullName} → ${drive.companyName}`,
      `Application submitted for ${drive.jobTitle}`
    );

    // Notify student
    const notif: InAppNotification = {
      id: `notif-${Date.now()}`,
      userId: currentStudent.userId,
      title: "Application Submitted Successfully",
      message: `Your application for ${drive.companyName} (${drive.jobTitle}) has been submitted for review.`,
      type: "application",
      link: "/dashboard/student/applications",
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    setNotifications((prev) => [notif, ...prev]);

    return { success: true, message: "Application submitted successfully." };
  };

  const updateApplicationStatus = (
    applicationId: string,
    newStatus: ApplicationStatus,
    roundName?: string,
    remarks?: string
  ) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === applicationId) {
          const historyEntry = {
            status: newStatus,
            roundName: roundName || newStatus,
            timestamp: new Date().toISOString(),
            updatedBy: currentUser.name,
            remarks: remarks || `Advanced to ${newStatus}`,
          };
          return {
            ...app,
            status: newStatus,
            currentRound: roundName || newStatus,
            updatedAt: new Date().toISOString(),
            history: [...app.history, historyEntry],
          };
        }
        return app;
      })
    );

    const app = applications.find((a) => a.id === applicationId);
    if (app) {
      recordAuditLog(
        "APPLICATION_STATUS_UPDATED",
        "Application",
        applicationId,
        `${app.student?.fullName || "Student"} - ${app.drive?.companyName || "Drive"}`,
        `Changed status to ${newStatus} (${roundName || ""})`
      );

      // Student notification
      const notif: InAppNotification = {
        id: `notif-${Date.now()}`,
        userId: app.student?.userId || currentStudent.userId,
        title: `Application Status: ${newStatus}`,
        message: `${app.drive?.companyName || "Company"}: Your application status changed to '${newStatus}'.`,
        type: "application",
        link: "/dashboard/student/applications",
        isRead: false,
        createdAt: new Date().toISOString(),
      };
      setNotifications((prev) => [notif, ...prev]);
    }
  };

  const scheduleInterview = (data: Omit<InterviewSchedule, "id" | "status">) => {
    const newInterview: InterviewSchedule = {
      ...data,
      id: `int-${Date.now()}`,
      status: "Scheduled",
    };
    setInterviews((prev) => [newInterview, ...prev]);

    recordAuditLog(
      "INTERVIEW_SCHEDULED",
      "Interview",
      newInterview.id,
      `${newInterview.studentName} - ${newInterview.companyName}`,
      `Scheduled ${newInterview.roundName} on ${new Date(newInterview.scheduledAt).toLocaleString()}`
    );

    // Notify student
    const notif: InAppNotification = {
      id: `notif-${Date.now()}`,
      userId: currentStudent.userId,
      title: `Interview Scheduled: ${newInterview.companyName}`,
      message: `${newInterview.roundName} scheduled for ${new Date(newInterview.scheduledAt).toLocaleDateString()}.`,
      type: "interview",
      link: "/dashboard/student/interviews",
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const createInternship = (data: Omit<InternshipOpportunity, "id" | "createdAt" | "appliedCount">) => {
    const newInternship: InternshipOpportunity = {
      ...data,
      id: `intern-${Date.now()}`,
      appliedCount: 0,
      createdAt: new Date().toISOString(),
    };
    setInternships((prev) => [newInternship, ...prev]);
    recordAuditLog(
      "INTERNSHIP_POSTED",
      "Internship",
      newInternship.id,
      `${newInternship.companyName} - ${newInternship.roleTitle}`,
      `Posted internship opportunity with monthly stipend ₹${newInternship.stipendMonthly}`
    );
  };

  const applyToInternship = (internshipId: string) => {
    setInternships((prev) =>
      prev.map((item) =>
        item.id === internshipId ? { ...item, appliedCount: item.appliedCount + 1 } : item
      )
    );
    const item = internships.find((i) => i.id === internshipId);
    if (item) {
      const notif: InAppNotification = {
        id: `notif-${Date.now()}`,
        userId: currentStudent.userId,
        title: "Internship Application Sent",
        message: `Applied to ${item.companyName} for ${item.roleTitle}.`,
        type: "internship",
        link: "/dashboard/student/internships",
        isRead: false,
        createdAt: new Date().toISOString(),
      };
      setNotifications((prev) => [notif, ...prev]);
    }
  };

  const createAlumniReferral = (data: Omit<AlumniReferral, "id" | "createdAt">) => {
    const newRef: AlumniReferral = {
      ...data,
      id: `ref-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setAlumniReferrals((prev) => [newRef, ...prev]);
    recordAuditLog(
      "ALUMNI_REFERRAL_POSTED",
      "System",
      newRef.id,
      `${newRef.companyName} - ${newRef.roleTitle}`,
      `Alumni ${newRef.alumniName} posted referral opportunity`
    );
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const resetToDefaultData = () => {
    setUsers(MOCK_USERS);
    setCurrentUser(MOCK_USERS[0]);
    setStudents(MOCK_STUDENT_PROFILES);
    setDrives(MOCK_PLACEMENT_DRIVES);
    setApplications(MOCK_APPLICATIONS);
    setInterviews(MOCK_INTERVIEWS);
    setInternships(MOCK_INTERNSHIPS);
    setAlumniReferrals(MOCK_ALUMNI_REFERRALS);
    setMockDrives(MOCK_MOCK_DRIVES);
    setMockResults(MOCK_MOCK_RESULTS);
    setNotifications(MOCK_NOTIFICATIONS);
    setAuditLogs(MOCK_AUDIT_LOGS);
    try {
      localStorage.clear();
    } catch {}
  };

  return (
    <PlacementStoreContext.Provider
      value={{
        currentUser,
        currentRole,
        currentStudent,
        users,
        students,
        drives,
        applications,
        interviews,
        internships,
        alumniReferrals,
        mockDrives,
        mockResults,
        notifications,
        auditLogs,
        switchRole,
        switchUser,
        updateStudentProfile,
        createDrive,
        updateDrive,
        updateDriveStatus,
        duplicateDrive,
        applyToDrive,
        updateApplicationStatus,
        scheduleInterview,
        createInternship,
        applyToInternship,
        createAlumniReferral,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        recordAuditLog,
        resetToDefaultData,
      }}
    >
      {children}
    </PlacementStoreContext.Provider>
  );
}

export function usePlacementStore() {
  const context = useContext(PlacementStoreContext);
  if (!context) {
    throw new Error("usePlacementStore must be used within a PlacementStoreProvider");
  }
  return context;
}
