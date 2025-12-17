import type { Risk } from "./heuristics";

export async function generateRiskExplanation(risks: Risk[]): Promise<string> {
  const hasSerious = risks.some(
    (r) => r.level === "high" || r.level === "medium"
  );

  if (!hasSerious) {
    return "No obvious issues were detected with the provided information. However, always take precautions and do your own research. This is not financial or security advice.";
  }

  // No OpenAI SDK—fetch only
  if (!process.env.OPENAI_API_KEY) {
    return "Automated risk explanation is currently unavailable. This is not financial or security advice.";
  }

  const prompt = `You are an expert risk advisor.\nExplain the following smart contract risk findings for a non-technical user.\nAvoid technical jargon. Be clear, professional, and cautious.\n\nAt the end, include:\n\"This is not financial or security advice.\"\n\nRisks:\n${risks.map(r => `- ${r.level.toUpperCase()}: ${r.message}`).join("\n")}`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You explain risk clearly and responsibly." },
          { role: "user", content: prompt },
        ],
        temperature: 0.5,
        max_tokens: 200,
      }),
    });

    if (!response.ok) {
      throw new Error("OpenAI API request failed");
    }

    const data = await response.json();
    // Defensive: .choices[0].message.content for OpenAI format
    return (
      data.choices?.[0]?.message?.content?.trim() ||
      "Risk explanation unavailable."
    );
  } catch (error) {
    console.error("AI explanation error:", error);
    return "Automated risk explanation is currently unavailable. This is not financial or security advice.";
  }
}

