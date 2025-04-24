import { connectToDB } from '@/lib/mongodb';
import Book from '@/models/Book';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectToDB();

    const books = await Book.find({}, {
      title: 1,
      description: 1,
      category: 1
    }).lean();

    const formattedBooks = books.map((book, index) => ({
      id: index + 1, // synthetic ID (or use book._id.toString() if needed)
      title: book.title,
      description: book.description,
      category: book.category
    }));

    return NextResponse.json({
      status: 200,
      message: 'Books fetched successfully',
      data: formattedBooks
    });
  } catch (err) {
    console.error('[BOOK_FETCH_ERROR]', err);
    return new NextResponse('Failed to fetch books', { status: 500 });
  }
}
