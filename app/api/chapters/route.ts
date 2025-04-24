// @ts-nocheck

import { connectToDB } from '@/lib/mongodb';
import Chapter from '@/models/Chapter';
import SubChapter from '@/models/SubChapter';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectToDB();

    // Fetch chapters with their subchapters
    const chapters = await Chapter.find({}, {
      book: 1,
      chapterName: 1,
      chapterNumber: 1
    }).lean();

    const formattedChapters = await Promise.all(chapters.map(async (chapter) => {
      // Fetch the subchapters for each chapter
      const subChapters = await SubChapter.find({ chapter: chapter._id }, {
        chapterName: 1,
        chapterNumber: 1,
        originalText: 1
      }).lean();

      return {
        chapterId: chapter._id.toString(),
        title: chapter.chapterName,
        subChapters: subChapters.map((subchapter: any) => ({
          subchapterId: subchapter._id.toString(),
          title: subchapter.chapterName
        }))
      };
    }));

    return NextResponse.json({
      status: 200,
      message: 'Chapters fetched successfully',
      data: formattedChapters
    });
  } catch (err) {
    console.error('[CHAPTER_FETCH_ERROR]', err);
    return new NextResponse('Failed to fetch chapters', { status: 500 });
  }
}
