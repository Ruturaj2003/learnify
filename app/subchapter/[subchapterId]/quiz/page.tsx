'use client';

import { Button } from '@/components/ui/button';
import { useQuizStore } from '@/stores/useQuizStore';
import { useRouter } from 'next/navigation';

const QuizHomePage = () => {
  const { startQuiz } = useQuizStore();
  const navigate = useRouter();

  const handleStartQuiz = () => {
    startQuiz();
    navigate.push('quiz/questions');
  };

  return (
    <div className="quiz-container justify-center">
      <div className="quiz-card text-center">
        <h1 className="text-3xl font-bold mb-2">Mobile Quiz App</h1>
        <p className="text-gray-600 mb-8">
          Test your knowledge with our mobile-friendly quiz experience.
        </p>

        <div className="flex justify-center mb-8">
          <div className="h-24 w-24 rounded-full bg-quiz-light-purple flex items-center justify-center">
            <span className="text-quiz-primary text-3xl font-bold">Q</span>
          </div>
        </div>

        <Button
          onClick={handleStartQuiz}
          className="w-full py-6 text-lg bg-quiz-primary hover:bg-quiz-secondary"
        >
          Start Quiz
        </Button>

        <p className="mt-6 text-sm text-gray-500">
          5 questions • General knowledge • 2 minutes
        </p>
      </div>
    </div>
  );
};
export default QuizHomePage;
