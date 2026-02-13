"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Medal, Award, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LeaderboardEntry {
  name: string;
  score: number;
}

export default function LeaderboardPage() {
  const [data, setData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/leaderboard")
      .then(res => res.json())
      .then(json => {
        if (json.data) setData(json.data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
            Global Talent Leaderboard
          </h1>
          <p className="text-slate-600">
            The top-scoring resumes analyzed by our AI. Can you reach the #1 spot?
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
          </div>
        ) : (
          <Card className="border-none shadow-xl overflow-hidden">
            <CardHeader className="bg-slate-900 text-white">
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-400" />
                Top Performers
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {data.map((entry, index) => (
                <div 
                  key={index}
                  className={cn(
                    "flex items-center justify-between p-6 border-b border-slate-100 last:border-0",
                    index === 0 ? "bg-yellow-50/30" : "bg-white"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 font-bold text-sm">
                      {index === 0 && <Medal className="h-6 w-6 text-yellow-500" />}
                      {index === 1 && <Medal className="h-6 w-6 text-slate-400" />}
                      {index === 2 && <Medal className="h-6 w-6 text-amber-600" />}
                      {index > 2 && <span className="text-slate-400">#{index + 1}</span>}
                    </div>
                    <span className="font-semibold text-slate-800">
                      {entry.name}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-24 bg-slate-100 rounded-full overflow-hidden hidden sm:block">
                      <div 
                        className="h-full bg-blue-600" 
                        style={{ width: `${entry.score}%` }}
                      />
                    </div>
                    <span className="text-xl font-bold text-slate-900 w-12 text-right">
                      {entry.score}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}