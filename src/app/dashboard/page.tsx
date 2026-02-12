"use client"; // This must be a Client Component to use Hooks

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { useJournal } from "@/hooks/useJournal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Loader2, Calendar } from "lucide-react";

export default function Dashboard() {
  const { entries, addEntry, deleteEntry, isLoading } = useJournal();
  
  // Local form state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    addEntry({ title, content, date });
    
    // Reset form
    setTitle("");
    setContent("");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">
          My Career Journal
        </h1>

        <div className="grid gap-8 md:grid-cols-[350px_1fr]">
          
          {/* LEFT COLUMN: Entry Form */}
          <section>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>New Entry</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
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

          {/* RIGHT COLUMN: Entry List */}
          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-800">
              Recent Entries
            </h2>

            {isLoading ? (
              <div className="flex justify-center py-10">
                <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
              </div>
            ) : entries.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border border-dashed border-slate-300">
                <p className="text-slate-500">No entries yet. Start writing!</p>
              </div>
            ) : (
              entries.map((entry) => (
                <Card key={entry.id} className="transition-shadow hover:shadow-md">
                  <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                    <div>
                      <CardTitle className="text-lg font-bold text-slate-900">
                        {entry.title}
                      </CardTitle>
                      <p className="text-sm text-slate-500 mt-1">
                        {new Date(entry.date).toLocaleDateString(undefined, {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-slate-400 hover:text-red-500"
                      onClick={() => deleteEntry(entry.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                      {entry.content}
                    </p>
                  </CardContent>
                </Card>
              ))
            )}
          </section>
        </div>
      </main>
    </div>
  );
}