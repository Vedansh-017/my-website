import { GoogleGenerativeAI } from "@google/generative-ai";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function main(prompt) {
  const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

  const response = await model.generateContent(prompt);

  return response.response.text(); // ✅ get the actual text
}

export default main;
