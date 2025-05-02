import { NextRequest, NextResponse } from 'next/server';
import { generateStudyRecommendations } from '@/utils/quizAnalysis/studyRecommendations';

export async function POST(req: NextRequest) {
  try {
    const { reviewData } = await req.json();

    if (!reviewData) {
      return NextResponse.json(
        { message: 'Questions and user answers are required.' },
        { status: 400 }
      );
    }

    const recommendations = await generateStudyRecommendations(reviewData);

    return NextResponse.json({ recommendations }, { status: 200 });
  } catch (error) {
    console.error('Study Recommendations generation error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
