export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: string; // ISO String format YYYY-MM-DD
  mood?: "Happy" | "Neutral" | "Stressed"; // Future proofing
  createdAt: number;
}
// Add this to your existing types
export interface AIAnalysis {
  score: number; // 0 to 100
  foundSkills: string[];
  missingSkills: string[];
  feedback: string;
}

// Update the Resume type in your hooks/types to include this
export interface Resume {
  id: string;
  fileName: string;
  content: string;
  status: string;
  analysis?: AIAnalysis; // It's optional because it might be processing
  createdAt: string;
}