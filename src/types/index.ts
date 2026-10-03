export type UserRole =
  | "STUDENT"
  | "PLACEMENT_ADMIN"
  | "PLACEMENT_OFFICER"
  | "RECRUITER"
  | "ALUMNI"
  | "INTERNSHIP_COORDINATOR";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  department?: string;
}

export interface StudentProfile {
  id: string;
  userId: string;
  fullName: string;
  universityId: string;
  email: string;
  phone: string;
  branch: string; // e.g. "Computer Science & Engineering", "Information Technology", "Electronics & Comm"
  degree: string; // e.g. "B.Tech", "M.Tech", "MCA"
  graduationYear: number;
  cgpa: number;
  tenthPercentage: number;
  twelfthPercentage: number;
  activeBacklogs: number;
  historyOfBacklogs: number;
  skills: string[];
  projects: Array<{
    title: string;
    description: string;
    technologies: string[];
    link?: string;
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    year: number;
  }>;
  internships: Array<{
    company: string;
    role: string;
    duration: string;
    description: string;
  }>;
  resumeUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  bio?: string;
  profileCompletionPercentage: number;
  placementStatus: "Not Placed" | "Placed" | "Opted Out" | "Higher Studies";
}

export type DriveStatus =
  | "Draft"
  | "Published"
  | "Applications Open"
  | "Applications Closed"
  | "Shortlisting"
  | "Interviewing"
  | "Completed"
  | "Cancelled";

export type EmploymentType = "Full-Time" | "FTE + Internship" | "6-Month Internship" | "Summer Internship";

export interface PlacementDrive {
  id: string;
  companyName: string;
  companyLogo?: string;
  companyTier: "Tier 1 (Dream)" | "Tier 2 (Super Dream)" | "Tier 3 (Core/Mass)";
  jobTitle: string;
  jobDescription: string;
  jobLocation: string;
  employmentType: EmploymentType;
  ctcLpa: number; // In LPA (e.g., 18.5)
  stipendMonthly?: number; // In INR / month
  applicationDeadline: string; // ISO date
  driveDate: string; // ISO date
  selectionRounds: string[]; // e.g., ["Online Assessment", "Technical Interview 1", "Technical Interview 2", "HR Interview"]
  
  // Eligibility Criteria
  eligibleBranches: string[];
  minCgpa: number;
  maxBacklogs: number;
  minTenthPercentage: number;
  minTwelfthPercentage: number;
  allowedGraduationYears: number[];
  requiredSkills: string[];
  otherConditions?: string;

  status: DriveStatus;
  totalApplicants: number;
  shortlistedCount: number;
  selectedCount: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export type ApplicationStatus =
  | "Applied"
  | "Under Review"
  | "Shortlisted"
  | "Assessment"
  | "Technical Interview"
  | "HR Interview"
  | "Selected"
  | "Rejected";

export interface StatusHistoryEntry {
  status: ApplicationStatus;
  roundName: string;
  timestamp: string;
  updatedBy: string;
  remarks?: string;
}

export interface DriveApplication {
  id: string;
  driveId: string;
  studentId: string;
  drive?: PlacementDrive;
  student?: StudentProfile;
  status: ApplicationStatus;
  currentRound: string;
  appliedAt: string;
  updatedAt: string;
  resumeUrl?: string;
  feedback?: string;
  history: StatusHistoryEntry[];
}

export interface InterviewSchedule {
  id: string;
  applicationId: string;
  driveId: string;
  studentId: string;
  studentName: string;
  companyName: string;
  jobTitle: string;
  roundName: string;
  scheduledAt: string; // ISO string
  mode: "Virtual" | "In-Person (Campus)";
  locationOrLink: string;
  interviewerName: string;
  status: "Scheduled" | "Completed" | "Cancelled" | "Rescheduled";
  feedback?: string;
}

export interface InternshipOpportunity {
  id: string;
  companyName: string;
  companyLogo?: string;
  roleTitle: string;
  duration: string; // e.g. "6 Months", "3 Months"
  stipendMonthly: number;
  location: string;
  type: "On-site" | "Hybrid" | "Remote";
  requiredSkills: string[];
  eligibilitySummary: string;
  applicationDeadline: string;
  description: string;
  openings: number;
  status: "Open" | "Closed";
  appliedCount: number;
  createdAt: string;
}

export interface AlumniReferral {
  id: string;
  alumniName: string;
  alumniBatch: string;
  alumniCurrentRole: string;
  companyName: string;
  companyLogo?: string;
  roleTitle: string;
  location: string;
  jobType: "Full-Time" | "Internship";
  experienceRequired: string;
  skills: string[];
  referralDeadline: string;
  referralInstructions: string;
  contactEmail: string;
  openings: number;
  status: "Active" | "Closed";
  createdAt: string;
}

export interface MockDrive {
  id: string;
  title: string;
  description: string;
  rounds: string[];
  durationMinutes: number;
  totalMarks: number;
  scheduledAt: string;
  status: "Active" | "Upcoming" | "Completed";
  registeredCount: number;
  completedCount: number;
}

export interface MockResult {
  id: string;
  mockDriveId: string;
  mockTitle: string;
  studentId: string;
  studentName: string;
  aptitudeScore: number; // out of 40
  codingScore: number; // out of 40
  interviewScore: number; // out of 20
  totalScore: number; // out of 100
  percentile: number;
  strengths: string[];
  areasToImprove: string[];
  overallAssessment: string;
  completedAt: string;
}

export interface InAppNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "drive" | "application" | "interview" | "internship" | "referral" | "mock" | "system";
  link?: string;
  isRead: boolean;
  createdAt: string;
}

export interface AuditLogEntry {
  id: string;
  actorName: string;
  actorRole: UserRole;
  action: string;
  targetType: "Drive" | "Application" | "Student" | "Internship" | "System" | "Interview";
  targetId: string;
  targetTitle: string;
  details: string;
  ipAddress: string;
  timestamp: string;
}

export interface AIJobSummary {
  role: string;
  company: string;
  location: string;
  salary: string;
  experienceRequirements: string;
  responsibilities: string[];
  requiredSkills: string[];
  preferredSkills: string[];
  eligibilityCriteria: string[];
  selectionProcess: string[];
  skillsToPrepare: string[];
  keyRequirements: string[];
  analyzedAt: string;
}

export interface EligibilityCheckResult {
  isEligible: boolean;
  score: number; // 0 - 100% fit score
  checks: Array<{
    label: string;
    passed: boolean;
    requirement: string;
    actual: string;
    details?: string;
  }>;
  explanation: string;
  matchedSkills: string[];
  missingSkills: string[];
}
