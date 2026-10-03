"use client";

import React, { useState } from "react";
import {
  User,
  GraduationCap,
  Award,
  Briefcase,
  Code,
  FileText,
  Upload,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  ExternalLink,
  Save,
} from "lucide-react";
import { usePlacementStore } from "@/lib/store";
import { Button } from "@/components/ui/Button";

export default function StudentProfilePage() {
  const { currentStudent, updateStudentProfile } = usePlacementStore();

  const [formData, setFormData] = useState({
    fullName: currentStudent.fullName,
    universityId: currentStudent.universityId,
    email: currentStudent.email,
    phone: currentStudent.phone,
    branch: currentStudent.branch,
    degree: currentStudent.degree,
    graduationYear: currentStudent.graduationYear,
    cgpa: currentStudent.cgpa,
    tenthPercentage: currentStudent.tenthPercentage,
    twelfthPercentage: currentStudent.twelfthPercentage,
    activeBacklogs: currentStudent.activeBacklogs,
    historyOfBacklogs: currentStudent.historyOfBacklogs,
    githubUrl: currentStudent.githubUrl || "",
    linkedinUrl: currentStudent.linkedinUrl || "",
    portfolioUrl: currentStudent.portfolioUrl || "",
    bio: currentStudent.bio || "",
  });

  const [skills, setSkills] = useState<string[]>(currentStudent.skills);
  const [newSkill, setNewSkill] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isUploadingResume, setIsUploadingResume] = useState(false);
  const [resumeFilename, setResumeFilename] = useState(
    currentStudent.resumeUrl ? `${currentStudent.fullName}_Resume.pdf` : ""
  );

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateStudentProfile({
      ...formData,
      skills,
      resumeUrl: resumeFilename ? `/resumes/${resumeFilename}` : currentStudent.resumeUrl,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleSimulateResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploadingResume(true);
      setTimeout(() => {
        setResumeFilename(file.name);
        setIsUploadingResume(false);
        updateStudentProfile({ resumeUrl: `/resumes/${file.name}` });
      }, 800);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-primary-ink font-sans">
            Institutional Student Profile
          </h1>
          <p className="text-xs text-muted-sage mt-0.5">
            Academic credentials, verification documents, and technical competencies
          </p>
        </div>

        {/* Profile Completion Indicator */}
        <div className="flex items-center gap-3 bg-white border border-stone-border rounded-[6px] px-4 py-2">
          <div className="text-right">
            <span className="text-[10px] uppercase font-semibold text-muted-sage block">Readiness</span>
            <span className="text-xs font-bold text-deep-forest font-sans">
              {currentStudent.profileCompletionPercentage}% Complete
            </span>
          </div>
          <div className="w-16 bg-stone-border h-2 rounded-full overflow-hidden">
            <div
              className="bg-deep-forest h-full"
              style={{ width: `${currentStudent.profileCompletionPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-3 bg-success-subtle border border-success-border rounded-[6px] text-xs text-brand-success flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Profile records updated successfully in the placement registry.</span>
        </div>
      )}

      <form onSubmit={handleSaveProfile} className="space-y-6">
        {/* Section 1: Official University Academic Record */}
        <div className="bg-white border border-stone-border rounded-[8px] p-5 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-stone-border">
            <GraduationCap className="w-4 h-4 text-deep-forest" />
            <h2 className="text-sm font-bold text-primary-ink font-sans uppercase tracking-wider">
              Academic & Departmental Standing (Criteria Source)
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="font-medium text-ink-muted block mb-1">Full Name</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-3 py-1.5 border border-stone-border rounded-[5px] bg-stone-light/20 text-primary-ink"
                required
              />
            </div>

            <div>
              <label className="font-medium text-ink-muted block mb-1">University Roll ID</label>
              <input
                type="text"
                value={formData.universityId}
                onChange={(e) => setFormData({ ...formData, universityId: e.target.value })}
                className="w-full px-3 py-1.5 border border-stone-border rounded-[5px] bg-stone-light/40 text-primary-ink font-mono font-medium"
                required
              />
            </div>

            <div>
              <label className="font-medium text-ink-muted block mb-1">Degree Discipline</label>
              <select
                value={formData.branch}
                onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                className="w-full px-3 py-1.5 border border-stone-border rounded-[5px] bg-white text-primary-ink"
              >
                <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Electronics & Communication Engineering">Electronics & Communication Engineering</option>
                <option value="Electrical & Electronics Engineering">Electrical & Electronics Engineering</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
              </select>
            </div>

            <div>
              <label className="font-medium text-ink-muted block mb-1">Degree Program</label>
              <input
                type="text"
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                className="w-full px-3 py-1.5 border border-stone-border rounded-[5px] bg-white text-primary-ink"
              />
            </div>

            <div>
              <label className="font-medium text-ink-muted block mb-1">Graduation Batch</label>
              <input
                type="number"
                value={formData.graduationYear}
                onChange={(e) => setFormData({ ...formData, graduationYear: Number(e.target.value) })}
                className="w-full px-3 py-1.5 border border-stone-border rounded-[5px] bg-white text-primary-ink"
                required
              />
            </div>

            <div>
              <label className="font-medium text-deep-forest block mb-1 font-semibold">
                Cumulative CGPA (Out of 10.0)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="10"
                value={formData.cgpa}
                onChange={(e) => setFormData({ ...formData, cgpa: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-1.5 border-2 border-forest-border rounded-[5px] bg-forest-subtle/20 font-bold text-deep-forest text-sm"
                required
              />
            </div>

            <div>
              <label className="font-medium text-ink-muted block mb-1">Active Backlogs</label>
              <input
                type="number"
                min="0"
                value={formData.activeBacklogs}
                onChange={(e) => setFormData({ ...formData, activeBacklogs: Number(e.target.value) })}
                className="w-full px-3 py-1.5 border border-stone-border rounded-[5px] bg-white text-primary-ink"
                required
              />
            </div>

            <div>
              <label className="font-medium text-ink-muted block mb-1">History of Backlogs</label>
              <input
                type="number"
                min="0"
                value={formData.historyOfBacklogs}
                onChange={(e) => setFormData({ ...formData, historyOfBacklogs: Number(e.target.value) })}
                className="w-full px-3 py-1.5 border border-stone-border rounded-[5px] bg-white text-primary-ink"
              />
            </div>

            <div>
              <label className="font-medium text-ink-muted block mb-1">10th Board Score (%)</label>
              <input
                type="number"
                step="0.1"
                value={formData.tenthPercentage}
                onChange={(e) => setFormData({ ...formData, tenthPercentage: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-1.5 border border-stone-border rounded-[5px] bg-white text-primary-ink"
                required
              />
            </div>

            <div>
              <label className="font-medium text-ink-muted block mb-1">12th / Diploma Score (%)</label>
              <input
                type="number"
                step="0.1"
                value={formData.twelfthPercentage}
                onChange={(e) => setFormData({ ...formData, twelfthPercentage: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-1.5 border border-stone-border rounded-[5px] bg-white text-primary-ink"
                required
              />
            </div>

            <div>
              <label className="font-medium text-ink-muted block mb-1">Primary Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-1.5 border border-stone-border rounded-[5px] bg-stone-light/30 text-primary-ink"
                required
              />
            </div>

            <div>
              <label className="font-medium text-ink-muted block mb-1">Mobile Contact</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-1.5 border border-stone-border rounded-[5px] bg-white text-primary-ink"
                required
              />
            </div>
          </div>
        </div>

        {/* Section 2: Skills & Competency Tags */}
        <div className="bg-white border border-stone-border rounded-[8px] p-5 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-stone-border">
            <Code className="w-4 h-4 text-deep-forest" />
            <h2 className="text-sm font-bold text-primary-ink font-sans uppercase tracking-wider">
              Technical Skill Matrix (Automated Matcher)
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 rounded-[4px] text-xs font-medium bg-forest-subtle text-deep-forest border border-forest-border flex items-center gap-1.5"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="hover:text-brand-error focus:outline-hidden"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 max-w-sm">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddSkill();
                }
              }}
              placeholder="e.g. Kubernetes, React, C++"
              className="px-3 py-1.5 text-xs bg-stone-light/20 border border-stone-border rounded-[5px] flex-1 focus:outline-hidden focus:border-deep-forest text-primary-ink"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddSkill}
              icon={<Plus className="w-3.5 h-3.5" />}
            >
              Add Skill
            </Button>
          </div>
        </div>

        {/* Section 3: Resume & Professional Portfolio Links */}
        <div className="bg-white border border-stone-border rounded-[8px] p-5 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-stone-border">
            <FileText className="w-4 h-4 text-deep-forest" />
            <h2 className="text-sm font-bold text-primary-ink font-sans uppercase tracking-wider">
              Resume & Industry Links
            </h2>
          </div>

          {/* Resume Upload Box */}
          <div className="p-4 border border-dashed border-stone-border rounded-[6px] bg-ivory-light flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[4px] bg-stone-light border border-stone-border flex items-center justify-center text-deep-forest">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-semibold text-primary-ink">
                  {resumeFilename || "No Resume Uploaded"}
                </div>
                <p className="text-[11px] text-muted-sage">
                  PDF format (Max 5MB). Verified by Placement Cell for recruitment drives.
                </p>
              </div>
            </div>

            <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-stone-border hover:border-muted-sage text-xs font-semibold text-primary-ink rounded-[4px] cursor-pointer shadow-2xs">
              <Upload className="w-3.5 h-3.5" />
              <span>{isUploadingResume ? "Uploading..." : "Upload New PDF"}</span>
              <input
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handleSimulateResumeUpload}
              />
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="font-medium text-ink-muted block mb-1">GitHub Profile</label>
              <input
                type="url"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                placeholder="https://github.com/username"
                className="w-full px-3 py-1.5 border border-stone-border rounded-[5px] bg-white text-primary-ink"
              />
            </div>
            <div>
              <label className="font-medium text-ink-muted block mb-1">LinkedIn Profile</label>
              <input
                type="url"
                value={formData.linkedinUrl}
                onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                placeholder="https://linkedin.com/in/username"
                className="w-full px-3 py-1.5 border border-stone-border rounded-[5px] bg-white text-primary-ink"
              />
            </div>
            <div>
              <label className="font-medium text-ink-muted block mb-1">Portfolio Website</label>
              <input
                type="url"
                value={formData.portfolioUrl}
                onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                placeholder="https://yourportfolio.dev"
                className="w-full px-3 py-1.5 border border-stone-border rounded-[5px] bg-white text-primary-ink"
              />
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button type="submit" variant="primary" size="md" icon={<Save className="w-4 h-4" />}>
            Save & Update Records
          </Button>
        </div>
      </form>
    </div>
  );
}
