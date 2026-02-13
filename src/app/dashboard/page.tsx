"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { useJournal } from "@/hooks/useJournal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Loader2, Calendar } from "lucide-react";
import { ResumeUploader } from "@/components/ResumeUploader";
import { EntryChart } from "@/components/EntryChart";
// NEW: Imports for Week 3 Day 2
import { useResumes } from "@/hooks/useResumes";
import { ResumeList } from "@/components/ResumeList";

export default function Dashboard() {
  const { entries, addEntry, deleteEntry, isLoading } = useJournal();
  // NEW: Initialize Resume Hook
  const { resumes, isLoading: isResumesLoading, refreshResumes } = useResumes();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    addEntry({ title, content, date });

    setTitle("");
    setContent("");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold text-slate-900">My Career Journal</h1>

        {/* TOP SECTION: Split into Work Area (Left) and Career Assets (Right) */}
        <div className="mb-12 grid gap-8 lg:grid-cols-3">
          {/* LEFT COLUMN (2/3): Activity Chart & Journal Form */}
          <div className="space-y-8 lg:col-span-2">
            <section>
              <h2 className="mb-4 text-xl font-semibold text-slate-800">Activity Overview</h2>
              <EntryChart entries={entries} />
            </section>

            <section>
              <h2 className="mb-4 text-xl font-semibold text-slate-800">Write Journal</h2>
              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle>New Entry</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <div className="relative">
                        <Calendar className="absolute top-3 left-3 h-4 w-4 text-slate-500" />
                        <Input
                          id="date"
                          type="date"
                          className="pl-10"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="title">Title / Topic</Label>
                      <Input
                        id="title"
                        placeholder="e.g. Learned React Hooks"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="content">Notes</Label>
                      <Textarea
                        id="content"
                        placeholder="What did you learn today? Any blockers?"
                        className="min-h-[150px]"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      Save Entry
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </section>
          </div>

          {/* RIGHT COLUMN (1/3): Resume Tools */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-800">Resume Intelligence</h2>

            {/* 1. The Uploader */}
            <ResumeUploader />

            {/* 2. The List (Week 3 Day 2 Feature) */}
            <div className="pt-2">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold tracking-wider text-slate-500 uppercase">
                  Your Uploads
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={refreshResumes}
                  className="h-6 px-2 text-xs text-slate-400 hover:text-slate-600"
                >
                  Refresh
                </Button>
              </div>
              <ResumeList
                resumes={resumes}
                isLoading={isResumesLoading}
                onRefresh={refreshResumes} // Pass the hook's refresh function
              />{" "}
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: Journal History Grid */}
        <section className="space-y-6 border-t border-slate-200 pt-10">
          <h2 className="text-xl font-semibold text-slate-800">Recent Journal History</h2>

          {isLoading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
            </div>
          ) : entries.length === 0 ? (
            <div className="rounded-lg border border-dashed border-slate-300 bg-white py-12 text-center">
              <p className="text-slate-500">No entries yet. Start writing!</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {entries.map((entry) => (
                <Card
                  key={entry.id}
                  className="flex h-full flex-col border-slate-200 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                >
                  <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                    <div className="min-w-0 pr-2">
                      <CardTitle className="truncate text-base font-bold text-slate-900">
                        {entry.title}
                      </CardTitle>
                      <p className="mt-1 text-xs text-slate-500">
                        {new Date(entry.date).toLocaleDateString(undefined, {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 shrink-0 text-slate-400 hover:text-red-500"
                      onClick={() => deleteEntry(entry.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="line-clamp-4 text-sm leading-relaxed text-slate-600">
                      {entry.content}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
