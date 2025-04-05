'use client';

import Navbar from '@/app/(bussiness)/_components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const QuizResultsPage = () => {
  // Dummy data
  const summary = `You answered 3 out of 5 questions correctly. You did well in general knowledge but struggled with astronomy questions.`;
  const recommendation = `We recommend reviewing the “Solar System & Planets” section to improve your understanding of astronomy topics.`;

  return (
    <>
      <Navbar title="Quiz Results" />
      <div className="p-4 max-w-3xl mx-auto space-y-6">
        {/* Score Card */}
        <Card className="bg-gradient-to-r from-green-100 via-white to-green-100 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-green-800">
              🎯 Score Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-700 text-base">
            {summary}
          </CardContent>
        </Card>

        {/* Recommendation Card */}
        <Card className="bg-gradient-to-r from-blue-100 via-white to-blue-100 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-blue-800">
              📘 Recommendation
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-700 text-base">
            {recommendation}
          </CardContent>
        </Card>

        {/* CTA Buttons */}
        <div className="flex justify-end gap-4 pt-4">
          <Button variant="outline">Retry Quiz</Button>
          <Button>Go to Dashboard</Button>
        </div>
      </div>
    </>
  );
};

export default QuizResultsPage;
