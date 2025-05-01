import { NextResponse } from 'next/server';
import { generateDetailedReview } from '@/utils/quizAnalysis/detailedReview';

// Define the ReviewData type
type ReviewData = {
  questionId: string;
  question: string; // Full question text
  options: { id: string; text: string }[]; // Options for the question
  correctAnswer: string;
  userAnswer: string; // User's selected answer
};

export async function POST(req: Request) {
  try {
    // Parse the incoming request body
    const { reviewData }: { reviewData: ReviewData[] } = await req.json();

    // Validate the input data
    if (!reviewData) {
      return NextResponse.json(
        { error: 'Review data is required.' },
        { status: 400 }
      );
    }

    // Call the function to generate the detailed review, passing the reviewData
    const review = await generateDetailedReview(reviewData);

    // Return the detailed review as a response
    return NextResponse.json({ review }, { status: 200 });
  } catch (error) {
    // Log the error for debugging
    console.error('Detailed Review generation error:', error);

    // Return a 500 status code for internal server error
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
