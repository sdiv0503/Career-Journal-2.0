"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, FileText, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Sparkles, Award } from "lucide-react"; // Add imports
import { triggerConfetti } from "@/lib/confetti";

export function ResumeUploader() {
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file.");
      return;
    }

    setIsUploading(true);
    
    // Create Form Data to send file
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/resume/upload", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Upload failed");
      }
      // 1. Show Basic Success
      toast.success("Analysis Complete!", {
        description: `Score: ${json.score}/100`
      });

      // 2. Handle Gamification Rewards
      if (json.gamification) {
        
        // Show XP Toast
        setTimeout(() => {
          toast.success("XP Gained!", {
            description: `+${json.gamification.xpGained} XP for analyzing your resume.`,
            icon: <Sparkles className="w-5 h-5 text-amber-400" />,
          });
        }, 500); // Slight delay for effect

        // Handle Level Up
        if (json.gamification.hasLeveledUp) {
          triggerConfetti();
          setTimeout(() => {
            toast("LEVEL UP!", {
              description: `You are now Level ${json.gamification.newLevel}!`,
              style: { backgroundColor: "#fffbeb", border: "1px solid #fcd34d", color: "#92400e" },
            });
          }, 1000);
        }

        // Handle Badges
        if (json.gamification.newBadges?.length > 0) {
          json.gamification.newBadges.forEach((badge: any) => {
             setTimeout(() => {
               toast("Badge Unlocked!", {
                 description: `You earned: ${badge.name}`,
                 icon: <Award className="w-5 h-5 text-emerald-500" />,
               });
             }, 1500);
          });
        }
      }
      router.refresh(); // Refresh list to show new resume

    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Something went wrong.");
    } finally {
      setIsUploading(false);
    }
  }, [router]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    disabled: isUploading,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed rounded-xl p-8 transition-all cursor-pointer text-center",
        isDragActive ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/50",
        isUploading ? "opacity-50 pointer-events-none" : ""
      )}
    >
      <input {...getInputProps()} />
      
      <div className="flex flex-col items-center gap-3">
        <div className={cn(
          "p-4 rounded-full transition-colors",
          isDragActive ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-500"
        )}>
          {isUploading ? (
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          ) : (
            <UploadCloud className="w-8 h-8" />
          )}
        </div>
        
        <div className="space-y-1">
          <h3 className="font-semibold text-slate-900">
            {isUploading ? "Parsing PDF..." : "Click to upload or drag & drop"}
          </h3>
          <p className="text-sm text-slate-500">
            PDF only (Max 5MB). We extract text automatically.
          </p>
        </div>
      </div>
    </div>
  );
}