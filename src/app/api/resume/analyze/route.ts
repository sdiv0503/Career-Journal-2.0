import { NextResponse } from "next/server";
import { getUserByClerkID } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { analyzeResume } from "@/lib/gemini"; // Import our mock service

export async function POST(request: Request) {
  try {
    const user = await getUserByClerkID();
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "Resume ID required" }, { status: 400 });
    }

    // 1. Fetch the Resume
    const resume = await prisma.resume.findUnique({
      where: { id, userId: user.id },
    });

    if (!resume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    // 2. Update status to "analyzing" (Optimistic UI update)
    await prisma.resume.update({
      where: { id },
      data: { status: "analyzing" },
    });

    // 3. Call the AI Service
    // Note: In a real production app, this might be a background job (Queue).
    // For this scale, awaiting it is fine (Next.js allows ~10-60s timeouts).
    const analysisResult = await analyzeResume(resume.content);

    // 4. Save the Result
    const updatedResume = await prisma.resume.update({
      where: { id },
      data: {
        status: "completed",
        analysis: analysisResult as any, // Cast to JSON compatible type
      },
    });

    return NextResponse.json({ data: updatedResume });
  } catch (error) {
    console.error("Analysis Error:", error);
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 });
  }
}