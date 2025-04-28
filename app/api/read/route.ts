// @ts-nocheck
import { NextResponse } from 'next/server';

import SubChapter from '@/models/SubChapter'; // Your Mongoose SubChapter model
import { connectToDB } from '@/lib/mongodb';

export async function POST(request) {
  const { subChapterId } = await request.json(); // Get the ID from the request body

  if (!subChapterId) {
    return NextResponse.json(
      { message: 'SubChapter ID is required' },
      { status: 400 }
    );
  }

  await connectToDB(); // Connect to MongoDB (important!)

  try {
    const subChapter = await SubChapter.findById(subChapterId);

    if (!subChapter || !subChapter.pdfBuffer) {
      return NextResponse.json(
        { message: 'SubChapter or PDF not found' },
        { status: 404 }
      );
    }

    return new NextResponse(subChapter.pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="subchapter.pdf"',
      },
    });
  } catch (error) {
    console.error('[API ERROR]', error.message);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
