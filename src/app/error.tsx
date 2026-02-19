"use client";

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
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-slate-50 px-4 text-center">
      <div className="max-w-md rounded-2xl border border-slate-100 bg-white p-8 shadow-xl">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-red-50 p-4">
            <AlertTriangle className="h-10 w-10 text-red-500" />
          </div>
        </div>

        <h2 className="mb-2 text-2xl font-bold text-slate-900">Something went wrong!</h2>

        <p className="mb-6 text-slate-500">
          We encountered an unexpected error. Our team has been notified.
        </p>

        <div className="space-y-4">
          <Button onClick={() => reset()} className="w-full bg-slate-900 hover:bg-slate-800">
            Try Again
          </Button>

          <Button variant="outline" onClick={() => (window.location.href = "/")} className="w-full">
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}
