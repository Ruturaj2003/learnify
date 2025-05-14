'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useQuizStore } from '@/stores/useQuizStore';
import { Home, ArrowLeft, ArrowRight } from 'lucide-react';

import QuizOption from '../_components/QuizOption';
import { useRouter } from 'next/navigation';
import Spinner from '@/app/_components/Spinner';

type ReviewResponse = {
  questionId: string;
  question: string;
  userAnswer: string;
  explanation: string;
};

const QuizReviewPage = () => {
  const router = useRouter();
  const { reviewData, resetQuiz, questions, answers } = useQuizStore();
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [reviewList, setReviewList] = useState<ReviewResponse[]>([]);

  const getQuizReview = async () => {
    try {
      const response = await axios.post('/api/quiz/detailedReview', {
        reviewData,
      });
      console.log('Review Data:', response.data.review);
      setReviewList(response.data.review);
    } catch (error) {
      console.error('Error fetching detailed review:', error);
    }
  };

  useEffect(() => {
    if (reviewData.length > 0) {
      getQuizReview();
    }
  }, []);

  const currentReview = reviewList[currentReviewIndex];

  if (!currentReview) {
    return <Spinner></Spinner>;
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
    router.push('/library');
  };

  const handleGoToSummary = () => {
    router.push('summary');
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
          {currentReviewIndex > 9 ? (
            <h1>Completed</h1>
          ) : (
            <p>{currentQuestion?.question}</p>
          )}
        </h2>

        <div className="space-y-4">
          {currentReviewIndex > 9 ? (
            <h1>Completed</h1>
          ) : (
            currentQuestion?.options.map((option) => (
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
            ))
          )}
        </div>

        <div className="mt-8 p-5 bg-gray-50 rounded-lg text-base">
          <p className="font-medium mb-2">Explanation:</p>
          <div className="text-gray-600 leading-relaxed">
            {currentReviewIndex > 9 ? (
              <h1>Completed</h1>
            ) : (
              <p>{currentReview?.explanation}</p>
            )}
          </div>
        </div>
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
