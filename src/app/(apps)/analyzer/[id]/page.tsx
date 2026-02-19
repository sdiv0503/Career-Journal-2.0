import { Navbar } from "@/components/Navbar";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, AlertCircle, Sparkles, Brain, FileText, Zap } from "lucide-react";
import Link from "next/link";
import { ResumeChart } from "@/components/ResumeChart";
import { JDMatcher } from "@/components/JDMatcher";
import { MessageSquare } from "lucide-react"; // Import icon
import { CareerRoadmap } from "@/components/CareerRoadmap";
import { Metadata } from "next";

// Define types (same as before)
interface AiAnalysis {
  score: number;
  summary: string;
  skills: string[];
  structure: {
    section: string;
    score: number;
    feedback: string;
  }[];
  improvements: string[];
}
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { userId } = await auth();
  const { id } = await params;

  if (!userId) return { title: "Unauthorized" };

  const resume = await prisma.resume.findUnique({
    where: { id, userId },
    select: { fileName: true }, // Only fetch what we need for the title
  });

  if (!resume) return { title: "Not Found" };

  return {
    title: `${resume.fileName} Report`,
    description: `Detailed AI analysis and career roadmap for ${resume.fileName}.`,
  };
}

export default async function ResumeDetailPage({ params }: { params: { id: string } }) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const { id } = await params;

  const resume = await prisma.resume.findUnique({
    where: { id, userId },
  });

  if (!resume) notFound();

  // Parse Data
  const analysis = (resume.analysis as unknown as AiAnalysis) || {
    score: 0,
    summary: "Analysis pending.",
    skills: [],
    structure: [],
    improvements: [],
  };

  const getSection = (name: string) =>
    analysis.structure?.find((s) => s.section === name) || { score: 0, feedback: "No data" };

  const impact = getSection("Impact");
  const brevity = getSection("Brevity");
  const style = getSection("Style");
  const softSkills = getSection("Soft Skills");

  // Prepare data arrays to pass to the Client Component
  const chartLabels = ["Impact", "Brevity", "Style", "Soft Skills", "Technical"];
  const chartScores = [impact.score, brevity.score, style.score, softSkills.score, 8];

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-600 bg-emerald-50 border-emerald-200";
    if (score >= 60) return "text-amber-600 bg-amber-50 border-amber-200";
    return "text-rose-600 bg-rose-50 border-rose-200";
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/analyzer"
            className="mb-4 flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-blue-600"
          >
            <ArrowLeft className="h-4 w-4" /> Back to List
          </Link>
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">{resume.fileName}</h1>
              <p className="mt-1 text-sm text-slate-500">
                Analyzed on {new Date(resume.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div
              className={`flex flex-col items-center rounded-2xl border-2 px-6 py-3 ${getScoreColor(analysis.score)}`}
            >
              <span className="text-3xl font-bold">{analysis.score}</span>
              <span className="text-xs font-bold tracking-wider uppercase opacity-80">Score</span>
            </div>
            <div className="mt-4 flex gap-3 md:mt-0">
              {/* Add this button */}
              <Link href={`/interview/${resume.id}`}>
                <Button className="bg-slate-900 text-white shadow-md transition-all hover:translate-y-[-1px] hover:bg-slate-800">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Start Mock Interview
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* METRIC GRID */}
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[impact, brevity, style, softSkills].map((metric, i) => (
            <Card key={i} className="shadow-sm">
              <CardContent className="p-4 pt-6">
                <div className="mb-2 flex items-start justify-between">
                  <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                    {
                      [
                        <Zap key="1" />,
                        <FileText key="2" />,
                        <Sparkles key="3" />,
                        <Brain key="4" />,
                      ][i]
                    }
                  </div>
                  <span className="text-lg font-bold text-slate-700">{metric.score}/10</span>
                </div>
                <h3 className="mb-1 font-semibold text-slate-900">
                  {["Impact", "Brevity", "Style", "Soft Skills"][i]}
                </h3>
                <p className="line-clamp-2 text-xs text-slate-500">{metric.feedback}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* LEFT COLUMN */}
          <div className="space-y-8 lg:col-span-2">
            {/* Summary */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="border-b border-slate-100 pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Sparkles className="h-5 w-5 text-purple-500" />
                  Executive Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-lg leading-relaxed text-slate-700">
                  {analysis.summary || "No summary generated."}
                </p>
              </CardContent>
            </Card>

            {/* Improvements */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="border-b border-slate-100 pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <AlertCircle className="h-5 w-5 text-amber-500" />
                  Critical Improvements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                {analysis.improvements?.length > 0 ? (
                  analysis.improvements.map((imp, i) => (
                    <div
                      key={i}
                      className="flex gap-4 rounded-xl border border-amber-100 bg-amber-50/50 p-4"
                    >
                      <div className="mt-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-amber-200 text-xs font-bold text-amber-700">
                        {i + 1}
                      </div>
                      <p className="text-slate-700">{imp}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500 italic">No improvements suggested.</p>
                )}
              </CardContent>
            </Card>
            {/* JD MATCHER SECTION */}
            <div className="mt-8">
              <JDMatcher resumeId={resume.id} existingMatch={(analysis as any).matchData} />
            </div>
            {/* ROADMAP SECTION (Add this here!) */}
            <div className="mt-12 border-t border-slate-200 pt-8">
              <CareerRoadmap resumeId={resume.id} existingRoadmap={(analysis as any).roadmap} />
            </div>

            {/* Skills */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="border-b border-slate-100 pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                  Detected Skills
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-2">
                  {analysis.skills?.length > 0 ? (
                    analysis.skills.map((skill, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="bg-slate-100 px-3 py-1 text-slate-700 hover:bg-slate-200"
                      >
                        {skill}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-slate-500 italic">No specific skills detected.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            {/* Chart (Now Isolated in Client Component) */}
            <Card className="overflow-hidden shadow-sm">
              <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-2 text-center">
                <CardTitle className="text-base">Competency Map</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="relative aspect-square">
                  {/* FIX: Use the new component here */}
                  <ResumeChart data={chartScores} labels={chartLabels} />
                </div>
              </CardContent>
            </Card>

            {/* Pro Tip */}
            <div className="rounded-2xl bg-slate-900 p-6 text-white shadow-lg">
              <div className="mb-3 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-yellow-400" />
                <h3 className="font-bold">Pro Tip</h3>
              </div>
              <p className="text-sm leading-relaxed text-slate-300">
                To improve your "Impact" score, try adding quantification to your project
                descriptions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
