const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config(); // Load environment variables

async function listModels() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  
  try {
    console.log("🔍 Checking available models for your API Key...");
    // This calls the ListModels endpoint
    // It will tell us exactly what your key can see.
    const modelResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`
    );
    const data = await modelResponse.json();

    if (data.models) {
      console.log("\n✅ AVAILABLE MODELS:");
      data.models.forEach(m => {
        if (m.supportedGenerationMethods.includes("generateContent")) {
          console.log(`   - ${m.name.replace("models/", "")}`);
        }
      });
    } else {
      console.error("❌ No models found. Raw response:", data);
    }

  } catch (error) {
    console.error("❌ Error listing models:", error);
  }
}

listModels();