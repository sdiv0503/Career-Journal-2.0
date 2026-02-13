"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Error Caught:", error);
  }, [error]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-slate-50 text-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 max-w-md">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-red-50 rounded-full">
            <AlertTriangle className="h-10 w-10 text-red-500" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Something went wrong!
        </h2>
        
        <p className="text-slate-500 mb-6">
          We encountered an unexpected error. Our team has been notified.
        </p>

        <div className="space-y-4">
          <Button 
            onClick={() => reset()} 
            className="w-full bg-slate-900 hover:bg-slate-800"
          >
            Try Again
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => window.location.href = "/dashboard"}
            className="w-full"
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}