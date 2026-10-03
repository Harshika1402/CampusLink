import { NextRequest, NextResponse } from "next/server";
import { summarizeJobDescriptionWithGemini } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { jobDescription, apiKey } = body;

    if (!jobDescription || typeof jobDescription !== "string") {
      return NextResponse.json(
        { error: "Valid job description text is required" },
        { status: 400 }
      );
    }

    const summary = await summarizeJobDescriptionWithGemini(jobDescription, apiKey);
    return NextResponse.json({ success: true, summary });
  } catch (error) {
    console.error("Error in AI JD Summarization route:", error);
    return NextResponse.json(
      { error: "Failed to summarize job description", details: String(error) },
      { status: 500 }
    );
  }
}
