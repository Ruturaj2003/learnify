import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb'; // Connect to your MongoDB
import Book from '@/models/Book'; // Your Book model
import Chapter from '@/models/Chapter'; // Your Chapter model
import SubChapters from '@/models/SubChapter'; // Your SubChapter model

export async function DELETE(req: NextRequest) {
  try {
    // Get the body from the DELETE request
    const { bookId } = await req.json(); // Extract bookId from the request body

    // Ensure the bookId is valid
    if (!bookId || typeof bookId !== 'string') {
      return NextResponse.json({ error: 'Invalid book ID' }, { status: 400 });
    }

    await connectToDB(); // Connect to MongoDB

    // Step 1: Find the book by ID and remove it
    const book = await Book.findById(bookId);
    if (!book) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }

    // Step 2: Delete all chapters related to the book
    const chapters = await Chapter.find({ book: book._id });
    const chapterIds = chapters.map((chapter) => chapter._id);

    // Step 3: Delete all subchapters related to the chapters
    await SubChapters.deleteMany({ chapter: { $in: chapterIds } });

    // Step 4: Delete all chapters related to the book
    await Chapter.deleteMany({ book: book._id });

    // Step 5: Delete the book itself
    await Book.deleteOne({ _id: book._id });

    // Return success response
    return NextResponse.json({
      message: 'Book and related data deleted successfully',
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
