"use client";

import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface StreakCounterProps {
  streak: number;
}

export function StreakCounter({ streak }: StreakCounterProps) {
  // Visual logic: 
  // 0 days = Grey/Cold
  // 1-2 days = Orange/Warm
  // 3+ days = Red/Hot (Animate!)
  
  const isActive = streak > 0;
  const isOnFire = streak >= 3;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300",
            isActive 
              ? "bg-orange-50 border-orange-100 text-orange-700" 
              : "bg-slate-100 border-slate-200 text-slate-500"
          )}>
            <div className="relative">
              <Flame className={cn(
                "w-5 h-5 transition-all duration-500",
                isActive ? "text-orange-500 fill-orange-500" : "text-slate-400",
                isOnFire && "animate-bounce drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]"
              )} />
              
              {/* Little spark particles for visual flair if on fire */}
              {isOnFire && (
                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                </span>
              )}
            </div>
            
            <span className="font-bold font-mono text-lg">
              {streak}
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider opacity-80">
              Day Streak
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{streak === 0 ? "Start a streak today!" : "Keep it up! Log daily to grow."}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}