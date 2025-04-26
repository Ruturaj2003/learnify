'use client';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useQuizStore } from '@/stores/useQuizStore';
import { Home, ArrowLeft, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/router';
import QuizOption from '../_components/QuizOption';

const QuizReviewPage = () => {
  const navigate = useRouter();
  const { questions, answers, isQuizComplete, resetQuiz } = useQuizStore();
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  useEffect(() => {
    if (!isQuizComplete) {
      // If quiz isn't complete, redirect to home
      navigate.push('/library');
    }
  }, [isQuizComplete, navigate]);

  if (!isQuizComplete) {
    return null;
  }

  const currentQuestion = questions[currentReviewIndex];
  const userAnswer = answers.find((a) => a.questionId === currentQuestion.id);
  const selectedOptionId = userAnswer?.selectedOptionId || '';

  const navigatePrev = () => {
    setCurrentReviewIndex(Math.max(0, currentReviewIndex - 1));
  };

  const navigateNext = () => {
    setCurrentReviewIndex(
      Math.min(questions.length - 1, currentReviewIndex + 1)
    );
  };

  const handleGoHome = () => {
    resetQuiz();
    navigate.push('/library');
  };

  const handleGoToSummary = () => {
    navigate.push('summary');
  };

  return (
    <div className="quiz-container">
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleGoToSummary}
            className="text-gray-600"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Summary
          </Button>

          <span className="text-sm text-gray-600">
            Question {currentReviewIndex + 1} of {questions.length}
          </span>
        </div>
      </div>

      <Card className="quiz-card mb-4">
        <h2 className="text-xl font-semibold mb-8 leading-relaxed">
          {currentQuestion.question}
        </h2>

        <div className="space-y-4">
          {currentQuestion.options.map((option) => (
            <QuizOption
              key={option.id}
              id={option.id}
              text={option.text}
              selected={selectedOptionId === option.id}
              showResult={true}
              isCorrect={option.id === currentQuestion.correctOptionId}
              onClick={() => {}}
              disabled={true}
            />
          ))}
        </div>

        {selectedOptionId !== currentQuestion.correctOptionId && (
          <div className="mt-8 p-5 bg-gray-50 rounded-lg text-base">
            <p className="font-medium mb-2">Explanation:</p>
            <p className="text-gray-600 leading-relaxed">
              {
                currentQuestion.options.find(
                  (o) => o.id === currentQuestion.correctOptionId
                )?.text
              }
            </p>
          </div>
        )}
      </Card>

      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={navigatePrev}
          disabled={currentReviewIndex === 0}
          className="flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Previous</span>
        </Button>

        {currentReviewIndex < questions.length - 1 ? (
          <Button
            onClick={navigateNext}
            className="bg-quiz-primary hover:bg-quiz-secondary flex items-center gap-1"
          >
            <span className="hidden sm:inline">Next</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={handleGoHome}
            className="bg-quiz-primary hover:bg-quiz-secondary flex items-center gap-1"
          >
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Finish</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuizReviewPage;
