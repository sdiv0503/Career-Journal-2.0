import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { matchResumeToJD } from "@/lib/gemini";

export async function POST(
  req: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    const { id } = await params;
    const { jdText } = await req.json();

    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const resume = await prisma.resume.findUnique({
      where: { id, userId }
    });

    if (!resume) return NextResponse.json({ error: "Resume not found" }, { status: 404 });

    // Run the Targeted Analysis
    const matchData = await matchResumeToJD(resume.content, jdText);

    // Save the JD and the match results into the database
    // We nest matchData inside the existing analysis JSON
    const updated = await prisma.resume.update({
      where: { id },
      data: {
        jobDescription: jdText,
        analysis: {
          ...(resume.analysis as object),
          matchData: matchData // This adds a 'matchData' key to your JSON
        }
      }
    });

    return NextResponse.json({ success: true, matchData });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Match failed" }, { status: 500 });
  }
}