import { generateGeneralSummary } from "@/utils/quizAnalysis/generalSummary";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { questions, userAnswers } = body;

    if (!questions || !userAnswers || !Array.isArray(questions) || !Array.isArray(userAnswers)) {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const summary = await generateGeneralSummary(questions, userAnswers);

    return NextResponse.json({ summary }, { status: 200 });

  } catch (error: any) {
    console.error("General summary generation error:", error?.message || error);
    return NextResponse.json({ error: "Failed to generate general summary." }, { status: 500 });
  }
}
