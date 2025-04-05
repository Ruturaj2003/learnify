'use client';

import { useEffect } from 'react';
import clsx from 'clsx';

import Navbar from '@/app/(bussiness)/_components/Navbar';
import { Button } from '@/components/ui/button';
import { useQuizStore } from '@/stores';
import { toast } from 'sonner';

const dummyQuestions = [
  {
    question:
      'Which of the following European cities is known for being the capital of France and is famous for landmarks like the Eiffel Tower, the Louvre Museum, and its rich cultural history?',
    options: [
      'Paris - Known for the Eiffel Tower and rich French culture',
      'London - The capital of the United Kingdom with iconic sites like Big Ben',
      'Berlin - Germany’s capital famous for its history and modern architecture',
      'Rome - A historic city and capital of Italy with ancient ruins',
    ],
    correctAnswer: 'Paris - Known for the Eiffel Tower and rich French culture',
  },
  {
    question:
      'Mars is often referred to as the Red Planet. Which of the following planets has this nickname due to its reddish appearance caused by iron oxide on its surface?',
    options: [
      'Earth - The only known planet to support life',
      'Mars - The fourth planet from the Sun, known as the Red Planet',
      'Jupiter - The largest planet in the solar system',
      'Saturn - Known for its beautiful ring system',
    ],
    correctAnswer:
      'Mars - The fourth planet from the Sun, known as the Red Planet',
  },
  {
    question:
      'If you add two and two together in basic arithmetic, which of the following is the correct sum?',
    options: [
      '3 - The result of subtracting one from four',
      '4 - The correct result of adding two and two',
      '5 - One more than the sum of two and two',
      '6 - A multiple of two but not the correct answer here',
    ],
    correctAnswer: '4 - The correct result of adding two and two',
  },
];

const SectionQuizPage = () => {
  const {
    questions,
    currentQuestionIndex,
    answers,
    score,
    setQuestions,
    submitAnswer,
    nextQuestion,
    prevQuestion,
    calculateScore,
  } = useQuizStore();

  useEffect(() => {
    setQuestions(dummyQuestions);
  }, [setQuestions]);

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
      <Navbar title="Quiz Section" />
      <div className="p-4 space-y-4">
        {/* Question Box */}
        <div className="bg-white shadow-md rounded-md p-4 min-h-[70vh]">
          {currentQuestion ? (
            <>
              <h2 className="text-lg font-semibold mb-4">
                Q{currentQuestionIndex + 1}. {currentQuestion.question}
              </h2>

              <div className="grid gap-3">
                {currentQuestion.options.map((option) => {
                  const isSelected =
                    answers[currentQuestion.question] === option;

                  return (
                    <div
                      key={option}
                      className={clsx(
                        'p-4 rounded-md border cursor-pointer transition-all',
                        isSelected
                          ? 'border-blue-500 bg-blue-100 text-blue-800 font-medium'
                          : 'border-gray-300 hover:bg-gray-100'
                      )}
                      onClick={() =>
                        submitAnswer(currentQuestion.question, option)
                      }
                    >
                      {option}
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <p>Loading question...</p>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center bg-gray-100 p-4 rounded-md">
          <Button
            variant="outline"
            onClick={prevQuestion}
            disabled={currentQuestionIndex === 0}
          >
            Prev
          </Button>

          <Button
            variant="outline"
            onClick={nextQuestion}
            disabled={currentQuestionIndex === questions.length - 1}
          >
            Next
          </Button>

          <Button
            variant="default"
            onClick={() => {
              calculateScore();
              toast.success(`You Finished the Quiz`, {
                position: 'top-right',
              });
            }}
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  );
};

export default SectionQuizPage;
