import { connectToDB } from '@/lib/mongodb';
import Book from '@/models/Book';
import User from '@/models/User';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await connectToDB();
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    // Fetch only books that belong to the authenticated user
    const books = await Book.find(
      { userId: user._id },
      { title: 1, description: 1, category: 1 }
    ).lean();

    const formattedBooks = books.map((book, index) => ({
      id: book._id, // synthetic ID (or use book._id.toString() if needed)
      title: book.title,
      description: book.description,
      category: book.category,
    }));

    return NextResponse.json({
      status: 200,
      message: 'Books fetched successfully',
      data: formattedBooks,
    });
  } catch (err) {
    console.error('[BOOK_FETCH_ERROR]', err);
    return new NextResponse('Failed to fetch books', { status: 500 });
  }
}
