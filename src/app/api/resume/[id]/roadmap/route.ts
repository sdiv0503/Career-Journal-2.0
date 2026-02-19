import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { generateCareerRoadmap } from "@/lib/gemini";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;

    const resume = await prisma.resume.findUnique({
      where: { id, userId },
    });

    if (!resume) return NextResponse.json({ error: "Resume not found" }, { status: 404 });

    // Generate the roadmap
    const roadmapData = await generateCareerRoadmap(resume.content, resume.jobDescription);

    if (!roadmapData) {
      return NextResponse.json({ error: "Failed to generate roadmap" }, { status: 500 });
    }

    // Save it to the database inside the existing analysis JSON
    const currentAnalysis = (resume.analysis as object) || {};
    await prisma.resume.update({
      where: { id },
      data: {
        analysis: {
          ...currentAnalysis,
          roadmap: roadmapData.roadmap,
        },
      },
    });

    return NextResponse.json({ success: true, roadmap: roadmapData.roadmap });
  } catch (error) {
    console.error("Roadmap API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}