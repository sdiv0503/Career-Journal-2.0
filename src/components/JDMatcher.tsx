"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Target, AlertCircle, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function JDMatcher({ resumeId, existingMatch }: { resumeId: string, existingMatch?: any }) {
  const [jdText, setJdText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const router = useRouter();

  const handleMatch = async () => {
    if (!jdText.trim()) return toast.error("Please paste a Job Description first.");
    
    setIsAnalyzing(true);
    try {
      const res = await fetch(`/api/resume/${resumeId}/match`, {
        method: "POST",
        body: JSON.stringify({ jdText }),
      });
      
      if (!res.ok) throw new Error();
      
      toast.success("Targeted analysis complete!");
      router.refresh(); // Refresh page to show new match data
    } catch (e) {
      toast.error("Failed to analyze against JD.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-blue-100 bg-blue-50/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <Target className="w-5 h-5" /> Targeted Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-slate-500">
            Paste the Job Description you are targeting to see how you stack up.
          </p>
          <Textarea 
            placeholder="Paste JD text here..."
            className="min-h-[150px] bg-white"
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
          />
          <Button 
            onClick={handleMatch} 
            disabled={isAnalyzing}
            className="w-full bg-blue-600 hover:bg-blue-700 font-bold"
          >
            {isAnalyzing ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : "Run JD Match"}
          </Button>
        </CardContent>
      </Card>

      {existingMatch && (
        <div className="grid gap-4 md:grid-cols-2 animate-in fade-in slide-in-from-bottom-2">
          <Card className="border-emerald-100">
            <CardHeader className="pb-2">
               <CardTitle className="text-xs uppercase text-slate-400">Target Match Score</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="text-4xl font-black text-emerald-600">{existingMatch.matchScore}%</div>
               <p className="text-xs text-slate-500 mt-2">{existingMatch.matchFeedback}</p>
            </CardContent>
          </Card>

          <Card className="border-amber-100">
            <CardHeader className="pb-2">
               <CardTitle className="text-xs uppercase text-slate-400">Missing Keywords</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
               {existingMatch.missingKeywords.map((k: string) => (
                 <span key={k} className="px-2 py-1 rounded bg-amber-50 text-amber-700 text-[10px] font-bold border border-amber-100">
                   {k}
                 </span>
               ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}