"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Send, Sparkles, Award } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { triggerConfetti } from "@/lib/confetti";
import { cn } from "@/lib/utils";

export function JournalEditor() {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!content.trim()) return;
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/journal", {
        method: "POST",
        body: JSON.stringify({ content }),
      });
      const json = await res.json();
      
      if (!res.ok) throw new Error(json.error);

      setContent("");
      router.refresh();
      
      // GAMIFICATION TRIGGERS
      if (json.gamification?.hasLeveledUp) {
        triggerConfetti();
        toast("LEVEL UP!", {
          description: `Congratulations! You reached Level ${json.gamification.newLevel}.`,
          icon: <Sparkles className="w-5 h-5 text-amber-400" />,
          style: { backgroundColor: "#fffbeb", border: "1px solid #fcd34d", color: "#92400e" },
          duration: 5000,
        });
      } else {
        toast.success("Quest Completed!", {
          description: `+${json.gamification?.xpGained || 10} XP | Streak: ${json.gamification?.streak} days`
        });
      }

      if (json.gamification?.newBadges?.length > 0) {
        json.gamification.newBadges.forEach((badge: any) => {
          toast("Badge Unlocked!", {
            description: badge.name,
            icon: <Award className="w-5 h-5 text-amber-500" />,
          });
        });
      }

    } catch (error) {
      toast.error("Mission Failed: Could not save entry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn(
      "relative rounded-3xl p-1 transition-all duration-300 bg-gradient-to-b from-blue-50 to-white border border-blue-100 shadow-sm",
      isFocused ? "shadow-md ring-2 ring-blue-100 border-blue-300" : ""
    )}>
      {/* Decorative 'Daily Quest' Badge */}
      <div className="absolute -top-3 left-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5 z-10">
        <Sparkles className="w-3 h-3 text-yellow-300" />
        DAILY QUEST
      </div>

      <div className="bg-white rounded-[20px] p-4 pt-6">
        <Textarea
          placeholder="What is your main victory today?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="min-h-[100px] resize-none border-none shadow-none focus-visible:ring-0 text-lg placeholder:text-slate-300 text-slate-700"
        />
        
        <div className="flex justify-between items-center mt-4 border-t border-slate-50 pt-3">
          <div className="text-xs font-semibold text-slate-400 pl-1">
            REWARD: <span className="text-emerald-500">+10 XP</span>
          </div>
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting || !content.trim()}
            className="rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 shadow-lg shadow-slate-200 hover:translate-y-[-1px] transition-all"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <>
                Complete
                <Send className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}