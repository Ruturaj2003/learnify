// File: /app/api/uploadBook/route.ts
import { connectToDB } from '@/lib/mongodb';
import Book from '@/models/Book';
import User from '@/models/User';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return new Response('Unauthorized', { status: 401 });
  }

  const body = await req.json();
  const { title, description, fileUrl, category } = body;

  try {
    await connectToDB();

    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return new Response('User not found', { status: 404 });
    }

    // Create a new book record in the database
    const newBook = await Book.create({
      title,
      description,
      fileUrl,
      category,
      userId: user._id,
    });

    // Add the book ID to the user's books list
    await User.findByIdAndUpdate(user._id, {
      $push: { books: newBook._id },
    });

    const bookId = newBook._id;
    return new Response(JSON.stringify({ bookId: bookId }), { status: 201 });
  } catch (err) {
    console.error('[BOOK_UPLOAD_ERROR]', err);
    return new Response('Failed to save book', { status: 500 });
  }
}
