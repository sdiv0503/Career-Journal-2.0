import { useState, useEffect } from "react";
import { JournalEntry } from "@/lib/types";

export function useJournal() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load entries from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("journal_entries");
    if (saved) {
      try {
        setEntries(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse journal entries", e);
      }
    }
    setIsLoading(false);
  }, []);

  // Save entries whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("journal_entries", JSON.stringify(entries));
    }
  }, [entries, isLoading]);

  const addEntry = (entry: Omit<JournalEntry, "id" | "createdAt">) => {
    const newEntry: JournalEntry = {
      ...entry,
      id: crypto.randomUUID(), // Generates a unique ID
      createdAt: Date.now(),
    };
    // Add to the TOP of the list (newest first)
    setEntries((prev) => [newEntry, ...prev]);
  };

  const deleteEntry = (id: string) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  return {
    entries,
    addEntry,
    deleteEntry,
    isLoading,
  };
}