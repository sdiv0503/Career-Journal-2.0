"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FileText, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import { EmptyState } from "@/components/EmptyState";
import { UploadCloud } from "lucide-react";

// Define the shape of a Resume
interface Resume {
  id: string;
  fileName: string;
  status: string;
  score: number; // We will extract this from the JSON analysis
  createdAt: string; // IMPORTANT: Expect string, not Date (serialization fix)
}

interface ResumeListProps {
  initialResumes?: Resume[]; // Make it optional to prevent crashes
}

export function ResumeList({ initialResumes = [] }: ResumeListProps) {
  const router = useRouter();

  if (initialResumes.length === 0) {
    return (
      <EmptyState
        title="No Resumes Yet"
        description="Upload your resume to get an AI-powered analysis and score."
        icon={<UploadCloud className="w-8 h-8" />}
      />
    );
  }

  return (
    <div className="space-y-4">
      {initialResumes.map((resume) => (
        <Card
          key={resume.id}
          className="group cursor-pointer transition-shadow hover:shadow-md"
          onClick={() => router.push(`/analyzer/${resume.id}`)} // Or wherever your detail view is
        >
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-blue-50 p-2 text-blue-600 transition-colors group-hover:bg-blue-100">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">{resume.fileName}</h3>
                <p className="text-xs text-slate-500">
                  {formatDistanceToNow(new Date(resume.createdAt), { addSuffix: true })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Status Badge */}
              {resume.status === "completed" ? (
                <div className="flex items-center gap-1.5 rounded-full border border-green-100 bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                  <CheckCircle className="h-3 w-3" />
                  <span>Score: {resume.score}</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 rounded-full border border-amber-100 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  <span>Processing...</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
