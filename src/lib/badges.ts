import { PrismaClient, Badge, User, Entry, Resume } from "@prisma/client";
export const BADGES = [
  // --- WEEK 2 BADGES ---
  {
    name: "First Step",
    description: "Created your first journal entry.",
    icon: "Footprints",
    criteria: "1_entry",
  },
  {
    name: "Consistency King",
    description: "Reached a 7-day streak.",
    icon: "Flame",
    criteria: "7_streak",
  },
  {
    name: "Century Club",
    description: "Reached 100 XP.",
    icon: "Trophy",
    criteria: "100_xp",
  },
  // --- WEEK 3 NEW BADGES ---
  {
    name: "The Analyst",
    description: "Uploaded your first resume for analysis.",
    icon: "FileSearch", // Ensure this exists in your icon map or use a fallback
    criteria: "1_resume",
  },
  {
    name: "Headhunter's Dream",
    description: "Achieved a Resume Score of 80 or higher.",
    icon: "Award",
    criteria: "80_score",
  },
];

export async function checkBadges(userId: string, prisma: PrismaClient) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      entries: true,
      resumes: true, // We must include this to check resume stats
      badges: true,
    },
  });

  if (!user) return [];

  const existingBadgeNames = new Set(user.badges.map((b: Badge) => b.name));
  const newBadges = [];

  // 1. Journal Checks
  if (!existingBadgeNames.has("First Step") && user.entries.length >= 1) {
    newBadges.push(BADGES.find((b) => b.name === "First Step")!);
  }
  if (!existingBadgeNames.has("Consistency King") && user.streak >= 7) {
    newBadges.push(BADGES.find((b) => b.name === "Consistency King")!);
  }
  if (!existingBadgeNames.has("Century Club") && user.xp >= 100) {
    newBadges.push(BADGES.find((b) => b.name === "Century Club")!);
  }

  // 2. Analyzer Checks (NEW)
  if (!existingBadgeNames.has("The Analyst") && user.resumes.length >= 1) {
    newBadges.push(BADGES.find((b) => b.name === "The Analyst")!);
  }

  // Check if ANY resume has a score >= 80
  const hasHighScore = user.resumes.some((r: Resume) => {
    // Safely parse JSON to check score
    const analysis = r.analysis as any;
    return analysis?.score >= 80;
  });

  if (!existingBadgeNames.has("Headhunter's Dream") && hasHighScore) {
    newBadges.push(BADGES.find((b) => b.name === "Headhunter's Dream")!);
  }

  // Award the new badges
  if (newBadges.length > 0) {
    await prisma.badge.createMany({
      data: newBadges.map((badge) => ({
        userId,
        name: badge.name,
        description: badge.description,
        icon: badge.icon,
      })),
    });
  }

  return newBadges;
}
