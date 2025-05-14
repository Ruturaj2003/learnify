import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import SubChapters from '@/models/SubChapter';

export async function PATCH(req: NextRequest) {
  await connectToDB();
  try {
    const { subchapterId } = await req.json();

    const sub = await SubChapters.findById(subchapterId);
    if (!sub)
      return NextResponse.json(
        { error: 'Subchapter not found' },
        { status: 404 }
      );

    // Validation before marking complete
    if (
      sub.quiz.attempted < 1 ||
      (!sub.simpleExplanation && !sub.detailedExplanation)
    ) {
      return NextResponse.json(
        { error: 'Complete at least 1 quiz and explanation' },
        { status: 400 }
      );
    }

    // Toggle completion status
    sub.completed = !sub.completed;
    await sub.save();

    return NextResponse.json({ completed: sub.completed });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' + err }, { status: 500 });
  }
}
