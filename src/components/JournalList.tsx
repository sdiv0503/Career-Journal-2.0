"use client";

import { useState } from "react";
import { EmptyState } from "@/components/EmptyState";
import { PenLine, Smile, Meh, Frown, MoreVertical, Trash2, Edit2, X, Check } from "lucide-react";
import { format, isToday, isYesterday } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Entry {
  id: string;
  content: string;
  createdAt: string;
  mood?: "Happy" | "Neutral" | "Stressed";
}

export function JournalList({ initialEntries }: { initialEntries: Entry[] }) {
  const router = useRouter();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  if (initialEntries.length === 0) {
    return (
      <EmptyState
        title="Start Your Journey"
        description="Log your first entry to earn the 'First Step' badge."
        icon={PenLine}
        color="emerald"
      />
    );
  }

  // --- Handlers ---

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this entry?")) return;
    setIsDeleting(id);

    try {
      const res = await fetch(`/api/journal/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();

      toast.success("Entry deleted");
      router.refresh();
    } catch (e) {
      toast.error("Failed to delete entry");
    } finally {
      setIsDeleting(null);
    }
  };

  const startEdit = (entry: Entry) => {
    setEditingId(entry.id);
    setEditContent(entry.content);
  };

  const saveEdit = async (id: string) => {
    try {
      const res = await fetch(`/api/journal/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ content: editContent }),
      });
      if (!res.ok) throw new Error();

      toast.success("Entry updated");
      setEditingId(null);
      router.refresh();
    } catch (e) {
      toast.error("Failed to update entry");
    }
  };

  // --- Helpers ---

  const getMoodIcon = (mood?: string) => {
    switch (mood) {
      case "Happy":
        return <Smile className="h-4 w-4 text-emerald-500" />;
      case "Stressed":
        return <Frown className="h-4 w-4 text-rose-500" />;
      default:
        return <Meh className="h-4 w-4 text-amber-500" />;
    }
  };

  // Group entries by Month
  const groupedEntries = initialEntries.reduce(
    (groups, entry) => {
      const date = new Date(entry.createdAt);
      const key = format(date, "MMMM yyyy");
      if (!groups[key]) groups[key] = [];
      groups[key].push(entry);
      return groups;
    },
    {} as Record<string, Entry[]>
  );

  return (
    <div className="space-y-8">
      {Object.entries(groupedEntries).map(([month, entries]) => (
        <div key={month} className="relative">
          <div className="sticky top-20 z-10 mb-6 flex items-center">
            <div className="rounded-full border border-slate-200 bg-slate-100/80 px-3 py-1 text-xs font-bold tracking-wider text-slate-500 uppercase backdrop-blur-md">
              {month}
            </div>
          </div>

          <div className="ml-4 space-y-8 border-l-2 border-slate-200 pb-8">
            {entries.map((entry) => {
              const date = new Date(entry.createdAt);
              const dayStr = isToday(date)
                ? "Today"
                : isYesterday(date)
                  ? "Yesterday"
                  : format(date, "EEEE");
              const isEditing = editingId === entry.id;

              return (
                <div key={entry.id} className="group relative pl-8">
                  <div className="absolute top-0 -left-[9px] h-4 w-4 rounded-full border-4 border-slate-200 bg-white transition-all duration-300 group-hover:border-blue-500" />

                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md">
                    {/* Header */}
                    <div className="mb-3 flex items-start justify-between">
                      <div>
                        <div className="mb-1 flex items-center gap-2">
                          <span
                            className={cn(
                              "text-sm font-bold",
                              isToday(date) ? "text-blue-600" : "text-slate-900"
                            )}
                          >
                            {dayStr}
                          </span>
                          <span className="text-xs font-medium text-slate-400">
                            {format(date, "d MMM • h:mm a")}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="rounded-lg border border-slate-100 bg-slate-50 p-1.5">
                          {getMoodIcon(entry.mood)}
                        </div>

                        {/* Dropdown Menu for Edit/Delete */}
                        {!isEditing && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                className="h-8 w-8 p-0 text-slate-400 hover:text-slate-600"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => startEdit(entry)}>
                                <Edit2 className="mr-2 h-4 w-4" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDelete(entry.id)}
                                className="text-red-600 focus:bg-red-50 focus:text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>
                    </div>

                    {/* Content Area */}
                    {isEditing ? (
                      <div className="space-y-3">
                        <Textarea
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          className="min-h-[100px]"
                        />
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>
                            <X className="mr-1 h-4 w-4" /> Cancel
                          </Button>
                          <Button size="sm" onClick={() => saveEdit(entry.id)}>
                            <Check className="mr-1 h-4 w-4" /> Save
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-base leading-relaxed font-medium whitespace-pre-wrap text-slate-600">
                        {entry.content}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
