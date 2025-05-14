import { NextResponse } from 'next/server';

import Book from '@/models/Book';
import Chapter from '@/models/Chapter';
import SubChapter from '@/models/SubChapter';
import { connectToDB } from '@/lib/mongodb';

export async function POST(req: Request) {
  await connectToDB();

  try {
    const { bookId } = await req.json();

    const book = await Book.findById(bookId);
    if (!book)
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });

    const chapters = await Chapter.find({ book: bookId });
    const totalChapters = chapters.length;

    let chaptersCompleted = 0;
    let totalQuizAttempts = 0;
    let totalScore = 0;
    const allChaptersData = [];

    for (const ch of chapters) {
      const subChapters = await SubChapter.find({ chapter: ch._id });

      let chapterScore = 0;
      let chapterAttempts = 0;
      const subChapterList = [];

      let isChapterComplete = true;

      for (const sub of subChapters) {
        totalQuizAttempts += sub.quiz.attempted || 0;
        chapterAttempts += sub.quiz.attempted || 0;
        totalScore += sub.quiz.knowledgeScore || 0;
        chapterScore += sub.quiz.knowledgeScore || 0;

        if (!sub.completed) isChapterComplete = false;

        subChapterList.push({
          id: sub._id.toString(),
          title: sub.chapterName,
          completed: sub.completed,
          timeSpent: 0, // omitted as per your request
          quizScore: sub.quiz.knowledgeScore || 0,
          quizAttempts: sub.quiz.attempted || 0,
        });
      }

      if (isChapterComplete) chaptersCompleted++;

      allChaptersData.push({
        id: ch._id.toString(),
        title: ch.chapterName,
        progress: isChapterComplete ? 100 : 0,
        quizAverage: chapterAttempts
          ? Math.round(chapterScore / chapterAttempts)
          : 0,
        subChapters: subChapterList,
      });
    }

    const result = {
      bookName: book.title,
      description: book.description || '',
      overallProgress: Number(
        ((chaptersCompleted / totalChapters) * 100).toFixed(2)
      ),
      knowledgeScore: totalQuizAttempts
        ? Number((totalScore / totalQuizAttempts).toFixed(2))
        : 0,
      totalTimeSpent: 0, // ignored as per your instruction
      chaptersCompleted,
      totalChapters,
      totalQuizAttempts,
      averageQuizScore: totalQuizAttempts
        ? Number((totalScore / totalQuizAttempts).toFixed(2))
        : 0,
      chapters: allChaptersData.map((chapter) => ({
        ...chapter,
        quizAverage: chapter.quizAverage
          ? Number(chapter.quizAverage.toFixed(2))
          : 0,
        subChapters: chapter.subChapters.map((sub) => ({
          ...sub,
          quizScore: Number(sub.quizScore.toFixed(2)),
        })),
      })),
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
