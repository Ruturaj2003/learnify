import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import SubChapter from "@/models/SubChapter";
import { generateQuiz } from "@/utils/generateQuiz";

export async function POST(req: Request) {
  try {
    const { subChapterId } = await req.json();

    if (!subChapterId) {
      return NextResponse.json({ error: "subChapterId is required" }, { status: 400 });
    }

    await connectToDB();

    const subChapter = await SubChapter.findById(subChapterId).select("originalText");

    if (!subChapter) {
      return NextResponse.json({ error: "SubChapter not found" }, { status: 404 });
    }

    const chapterText = subChapter.originalText;

    const quiz = await generateQuiz(chapterText);

    const cleanedQuiz = quiz.replace(/```json|```/g, '').trim();
    
    return NextResponse.json({ quiz: JSON.parse(cleanedQuiz) }, { status: 200 });

  } catch (error) {
    console.error("Quiz generation error:", error);
    return NextResponse.json({ error: "Failed to generate quiz" }, { status: 500 });
  }
}
