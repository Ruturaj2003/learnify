'use client';
import { useEffect } from 'react';

import { Card } from '@/components/ui/card';
// import QuizOption from '@/components/QuizOption';
// import QuizProgress from '@/components/QuizProgress';
// import QuizNavigation from '@/components/QuizNavigation';

import { useQuizStore } from '@/stores/useQuizStore';
import { useRouter } from 'next/navigation';
import QuizOption from '../_components/QuizOption';
import QuizNavigation from '../_components/QuizNavigation';
import QuizProgress from '../_components/QuizProgress';
const QuizQuestionsPage = () => {
  const navigate = useRouter();
  const {
    questions,
    currentQuestionIndex,
    answers,
    selectAnswer,
    isQuizComplete,
  } = useQuizStore();

  useEffect(() => {
    // if (currentQuestionIndex === -1) {
    //   // Quiz hasn't been started, redirect to home
    //   navigate.push('/');
    // }

    if (isQuizComplete) {
      navigate.push('summary');
    }
  }, [currentQuestionIndex, isQuizComplete, navigate]);

  if (currentQuestionIndex === -1 || currentQuestionIndex >= questions.length) {
    return null;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const selectedOptionId = answers.find(
    (a) => a.questionId === currentQuestion.id
  )?.selectedOptionId;

  const handleSelectOption = (optionId: string) => {
    selectAnswer(currentQuestion.id, optionId);
  };

  const handleQuizComplete = () => {
    navigate.push('summary');
  };

  return (
    <div className="quiz-container">
      <QuizProgress current={currentQuestionIndex} total={questions.length} />

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
              onClick={() => handleSelectOption(option.id)}
            />
          ))}
        </div>
      </Card>

      <QuizNavigation onComplete={handleQuizComplete} />
    </div>
  );
};
export default QuizQuestionsPage;
