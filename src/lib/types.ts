export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: string; // ISO String format YYYY-MM-DD
  mood?: "Happy" | "Neutral" | "Stressed"; // Future proofing
  createdAt: number;
}