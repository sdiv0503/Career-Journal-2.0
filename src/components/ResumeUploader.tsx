"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, Loader2, FileText, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function ResumeUploader() {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Basic validation
    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file.");
      return;
    }

    setIsUploading(true);
    setStatus("idle");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      setStatus("success");
      router.refresh(); // Refresh server components to show new data
    } catch (error) {
      console.error(error);
      setStatus("error");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="border-dashed border-2 border-slate-300 bg-slate-50 shadow-none hover:bg-slate-100 transition-colors">
      <CardContent className="flex flex-col items-center justify-center py-10 text-center">
        {status === "success" ? (
          <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
            <div className="bg-green-100 p-3 rounded-full mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">
              Resume Analyzed!
            </h3>
            <p className="text-slate-500 mb-4">
              We've extracted the text. AI analysis is coming next.
            </p>
            <Button
              variant="outline"
              onClick={() => setStatus("idle")}
            >
              Upload Another
            </Button>
          </div>
        ) : (
          <>
            <div className="bg-white p-4 rounded-full shadow-sm mb-4">
              {isUploading ? (
                <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
              ) : (
                <Upload className="h-8 w-8 text-blue-600" />
              )}
            </div>
            
            <h3 className="text-lg font-semibold text-slate-900 mb-1">
              {isUploading ? "Analyzing Resume..." : "Upload your Resume"}
            </h3>
            
            <p className="text-sm text-slate-500 max-w-xs mb-6">
              Upload your PDF resume. We'll extract the skills and experience for analysis.
            </p>

            <div className="relative">
              <input
                type="file"
                accept=".pdf"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileUpload}
                disabled={isUploading}
              />
              <Button disabled={isUploading}>
                {isUploading ? "Processing..." : "Select PDF File"}
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}