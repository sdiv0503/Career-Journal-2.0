"use client";

import { AlertCircle, CheckCircle, Trophy, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress"; // We need to create this simple component or use a div
import { AIAnalysis } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ResumeAnalysisProps {
  analysis: AIAnalysis | null;
  status: string;
}

export function ResumeAnalysis({ analysis, status }: ResumeAnalysisProps) {
  if (status === "analyzing" || !analysis) {
    return (
      <Card className="border-blue-200 bg-blue-50/50">
        <CardContent className="pt-6 text-center text-blue-700">
          <Lightbulb className="h-8 w-8 mx-auto mb-2 animate-pulse" />
          <p className="font-semibold">AI is analyzing your resume...</p>
          <p className="text-sm opacity-80">This usually takes about 10 seconds.</p>
        </CardContent>
      </Card>
    );
  }

  // Determine color based on score
  const scoreColor = 
    analysis.score >= 80 ? "text-green-600" : 
    analysis.score >= 50 ? "text-amber-600" : "text-red-600";

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* 1. Score Card */}
      <Card className="overflow-hidden border-none shadow-md">
        <div className={cn("h-2 w-full", analysis.score >= 80 ? "bg-green-500" : "bg-amber-500")} />
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between">
            <span>Match Score</span>
            <span className={cn("text-2xl font-bold", scoreColor)}>{analysis.score}/100</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
           <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
             <div 
               className={cn("h-full transition-all duration-1000 ease-out", analysis.score >= 80 ? "bg-green-500" : "bg-amber-500")} 
               style={{ width: `${analysis.score}%` }} 
             />
           </div>
           <p className="text-xs text-slate-500 mt-2">
             Based on industry standards for your role.
           </p>
        </CardContent>
      </Card>

      {/* 2. Skills Breakdown */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-green-100 bg-green-50/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-800 flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              Skills Found
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {analysis.foundSkills.map((skill, i) => (
                <span key={i} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-white text-green-700 border border-green-200 shadow-sm">
                  {skill}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-100 bg-red-50/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-red-800 flex items-center">
              <AlertCircle className="h-4 w-4 mr-2" />
              Missing Keywords
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {analysis.missingSkills.map((skill, i) => (
                <span key={i} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-white text-red-700 border border-red-200 shadow-sm">
                  {skill}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 3. AI Feedback */}
      <Card className="bg-slate-900 text-slate-50 border-none shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Trophy className="h-5 w-5 mr-2 text-yellow-400" />
            AI Coach Feedback
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-300 leading-relaxed text-sm">
            {analysis.feedback}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}