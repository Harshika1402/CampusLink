-- ================================================================
-- PLACEMENT CELL PORTAL: ENTERPRISE DATABASE SCHEMA & RLS POLICIES
-- PostgreSQL / Supabase Schema Definition
-- ================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USER ROLES ENUM
CREATE TYPE app_role AS ENUM (
  'STUDENT',
  'PLACEMENT_ADMIN',
  'PLACEMENT_OFFICER',
  'RECRUITER',
  'ALUMNI',
  'INTERNSHIP_COORDINATOR'
);

-- 2. APPLICATION STATUS ENUM
CREATE TYPE app_status AS ENUM (
  'Applied',
  'Under Review',
  'Shortlisted',
  'Assessment',
  'Technical Interview',
  'HR Interview',
  'Selected',
  'Rejected'
);

-- 3. DRIVE STATUS ENUM
CREATE TYPE drive_status AS ENUM (
  'Draft',
  'Published',
  'Applications Open',
  'Applications Closed',
  'Shortlisting',
  'Interviewing',
  'Completed',
  'Cancelled'
);

-- 4. PROFILES TABLE (Linked with auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role app_role NOT NULL DEFAULT 'STUDENT',
  avatar_url TEXT,
  department TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. STUDENT PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.student_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  university_id TEXT UNIQUE NOT NULL,
  phone TEXT,
  branch TEXT NOT NULL,
  degree TEXT NOT NULL DEFAULT 'B.Tech',
  graduation_year INT NOT NULL,
  cgpa NUMERIC(4, 2) NOT NULL CHECK (cgpa >= 0.00 AND cgpa <= 10.00),
  tenth_percentage NUMERIC(5, 2) NOT NULL,
  twelfth_percentage NUMERIC(5, 2) NOT NULL,
  active_backlogs INT NOT NULL DEFAULT 0 CHECK (active_backlogs >= 0),
  history_of_backlogs INT NOT NULL DEFAULT 0 CHECK (history_of_backlogs >= 0),
  skills TEXT[] DEFAULT '{}',
  projects JSONB DEFAULT '[]',
  certifications JSONB DEFAULT '[]',
  internships JSONB DEFAULT '[]',
  resume_url TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  portfolio_url TEXT,
  bio TEXT,
  profile_completion_percentage INT DEFAULT 50,
  placement_status TEXT DEFAULT 'Not Placed',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. COMPANIES TABLE
CREATE TABLE IF NOT EXISTS public.companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  logo_url TEXT,
  website TEXT,
  industry TEXT NOT NULL,
  tier TEXT NOT NULL DEFAULT 'Tier 1 (Dream)',
  description TEXT,
  verified BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. PLACEMENT DRIVES TABLE
CREATE TABLE IF NOT EXISTS public.placement_drives (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name TEXT NOT NULL,
  company_logo TEXT,
  company_tier TEXT NOT NULL DEFAULT 'Tier 1 (Dream)',
  job_title TEXT NOT NULL,
  job_description TEXT NOT NULL,
  job_location TEXT NOT NULL,
  employment_type TEXT NOT NULL DEFAULT 'Full-Time',
  ctc_lpa NUMERIC(6, 2) NOT NULL,
  stipend_monthly NUMERIC(10, 2),
  application_deadline TIMESTAMPTZ NOT NULL,
  drive_date TIMESTAMPTZ NOT NULL,
  selection_rounds TEXT[] NOT NULL DEFAULT '{"Online Assessment", "Technical Interview", "HR Interview"}',
  eligible_branches TEXT[] NOT NULL DEFAULT '{"Computer Science & Engineering", "Information Technology"}',
  min_cgpa NUMERIC(4, 2) NOT NULL DEFAULT 6.50,
  max_backlogs INT NOT NULL DEFAULT 0,
  min_tenth_percentage NUMERIC(5, 2) DEFAULT 60.00,
  min_twelfth_percentage NUMERIC(5, 2) DEFAULT 60.00,
  allowed_graduation_years INT[] NOT NULL DEFAULT '{2026}',
  required_skills TEXT[] DEFAULT '{}',
  other_conditions TEXT,
  status drive_status NOT NULL DEFAULT 'Applications Open',
  total_applicants INT NOT NULL DEFAULT 0,
  shortlisted_count INT NOT NULL DEFAULT 0,
  selected_count INT NOT NULL DEFAULT 0,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. DRIVE APPLICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.drive_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  drive_id UUID NOT NULL REFERENCES public.placement_drives(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.student_profiles(id) ON DELETE CASCADE,
  status app_status NOT NULL DEFAULT 'Applied',
  current_round TEXT NOT NULL DEFAULT 'Applied',
  resume_url TEXT,
  feedback TEXT,
  applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(drive_id, student_id)
);

-- 9. APPLICATION STATUS HISTORY (Audit Trail)
CREATE TABLE IF NOT EXISTS public.application_status_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  application_id UUID NOT NULL REFERENCES public.drive_applications(id) ON DELETE CASCADE,
  status app_status NOT NULL,
  round_name TEXT NOT NULL,
  remarks TEXT,
  updated_by UUID REFERENCES public.profiles(id),
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. INTERVIEWS TABLE
CREATE TABLE IF NOT EXISTS public.interviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  application_id UUID NOT NULL REFERENCES public.drive_applications(id) ON DELETE CASCADE,
  drive_id UUID NOT NULL REFERENCES public.placement_drives(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.student_profiles(id) ON DELETE CASCADE,
  round_name TEXT NOT NULL,
  scheduled_at TIMESTAMPTZ NOT NULL,
  mode TEXT NOT NULL DEFAULT 'Virtual',
  location_or_link TEXT NOT NULL,
  interviewer_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Scheduled',
  feedback TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. INTERNSHIP OPPORTUNITIES
CREATE TABLE IF NOT EXISTS public.internship_opportunities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name TEXT NOT NULL,
  company_logo TEXT,
  role_title TEXT NOT NULL,
  duration TEXT NOT NULL,
  stipend_monthly NUMERIC(10, 2) NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'Hybrid',
  required_skills TEXT[] DEFAULT '{}',
  eligibility_summary TEXT NOT NULL,
  application_deadline TIMESTAMPTZ NOT NULL,
  description TEXT NOT NULL,
  openings INT NOT NULL DEFAULT 5,
  status TEXT NOT NULL DEFAULT 'Open',
  applied_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. ALUMNI REFERRALS TABLE
CREATE TABLE IF NOT EXISTS public.alumni_referrals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  alumni_id UUID REFERENCES public.profiles(id),
  alumni_name TEXT NOT NULL,
  alumni_batch TEXT NOT NULL,
  alumni_current_role TEXT NOT NULL,
  company_name TEXT NOT NULL,
  company_logo TEXT,
  role_title TEXT NOT NULL,
  location TEXT NOT NULL,
  job_type TEXT NOT NULL DEFAULT 'Full-Time',
  experience_required TEXT NOT NULL,
  skills TEXT[] DEFAULT '{}',
  referral_deadline TIMESTAMPTZ NOT NULL,
  referral_instructions TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  openings INT NOT NULL DEFAULT 2,
  status TEXT NOT NULL DEFAULT 'Active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 13. MOCK DRIVES & ASSESSMENTS
CREATE TABLE IF NOT EXISTS public.mock_drives (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  rounds TEXT[] NOT NULL DEFAULT '{"Aptitude Test", "Technical Coding", "HR Simulation"}',
  duration_minutes INT NOT NULL DEFAULT 90,
  total_marks INT NOT NULL DEFAULT 100,
  scheduled_at TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'Active',
  registered_count INT NOT NULL DEFAULT 0,
  completed_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.mock_drive_participants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mock_drive_id UUID NOT NULL REFERENCES public.mock_drives(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.student_profiles(id) ON DELETE CASCADE,
  aptitude_score NUMERIC(5, 2) NOT NULL DEFAULT 0,
  coding_score NUMERIC(5, 2) NOT NULL DEFAULT 0,
  interview_score NUMERIC(5, 2) NOT NULL DEFAULT 0,
  total_score NUMERIC(5, 2) NOT NULL DEFAULT 0,
  percentile NUMERIC(5, 2) NOT NULL DEFAULT 0,
  strengths TEXT[] DEFAULT '{}',
  areas_to_improve TEXT[] DEFAULT '{}',
  overall_assessment TEXT,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(mock_drive_id, student_id)
);

-- 14. IN-APP NOTIFICATIONS
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'system',
  link TEXT,
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 15. AUDIT LOGS TABLE
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  actor_name TEXT NOT NULL,
  actor_role app_role NOT NULL,
  action TEXT NOT NULL,
  target_type TEXT NOT NULL,
  target_id TEXT NOT NULL,
  target_title TEXT NOT NULL,
  details TEXT NOT NULL,
  ip_address TEXT DEFAULT '127.0.0.1',
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 16. AI JOB SUMMARIES
CREATE TABLE IF NOT EXISTS public.ai_job_summaries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  drive_id UUID REFERENCES public.placement_drives(id) ON DELETE CASCADE,
  summary_json JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.placement_drives ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drive_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.application_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read all university profiles, but can only update their own
CREATE POLICY "Public profiles are viewable by authenticated users"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Student Profiles: Students view/edit their own; Admins/Officers view all
CREATE POLICY "Students can view own profile"
  ON public.student_profiles FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('PLACEMENT_ADMIN', 'PLACEMENT_OFFICER', 'RECRUITER')
    )
  );

CREATE POLICY "Students can update own profile"
  ON public.student_profiles FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Placement Drives: Published drives visible to all authenticated; creation/editing restricted to Admins/Officers
CREATE POLICY "Anyone authenticated can view published drives"
  ON public.placement_drives FOR SELECT
  TO authenticated
  USING (
    status != 'Draft' OR
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('PLACEMENT_ADMIN', 'PLACEMENT_OFFICER')
    )
  );

CREATE POLICY "Admins and officers can manage drives"
  ON public.placement_drives FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('PLACEMENT_ADMIN', 'PLACEMENT_OFFICER')
    )
  );

-- Applications: Students can see their own applications; Admins/Officers can see all
CREATE POLICY "Students see own applications"
  ON public.drive_applications FOR SELECT
  TO authenticated
  USING (
    student_id IN (SELECT id FROM public.student_profiles WHERE user_id = auth.uid()) OR
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('PLACEMENT_ADMIN', 'PLACEMENT_OFFICER', 'RECRUITER')
    )
  );

CREATE POLICY "Students can submit application"
  ON public.drive_applications FOR INSERT
  TO authenticated
  WITH CHECK (
    student_id IN (SELECT id FROM public.student_profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Admins and officers can update applications"
  ON public.drive_applications FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('PLACEMENT_ADMIN', 'PLACEMENT_OFFICER', 'RECRUITER')
    )
  );

-- Notifications: Only target user can view and update
CREATE POLICY "Users can see own notifications"
  ON public.notifications FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can mark own notifications as read"
  ON public.notifications FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Audit logs: Viewable only by Placement Admin
CREATE POLICY "Admins can view audit logs"
  ON public.audit_logs FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'PLACEMENT_ADMIN'
    )
  );

-- Indexes for high-frequency queries
CREATE INDEX IF NOT EXISTS idx_student_branch ON public.student_profiles(branch);
CREATE INDEX IF NOT EXISTS idx_student_cgpa ON public.student_profiles(cgpa);
CREATE INDEX IF NOT EXISTS idx_drive_status ON public.placement_drives(status);
CREATE INDEX IF NOT EXISTS idx_application_drive ON public.drive_applications(drive_id);
CREATE INDEX IF NOT EXISTS idx_application_student ON public.drive_applications(student_id);
CREATE INDEX IF NOT EXISTS idx_notification_user ON public.notifications(user_id, is_read);
