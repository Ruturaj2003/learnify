import { NextResponse } from "next/server";
import { generateDetailedReview } from "@/utils/quizAnalysis/detailedReview";

export async function POST(req: Request) {
  try {
    const { questions, userAnswers } = await req.json();

    if (!questions || !userAnswers) {
      return NextResponse.json({ error: "Questions and userAnswers are required." }, { status: 400 });
    }

    const review = await generateDetailedReview(questions, userAnswers);

    return NextResponse.json({ review }, { status: 200 });

  } catch (error) {
    console.error("Detailed Review generation error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
