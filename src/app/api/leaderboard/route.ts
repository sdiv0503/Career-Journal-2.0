import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

interface PrismaUserResult {
  name: string | null;
  resumes: {
    analysis: any;
  }[];
}

export async function GET() {
  try {
    const leaderboard = await prisma.user.findMany({
      where: {
        resumes: {
          some: { status: "completed" },
        },
      },
      select: {
        name: true,
        resumes: {
          where: { status: "completed" },
          // FIX: Select 'analysis' instead of 'score'
          select: { analysis: true },
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
    });

    const sortedData = leaderboard
      .map((user: PrismaUserResult) => {
        // Explicitly typed here
        const lastResume = user.resumes[0];

        // Safely extract the score
        const analysisData = lastResume?.analysis as any;
        const score = analysisData?.score || 0;

        return {
          name: user.name || "Anonymous User",
          score: score,
        };
      })
      .sort((a: { name: string; score: number }, b: { name: string; score: number }) => b.score - a.score)
      .slice(0, 10);

    return NextResponse.json({ data: sortedData });
  } catch (error) {
    console.error("Leaderboard API Error:", error);
    return NextResponse.json({ error: "Failed to load leaderboard" }, { status: 500 });
  }
}
