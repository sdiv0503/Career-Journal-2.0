"use client";

import { Progress } from "@/components/ui/progress";
import { calculateLevel, calculateProgress, calculateNextLevelThreshold } from "@/lib/gamification";
import { Trophy, Star } from "lucide-react";

interface XPProgressProps {
  xp: number;
}

export function XPProgress({ xp }: XPProgressProps) {
  const level = calculateLevel(xp);
  const progress = calculateProgress(xp);
  const nextThreshold = calculateNextLevelThreshold(level);
  
  // Calculate raw XP needed for next level relative to total
  // E.g. Level 1 (0-100), if XP is 40, we need 60 more.
  const xpToNext = nextThreshold - xp;

  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm w-full">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <div className="bg-blue-100 p-1.5 rounded-lg">
            <Trophy className="w-4 h-4 text-blue-600" />
          </div>
          <span className="font-bold text-slate-900 text-sm">Level {level}</span>
        </div>
        <div className="text-xs font-medium text-slate-500 flex items-center gap-1">
          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
          {xp} XP Total
        </div>
      </div>
      
      <Progress value={progress} className="h-2 mb-2" />
      
      <div className="text-right">
        <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">
          {xpToNext} XP to Level {level + 1}
        </span>
      </div>
    </div>
  );
}