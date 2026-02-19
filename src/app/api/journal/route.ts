import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { calculateNewStreak, calculateXPGain, calculateLevel } from "@/lib/gamification";
import { checkBadges } from "@/lib/badges"; // Import the badge checker
import { isToday } from "date-fns";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { content } = await req.json();

    if (!content) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    // 1. Fetch User to get current stats
    let user = await prisma.user.findUnique({ where: { id: userId } });

    // Fallback: Create user if missing
    if (!user) {
      user = await prisma.user.create({
        data: {
          id: userId,
          email: "user@example.com",
          name: "User",
          streak: 0,
          xp: 0,
          level: 1,
        },
      });
    }

    // 2. Calculate New Stats (Gamification Logic)
    const newStreak = calculateNewStreak(user.streak, user.lastLogDate);
    const isNewDay = !user.lastLogDate || !isToday(user.lastLogDate);
    const xpGained = calculateXPGain(isNewDay);
    const newXP = user.xp + xpGained;

    // Check for Level Up!
    const oldLevel = user.level;
    const newLevel = calculateLevel(newXP);
    const hasLeveledUp = newLevel > oldLevel;

    // 3. Update Database (Transaction)
    // Create Entry AND Update User Stats simultaneously
    const [entry, updatedUser] = await prisma.$transaction([
      prisma.entry.create({
        data: {
          userId,
          content,
          title: `Entry for ${new Date().toLocaleDateString()}`,
          date: new Date(),
          mood: "Neutral",
        },
      }),
      prisma.user.update({
        where: { id: userId },
        data: {
          streak: newStreak,
          xp: newXP,
          level: newLevel,
          lastLogDate: new Date(),
        },
      }),
    ]);

    // 4. CHECK BADGES (New for Week 2 Day 4)
    // We run this AFTER the transaction so the new entry counts towards the badge criteria
    const newBadges = await checkBadges(userId, prisma);

    return NextResponse.json({
      data: entry,
      gamification: {
        streak: newStreak,
        xpGained,
        newLevel,
        hasLeveledUp,
        newBadges, // Send newly earned badges to the frontend
      },
    });
  } catch (error) {
    console.error("Journal API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
