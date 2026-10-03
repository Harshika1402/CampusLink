import { PlacementDrive, StudentProfile, EligibilityCheckResult } from "@/types";

export function evaluateStudentEligibility(
  student: StudentProfile,
  drive: PlacementDrive
): EligibilityCheckResult {
  const checks: EligibilityCheckResult["checks"] = [];
  const failedReasons: string[] = [];

  // 1. CGPA Check
  const cgpaPassed = student.cgpa >= drive.minCgpa;
  checks.push({
    label: "Minimum CGPA",
    passed: cgpaPassed,
    requirement: `≥ ${drive.minCgpa.toFixed(2)} CGPA`,
    actual: `${student.cgpa.toFixed(2)} CGPA`,
    details: cgpaPassed
      ? `Satisfies minimum threshold of ${drive.minCgpa.toFixed(2)}`
      : `Current CGPA is ${(drive.minCgpa - student.cgpa).toFixed(2)} below minimum requirement`,
  });
  if (!cgpaPassed) {
    failedReasons.push(`Minimum CGPA required: ${drive.minCgpa.toFixed(2)} (Your CGPA: ${student.cgpa.toFixed(2)})`);
  }

  // 2. Active Backlogs Check
  const backlogsPassed = student.activeBacklogs <= drive.maxBacklogs;
  checks.push({
    label: "Active Backlogs",
    passed: backlogsPassed,
    requirement: `Max ${drive.maxBacklogs} active backlog${drive.maxBacklogs === 1 ? "" : "s"}`,
    actual: `${student.activeBacklogs} active backlog${student.activeBacklogs === 1 ? "" : "s"}`,
    details: backlogsPassed
      ? "Backlog limit satisfied"
      : `${student.activeBacklogs} active backlogs exceeds allowed limit of ${drive.maxBacklogs}`,
  });
  if (!backlogsPassed) {
    failedReasons.push(
      `Active backlogs: ${student.activeBacklogs} exceeds maximum allowed of ${drive.maxBacklogs}`
    );
  }

  // 3. Eligible Branches Check
  const isBranchAll = drive.eligibleBranches.some(
    (b) => b.toLowerCase().includes("all") || b.toLowerCase().includes("any")
  );
  const branchPassed =
    isBranchAll ||
    drive.eligibleBranches.some(
      (b) =>
        b.trim().toLowerCase() === student.branch.trim().toLowerCase() ||
        student.branch.toLowerCase().includes(b.toLowerCase())
    );
  checks.push({
    label: "Degree Branch",
    passed: branchPassed,
    requirement: isBranchAll ? "All Engineering Branches" : drive.eligibleBranches.join(", "),
    actual: student.branch,
    details: branchPassed ? "Student branch is eligible" : "Branch not included in target hiring departments",
  });
  if (!branchPassed) {
    failedReasons.push(`Branch ${student.branch} is not among eligible disciplines`);
  }

  // 4. Graduation Year
  const gradYearPassed =
    drive.allowedGraduationYears.length === 0 ||
    drive.allowedGraduationYears.includes(student.graduationYear);
  checks.push({
    label: "Graduation Batch",
    passed: gradYearPassed,
    requirement: drive.allowedGraduationYears.join(", ") + " Batch",
    actual: `${student.graduationYear} Batch`,
    details: gradYearPassed ? "Graduation year matches" : "Drive is restricted to other graduation batches",
  });
  if (!gradYearPassed) {
    failedReasons.push(
      `Graduation year ${student.graduationYear} does not match eligible batch (${drive.allowedGraduationYears.join(", ")})`
    );
  }

  // 5. 10th Percentage Check
  const tenthPassed = !drive.minTenthPercentage || student.tenthPercentage >= drive.minTenthPercentage;
  checks.push({
    label: "10th Class Percentage",
    passed: tenthPassed,
    requirement: `≥ ${drive.minTenthPercentage}%`,
    actual: `${student.tenthPercentage}%`,
    details: tenthPassed ? "Secondary school criteria satisfied" : "Below minimum secondary school score",
  });
  if (!tenthPassed) {
    failedReasons.push(`10th score ${student.tenthPercentage}% is below required ${drive.minTenthPercentage}%`);
  }

  // 6. 12th Percentage Check
  const twelfthPassed =
    !drive.minTwelfthPercentage || student.twelfthPercentage >= drive.minTwelfthPercentage;
  checks.push({
    label: "12th / Diploma Percentage",
    passed: twelfthPassed,
    requirement: `≥ ${drive.minTwelfthPercentage}%`,
    actual: `${student.twelfthPercentage}%`,
    details: twelfthPassed ? "Higher secondary criteria satisfied" : "Below minimum higher secondary score",
  });
  if (!twelfthPassed) {
    failedReasons.push(
      `12th score ${student.twelfthPercentage}% is below required ${drive.minTwelfthPercentage}%`
    );
  }

  // Skills Alignment (Soft or advisory criteria)
  const studentSkillsLower = student.skills.map((s) => s.toLowerCase().trim());
  const matchedSkills: string[] = [];
  const missingSkills: string[] = [];

  drive.requiredSkills.forEach((skill) => {
    const sLower = skill.toLowerCase().trim();
    if (studentSkillsLower.some((ss) => ss.includes(sLower) || sLower.includes(ss))) {
      matchedSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }
  });

  const mandatoryChecksPassed =
    cgpaPassed && backlogsPassed && branchPassed && gradYearPassed && tenthPassed && twelfthPassed;

  // Calculate composite fit score
  let baseScore = 0;
  if (cgpaPassed) baseScore += 35;
  if (backlogsPassed) baseScore += 20;
  if (branchPassed) baseScore += 20;
  if (tenthPassed && twelfthPassed) baseScore += 10;
  
  const skillMatchRatio =
    drive.requiredSkills.length > 0 ? matchedSkills.length / drive.requiredSkills.length : 1;
  const skillScore = Math.round(skillMatchRatio * 15);
  const totalScore = Math.min(100, baseScore + skillScore);

  let explanation = "";
  if (mandatoryChecksPassed) {
    explanation = "Eligible for this placement drive. All minimum academic and departmental criteria are met.";
  } else {
    explanation = `Not Eligible: ${failedReasons.join(" • ")}`;
  }

  return {
    isEligible: mandatoryChecksPassed,
    score: totalScore,
    checks,
    explanation,
    matchedSkills,
    missingSkills,
  };
}
