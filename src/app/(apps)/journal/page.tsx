import { Navbar } from "@/components/Navbar";
import { EntryChart } from "@/components/EntryChart";
import { JournalList } from "@/components/JournalList";
import { JournalEditor } from "@/components/JournalEditor";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Activity } from "lucide-react";

export default async function JournalPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  // Fetch only the entries (Gamification stats moved to Profile)
  const rawEntries = await prisma.entry.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  const entries = rawEntries.map((entry: any) => ({
    ...entry,
    date: entry.date.toISOString(),
    createdAt: entry.createdAt.getTime(),
    updatedAt: entry.updatedAt.getTime(),
    mood: entry.mood as "Happy" | "Neutral" | "Stressed" | undefined,
  }));

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-12">
        {/* Clean Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">My Journal</h1>
          <p className="mt-2 text-slate-500">
            Log your daily progress. Consistency is the only cheat code.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Main Feed (Left Column - 7/12) */}
          <div className="space-y-10 lg:col-span-7">
            {/* The 'Daily Quest' Editor */}
            <section>
              <h3 className="mb-4 ml-2 text-sm font-bold tracking-wider text-slate-400 uppercase">
                Current Mission
              </h3>
              <JournalEditor />
            </section>

            {/* The Timeline */}
            <section>
              <h3 className="mb-4 ml-2 text-sm font-bold tracking-wider text-slate-400 uppercase">
                Your Journey
              </h3>
              <JournalList
                initialEntries={entries.map((e) => ({
                  ...e,
                  createdAt: new Date(e.createdAt).toISOString(),
                }))}
              />
            </section>
          </div>

          {/* Analytics Sidebar (Right Column - 5/12) */}
          <div className="space-y-6 lg:col-span-5">
            {/* Activity Chart Box */}
            <div className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-1 shadow-sm">
              <div className="flex items-center gap-2 border-b border-slate-100 p-4">
                <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                  <Activity className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-slate-800">Activity Analytics</h3>
              </div>
              <div className="p-4">
                <EntryChart entries={entries} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
