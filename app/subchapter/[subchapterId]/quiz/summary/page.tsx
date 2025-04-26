'use client';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import { useQuizStore } from '@/stores/useQuizStore';
import { FileText, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ScoreSummary from '../_components/ScoreSummary';

const QuizSummaryPage = () => {
  const navigate = useRouter();
  const { score, questions, isQuizComplete, resetQuiz } = useQuizStore();

  useEffect(() => {
    if (!isQuizComplete) {
      // If quiz isn't complete, redirect to home
      navigate.push('/library');
    }
  }, [isQuizComplete, navigate]);

  const handleReviewQuiz = () => {
    navigate.push('review');
  };

  const handleGoHome = () => {
    resetQuiz();
    navigate.push('/library');
  };

  if (!isQuizComplete) {
    return null;
  }

  return (
    <div className="quiz-container">
      <Card className="quiz-card mb-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Quiz Results</h1>

        <ScoreSummary score={score} totalQuestions={questions.length} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <Button
            variant="outline"
            onClick={handleReviewQuiz}
            className="flex items-center justify-center gap-2 py-6"
          >
            <FileText className="h-5 w-5" />
            <span>Detailed Review</span>
          </Button>

          <Button
            onClick={handleGoHome}
            className="flex items-center justify-center gap-2 py-6 bg-quiz-primary hover:bg-quiz-secondary"
          >
            <Home className="h-5 w-5" />
            <span>Go to Home</span>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default QuizSummaryPage;
