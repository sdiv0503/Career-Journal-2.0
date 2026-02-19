import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { parsePdf } from "@/lib/pdf-loader"; 
import { analyzeResume } from "@/lib/gemini"; 
import { calculateLevel } from "@/lib/gamification"; // Import
import { checkBadges } from "@/lib/badges"; // Import

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const text = await parsePdf(buffer);

    if (text.length < 50) return NextResponse.json({ error: "PDF empty." }, { status: 400 });

    // 1. Create Initial Record
    const resume = await prisma.resume.create({
      data: {
        userId,
        fileName: file.name,
        content: text,
        status: "processing",
        analysis: {}, 
      },
    });

    // 2. Run AI
    const aiResult = await analyzeResume(text);

    // 3. GAMIFICATION TRIGGER
    // Fetch user to get current XP
    const user = await prisma.user.findUnique({ where: { id: userId } });
    
    let xpGained = 0;
    let newLevel = user?.level || 1;
    let hasLeveledUp = false;

    if (user) {
      xpGained = 50; // Big reward for analysis
      const newXP = user.xp + xpGained;
      newLevel = calculateLevel(newXP);
      hasLeveledUp = newLevel > user.level;

      // Update User Stats
      await prisma.user.update({
        where: { id: userId },
        data: {
          xp: newXP,
          level: newLevel
        }
      });
    }

    // 4. Update Resume Record
    const updatedResume = await prisma.resume.update({
      where: { id: resume.id },
      data: {
        status: "completed",
        analysis: aiResult,
      }
    });

    // 5. Check Badges (Now that resume is saved with score)
    const newBadges = await checkBadges(userId, prisma);

    return NextResponse.json({ 
      success: true, 
      id: updatedResume.id,
      score: aiResult.score,
      gamification: {
        xpGained,
        newLevel,
        hasLeveledUp,
        newBadges
      }
    });

  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}