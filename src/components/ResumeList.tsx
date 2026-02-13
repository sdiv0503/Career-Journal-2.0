"use client";

import { useState } from "react";
import {
  FileText,
  CheckCircle,
  Clock,
  ChevronDown,
  ChevronUp,
  Loader2,
  Sparkles,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ResumeAnalysis } from "@/components/ResumeAnalysis";
import { AIAnalysis } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

// Defined types for the props
interface ResumeListProps {
  resumes: any[]; // Ideally, import the strict Resume type from hooks/useResumes
  isLoading: boolean;
  onRefresh?: () => void; // Callback to refresh the parent list
}

export function ResumeList({ resumes, isLoading, onRefresh }: ResumeListProps) {
  // Track which resume is expanded
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Track which resumes are currently being analyzed (to show individual spinners)
  const [analyzingIds, setAnalyzingIds] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleAnalyze = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // Prevent the card from closing/opening when clicking the button

    try {
      // 1. Add ID to analyzing set (shows spinner)
      setAnalyzingIds((prev) => new Set(prev).add(id));

      // 2. Call the Mock AI API
      const res = await fetch("/api/resume/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error("Analysis failed");

      // 3. Refresh the list to pull the new 'analysis' data from DB
      if (onRefresh) onRefresh();

      // 4. Ensure the card is expanded so the user sees the result immediately
      setExpandedId(id);
    } catch (error) {
      alert("Failed to start analysis");
      console.error(error);
    } finally {
      // 5. Remove ID from analyzing set
      setAnalyzingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {/* Generate 3 fake skeleton cards */}
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-lg" /> {/* Icon */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" /> {/* Filename */}
                <Skeleton className="h-3 w-20" /> {/* Date */}
              </div>
            </div>
            <Skeleton className="h-6 w-16 rounded-full" /> {/* Status Badge */}
          </div>
        ))}
      </div>
    );
  }

  if (resumes.length === 0) {
    return (
      <Card className="h-full border-dashed bg-slate-50/50 shadow-none">
        <CardContent className="flex h-full min-h-[200px] flex-col items-center justify-center text-sm text-slate-400">
          <FileText className="mb-2 h-8 w-8 opacity-50" />
          <p>No resumes uploaded yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {resumes.map((resume) => (
        <Card key={resume.id} className="transition-all hover:border-blue-200">
          <div
            className="flex cursor-pointer items-center justify-between p-4"
            onClick={() => toggleExpand(resume.id)}
          >
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-100 p-2">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900">{resume.fileName}</h4>
                <p className="text-xs text-slate-500">
                  Uploaded on {new Date(resume.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {resume.status === "completed" && resume.analysis ? (
                <span className="flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-600">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  Analyzed
                </span>
              ) : resume.status === "analyzing" ? (
                <span className="flex animate-pulse items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600">
                  <Sparkles className="mr-1 h-3 w-3" />
                  Thinking...
                </span>
              ) : (
                <span className="flex items-center rounded-full bg-amber-50 px-2 py-1 text-xs font-medium text-amber-600">
                  <Clock className="mr-1 h-3 w-3" />
                  Pending
                </span>
              )}
              {expandedId === resume.id ? (
                <ChevronUp className="h-4 w-4 text-slate-400" />
              ) : (
                <ChevronDown className="h-4 w-4 text-slate-400" />
              )}
            </div>
          </div>

          {/* Expanded Content */}
          {expandedId === resume.id && (
            <div className="border-t border-slate-100 bg-slate-50/50 px-4 pt-4 pb-4">
              {/* IF analysis exists, show the Report Card. ELSE show the raw text + Analyze Button */}
              {resume.analysis ? (
                <ResumeAnalysis analysis={resume.analysis as AIAnalysis} status={resume.status} />
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                      Raw Content Preview
                    </h5>

                    {/* The Working Analyze Button */}
                    <Button
                      size="sm"
                      onClick={(e) => handleAnalyze(e, resume.id)}
                      disabled={analyzingIds.has(resume.id)}
                      className="bg-purple-600 text-white transition-colors hover:bg-purple-700"
                    >
                      {analyzingIds.has(resume.id) ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-4 w-4" />
                          Analyze with AI
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="h-32 overflow-y-auto rounded border border-slate-200 bg-white p-3 font-mono text-xs whitespace-pre-wrap text-slate-600">
                    {resume.content}
                  </div>
                </div>
              )}
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}
