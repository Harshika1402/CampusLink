"use client";

import React, { useState } from "react";
import {
  Users,
  Building2,
  MapPin,
  Calendar,
  Send,
  Mail,
  CheckCircle2,
  Search,
  ExternalLink,
} from "lucide-react";
import { usePlacementStore } from "@/lib/store";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { AlumniReferral } from "@/types";
import { formatDate } from "@/lib/utils";

export default function StudentAlumniReferralsPage() {
  const { alumniReferrals, currentStudent, createAlumniReferral, currentRole } =
    usePlacementStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRef, setSelectedRef] = useState<AlumniReferral | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
  const [statement, setStatement] = useState("");
  const [submittedRefs, setSubmittedRefs] = useState<string[]>([]);

  // New referral form state (for Alumni role)
  const [newPost, setNewPost] = useState({
    companyName: "",
    roleTitle: "",
    location: "Bengaluru, India",
    jobType: "Full-Time" as const,
    experienceRequired: "2026 Batch Graduates",
    skills: "Java, Spring Boot, Microservices",
    referralDeadline: "2026-11-15T23:59:59Z",
    referralInstructions: "Submit 1-page PDF resume with GitHub link. Highlight algorithms and cloud architecture.",
    openings: 2,
    status: "Active" as const,
  });

  const filtered = alumniReferrals.filter(
    (item) =>
      item.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.roleTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.alumniName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.skills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSubmitReferralRequest = () => {
    if (selectedRef) {
      setSubmittedRefs([...submittedRefs, selectedRef.id]);
      setIsSubmitModalOpen(false);
      setStatement("");
      setSelectedRef(null);
    }
  };

  const handleCreateNewPost = (e: React.FormEvent) => {
    e.preventDefault();
    createAlumniReferral({
      ...newPost,
      alumniName: currentStudent.fullName,
      alumniBatch: `Class of ${currentStudent.graduationYear - 2}`,
      alumniCurrentRole: "Senior Engineer",
      skills: newPost.skills.split(",").map((s) => s.trim()),
      contactEmail: "alumni.referral@university.edu.in",
    });
    setIsNewPostModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-primary-ink font-sans">
            Alumni Corporate Referral Network
          </h1>
          <p className="text-xs text-muted-sage mt-0.5">
            Internal career opportunities and referral channels shared directly by verified alumni
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative min-w-[200px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-sage" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by company, role, or alumni..."
              className="w-full pl-8.5 pr-3 py-1.5 text-xs bg-white border border-stone-border rounded-[5px] focus:outline-hidden focus:border-deep-forest text-primary-ink placeholder:text-muted-sage"
            />
          </div>

          {(currentRole === "ALUMNI" || currentRole === "PLACEMENT_ADMIN") && (
            <Button
              size="sm"
              variant="primary"
              onClick={() => setIsNewPostModalOpen(true)}
            >
              Post Referral Opportunity
            </Button>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => {
          const isSubmitted = submittedRefs.includes(item.id);

          return (
            <div
              key={item.id}
              className="bg-white border border-stone-border rounded-[8px] p-5 flex flex-col justify-between hover:border-muted-sage transition-all shadow-2xs"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-sm font-bold text-primary-ink font-sans">
                      {item.companyName}
                    </span>
                    <h3 className="text-xs font-semibold text-deep-forest mt-0.5">
                      {item.roleTitle}
                    </h3>
                  </div>

                  <span className="text-[10px] font-bold px-2 py-0.5 bg-brass-subtle text-antique-brass border border-brass-border rounded-full">
                    {item.openings} Referral Slot{item.openings === 1 ? "" : "s"}
                  </span>
                </div>

                {/* Alumni Submitter Information */}
                <div className="mt-3 p-2.5 bg-stone-light/30 border border-stone-border/80 rounded-[5px] text-xs">
                  <div className="font-semibold text-primary-ink flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-deep-forest" />
                    <span>{item.alumniName}</span>
                  </div>
                  <div className="text-[11px] text-muted-sage mt-0.5">
                    {item.alumniCurrentRole} • {item.alumniBatch}
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2 text-[11px] text-muted-sage">
                  <MapPin className="w-3 h-3 text-deep-forest" />
                  <span>{item.location}</span>
                  <span>•</span>
                  <span>{item.experienceRequired}</span>
                </div>

                {/* Skills tags */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {item.skills.map((sk, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[10px] font-medium bg-stone-light text-ink-muted rounded-[3px] border border-stone-border"
                    >
                      {sk}
                    </span>
                  ))}
                </div>

                {/* Referral Instructions */}
                <div className="mt-3 text-xs text-ink-muted bg-ivory-light/50 p-3 rounded-[5px] border border-stone-border/60">
                  <strong className="text-[10px] uppercase font-semibold text-muted-sage block mb-1">
                    Referral Instructions:
                  </strong>
                  <p className="line-clamp-2 text-[11px] leading-relaxed">
                    {item.referralInstructions}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-border/70 flex items-center justify-between">
                <span className="text-[10px] text-brand-error">
                  Deadline: {formatDate(item.referralDeadline)}
                </span>

                {isSubmitted ? (
                  <span className="px-3 py-1 bg-forest-subtle text-deep-forest border border-forest-border rounded-[4px] text-xs font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Request Sent
                  </span>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelectedRef(item);
                      setIsSubmitModalOpen(true);
                    }}
                  >
                    Request Referral
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Referral Application Modal */}
      {selectedRef && (
        <Modal
          isOpen={isSubmitModalOpen}
          onClose={() => {
            setIsSubmitModalOpen(false);
            setSelectedRef(null);
          }}
          title={`Request Referral: ${selectedRef.companyName}`}
          subtitle={`${selectedRef.roleTitle} • Submitting to ${selectedRef.alumniName}`}
          maxWidth="md"
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-ivory-light border border-stone-border rounded-[6px] text-ink-muted">
              <strong className="text-primary-ink block mb-0.5">Alumni Note:</strong>
              {selectedRef.referralInstructions}
            </div>

            <div>
              <label className="font-semibold text-primary-ink block mb-1">
                Statement of Fit & Qualifications
              </label>
              <textarea
                rows={4}
                value={statement}
                onChange={(e) => setStatement(e.target.value)}
                placeholder="Briefly state why you are a strong fit for this role, mentioning relevant projects or technologies..."
                className="w-full p-2.5 bg-white border border-stone-border rounded-[6px] focus:outline-hidden focus:border-deep-forest text-primary-ink"
              />
            </div>

            <div className="p-2.5 bg-stone-light/40 border border-stone-border rounded-[6px] text-[11px] text-muted-sage">
              Attached Verified Resume:{" "}
              <strong className="text-primary-ink">{currentStudent.fullName}_Resume.pdf</strong> (CGPA: {currentStudent.cgpa})
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-border">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsSubmitModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                icon={<Send className="w-3.5 h-3.5" />}
                onClick={handleSubmitReferralRequest}
              >
                Submit to Alumni
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Post New Referral Modal (For Alumni / Admins) */}
      <Modal
        isOpen={isNewPostModalOpen}
        onClose={() => setIsNewPostModalOpen(false)}
        title="Post Corporate Referral Opportunity"
        subtitle="Share internal hiring opportunities with university students"
        maxWidth="lg"
      >
        <form onSubmit={handleCreateNewPost} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-medium text-ink-muted block mb-1">Company Name</label>
              <input
                type="text"
                value={newPost.companyName}
                onChange={(e) => setNewPost({ ...newPost, companyName: e.target.value })}
                placeholder="e.g. Google, Amazon, Uber"
                className="w-full px-3 py-1.5 border border-stone-border rounded-[5px]"
                required
              />
            </div>
            <div>
              <label className="font-medium text-ink-muted block mb-1">Role Title</label>
              <input
                type="text"
                value={newPost.roleTitle}
                onChange={(e) => setNewPost({ ...newPost, roleTitle: e.target.value })}
                placeholder="e.g. Software Engineer (Backend)"
                className="w-full px-3 py-1.5 border border-stone-border rounded-[5px]"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-medium text-ink-muted block mb-1">Location</label>
              <input
                type="text"
                value={newPost.location}
                onChange={(e) => setNewPost({ ...newPost, location: e.target.value })}
                className="w-full px-3 py-1.5 border border-stone-border rounded-[5px]"
                required
              />
            </div>
            <div>
              <label className="font-medium text-ink-muted block mb-1">Referral Slots Available</label>
              <input
                type="number"
                min="1"
                value={newPost.openings}
                onChange={(e) => setNewPost({ ...newPost, openings: Number(e.target.value) })}
                className="w-full px-3 py-1.5 border border-stone-border rounded-[5px]"
                required
              />
            </div>
          </div>

          <div>
            <label className="font-medium text-ink-muted block mb-1">Required Skills (Comma separated)</label>
            <input
              type="text"
              value={newPost.skills}
              onChange={(e) => setNewPost({ ...newPost, skills: e.target.value })}
              className="w-full px-3 py-1.5 border border-stone-border rounded-[5px]"
              required
            />
          </div>

          <div>
            <label className="font-medium text-ink-muted block mb-1">Referral Instructions / Criteria</label>
            <textarea
              rows={3}
              value={newPost.referralInstructions}
              onChange={(e) => setNewPost({ ...newPost, referralInstructions: e.target.value })}
              className="w-full p-2.5 border border-stone-border rounded-[5px]"
              required
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-border">
            <Button variant="outline" size="sm" onClick={() => setIsNewPostModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Publish Referral
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
