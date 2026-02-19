"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { XPProgress } from "./XPProgress";
import { StreakCounter } from "./StreakCounter";
import { Trophy } from "lucide-react";

interface ProfileHeaderProps {
  xp: number;
  streak: number;
  level: number;
}

export function ProfileHeader({ xp, streak, level }: ProfileHeaderProps) {
  const { user } = useUser();

  return (
    <div className="bg-white border-b border-slate-200 sticky top-16 z-30 shadow-sm/50">
      <div className="max-w-5xl mx-auto px-4 h-20 flex items-center justify-between">
        
        {/* Left: Identity */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full blur opacity-25"></div>
            <UserButton appearance={{ elements: { avatarBox: "w-10 h-10 border-2 border-white" }}} />
            
            {/* Level Badge overlaid on Avatar */}
            {/* <div className="absolute -bottom-1 -right-1 bg-slate-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-white flex items-center gap-0.5">
               LVL {level}
            </div> */}
          </div>
          <div className="hidden sm:block">
            <h2 className="font-bold text-slate-900 leading-tight">
              {user?.firstName || "Explorer"}
            </h2>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">
              Software Engineer
            </p>
          </div>
        </div>

        {/* Right: The Stats HUD */}
        <div className="flex items-center gap-6">
          
          {/* XP Bar (Mini) */}
          <div className="hidden md:flex flex-col w-48 gap-1">
            <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
               <span>Experience</span>
               <span>{xp} XP</span>
            </div>
            <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
               {/* We render a simple progress bar here manually to fit the compact header */}
               <div 
                 className="h-full bg-blue-500 rounded-full transition-all duration-500" 
                 style={{ width: `${(xp % 100)}%` }} 
               />
            </div>
          </div>

          <div className="h-8 w-px bg-slate-200 hidden md:block" />

          {/* Streak */}
          <StreakCounter streak={streak} />
        </div>

      </div>
    </div>
  );
}