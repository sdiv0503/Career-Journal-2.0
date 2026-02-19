"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Map, Calendar, ArrowRight, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface MonthPlan {
  month: number;
  title: string;
  description: string;
  actionItems: string[];
}

interface CareerRoadmapProps {
  resumeId: string;
  existingRoadmap?: MonthPlan[];
}

export function CareerRoadmap({ resumeId, existingRoadmap }: CareerRoadmapProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const router = useRouter();

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch(`/api/resume/${resumeId}/roadmap`, {
        method: "POST",
      });
      
      if (!res.ok) throw new Error("Failed to generate");
      
      toast.success("Career Roadmap Generated!");
      router.refresh(); // Refresh page to show the new data passed from server
    } catch (error) {
      toast.error("Generation failed. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  if (!existingRoadmap || existingRoadmap.length === 0) {
    return (
      <Card className="border-indigo-100 bg-indigo-50/30 overflow-hidden">
        <CardContent className="p-8 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-2">
            <Map className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">Generate Your 6-Month Plan</h3>
          <p className="text-slate-500 max-w-md text-sm">
            Based on your current resume and target job description, our AI will build a month-by-month technical roadmap to bridge your skill gaps.
          </p>
          <Button 
            onClick={handleGenerate} 
            disabled={isGenerating}
            className="bg-indigo-600 hover:bg-indigo-700 mt-4"
          >
            {isGenerating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Map className="w-4 h-4 mr-2" />}
            {isGenerating ? "Plotting your course..." : "Generate Roadmap"}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
          <Map className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Your 6-Month Roadmap</h2>
          <p className="text-slate-500 text-sm">A personalized curriculum to reach your target role.</p>
        </div>
      </div>

      <div className="relative border-l-2 border-indigo-100 ml-4 md:ml-6 space-y-8 pb-4">
        {existingRoadmap.map((plan, index) => (
          <div key={index} className="relative pl-8 md:pl-10">
            {/* Timeline Dot */}
            <div className="absolute -left-[17px] top-1 w-8 h-8 bg-white border-4 border-indigo-100 rounded-full flex items-center justify-center shadow-sm">
              <span className="text-xs font-bold text-indigo-600">{plan.month}</span>
            </div>

            <Card className="border-slate-200 shadow-sm hover:border-indigo-200 transition-colors">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 text-indigo-600 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Month {plan.month}</span>
                </div>
                <CardTitle className="text-lg text-slate-800">{plan.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  {plan.description}
                </p>
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Key Action Items</h4>
                  {plan.actionItems.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <ArrowRight className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}