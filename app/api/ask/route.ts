import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    const { question } = await request.json();

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key missing in .env.local" },
        { status: 500 }
      );
    }

    const filePath = path.join(
      process.cwd(),
      "knowledge",
      "company.md"
    );

    const knowledge = await readFile(filePath, "utf8");

    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.interactions.create({
  model: "gemini-3.8-flash",
  input: `Answer using only this information:

${knowledge}

Question: ${question}`,
generation_config: {
  thinking_level: "low",
},
});

    return NextResponse.json({
      answer: response.output_text || "No answer generated.",
    });

 } catch (error) {
  const message =
    error instanceof Error ? error.message : String(error);

  console.error("API ERROR:", message);

  return NextResponse.json(
    { answer: `API ERROR: ${message}` },
    { status: 500 }
  );
}}