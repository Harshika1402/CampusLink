"use client";

import React, { useState } from "react";
import {
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  Play,
  RotateCcw,
  Sparkles,
  Target,
  BarChart3,
  HelpCircle,
  FileCode,
} from "lucide-react";
import { usePlacementStore } from "@/lib/store";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { MockDrive, MockResult } from "@/types";

export default function StudentMockDrivesPage() {
  const { mockDrives, mockResults, currentStudent } = usePlacementStore();

  const [activeSimulationDrive, setActiveSimulationDrive] = useState<MockDrive | null>(null);
  const [simulationStep, setSimulationStep] = useState<"aptitude" | "coding" | "results">("aptitude");
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [codingSolution, setCodingSolution] = useState(
    "class Solution {\n    public int maxSubArray(int[] nums) {\n        int maxSoFar = nums[0];\n        int currMax = nums[0];\n        for (int i = 1; i < nums.length; i++) {\n            currMax = Math.max(nums[i], currMax + nums[i]);\n            maxSoFar = Math.max(maxSoFar, currMax);\n        }\n        return maxSoFar;\n    }\n}"
  );

  const [completedResult, setCompletedResult] = useState<MockResult | null>(
    mockResults[0] || null
  );

  const startSimulation = (drive: MockDrive) => {
    setActiveSimulationDrive(drive);
    setSimulationStep("aptitude");
    setAnswers({});
  };

  const submitAptitude = () => {
    setSimulationStep("coding");
  };

  const finishSimulation = () => {
    const newResult: MockResult = {
      id: `mock-res-${Date.now()}`,
      mockDriveId: activeSimulationDrive?.id || "mock-1",
      mockTitle: activeSimulationDrive?.title || "Campus Placement Simulation",
      studentId: currentStudent.id,
      studentName: currentStudent.fullName,
      aptitudeScore: 38,
      codingScore: 40,
      interviewScore: 19,
      totalScore: 97,
      percentile: 99.1,
      strengths: [
        "Optimal O(N) Kadane's algorithm implementation with linear space complexity",
        "Flawless speed on Probability & Work-Time quantitative assessments",
        "Clear technical articulation of multi-threading mutex deadlocks",
      ],
      areasToImprove: [
        "Include more inline comments on complex recursion base cases",
      ],
      overallAssessment:
        "Tier-1 Enterprise Elite Readiness. Highly recommended for Goldman Sachs, Microsoft, and Oracle Cloud high-package recruitment slots.",
      completedAt: new Date().toISOString(),
    };
    setCompletedResult(newResult);
    setActiveSimulationDrive(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-primary-ink font-sans">
          Mock Placement Drives & Simulations
        </h1>
        <p className="text-xs text-muted-sage mt-0.5">
          Proctored recruitment examinations mirroring Tier-1 investment bank & product company formats
        </p>
      </div>

      {/* Latest Evaluation Result Banner */}
      {completedResult && (
        <div className="bg-white border border-stone-border rounded-[8px] p-5 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-border">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-antique-brass px-2 py-0.5 bg-brass-subtle border border-brass-border rounded-xs">
                Verified Simulation Benchmark
              </span>
              <h2 className="text-base font-bold text-primary-ink font-sans mt-1">
                {completedResult.mockTitle}
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-[10px] uppercase text-muted-sage block font-semibold">Overall Percentile</span>
                <span className="text-lg font-bold text-antique-brass font-sans">
                  {completedResult.percentile}th %ile
                </span>
              </div>
              <div className="text-right pl-4 border-l border-stone-border">
                <span className="text-[10px] uppercase text-muted-sage block font-semibold">Total Score</span>
                <span className="text-lg font-bold text-deep-forest font-sans">
                  {completedResult.totalScore} / 100
                </span>
              </div>
            </div>
          </div>

          {/* Breakdown Score Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-stone-light/30 border border-stone-border rounded-[6px]">
              <span className="text-[10px] uppercase font-semibold text-muted-sage">Aptitude & Verbal</span>
              <div className="text-sm font-bold text-primary-ink mt-0.5 font-sans">
                {completedResult.aptitudeScore} / 40 Marks
              </div>
            </div>
            <div className="p-3 bg-stone-light/30 border border-stone-border rounded-[6px]">
              <span className="text-[10px] uppercase font-semibold text-muted-sage">Algorithmic Coding</span>
              <div className="text-sm font-bold text-deep-forest mt-0.5 font-sans">
                {completedResult.codingScore} / 40 Marks
              </div>
            </div>
            <div className="p-3 bg-stone-light/30 border border-stone-border rounded-[6px]">
              <span className="text-[10px] uppercase font-semibold text-muted-sage">Technical & HR Viva</span>
              <div className="text-sm font-bold text-antique-brass mt-0.5 font-sans">
                {completedResult.interviewScore} / 20 Marks
              </div>
            </div>
          </div>

          {/* Diagnostic Strengths & Improvements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div className="p-3.5 bg-forest-subtle/50 border border-forest-border/80 rounded-[6px]">
              <h4 className="text-xs font-semibold text-deep-forest uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-deep-forest" /> Demonstrative Strengths
              </h4>
              <ul className="space-y-1 text-xs text-ink-muted">
                {completedResult.strengths.map((str, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-deep-forest font-bold">•</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 bg-brass-subtle/50 border border-antique-brass/30 rounded-[6px]">
              <h4 className="text-xs font-semibold text-antique-brass uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-antique-brass" /> Areas to Reinforce Prior to Final Drives
              </h4>
              <ul className="space-y-1 text-xs text-ink-muted">
                {completedResult.areasToImprove.map((item, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-antique-brass font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-3 bg-ivory-light border border-stone-border rounded-[6px] text-xs text-ink-muted">
            <strong className="text-primary-ink">Evaluator Summary:</strong> {completedResult.overallAssessment}
          </div>
        </div>
      )}

      {/* Available Mock Drives */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-sage">
          Scheduled Simulation Drives
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockDrives.map((drive) => (
            <div
              key={drive.id}
              className="bg-white border border-stone-border rounded-[8px] p-5 shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <span className="text-xs font-bold px-2 py-0.5 bg-forest-subtle text-deep-forest border border-forest-border rounded-xs">
                    {drive.status}
                  </span>
                  <span className="text-xs text-muted-sage">
                    {drive.registeredCount} candidates registered
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-primary-ink font-sans mt-2.5">
                  {drive.title}
                </h3>
                <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                  {drive.description}
                </p>

                <div className="mt-3 space-y-1">
                  {drive.rounds.map((rnd, i) => (
                    <div key={i} className="text-[11px] text-muted-sage flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-deep-forest" />
                      <span>{rnd}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-border/70 flex items-center justify-between">
                <span className="text-[11px] text-ink-muted flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-deep-forest" /> {drive.durationMinutes} Minutes total
                </span>

                <Button
                  size="sm"
                  variant="primary"
                  icon={<Play className="w-3.5 h-3.5" />}
                  onClick={() => startSimulation(drive)}
                >
                  Start Simulation
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mock Simulation Interactive Modal */}
      {activeSimulationDrive && (
        <Modal
          isOpen={Boolean(activeSimulationDrive)}
          onClose={() => setActiveSimulationDrive(null)}
          title={`Simulation: ${activeSimulationDrive.title}`}
          subtitle={`Timed Assessment Environment • ${simulationStep.toUpperCase()} MODULE`}
          maxWidth="2xl"
        >
          <div className="space-y-5 text-xs">
            {simulationStep === "aptitude" && (
              <div className="space-y-4">
                <div className="p-3 bg-ivory-light border border-stone-border rounded-[6px] flex items-center justify-between text-ink-muted">
                  <span>Section 1: Quantitative & Data Interpretation</span>
                  <span className="font-mono font-semibold text-deep-forest">Time Remaining: 24:18</span>
                </div>

                <div className="space-y-3 p-4 bg-white border border-stone-border rounded-[6px]">
                  <p className="font-semibold text-primary-ink text-xs leading-relaxed">
                    Q1. A train running at 54 km/hr takes 20 seconds to pass a platform. Next, it takes 12 seconds to pass a man walking at 6 km/hr in the same direction. What is the length of the platform?
                  </p>
                  <div className="space-y-1.5 pl-2">
                    {["A) 120 meters", "B) 140 meters", "C) 150 meters", "D) 160 meters"].map((opt, i) => (
                      <label key={i} className="flex items-center gap-2 cursor-pointer p-1.5 rounded hover:bg-stone-light/30">
                        <input
                          type="radio"
                          name="q1"
                          checked={answers[1] === opt}
                          onChange={() => setAnswers({ ...answers, 1: opt })}
                          className="accent-deep-forest"
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-border">
                  <Button variant="outline" size="sm" onClick={() => setActiveSimulationDrive(null)}>
                    Exit Test
                  </Button>
                  <Button variant="primary" size="sm" onClick={submitAptitude}>
                    Proceed to Coding Section →
                  </Button>
                </div>
              </div>
            )}

            {simulationStep === "coding" && (
              <div className="space-y-4">
                <div className="p-3 bg-ivory-light border border-stone-border rounded-[6px] flex items-center justify-between text-ink-muted">
                  <span>Section 2: Algorithmic Problem Solving (Test Cases: 14/14 Passed)</span>
                  <span className="font-mono font-semibold text-deep-forest">Time Remaining: 38:40</span>
                </div>

                <div className="p-3 bg-stone-light/30 border border-stone-border rounded-[6px]">
                  <strong className="text-primary-ink block">Problem: Maximum Subarray Sum (Kadane&apos;s Algorithm)</strong>
                  <p className="text-[11px] text-muted-sage mt-1">
                    Given an integer array nums, find the subarray with the largest sum, and return its sum in O(N) time and O(1) space.
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1 text-[11px] text-muted-sage">
                    <span>Language: Java 17 (OpenSDK)</span>
                    <span className="text-brand-success font-semibold">✓ Syntax Verified</span>
                  </div>
                  <textarea
                    rows={8}
                    value={codingSolution}
                    onChange={(e) => setCodingSolution(e.target.value)}
                    className="w-full p-3 font-mono text-[11px] bg-primary-ink text-warm-ivory rounded-[6px] focus:outline-hidden"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-border">
                  <Button variant="outline" size="sm" onClick={() => setSimulationStep("aptitude")}>
                    ← Back to Aptitude
                  </Button>
                  <Button variant="primary" size="sm" onClick={finishSimulation}>
                    Submit Assessment & Compute Report
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
