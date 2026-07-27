import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const SYSTEM_PROMPT = `You are LabMate AI, a lab assistant for biotechnology students.
Answer only questions related to lab protocols, biotechnology techniques,
reagent preparation, and troubleshooting (PCR, gel electrophoresis,
western blot, cell culture, buffers, etc).
Give clear, step-by-step, practical answers a student can use in the lab.
If asked about safety-critical steps, add a caution note.
If the question is unrelated to biotechnology/lab work, politely say
you can only help with lab-related queries.`;

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(
      `${SYSTEM_PROMPT}\n\nStudent question: ${message}`
    );

    const text = result.response.text();

    return NextResponse.json({ reply: text });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { reply: "Sorry, something went wrong. Please try again." },
      { status: 500 }
    );
  }
}