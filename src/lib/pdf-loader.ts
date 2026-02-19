import PDFParser from "pdf2json";

export function parsePdf(fileBuffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    // FIX: Changed '1' to 'true' to satisfy TypeScript
    const pdfParser = new PDFParser(null, true); 

    // Handle errors
    pdfParser.on("pdfParser_dataError", (errData: any) => {
      console.error("PDF Parser Error:", errData.parserError);
      reject(errData.parserError);
    });

    // Handle success
    pdfParser.on("pdfParser_dataReady", () => {
      // Get raw text content
      const text = (pdfParser as any).getRawTextContent();
      
      // Clean up the text
      // 1. Remove "Page Break" markers
      // 2. Remove excessive newlines
      const cleanText = text
        .replace(/----------------Page \(\d+\) Break----------------/g, "")
        .replace(/\n\s*\n/g, "\n")
        .trim();

      resolve(cleanText);
    });

    // Execute parsing
    pdfParser.parseBuffer(fileBuffer);
  });
}