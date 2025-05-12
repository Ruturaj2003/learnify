import Book from '@/models/Book';
import Chapter from '@/models/Chapter';
import SubChapters from '@/models/SubChapter';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { connectToDB } from '@/lib/mongodb';
import User from '@/models/User';
interface FormattedBook {
  id: string;
  title: string;
  category: string;
  description: string;
  progress: number;
  knowledgeScore: number;
  lastAccessed: Date;
}
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
    // Fetch books data from the database
    const books = await Book.find({ userId: user._id }) // Assuming `userId` is provided somehow (e.g., in a session or JWT token)
      .select('title lastAccessed category description') // Select fields you want to return
      .sort({ lastAccessed: -1 }); // Sorting by most recently accessed, can adjust as needed

    // Fetch chapters and subchapters for each book and calculate progress/knowledgeScore
    const formattedBooks: FormattedBook[] = await Promise.all(
      books.map(async (book) => {
        // Fetch chapters for each book
        const chapters = await Chapter.find({ book: book._id });

        // Initialize progress and knowledge score calculations
        let totalSubChapters = 0;
        let completedSubChapters = 0;
        let totalKnowledgeScore = 0;

        // Iterate over each chapter to fetch related subchapters and calculate progress and knowledge score
        for (const chapter of chapters) {
          const subChapters = await SubChapters.find({ chapter: chapter._id });

          // Count total subchapters and completed subchapters
          totalSubChapters += subChapters.length;
          completedSubChapters += subChapters.filter(
            (sub) => sub.completed === true
          ).length;

          // Sum up the knowledge scores of all subchapters
          subChapters.forEach((sub) => {
            totalKnowledgeScore += sub.quiz.knowledgeScore;
          });
        }

        // Calculate progress: Completed subchapters / Total subchapters
        const progress =
          totalSubChapters > 0
            ? (completedSubChapters / totalSubChapters) * 100
            : 0;

        // Calculate average knowledge score of all subchapters' quizzes
        const knowledgeScore =
          totalSubChapters > 0 ? totalKnowledgeScore / totalSubChapters : 0;

        // Return formatted book data
        return {
          id: book._id.toString(),
          title: book.title,
          category: book.category,
          description: book.description,
          progress: progress,
          knowledgeScore: knowledgeScore,
          lastAccessed: book.lastAccessed,
        };
      })
    );

    // Return the formatted books data
    return new Response(JSON.stringify(formattedBooks), { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return new Response(
        JSON.stringify({
          message: 'Error fetching books',
          error: error.message, // TypeScript now knows error is an instance of Error
        }),
        { status: 500 }
      );
    }

    // Fallback if error is not an instance of Error
    return new Response(
      JSON.stringify({
        message: 'Error fetching books',
        error: 'An unknown error occurred', // Handle unknown errors
      }),
      { status: 500 }
    );
  }
}
// 682196567ee7bdd275e28bab
