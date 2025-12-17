import OpenAI from "openai";
import type { Risk } from "./heuristics";

const openai = new OpenAI({
  apiKey: process.env.AI_API_KEY,
});

/**
 * Generates a plain-language risk explanation from risk objects using OpenAI API.
 * Maintains a cautious, professional tone and includes a non-advisory disclaimer.
 */
export async function generateRiskExplanation(
  risks: Risk[]
): Promise<string> {
  const hasSerious = risks.some(r => r.level === "high" || r.level === "medium");

  if (!hasSerious) {
    return "No obvious issues were detected with the provided information. However, always take precautions and do your own research. This is not financial or security advice.";
  }

  const prompt = `You are an expert risk advisor. Explain the following smart contract risk findings for a non-technical user. List the risks by severity. Do not use technical jargon. Summarize what these could mean for a user, in a clear, professional, and cautious tone. At the end, add: 'This is not financial or security advice.'\n\nRisks:\n${risks
    .map(r => `- ${r.level.toUpperCase()}: ${r.message}`)
    .join("\n")}`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You explain risk clearly." },
        { role: "user", content: prompt },
      ],
      max_tokens: 200,
      temperature: 0.5,
    });
    return response.choices[0]?.message?.content?.trim() || "Risk explanation unavailable.";
  } catch (err) {
    console.error("Error generating explanation:", err);
    return "An error occurred while generating the risk explanation.";
  }
}

