import { differenceInCalendarDays, isToday, isYesterday } from "date-fns";

/**
 * Calculates the new streak based on the last log date.
 * @param currentStreak - The user's current streak count from DB
 * @param lastLogDate - The Date object of the last time they logged (can be null)
 * @returns The new streak integer
 */
export function calculateNewStreak(currentStreak: number, lastLogDate: Date | null | undefined): number {
  // Scenario 1: First time ever logging
  if (!lastLogDate) {
    return 1;
  }

  // Scenario 2: Logged earlier today (No change)
  if (isToday(lastLogDate)) {
    return currentStreak;
  }

  // Scenario 3: Logged yesterday (Streak continues!)
  if (isYesterday(lastLogDate)) {
    return currentStreak + 1;
  }

  // Scenario 4: Missed a day or more (Reset to 1)
  // Note: We return 1 because the action the user JUST took counts as the first day
  return 1;
}

/**
 * Calculates XP gained.
 * @param isNewDay - If true, award daily bonus
 */
export function calculateXPGain(isNewDay: boolean): number {
  const BASE_XP = 10;
  const DAILY_BONUS = 5;
  
  // If they already logged today, they get less XP for spamming entries
  return isNewDay ? BASE_XP + DAILY_BONUS : BASE_XP;
}

/**
 * Calculates the user's level based on total XP.
 * Formula: Level = 1 + floor(XP / 100)
 * Example: 0-99 XP = Level 1, 100-199 XP = Level 2
 */
export function calculateLevel(totalXP: number): number {
  return 1 + Math.floor(totalXP / 100);
}

/**
 * Calculates how much XP is needed to reach the NEXT level.
 */
export function calculateNextLevelThreshold(level: number): number {
  return level * 100;
}

/**
 * Calculates progress percentage for the current level.
 * Used for the UI progress bar.
 */
export function calculateProgress(xp: number): number {
  const level = calculateLevel(xp);
  const currentLevelStart = (level - 1) * 100;
  const nextLevelStart = level * 100;
  
  const xpInCurrentLevel = xp - currentLevelStart;
  const xpNeededForNextLevel = nextLevelStart - currentLevelStart; // Always 100 in this simple model
  
  return (xpInCurrentLevel / xpNeededForNextLevel) * 100;
}