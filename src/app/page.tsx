"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Search,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Building,
  Landmark,
  FileText,
  Users,
  TrendingUp,
  Check,
  GraduationCap,
  Briefcase,
  ShieldCheck,
  Bell,
  Sparkles,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Modal } from "@/components/ui/Modal";
import { usePlacementStore, PlacementStoreProvider } from "@/lib/store";
import { UserRole } from "@/types";
const ORIGINAL_PARTNER_LOGOS = [
  { name: "Microsoft", src: "/logos/microsoft.svg", height: "h-5 sm:h-5.5" },
  { name: "Google", src: "/logos/google.svg", height: "h-5 sm:h-5.5" },
  { name: "Amazon", src: "/logos/amazon.svg", height: "h-5 sm:h-5.5" },
  { name: "Adobe", src: "/logos/adobe.svg", height: "h-5 sm:h-5.5" },
  { name: "Accenture", src: "/logos/accenture.svg", height: "h-5 sm:h-5.5" },
  { name: "Flipkart", src: "/logos/flipkart.svg", height: "h-5.5 sm:h-6" },
  { name: "Deloitte", src: "/logos/deloitte.svg", height: "h-3.5 sm:h-4" },
  { name: "Infosys", src: "/logos/infosys.svg", height: "h-5 sm:h-5.5" },
  { name: "PayPal", src: "/logos/paypal.svg", height: "h-5 sm:h-5.5" },
  { name: "TCS", src: "/logos/tcs.svg", height: "h-5 sm:h-5.5" },
];

function LandingPageContent() {
  const router = useRouter();
  const { switchRole } = usePlacementStore();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [marqueeDirection, setMarqueeDirection] = useState<"forward" | "reverse">("forward");

  const handleRoleSelect = (role: UserRole) => {
    switchRole(role);
    setIsLoginModalOpen(false);
    if (role === "STUDENT") {
      router.push("/dashboard/student");
    } else {
      router.push("/dashboard/admin");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#171A1F] flex flex-col font-sans selection:bg-[#173C35]/15 selection:text-[#173C35]">
      {/* ============================================================== */}
      {/* 1. NAVBAR / HEADER */}
      {/* ============================================================== */}
      <header className="w-full bg-[#FAF7F2] border-b border-[#E8E3DA] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 h-20 flex items-center justify-between">
          {/* Logo */}
          <Logo href="/" size="md" />

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-[13px] font-medium text-[#2D3139]">
            <Link href="/" className="font-semibold text-[#171A1F] hover:text-[#173C35] transition-colors">
              Home
            </Link>
            <Link href="/dashboard/student/drives" className="hover:text-[#173C35] transition-colors">
              Drives
            </Link>
            <Link href="/dashboard/student/mock-drives" className="hover:text-[#173C35] transition-colors">
              Resources
            </Link>
            <Link href="/dashboard/student/alumni-referrals" className="hover:text-[#173C35] transition-colors">
              Alumni
            </Link>
            <Link href="/dashboard/student/mock-drives" className="hover:text-[#173C35] transition-colors">
              Mock Drives
            </Link>
            <a href="#ecosystem" className="hover:text-[#173C35] transition-colors">
              About
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/dashboard/student/drives")}
              className="p-2 text-[#4B515D] hover:text-[#171A1F] transition-colors"
              aria-label="Search"
            >
              <Search className="w-4 h-4 stroke-[2]" />
            </button>

            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="px-4 py-2 text-xs font-medium text-[#171A1F] bg-[#FAF7F2] border border-[#D5CFBF] hover:bg-[#F2ECE1] rounded-[6px] transition-colors cursor-pointer"
            >
              Login
            </button>

            <button
              onClick={() => handleRoleSelect("STUDENT")}
              className="px-4 py-2 text-xs font-semibold text-[#FAF7F2] bg-[#173C35] hover:bg-[#122F2A] rounded-[6px] transition-colors shadow-2xs cursor-pointer"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* ============================================================== */}
        {/* 2. HERO SECTION */}
        {/* ============================================================== */}
        <section className="max-w-7xl mx-auto px-6 sm:px-10 pt-12 pb-16 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#718078] uppercase block">
                CONNECTING TALENT WITH OPPORTUNITIES
              </span>

              <h1 className="text-4xl sm:text-6xl lg:text-[68px] leading-[1.08] font-normal font-serif tracking-tight text-[#171A1F]">
                Your Next{" "}
                <span className="text-[#A87B51] font-serif block sm:inline">Opportunity</span>{" "}
                Starts Here
              </h1>

              <p className="text-[13px] sm:text-sm text-[#4B515D] leading-relaxed max-w-lg">
                A unified placement platform to help students explore opportunities,
                apply for drives, and build successful careers with guidance and support
                from the placement cell and alumni network.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/dashboard/student/drives"
                  className="px-5 py-2.5 bg-[#173C35] hover:bg-[#122F2A] text-[#FAF7F2] text-xs font-semibold rounded-[6px] inline-flex items-center gap-2 transition-all shadow-xs"
                >
                  <span>Explore Drives</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <a
                  href="#ecosystem"
                  className="px-5 py-2.5 bg-transparent hover:bg-white text-[#171A1F] border border-[#D5CFBF] text-xs font-semibold rounded-[6px] transition-all"
                >
                  Learn More
                </a>
              </div>

              {/* Metrics Strip */}
              <div className="pt-8 border-t border-[#E8E3DA] grid grid-cols-3 gap-4">
                <div>
                  <div className="text-2xl sm:text-3xl font-normal font-serif text-[#171A1F]">
                    120+
                  </div>
                  <div className="text-[11px] text-[#718078] font-medium mt-0.5">
                    Placement Drives
                  </div>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-normal font-serif text-[#171A1F]">
                    85%
                  </div>
                  <div className="text-[11px] text-[#718078] font-medium mt-0.5">
                    Eligible Students Placed
                  </div>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-normal font-serif text-[#171A1F]">
                    300+
                  </div>
                  <div className="text-[11px] text-[#718078] font-medium mt-0.5">
                    Recruiting Companies
                  </div>
                </div>
              </div>
            </div>

            {/* Right Visual Column (Architectural Arch & Script Handwriting) */}
            <div className="lg:col-span-6 relative flex flex-col items-center lg:items-end">
              {/* Organic Dark Green Backdrop Shape */}
              <div className="relative w-full max-w-[500px]">
                {/* Curved Asymmetric Container */}
                <div className="relative rounded-t-[120px] rounded-br-[40px] rounded-bl-[12px] overflow-hidden shadow-md border-4 border-white bg-[#173C35]/10 aspect-4/3 sm:aspect-16/11">
                  <Image
                    src="/images/hero_campus_building.jpg"
                    alt="University Campus Architecture"
                    fill
                    priority
                    className="object-cover"
                  />

                  {/* Subtle Dark Gradient at bottom of image for contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />

                  {/* Floating Pill Card: New Drive Accenture */}
                  <div className="absolute top-6 left-6 right-6 sm:right-auto sm:max-w-[280px] bg-white/95 backdrop-blur-md rounded-[12px] p-3 shadow-lg border border-white/60 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-[6px] bg-[#FAF5EE] border border-[#DFCDB1] flex items-center justify-center text-[#B08D57] shrink-0">
                        <Building className="w-4 h-4" />
                      </div>
                      <div className="leading-tight">
                        <div className="text-[11px] font-bold text-[#171A1F]">New Drive</div>
                        <div className="text-[10px] text-[#718078] mt-0.5">Accenture is now hiring!</div>
                        <div className="text-[9px] font-semibold text-[#173C35] mt-0.5">
                          Eligible for 3,200+ students
                        </div>
                      </div>
                    </div>

                    <Link
                      href="/dashboard/student/drives"
                      className="w-7 h-7 rounded-full bg-[#FAF7F2] border border-[#E8E3DA] hover:bg-[#173C35] hover:text-white flex items-center justify-center text-[#171A1F] transition-colors shrink-0"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Elegant Handwritten / Cursive Callout under the photo */}
                <div className="mt-4 text-right pr-4">
                  <p
                    className="font-script text-2xl sm:text-3xl text-[#2D3139]/85 leading-tight tracking-wide -rotate-3 select-none"
                    style={{ fontFamily: "var(--font-script), 'Caveat', cursive" }}
                  >
                    Bridging <br />
                    Students <br />
                    Companies <br />
                    and Opportunities
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 3. FOUR FEATURE CARDS STRIP (ENHANCED) */}
        {/* ============================================================== */}
        <section className="max-w-7xl mx-auto px-6 sm:px-10 pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Card 1: Placement Drives */}
            <Link
              href="/dashboard/student/drives"
              className="group relative bg-white border border-[#E7E2D7] hover:border-[#173C35]/35 rounded-[20px] p-6 sm:p-7 shadow-[0_4px_20px_rgba(23,60,53,0.03),0_1px_2px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_-12px_rgba(23,60,53,0.12),0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-300 flex flex-col justify-between cursor-pointer -translate-y-0 hover:-translate-y-1.5 overflow-hidden"
            >
              {/* Subtle ambient radial glow on hover */}
              <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-[#B56E3A]/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div>
                {/* Header: Icon + Pill Badge */}
                <div className="flex items-center justify-between gap-2">
                  <div className="w-12 h-12 rounded-[13px] bg-[#FAF1E8] border border-[#F0DDCB] flex items-center justify-center text-[#B56E3A] group-hover:scale-105 group-hover:shadow-xs transition-all duration-300 shadow-2xs">
                    <Landmark className="w-5 h-5 stroke-[1.8]" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-semibold bg-[#FAF4ED] text-[#9A501F] border border-[#F3DFC9]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#173C35] animate-pulse" />
                    18 Live Drives
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-[17px] font-bold text-[#171A1F] font-sans group-hover:text-[#173C35] transition-colors tracking-tight mt-4">
                  Placement Drives
                </h3>
                <p className="text-[13px] text-[#555E5A] leading-[1.6] mt-2">
                  Explore and apply to company drives with automated eligibility checks.
                </p>

                {/* Contextual Value Chips */}
                <div className="mt-4 pt-3.5 border-t border-[#F0EBE1] flex items-center justify-between gap-1 text-[11px]">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-medium px-2 py-0.5 rounded-md bg-[#FAF7F2] text-[#4A534F] border border-[#E8E3DA]">Google</span>
                    <span className="font-medium px-2 py-0.5 rounded-md bg-[#FAF7F2] text-[#4A534F] border border-[#E8E3DA]">Microsoft</span>
                    <span className="font-medium px-2 py-0.5 rounded-md bg-[#FAF7F2] text-[#4A534F] border border-[#E8E3DA]">Deloitte</span>
                  </div>
                  <span className="font-semibold text-[#173C35] shrink-0 text-[10.5px]">Auto-Eligible ✓</span>
                </div>
              </div>

              {/* Action Footer */}
              <div className="pt-5 mt-auto flex items-center justify-between">
                <div className="w-9 h-9 rounded-full bg-[#FAF7F2] border border-[#E2DDD3] text-[#171A1F] group-hover:bg-[#173C35] group-hover:text-white group-hover:border-[#173C35] flex items-center justify-center transition-all duration-300 shadow-2xs group-hover:scale-105">
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
                <span className="text-[12px] font-semibold text-[#6E7873] group-hover:text-[#173C35] flex items-center gap-1 transition-all duration-200">
                  Explore Drives
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200" />
                </span>
              </div>
            </Link>

            {/* Card 2: AI JD Summarizer */}
            <Link
              href="/dashboard/student/drives"
              className="group relative bg-white border border-[#E7E2D7] hover:border-[#173C35]/35 rounded-[20px] p-6 sm:p-7 shadow-[0_4px_20px_rgba(23,60,53,0.03),0_1px_2px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_-12px_rgba(23,60,53,0.12),0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-300 flex flex-col justify-between cursor-pointer -translate-y-0 hover:-translate-y-1.5 overflow-hidden"
            >
              {/* Subtle ambient radial glow on hover */}
              <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-[#173C35]/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div>
                {/* Header: Icon + Pill Badge */}
                <div className="flex items-center justify-between gap-2">
                  <div className="w-12 h-12 rounded-[13px] bg-[#EBF3EF] border border-[#CDE3D7] flex items-center justify-center text-[#173C35] group-hover:scale-105 group-hover:shadow-xs transition-all duration-300 shadow-2xs">
                    <FileText className="w-5 h-5 stroke-[1.8]" />
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10.5px] font-semibold bg-[#EDF6F2] text-[#173C35] border border-[#CEE5D8]">
                    <Sparkles className="w-3 h-3 text-[#173C35]" />
                    Gemini AI
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-[17px] font-bold text-[#171A1F] font-sans group-hover:text-[#173C35] transition-colors tracking-tight mt-4">
                  AI JD Summarizer
                </h3>
                <p className="text-[13px] text-[#555E5A] leading-[1.6] mt-2">
                  Get concise summaries of job descriptions with key skills and requirements using Gemini AI.
                </p>

                {/* Contextual Value Chips */}
                <div className="mt-4 pt-3.5 border-t border-[#F0EBE1] flex items-center justify-between gap-1 text-[11px]">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-medium px-2 py-0.5 rounded-md bg-[#FAF7F2] text-[#4A534F] border border-[#E8E3DA]">Skills Match</span>
                    <span className="font-medium px-2 py-0.5 rounded-md bg-[#FAF7F2] text-[#4A534F] border border-[#E8E3DA]">Cutoffs</span>
                    <span className="font-medium px-2 py-0.5 rounded-md bg-[#FAF7F2] text-[#4A534F] border border-[#E8E3DA]">Rounds</span>
                  </div>
                  <span className="font-semibold text-[#173C35] shrink-0 text-[10.5px]">Instant</span>
                </div>
              </div>

              {/* Action Footer */}
              <div className="pt-5 mt-auto flex items-center justify-between">
                <div className="w-9 h-9 rounded-full bg-[#FAF7F2] border border-[#E2DDD3] text-[#171A1F] group-hover:bg-[#173C35] group-hover:text-white group-hover:border-[#173C35] flex items-center justify-center transition-all duration-300 shadow-2xs group-hover:scale-105">
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
                <span className="text-[12px] font-semibold text-[#6E7873] group-hover:text-[#173C35] flex items-center gap-1 transition-all duration-200">
                  Analyze JD
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200" />
                </span>
              </div>
            </Link>

            {/* Card 3: Alumni Referral Board */}
            <Link
              href="/dashboard/student/alumni-referrals"
              className="group relative bg-white border border-[#E7E2D7] hover:border-[#173C35]/35 rounded-[20px] p-6 sm:p-7 shadow-[0_4px_20px_rgba(23,60,53,0.03),0_1px_2px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_-12px_rgba(23,60,53,0.12),0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-300 flex flex-col justify-between cursor-pointer -translate-y-0 hover:-translate-y-1.5 overflow-hidden"
            >
              {/* Subtle ambient radial glow on hover */}
              <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-[#B08D57]/15 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div>
                {/* Header: Icon + Pill Badge */}
                <div className="flex items-center justify-between gap-2">
                  <div className="w-12 h-12 rounded-[13px] bg-[#FAF5EB] border border-[#EEDFCA] flex items-center justify-center text-[#B08D57] group-hover:scale-105 group-hover:shadow-xs transition-all duration-300 shadow-2xs">
                    <Users className="w-5 h-5 stroke-[1.8]" />
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10.5px] font-semibold bg-[#FAF5EB] text-[#8C6B34] border border-[#EEDFCA]">
                    450+ Mentors
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-[17px] font-bold text-[#171A1F] font-sans group-hover:text-[#173C35] transition-colors tracking-tight mt-4">
                  Alumni Referral Board
                </h3>
                <p className="text-[13px] text-[#555E5A] leading-[1.6] mt-2">
                  Connect with alumni and explore referral opportunities.
                </p>

                {/* Contextual Value Chips */}
                <div className="mt-4 pt-3.5 border-t border-[#F0EBE1] flex items-center justify-between gap-1 text-[11px]">
                  <div className="flex items-center -space-x-1.5">
                    <span className="w-5.5 h-5.5 rounded-full bg-[#173C35] text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-white">AM</span>
                    <span className="w-5.5 h-5.5 rounded-full bg-[#B08D57] text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-white">RK</span>
                    <span className="w-5.5 h-5.5 rounded-full bg-[#2C4863] text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-white">PS</span>
                    <span className="text-[11px] font-medium text-[#718078] pl-2.5">Top Tech Alumni</span>
                  </div>
                  <span className="font-semibold text-[#B08D57] shrink-0 text-[10.5px]">Referrals</span>
                </div>
              </div>

              {/* Action Footer */}
              <div className="pt-5 mt-auto flex items-center justify-between">
                <div className="w-9 h-9 rounded-full bg-[#FAF7F2] border border-[#E2DDD3] text-[#171A1F] group-hover:bg-[#173C35] group-hover:text-white group-hover:border-[#173C35] flex items-center justify-center transition-all duration-300 shadow-2xs group-hover:scale-105">
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
                <span className="text-[12px] font-semibold text-[#6E7873] group-hover:text-[#173C35] flex items-center gap-1 transition-all duration-200">
                  Find Referrals
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200" />
                </span>
              </div>
            </Link>

            {/* Card 4: Mock Placement Drives */}
            <Link
              href="/dashboard/student/mock-drives"
              className="group relative bg-white border border-[#E7E2D7] hover:border-[#173C35]/35 rounded-[20px] p-6 sm:p-7 shadow-[0_4px_20px_rgba(23,60,53,0.03),0_1px_2px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_-12px_rgba(23,60,53,0.12),0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-300 flex flex-col justify-between cursor-pointer -translate-y-0 hover:-translate-y-1.5 overflow-hidden"
            >
              {/* Subtle ambient radial glow on hover */}
              <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-[#3B4E63]/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div>
                {/* Header: Icon + Pill Badge */}
                <div className="flex items-center justify-between gap-2">
                  <div className="w-12 h-12 rounded-[13px] bg-[#EFF3F6] border border-[#D5E0EA] flex items-center justify-center text-[#3B4E63] group-hover:scale-105 group-hover:shadow-xs transition-all duration-300 shadow-2xs">
                    <TrendingUp className="w-5 h-5 stroke-[1.8]" />
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10.5px] font-semibold bg-[#F0F4F8] text-[#2C4863] border border-[#D5E1ED]">
                    Timed 60m
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-[17px] font-bold text-[#171A1F] font-sans group-hover:text-[#173C35] transition-colors tracking-tight mt-4">
                  Mock Placement Drives
                </h3>
                <p className="text-[13px] text-[#555E5A] leading-[1.6] mt-2">
                  Participate in mock drives and assess your preparation.
                </p>

                {/* Contextual Value Chips */}
                <div className="mt-4 pt-3.5 border-t border-[#F0EBE1] flex items-center justify-between gap-1 text-[11px]">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-medium px-2 py-0.5 rounded-md bg-[#FAF7F2] text-[#4A534F] border border-[#E8E3DA]">Aptitude</span>
                    <span className="font-medium px-2 py-0.5 rounded-md bg-[#FAF7F2] text-[#4A534F] border border-[#E8E3DA]">Coding</span>
                    <span className="font-medium px-2 py-0.5 rounded-md bg-[#FAF7F2] text-[#4A534F] border border-[#E8E3DA]">HR</span>
                  </div>
                  <span className="font-semibold text-[#3B4E63] shrink-0 text-[10.5px]">Scorecard</span>
                </div>
              </div>

              {/* Action Footer */}
              <div className="pt-5 mt-auto flex items-center justify-between">
                <div className="w-9 h-9 rounded-full bg-[#FAF7F2] border border-[#E2DDD3] text-[#171A1F] group-hover:bg-[#173C35] group-hover:text-white group-hover:border-[#173C35] flex items-center justify-center transition-all duration-300 shadow-2xs group-hover:scale-105">
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
                <span className="text-[12px] font-semibold text-[#6E7873] group-hover:text-[#173C35] flex items-center gap-1 transition-all duration-200">
                  Take Mock Test
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200" />
                </span>
              </div>
            </Link>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 4. DARK FOREST GREEN SECTION: BUILT FOR EVERY STAKEHOLDER */}
        {/* ============================================================== */}
        <section id="ecosystem" className="bg-[#102B24] text-white py-20 px-6 sm:px-10">
          <div className="max-w-7xl mx-auto space-y-12">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div>
                <span className="text-[11px] font-bold tracking-[0.2em] text-[#D0C5B4] uppercase block">
                  BUILT FOR EVERY STAKEHOLDER
                </span>
                <h2 className="text-3xl sm:text-5xl font-serif tracking-tight text-[#FAF7F2] mt-2">
                  A Complete Placement Ecosystem
                </h2>
              </div>

              <p className="text-xs sm:text-[13px] text-[#A6BCB4] max-w-md leading-relaxed">
                Tailored features for students, placement cell coordinators, and alumni to make the placement process seamless and efficient.
              </p>
            </div>

            {/* 3 Stakeholder Cards matching exact screenshot */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Card 1: For Students */}
              <div className="bg-[#DFE3DF] rounded-[18px] h-[260px] sm:h-[270px] relative overflow-hidden flex flex-col justify-between shadow-2xs group border border-[#D5DCD5]/60">
                {/* Background Photo with Gradient Blend on Left */}
                <div className="absolute right-0 top-0 bottom-0 w-[54%] pointer-events-none">
                  <Image
                    src="/images/student_study_v2.jpg"
                    alt="Student Study Desk with Plant"
                    fill
                    className="object-cover object-right"
                  />
                  {/* Soft subtle gradient fade into the light stone card */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#DFE3DF] via-[#DFE3DF]/50 to-transparent" />
                </div>

                {/* Left Content */}
                <div className="p-6 relative z-10 max-w-[62%] flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-2.5 mb-4">
                      <div className="w-9 h-9 rounded-full bg-[#112A24] text-white flex items-center justify-center shrink-0 shadow-xs">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <h3 className="text-[15px] font-bold text-[#171A1F] font-sans">
                        For Students
                      </h3>
                    </div>

                    <ul className="space-y-2 text-[12px] text-[#2C3330] font-medium leading-snug">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#171A1F] stroke-[2.5] shrink-0" />
                        <span>View eligible drives</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#171A1F] stroke-[2.5] shrink-0" />
                        <span>Apply and track status</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#171A1F] stroke-[2.5] shrink-0" />
                        <span>Access AI JD summaries</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#171A1F] stroke-[2.5] shrink-0" />
                        <span>Prepare with mock drives</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Bottom Right Circular Arrow Button */}
                <Link
                  href="/dashboard/student"
                  className="w-9 h-9 rounded-full bg-white shadow-md text-[#112A24] hover:bg-[#FAF7F2] flex items-center justify-center transition-transform hover:scale-105 absolute bottom-5 right-5 z-20 cursor-pointer"
                  aria-label="For Students"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Card 2: For Placement Cell */}
              <div className="bg-[#DFE3DF] rounded-[18px] h-[260px] sm:h-[270px] relative overflow-hidden flex flex-col justify-between shadow-2xs group border border-[#D5DCD5]/60">
                {/* Background Photo on Right */}
                <div className="absolute right-0 top-0 bottom-0 w-[45%] pointer-events-none">
                  <Image
                    src="/images/placement_analytics_v2.jpg"
                    alt="Placement Office Analytics Laptop"
                    fill
                    className="object-cover object-left"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#DFE3DF] via-transparent to-transparent w-8" />
                </div>

                {/* Left Content */}
                <div className="p-6 relative z-10 max-w-[62%] flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-2.5 mb-4">
                      <div className="w-9 h-9 rounded-full bg-[#112A24] text-white flex items-center justify-center shrink-0 shadow-xs">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <h3 className="text-[15px] font-bold text-[#171A1F] font-sans">
                        For Placement Cell
                      </h3>
                    </div>

                    <ul className="space-y-2 text-[12px] text-[#2C3330] font-medium leading-snug">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#171A1F] stroke-[2.5] shrink-0" />
                        <span>Create and manage drives</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#171A1F] stroke-[2.5] shrink-0" />
                        <span>Automatic eligibility filtering</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#171A1F] stroke-[2.5] shrink-0" />
                        <span>Track applications and results</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#171A1F] stroke-[2.5] shrink-0" />
                        <span>Generate reports and insights</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Bottom Right Circular Arrow Button */}
                <Link
                  href="/dashboard/admin"
                  className="w-9 h-9 rounded-full bg-white shadow-md text-[#112A24] hover:bg-[#FAF7F2] flex items-center justify-center transition-transform hover:scale-105 absolute bottom-5 right-5 z-20 cursor-pointer"
                  aria-label="For Placement Cell"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Card 3: For Alumni */}
              <div className="bg-[#DFE3DF] rounded-[18px] h-[260px] sm:h-[270px] relative overflow-hidden flex flex-col justify-between shadow-2xs group border border-[#D5DCD5]/60">
                {/* Background Photo on Right */}
                <div className="absolute right-0 top-0 bottom-0 w-[45%] pointer-events-none">
                  <Image
                    src="/images/alumni_campus_v2.jpg"
                    alt="Alumni Campus Community Building"
                    fill
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#DFE3DF] via-transparent to-transparent w-6" />
                </div>

                {/* Left Content */}
                <div className="p-6 relative z-10 max-w-[62%] flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-2.5 mb-4">
                      <div className="w-9 h-9 rounded-full bg-[#112A24] text-white flex items-center justify-center shrink-0 shadow-xs">
                        <Users className="w-4 h-4" />
                      </div>
                      <h3 className="text-[15px] font-bold text-[#171A1F] font-sans">
                        For Alumni
                      </h3>
                    </div>

                    <ul className="space-y-2 text-[12px] text-[#2C3330] font-medium leading-snug">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#171A1F] stroke-[2.5] shrink-0" />
                        <span>Share referral opportunities</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#171A1F] stroke-[2.5] shrink-0" />
                        <span>Mentor and guide students</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#171A1F] stroke-[2.5] shrink-0" />
                        <span>Stay connected with campus</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Bottom Right Circular Arrow Button */}
                <Link
                  href="/dashboard/student/alumni-referrals"
                  className="w-9 h-9 rounded-full bg-white shadow-md text-[#112A24] hover:bg-[#FAF7F2] flex items-center justify-center transition-transform hover:scale-105 absolute bottom-5 right-5 z-20 cursor-pointer"
                  aria-label="For Alumni"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 5. "HOW IT WORKS" (FROM OPPORTUNITY TO SUCCESS) */}
        {/* ============================================================== */}
        <section className="bg-[#FAF7F2] py-20 px-6 sm:px-10 border-b border-[#E8E3DA]">
          <div className="max-w-7xl mx-auto space-y-12">
            <div>
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#718078] uppercase block">
                HOW IT WORKS
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif tracking-tight text-[#171A1F] mt-1.5">
                From Opportunity to Success
              </h2>
            </div>

            {/* 4 Process Steps connected by arrows */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              {/* Step 01 */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-[#B8966C] text-[#FAF7F2] font-semibold text-xs flex items-center justify-center shrink-0 font-sans shadow-2xs">
                  01
                </div>
                <div className="flex-1 pr-4">
                  <h4 className="text-sm font-bold text-[#171A1F] font-sans">
                    Create Drive
                  </h4>
                  <p className="text-xs text-[#718078] leading-relaxed mt-1">
                    Placement cell adds company details with eligibility criteria.
                  </p>
                </div>
                <div className="hidden lg:block self-center text-[#B8966C]/60 text-lg">
                  →
                </div>
              </div>

              {/* Step 02 */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-[#B8966C] text-[#FAF7F2] font-semibold text-xs flex items-center justify-center shrink-0 font-sans shadow-2xs">
                  02
                </div>
                <div className="flex-1 pr-4">
                  <h4 className="text-sm font-bold text-[#171A1F] font-sans">
                    Automatic Filtering
                  </h4>
                  <p className="text-xs text-[#718078] leading-relaxed mt-1">
                    System checks eligible students based on CGPA, branch and backlog.
                  </p>
                </div>
                <div className="hidden lg:block self-center text-[#B8966C]/60 text-lg">
                  →
                </div>
              </div>

              {/* Step 03 */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-[#B8966C] text-[#FAF7F2] font-semibold text-xs flex items-center justify-center shrink-0 font-sans shadow-2xs">
                  03
                </div>
                <div className="flex-1 pr-4">
                  <h4 className="text-sm font-bold text-[#171A1F] font-sans">
                    Apply & Track
                  </h4>
                  <p className="text-xs text-[#718078] leading-relaxed mt-1">
                    Students apply and track their application status.
                  </p>
                </div>
                <div className="hidden lg:block self-center text-[#B8966C]/60 text-lg">
                  →
                </div>
              </div>

              {/* Step 04 (Dark Green Circle) */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-[#173C35] text-[#FAF7F2] font-semibold text-xs flex items-center justify-center shrink-0 font-sans shadow-2xs">
                  04
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-[#171A1F] font-sans">
                    Get Hired
                  </h4>
                  <p className="text-xs text-[#718078] leading-relaxed mt-1">
                    Shortlisted students move forward in the selection process.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 6. OUR RECRUITING PARTNERS STRIP (INFINITE MARQUEE WITH ORIGINAL LOGOS) */}
        {/* ============================================================== */}
        <section className="bg-[#F0ECE3] py-12 border-b border-[#E2DDD3] overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 mb-8">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#718078] uppercase">
                OUR RECRUITING PARTNERS
              </span>

              {/* Nav Arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMarqueeDirection("reverse")}
                  className={`w-7 h-7 rounded-full border transition-all cursor-pointer flex items-center justify-center ${
                    marqueeDirection === "reverse"
                      ? "bg-[#173C35] text-white border-[#173C35] shadow-xs"
                      : "bg-white border-[#D5CFBF] text-[#718078] hover:text-[#171A1F] hover:border-[#171A1F]"
                  }`}
                  aria-label="Scroll marquee right"
                  title="Scroll right"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setMarqueeDirection("forward")}
                  className={`w-7 h-7 rounded-full border transition-all cursor-pointer flex items-center justify-center ${
                    marqueeDirection === "forward"
                      ? "bg-[#173C35] text-white border-[#173C35] shadow-xs"
                      : "bg-white border-[#D5CFBF] text-[#718078] hover:text-[#171A1F] hover:border-[#171A1F]"
                  }`}
                  aria-label="Scroll marquee left"
                  title="Scroll left"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Infinite Marquee Track with edge fade masks */}
          <div className="relative overflow-hidden">
            {/* Left and Right Edge Fade Gradients */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-[#F0ECE3] to-transparent z-10" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-[#F0ECE3] to-transparent z-10" />

            {/* Marquee Track without white boxes */}
            <div
              className={`flex items-center gap-12 sm:gap-18 py-3 select-none ${
                marqueeDirection === "reverse" ? "animate-marquee-reverse" : "animate-marquee"
              }`}
            >
              {/* Partner Logos repeated 3x for seamless infinite marquee loop */}
              {[...ORIGINAL_PARTNER_LOGOS, ...ORIGINAL_PARTNER_LOGOS, ...ORIGINAL_PARTNER_LOGOS].map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className="flex items-center justify-center shrink-0 min-w-[110px] sm:min-w-[124px] h-10 cursor-pointer transition-transform duration-200 hover:scale-110 opacity-95 hover:opacity-100"
                  title={`${partner.name} - Official Recruiting Partner`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={partner.src}
                    alt={partner.name}
                    className={`${partner.height} w-auto max-w-[120px] object-contain`}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 7. "YOUR CAREER JOURNEY, SUPPORTED" (BOTTOM HERO & DASHBOARD PREVIEW) */}
        {/* ============================================================== */}
        <section className="bg-[#FAF7F2] py-20 px-6 sm:px-10 relative overflow-hidden">
          {/* Subtle Organic Curved Green Shape at Bottom Right */}
          <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#173C35]/10 blur-2xl pointer-events-none" />

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Side: High-Fidelity UI Mockup of Placement Cell Dashboard */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-[#E2DDD3] rounded-[16px] shadow-lg overflow-hidden text-xs">
                {/* Mockup Header */}
                <div className="h-10 bg-[#FAF7F2] border-b border-[#E8E3DA] px-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/images/campuslink_logo_v3.png"
                      alt="CampusLink"
                      width={120}
                      height={40}
                      className="h-6 w-auto object-contain"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <Bell className="w-3 h-3 text-[#718078]" />
                    <div className="flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-[#173C35] text-white text-[9px] font-bold flex items-center justify-center">
                        H
                      </span>
                      <span className="text-[10px] font-medium text-[#171A1F]">Harshika</span>
                    </div>
                  </div>
                </div>

                <div className="flex">
                  {/* Mockup Sidebar */}
                  <div className="w-36 bg-[#FAF7F2]/60 border-r border-[#E8E3DA] p-2.5 hidden sm:block space-y-1">
                    <div className="px-2 py-1 rounded bg-[#173C35] text-white font-semibold text-[10px]">
                      Dashboard
                    </div>
                    <div className="px-2 py-1 text-[#718078] text-[10px]">Drives</div>
                    <div className="px-2 py-1 text-[#718078] text-[10px]">My Applications</div>
                    <div className="px-2 py-1 text-[#718078] text-[10px]">Mock Drives</div>
                    <div className="px-2 py-1 text-[#718078] text-[10px]">Alumni</div>
                    <div className="px-2 py-1 text-[#718078] text-[10px]">Resources</div>
                  </div>

                  {/* Mockup Main Content */}
                  <div className="flex-1 p-4 space-y-4">
                    {/* Upcoming Drives Row */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-[#171A1F] text-[11px]">Upcoming Drives</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {/* Microsoft Card */}
                        <div className="p-2.5 bg-[#FAF7F2] border border-[#E8E3DA] rounded-[8px]">
                          <div className="font-bold text-[#171A1F] text-[11px]">Microsoft</div>
                          <div className="text-[9px] text-[#718078]">Software Engineer</div>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="px-1.5 py-0.2 bg-[#EFF7F2] text-[#3E6B52] border border-[#C2DEC9] rounded text-[8px] font-bold">
                              Eligible
                            </span>
                            <span className="text-[9px] font-bold text-[#173C35] hover:underline">
                              Apply Now
                            </span>
                          </div>
                        </div>

                        {/* Accenture Card */}
                        <div className="p-2.5 bg-[#FAF7F2] border border-[#E8E3DA] rounded-[8px]">
                          <div className="font-bold text-[#171A1F] text-[11px]">Accenture</div>
                          <div className="text-[9px] text-[#718078]">Analyst</div>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="px-1.5 py-0.2 bg-[#EFF7F2] text-[#3E6B52] border border-[#C2DEC9] rounded text-[8px] font-bold">
                              Eligible
                            </span>
                            <span className="text-[9px] font-bold text-[#173C35] hover:underline">
                              Apply Now
                            </span>
                          </div>
                        </div>

                        {/* Deloitte Card */}
                        <div className="p-2.5 bg-[#FAF7F2] border border-[#E8E3DA] rounded-[8px]">
                          <div className="font-bold text-[#171A1F] text-[11px]">Deloitte</div>
                          <div className="text-[9px] text-[#718078]">Associate</div>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="px-1.5 py-0.2 bg-[#EFF7F2] text-[#3E6B52] border border-[#C2DEC9] rounded text-[8px] font-bold">
                              Eligible
                            </span>
                            <span className="text-[9px] font-bold text-[#173C35] hover:underline">
                              Apply Now
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* My Applications Table */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-[#171A1F] text-[11px]">My Applications</span>
                        <span className="text-[9px] text-[#718078]">View All</span>
                      </div>

                      <table className="w-full text-left text-[10px] border-collapse">
                        <thead>
                          <tr className="border-b border-[#E8E3DA] text-[#718078]">
                            <th className="py-1">Company</th>
                            <th className="py-1">Role</th>
                            <th className="py-1">Status</th>
                            <th className="py-1">Applied On</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-[#F0ECE3]">
                            <td className="py-1.5 font-semibold text-[#171A1F]">Amazon</td>
                            <td className="py-1.5 text-[#718078]">SDE Intern</td>
                            <td className="py-1.5">
                              <span className="px-1.5 py-0.2 bg-[#F9F5EE] text-[#B08D57] border border-[#DFCDB1] rounded text-[8px] font-medium">
                                Under Review
                              </span>
                            </td>
                            <td className="py-1.5 text-[#718078]">12 Oct 2024</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Copy & CTA */}
            <div className="lg:col-span-5 space-y-5">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#718078] uppercase block">
                YOUR CAREER JOURNEY, SUPPORTED
              </span>

              <h2 className="text-3xl sm:text-5xl font-serif tracking-tight text-[#171A1F] leading-[1.12]">
                Empowering Students for a Brighter Future
              </h2>

              <p className="text-xs sm:text-sm text-[#4B515D] leading-relaxed">
                With the right opportunities, guidance, and resources, we help you take the next step towards your dream career.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => handleRoleSelect("STUDENT")}
                  className="px-6 py-3 bg-[#173C35] hover:bg-[#122F2A] text-white text-xs font-semibold rounded-[6px] inline-flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  <span>Join the Placement Portal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ============================================================== */}
      {/* 8. FOOTER */}
      {/* ============================================================== */}
      <footer className="w-full bg-[#FAF7F2] border-t border-[#E8E3DA] py-8 px-6 sm:px-10 text-xs text-[#718078]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Logo href="/" size="sm" />
            <span className="border-l border-[#D5CFBF] pl-3 text-[11px]">
              Institutional Campus Recruitment & Career Operating System
            </span>
          </div>

          <div className="flex items-center gap-6 text-[11px]">
            <button
              onClick={() => handleRoleSelect("PLACEMENT_ADMIN")}
              className="hover:text-[#171A1F] underline cursor-pointer"
            >
              Placement Office Sign In
            </button>
            <button
              onClick={() => handleRoleSelect("STUDENT")}
              className="hover:text-[#171A1F] underline cursor-pointer"
            >
              Student Portal
            </button>
          </div>
        </div>
      </footer>

      {/* ============================================================== */}
      {/* LOGIN & ROLE SELECTOR MODAL */}
      {/* ============================================================== */}
      <Modal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        title="Sign In to CampusLink"
        subtitle="Select your operational role to enter the enterprise portal"
        maxWidth="md"
      >
        <div className="space-y-3 pt-1 text-xs">
          <button
            onClick={() => handleRoleSelect("STUDENT")}
            className="w-full p-3.5 rounded-[8px] border border-[#E8E3DA] hover:border-[#173C35] bg-[#FAF7F2] hover:bg-white text-left transition-all flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-[6px] bg-[#173C35] text-white flex items-center justify-center">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-[#171A1F] text-xs">Student Portal</div>
                <div className="text-[10px] text-[#718078]">Access drives, track applications, mock tests</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#718078] group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={() => handleRoleSelect("PLACEMENT_ADMIN")}
            className="w-full p-3.5 rounded-[8px] border border-[#E8E3DA] hover:border-[#173C35] bg-[#FAF7F2] hover:bg-white text-left transition-all flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-[6px] bg-[#173C35] text-white flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-[#171A1F] text-xs">Placement Office & Admin</div>
                <div className="text-[10px] text-[#718078]">Manage drives, shortlist, schedules, reports</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#718078] group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={() => handleRoleSelect("RECRUITER")}
            className="w-full p-3.5 rounded-[8px] border border-[#E8E3DA] hover:border-[#173C35] bg-[#FAF7F2] hover:bg-white text-left transition-all flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-[6px] bg-[#FAF5EE] text-[#B08D57] flex items-center justify-center border border-[#DFCDB1]">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-[#171A1F] text-xs">Corporate Recruiter</div>
                <div className="text-[10px] text-[#718078]">Review candidate pipeline and interviews</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#718078] group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={() => handleRoleSelect("ALUMNI")}
            className="w-full p-3.5 rounded-[8px] border border-[#E8E3DA] hover:border-[#173C35] bg-[#FAF7F2] hover:bg-white text-left transition-all flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-[6px] bg-[#FAF5EE] text-[#B08D57] flex items-center justify-center border border-[#DFCDB1]">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-[#171A1F] text-xs">Alumni Network</div>
                <div className="text-[10px] text-[#718078]">Post corporate referrals and mentor students</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#718078] group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default function LandingPage() {
  return (
    <PlacementStoreProvider>
      <LandingPageContent />
    </PlacementStoreProvider>
  );
}
