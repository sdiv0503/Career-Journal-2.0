import { useState, useEffect, useCallback } from "react";

export interface Resume {
  id: string;
  fileName: string;
  content: string;
  status: string; // "analyzing", "completed", "processing"
  analysis?: any;
  createdAt: string;
}

export function useResumes() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // This function fetches data from the API
  const fetchResumes = useCallback(async (isBackground = false) => {
    try {
      if (!isBackground) setIsLoading(true);
      
      const res = await fetch("/api/resume");
      const json = await res.json();
      
      if (json.data) {
        setResumes(json.data);
      }
    } catch (error) {
      console.error("Failed to fetch resumes", error);
    } finally {
      if (!isBackground) setIsLoading(false);
    }
  }, []);

  // Initial Fetch
  useEffect(() => {
    fetchResumes();
  }, [fetchResumes]);

  // SMART POLLING:
  // If any resume is in "analyzing" or "processing" state, 
  // check for updates every 5 seconds automatically.
  useEffect(() => {
    const hasActiveJobs = resumes.some(
      (r) => r.status === "analyzing" || r.status === "processing"
    );

    if (hasActiveJobs) {
      const interval = setInterval(() => {
        console.log("🔄 Polling for updates...");
        fetchResumes(true); // true = background refresh (don't show spinner)
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [resumes, fetchResumes]);

  return {
    resumes,
    isLoading,
    refreshResumes: () => fetchResumes(false),
  };
}