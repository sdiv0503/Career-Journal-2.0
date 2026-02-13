import { GoogleGenerativeAI } from "@google/generative-ai";
import { AIAnalysis } from "@/lib/types";
import { RESUME_ANALYSIS_SYSTEM_PROMPT } from "@/lib/prompts";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function analyzeResumeWithAI(resumeText: string): Promise<AIAnalysis> {
  console.log("🤖 AI Service: Analyzing resume with Gemini Flash...");

  try {
    // FIX: Use 'gemini-flash-latest'. 
    // This alias was in your list and points to the stable, free-tier eligible model.
    const model = genAI.getGenerativeModel({ 
      model: "gemini-flash-latest",
    });

    const prompt = `
      ${RESUME_ANALYSIS_SYSTEM_PROMPT}
      
      Here is the resume text to analyze:
      ${resumeText}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (!text) {
      throw new Error("Gemini returned empty response");
    }

    // CLEANING: Strip Markdown (```json ... ```)
    const cleanJson = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const analysis = JSON.parse(cleanJson) as AIAnalysis;

    console.log("✅ AI Analysis Complete. Score:", analysis.score);
    return analysis;

  } catch (error: any) {
    console.error("❌ Gemini API Error:", error.message || error);
    
    // Graceful fallback
    return {
      score: 0,
      foundSkills: ["Error analyzing"],
      missingSkills: ["Check Quota"],
      feedback: "We could not reach the AI service (Rate Limit or Network Issue). Please try again in a few moments.",
    };
  }
}