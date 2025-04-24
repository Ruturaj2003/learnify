import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import SubChapters from "@/models/SubChapter"; // Adjust path based on your project
import { getChapterExplanation } from "@/utils/explanation";

export async function POST(req: NextRequest) {
  try {
    const { subChapterId, explanationType } = await req.json();

    if (!subChapterId || !["simple", "detailed"].includes(explanationType)) {
      return NextResponse.json(
        { error: "Missing or invalid subChapterId or explanationType" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectToDB();

    // Find subchapter
    const subChapter = await SubChapters.findById(subChapterId);
    if (!subChapter) {
      return NextResponse.json({ error: "SubChapter not found" }, { status: 404 });
    }

    // Return existing explanation if available
    const existingExplanation =
      explanationType === "simple"
        ? subChapter.simpleExplanation
        : subChapter.detailedExplanation;

    if (existingExplanation?.trim()) {
      return NextResponse.json({ explanation: existingExplanation }, { status: 200 });
    }

    // Generate explanation using Gemini
    const explanation = await getChapterExplanation(subChapter.originalText, explanationType);

    // Save explanation in MongoDB
    if (explanationType === "simple") {
      subChapter.simpleExplanation = explanation;
    } else {
      subChapter.detailedExplanation = explanation;
    }

    subChapter.explanationStatus = "completed";
    await subChapter.save();

    return NextResponse.json({ explanation }, { status: 200 });
  } catch (err) {
    console.error("Error in explanation API:", err);
    return NextResponse.json(
      { error: "Failed to generate or fetch explanation" },
      { status: 500 }
    );
  }
}
