import { useState, useEffect } from "react";
import { JournalEntry } from "@/lib/types";

export function useJournal() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // FETCH: Load entries from the API on mount
  useEffect(() => {
    const fetchEntries = async () => {
  try {
    const res = await fetch("/api/journal");
    const json = await res.json(); // Parse JSON
    
    // Check if data exists, otherwise default to empty array
    if (json.data) {
      setEntries(json.data);
    } else {
      setEntries([]);
    }
  } catch (error) {
    console.error("Failed to fetch journal entries", error);
  } finally {
    setIsLoading(false);
  }
};

    fetchEntries();
  }, []);

  // CREATE: Send new entry to the API
  const addEntry = async (entry: Omit<JournalEntry, "id" | "createdAt" | "userId">) => {
    try {
      // Optimistic Update (Immediate UI feedback)
      // We create a temporary ID to show it immediately while the server processes
      const tempId = crypto.randomUUID();
      const optimisticEntry = { ...entry, id: tempId, createdAt: Date.now() } as JournalEntry;
      setEntries((prev) => [optimisticEntry, ...prev]);

      // Real Server Call
      const res = await fetch("/api/journal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });
      const json = await res.json();
      const newEntry = json.data;

      // Replace the temporary entry with the real one from DB
      setEntries((prev) => 
        prev.map((e) => (e.id === tempId ? newEntry : e))
      );
      
    } catch (error) {
      console.error("Failed to add entry", error);
      // Rollback logic could go here
    }
  };

  // DELETE: Remove entry via API
  const deleteEntry = async (id: string) => {
    try {
      // Optimistic Update
      setEntries((prev) => prev.filter((entry) => entry.id !== id));

      await fetch(`/api/journal/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Failed to delete entry", error);
    }
  };

  return {
    entries,
    addEntry,
    deleteEntry,
    isLoading,
  };
}