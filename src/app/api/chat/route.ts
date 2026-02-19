import { GoogleGenerativeAI } from "@google/generative-ai";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export const maxDuration = 30;

// Initialize the Official Google SDK (Same as your Analyzer)
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return new Response("Unauthorized", { status: 401 });

    const { messages, data } = await req.json();
    const resumeId = data?.resumeId;

    if (!resumeId) return new Response("Resume ID required", { status: 400 });

    const resume = await prisma.resume.findUnique({
      where: { id: resumeId, userId },
    });

    if (!resume) return new Response("Resume not found", { status: 404 });

    const systemPrompt = `
      You are an Expert Career Coach, Technical Mentor, and friendly Mock Interviewer.
      Your primary goal is to help the candidate prepare, succeed, and improve.

      CANDIDATE CONTEXT:
      - Resume Content: "${resume.content.slice(0, 5000)}"
      - Target Job Description: "${resume.jobDescription || "General Tech Role"}"

      INSTRUCTIONS:
      1. BE ADAPTABLE: You can ask interview questions, but if the candidate asks for help, examples, or explanations, you MUST break the interviewer character and help them.
      2. PROVIDE ANSWERS: If they ask "how should I answer this?" or "give me an interview-ready answer", provide a high-quality, professional response formatted using the STAR method based on their resume.
      3. TECHNICAL MENTORSHIP: Answer any questions related to their profession, tech stack, or general career advice.
      4. RESUME ADVICE: Help them rewrite bullet points or summarize their skills if asked.
      5. TONE: Be encouraging, constructive, expert, and conversational.
    `;

    // 1. Configure the Official Google Model
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash", // Using your preferred model!
      systemInstruction: systemPrompt,
    });

    // 2. Format frontend chat history to Google's strict requirements
    const formattedHistory = messages.map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    // 3. Ask Google for the streaming response
    const responseStream = await model.generateContentStream({
      contents: formattedHistory,
    });

    // 4. Create a Custom Web Stream formatted for your frontend UI
    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of responseStream.stream) {
            const chunkText = chunk.text();
            if (chunkText) {
              // Format data for the Vercel useChat hook (e.g., 0:"Hello")
              controller.enqueue(encoder.encode(`0:${JSON.stringify(chunkText)}\n`));
            }
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      }
    });

    // 5. Send the stream back to the chat box
    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/x-unknown",
        "x-vercel-ai-data-stream": "v1"
      },
    });

  } catch (error) {
    console.error("Chat Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}