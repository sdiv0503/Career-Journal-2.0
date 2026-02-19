"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge as BadgeType } from "@prisma/client";
import { Lock, Footprints, Flame, FileSearch, Trophy, LucideIcon, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { BADGES } from "@/lib/badges";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const iconMap: Record<string, LucideIcon> = {
  Footprints,
  Flame,
  FileSearch,
  Trophy,
  Award
};

interface BadgeGridProps {
  earnedBadges: BadgeType[];
}

// Fix: Define the shape of our badge definition
interface BadgeDefinition {
  name: string;
  description: string;
  icon: string;
  criteria: string;
}

export function BadgeGrid({ earnedBadges }: BadgeGridProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Achievements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4">
          {/* Fix: Explicitly type badgeDef */}
          {BADGES.map((badgeDef: BadgeDefinition) => {
            const isUnlocked = earnedBadges.some((b) => b.name === badgeDef.name);
            const Icon = iconMap[badgeDef.icon] || Trophy;

            return (
              <TooltipProvider key={badgeDef.name}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className={cn(
                        "flex aspect-square flex-col items-center justify-center rounded-xl border p-3 transition-all",
                        isUnlocked
                          ? "border-amber-200 bg-amber-50 text-amber-700 shadow-sm"
                          : "border-slate-100 bg-slate-50 text-slate-300 grayscale"
                      )}
                    >
                      {isUnlocked ? (
                        <Icon className="mb-2 h-6 w-6" />
                      ) : (
                        <Lock className="mb-2 h-6 w-6 text-slate-200" />
                      )}

                      <span className="hidden text-center text-[10px] leading-tight font-bold sm:block">
                        {badgeDef.name}
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="font-bold">{badgeDef.name}</p>
                    <p className="text-xs">{badgeDef.description}</p>
                    {!isUnlocked && <p className="mt-1 text-xs text-amber-500">Locked</p>}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
