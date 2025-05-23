import { NextRequest, NextResponse } from 'next/server';

import { connectToDB } from '@/lib/mongodb';
import SubChapters from '@/models/SubChapter';
import Chapters from '@/models/Chapter';
import Book from '@/models/Book';
export async function POST(req: NextRequest) {
  await connectToDB();

  try {
    const { bookId } = await req.json();

    if (!bookId) {
      return NextResponse.json(
        { error: 'Book ID is required' },
        { status: 400 }
      );
    }

    // Find chapters for the book
    const chapters = await Chapters.find({ book: bookId }).sort({
      chapterNumber: 1,
    });

    // For each chapter, fetch its subChapters
    const formattedChapters = await Promise.all(
      chapters.map(async (chapter) => {
        const subChapters = await SubChapters.find({
          chapter: chapter._id,
        }).sort({ subchapterNumber: 1 });

        return {
          chapterId: chapter._id,
          title: chapter.chapterName,
          subChapters: subChapters.map((sub) => ({
            subchapterId: sub._id.toString(),
            title: sub.chapterName,
            completed: sub.completed || false,
          })),
        };
      })
    );
    await Book.findByIdAndUpdate(bookId, {
      lastAccessed: new Date(),
    });
    return NextResponse.json(formattedChapters, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
