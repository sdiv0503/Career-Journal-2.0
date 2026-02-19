import { Navbar } from "@/components/Navbar";
import { InterviewChat } from "@/components/InterviewChat";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import { ArrowLeft, Briefcase } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default async function InterviewPage({ params }: { params: { id: string } }) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const { id } = await params;

  const resume = await prisma.resume.findUnique({
    where: { id, userId },
  });

  if (!resume) notFound();

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
           <Link href={`/analyzer/${id}`} className="text-sm text-slate-500 hover:text-blue-600 flex items-center gap-2 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Analysis
          </Link>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                Mock Interview Session
                <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
                  Beta
                </Badge>
              </h1>
              <p className="text-slate-500 mt-1 text-sm">
                Practicing for: <span className="font-semibold text-slate-700">{resume.fileName}</span>
              </p>
            </div>
            
            {/* Context Pill */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600 shadow-sm">
              <Briefcase className="w-3 h-3" />
              {resume.jobDescription ? "Targeted JD Active" : "General Interview"}
            </div>
          </div>
        </div>

        {/* The Chat Interface */}
        <InterviewChat resumeId={id} />
        
        {/* Helper Text */}
        <p className="text-center text-xs text-slate-400 mt-6">
          The AI can make mistakes. Treat this as practice, not professional legal advice.
        </p>
      </div>
    </div>
  );
}