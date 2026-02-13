import { NextResponse } from "next/server";
import { getUserByClerkID } from "@/lib/auth";
import prisma from "@/lib/prisma";
import PDFParser from "pdf2json";

export async function POST(request: Request) {
  console.log("📂 Upload started...");

  try {
    const user = await getUserByClerkID();
    
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    console.log("Processing file:", file.name);

    // 1. Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 2. Parse PDF using pdf2json (Wrapped in a Promise for async/await)
    const parsedText = await new Promise<string>((resolve, reject) => {
      const pdfParser = new PDFParser(null, true); // true means text content only

      pdfParser.on("pdfParser_dataError", (errData: any) => {
        console.error(errData.parserError);
        reject(errData.parserError);
      });

      pdfParser.on("pdfParser_dataReady", (pdfData: any) => {
        // Extract raw text from the JSON structure
        // The library returns a complex object, we map it to simple text
        const rawText = pdfParser.getRawTextContent();
        resolve(rawText);
      });

      // Load the buffer
      pdfParser.parseBuffer(buffer);
    });
    
    console.log("✅ Text Extracted (Length):", parsedText.length);

    // 3. Save to Database
    const resume = await prisma.resume.create({
      data: {
        userId: user.id,
        fileName: file.name,
        content: parsedText,
        status: "completed",
      },
    });

    console.log("✅ Saved to DB ID:", resume.id);
    return NextResponse.json({ data: resume });

  } catch (error: any) {
    console.error("🔥 PARSING ERROR:", error);
    return NextResponse.json(
      { error: "Failed to parse PDF" }, 
      { status: 500 }
    );
  }
}