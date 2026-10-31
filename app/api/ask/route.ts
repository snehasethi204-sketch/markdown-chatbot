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

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: `Answer using only this information:

${knowledge}

Question: ${question}`,
    });

    return NextResponse.json({
      answer: response.text || "No answer generated.",
    });

  } catch (error) {
    console.error("API ERROR:", error);

    return NextResponse.json(
      { error: "Something went wrong. Check the terminal." },
      { status: 500 }
    );
  }
}