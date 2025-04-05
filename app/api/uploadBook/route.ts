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
  const { name, description, fileUrl } = body;

  try {
    await connectToDB();

    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return new Response('User not found', { status: 404 });
    }

    const newBook = await Book.create({
      name,
      description,
      fileUrl,
      uploadedBy: user._id,
    });

    await User.findByIdAndUpdate(user._id, {
      $push: { books: newBook._id },
    });

    return new Response(JSON.stringify(newBook), { status: 201 });
  } catch (err) {
    return new Response('Failed to save book', { status: 500 });
  }
}
