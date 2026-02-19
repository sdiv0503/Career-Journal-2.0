import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the API
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function analyzeResume(resumeText: string) {
  // Use the Gemini Pro model (best for text analysis)
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
    You are an expert ATS (Applicant Tracking System) and Senior Technical Recruiter.
    Analyze the following resume text strictly and objectively.
    
    RESUME TEXT:
    "${resumeText.slice(0, 10000)}" // Limit text length for safety
    
    OUTPUT INSTRUCTIONS:
    Return ONLY a raw JSON object (no markdown formatting, no code blocks).
    The JSON must match this exact schema:
    {
      "score": number (0-100),
      "summary": "Professional executive summary of the candidate (max 2 sentences)",
      "skills": ["Array", "of", "extracted", "skills"],
      "structure": [
        { "section": "Impact", "score": number (0-10), "feedback": "Specific advice" },
        { "section": "Brevity", "score": number (0-10), "feedback": "Specific advice" },
        { "section": "Style", "score": number (0-10), "feedback": "Specific advice" },
        { "section": "Soft Skills", "score": number (0-10), "feedback": "Specific advice" }
      ],
      "improvements": ["Specific bullet point 1", "Specific bullet point 2"]
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // CLEANUP: Sometimes AI adds markdown code blocks (```json ... ```). We remove them.
    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // Parse JSON
    const data = JSON.parse(text);
    return data;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    // Return a fallback object so the app doesn't crash
    return {
      score: 0,
      summary: "Analysis failed. Please try again.",
      skills: [],
      structure: [],
      improvements: ["Could not analyze resume text."],
    };
  }
}

/**
 * Analyzes how well a resume fits a specific Job Description.
 */
export async function matchResumeToJD(resumeText: string, jdText: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
    You are an expert ATS (Applicant Tracking System). 
    Compare the following Resume against the Job Description.
    
    JOB DESCRIPTION:
    "${jdText.slice(0, 5000)}"

    RESUME:
    "${resumeText.slice(0, 5000)}"

    OUTPUT INSTRUCTIONS:
    Return ONLY a raw JSON object. Schema:
    {
      "matchScore": number (0-100),
      "missingKeywords": ["keyword1", "keyword2"],
      "criticalGaps": ["reason why they might be rejected"],
      "matchFeedback": "2-3 sentences on the overall fit"
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    let text = result.response.text();
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(text);
  } catch (error) {
    console.error("JD Match Error:", error);
    return null;
  }
}

export async function generateCareerRoadmap(resumeText: string, jdText: string | null) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
    You are an elite Career Strategist and Technical Mentor.
    Review the following candidate's resume and their target job description (if provided).
    Create a highly specific, actionable 6-month learning and project roadmap to help them land their target role or level up their current skills.

    TARGET JOB DESCRIPTION:
    "${jdText || "General Senior Level Software/Data/IT Role"}"

    CANDIDATE RESUME:
    "${resumeText.slice(0, 5000)}"

    OUTPUT INSTRUCTIONS:
    Return ONLY a raw JSON object. Do not include markdown formatting like \`\`\`json.
    Match this exact schema:
    {
      "roadmap": [
        {
          "month": 1,
          "title": "Phase 1: Foundation & Core Gaps",
          "description": "Specific paragraph explaining what to focus on this month.",
          "actionItems": ["Specific tutorial or concept to learn", "Specific mini-project to build"]
        },
        // ... continue for months 2 through 6
      ]
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    let text = result.response.text();
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(text);
  } catch (error) {
    console.error("Roadmap Generation Error:", error);
    return null;
  }
}
