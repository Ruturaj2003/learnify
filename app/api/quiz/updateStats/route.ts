import { connectToDB } from '@/lib/mongodb';
import SubChapters from '@/models/SubChapter';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    await connectToDB();

    const body = await req.json();
    const { subChapterId, correctAnswers } = body;

    if (!subChapterId || typeof correctAnswers !== 'number') {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const subChapter = await SubChapters.findById(subChapterId);
    if (!subChapter) {
      return NextResponse.json(
        { error: 'Subchapter not found' },
        { status: 404 }
      );
    }

    const prevCorrect = subChapter.quiz?.correctAnswers ?? 0;
    const prevTotal = subChapter.quiz?.totalQuestions ?? 0;
    const prevAttempted = subChapter.quiz?.attempted ?? 0;

    const newCorrect = prevCorrect + correctAnswers;
    const newTotal = prevTotal + 10;
    const newAttempted = prevAttempted + 1;

    subChapter.quiz.attempted = newAttempted;
    subChapter.quiz.correctAnswers = newCorrect;
    subChapter.quiz.totalQuestions = newTotal;
    subChapter.quiz.knowledgeScore = Math.round((newCorrect / newTotal) * 100);
    subChapter.quiz.lastAttemptedAt = new Date();

    await subChapter.save();

    console.log('✅ Quiz stats updated:', {
      subChapterId,
      correctAnswers,
      newCorrect,
      newTotal,
      newAttempted,
      knowledgeScore: subChapter.quiz.knowledgeScore,
    });

    return NextResponse.json({
      message: 'Quiz updated successfully',
      subChapterId: subChapterId,
      quiz: subChapter.quiz,
    });
  } catch (error) {
    console.error('❌ Quiz update error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
