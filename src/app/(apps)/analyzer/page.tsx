import { Navbar } from "@/components/Navbar";
import { ResumeUploader } from "@/components/ResumeUploader";
import { ResumeList } from "@/components/ResumeList";
import { ResumeTrendChart } from "@/components/ResumeTrendChart";
import { StatCard } from "@/components/StatCard";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Award, FileStack, Zap } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { FileQuestion } from "lucide-react";

interface ResumeItem {
  score: number;
  createdAt: string;
  fileName: string;
}

export default async function AnalyzerPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  // 1. Fetch All Resumes
  const rawResumes = await prisma.resume.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  // 2. Process Data for UI
  const resumes = rawResumes.map((r: any) => ({
    id: r.id,
    fileName: r.fileName,
    status: r.status,
    // Extract score safely from JSON
    score: (r.analysis as any)?.score || 0,
    createdAt: r.createdAt.toISOString(),
  }));

  // 3. Calculate Stats
  const totalResumes = resumes.length;
  // Get max score, defaulting to 0 if no resumes
  const bestScore = totalResumes > 0 ? Math.max(...resumes.map((r: ResumeItem) => r.score)) : 0; // Calculate average score
  const avgScore =
    totalResumes > 0
      ? Math.round(
          resumes.reduce((acc: number, curr: ResumeItem) => acc + curr.score, 0) / totalResumes
        )
      : 0;

  // Get recent trend (Difference between last upload and the one before it)
  let improvement = 0;
  if (resumes.length >= 2) {
    improvement = resumes[0].score - resumes[1].score;
  }

  // 4. Prepare Chart Data (Reverse array so graph goes Left->Right in time)
  const chartData = resumes.map((r: ResumeItem) => ({
    date: r.createdAt,
    score: r.score,
    fileName: r.fileName,
  }));

  return (
    <div className="min-h-screen bg-slate-50/50">
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Career Command Center</h1>
          <p className="mt-1 text-slate-500">Track your optimization progress over time.</p>
        </div>

        {/* STATS ROW */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
          <StatCard title="Best Score" value={bestScore} icon={Award} color="emerald" />
          <StatCard title="Average Score" value={avgScore} icon={TrendingUp} color="blue" />
          <StatCard title="Total Uploads" value={totalResumes} icon={FileStack} color="purple" />
          <StatCard
            title="Recent Change"
            value={improvement > 0 ? `+${improvement}` : improvement}
            icon={Zap}
            trend={improvement > 0 ? "Improving" : "Stable"}
            color="amber"
          />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* LEFT COLUMN (2/3) - Chart & List */}
          <div className="space-y-8 lg:col-span-2">
            {/* New Upload Section */}
            <section className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                <FileStack className="h-5 w-5 text-blue-500" />
                New Analysis
              </h2>
              <ResumeUploader />
            </section>

            {/* Trends Chart */}
            {resumes.length > 1 && (
              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <TrendingUp className="h-5 w-5 text-emerald-500" />
                    Score History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResumeTrendChart data={chartData} />
                </CardContent>
              </Card>
            )}

            {/* Recent Reports List */}
            <section>
              <h2 className="mb-4 text-lg font-semibold text-slate-900">Recent Reports</h2>
              {resumes.length > 0 ? (
                <ResumeList initialResumes={resumes} />
              ) : (
                <EmptyState
                  icon={<FileQuestion className="h-8 w-8" />}
                  title="No resumes analyzed yet"
                  description="Upload your first resume PDF above to get your baseline score, extract your skills, and start leveling up."
                />
              )}
            </section>
          </div>

          {/* RIGHT COLUMN (1/3) - Tips or Secondary Info */}
          <div className="space-y-6">
            <div className="sticky top-24 rounded-2xl bg-slate-900 p-6 text-white shadow-lg">
              <div className="mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                <h3 className="text-lg font-bold">Optimization Tips</h3>
              </div>
              <ul className="space-y-4 text-sm text-slate-300">
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold">
                    1
                  </span>
                  <span>
                    Use <strong>Action Verbs</strong> (Led, Built, Optimized) to start every bullet
                    point.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold">
                    2
                  </span>
                  <span>
                    Keep your summary under <strong>3 sentences</strong>. Recruiters scan it in 6
                    seconds.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold">
                    3
                  </span>
                  <span>
                    Target a score of <strong>80+</strong> before applying to top-tier tech
                    companies.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
