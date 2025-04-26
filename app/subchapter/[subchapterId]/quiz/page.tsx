'use client';

import { Button } from '@/components/ui/button';
import { useChapterStore } from '@/stores/useChapterStore';
import { useQuizStore } from '@/stores/useQuizStore';
import { useParams, useRouter } from 'next/navigation';

const QuizHomePage = () => {
  const { startQuiz } = useQuizStore();
  const router = useRouter();
  const params = useParams();
  const subId = params.subchapterId as string; // Make sure it's a string
  const { currentSubchapter } = useChapterStore();

  const handleStartQuiz = async () => {
    if (!subId) {
      console.error('Subchapter ID is missing!');
      return;
    }
    console.log(currentSubchapter);

    await startQuiz(currentSubchapter.subId); // Wait for quiz to load
    router.push('quiz/questions'); // Make sure route is correct
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-violet-200 to-purple-300 px-4">
      <div className="bg-white shadow-lg rounded-3xl p-8 w-full max-w-md text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">Quiz Mode</h1>
        <p className="text-gray-500 mb-8">
          Get ready to test your knowledge on <br></br>
          <span className="font-semibold text-purple-600">
            {currentSubchapter.subchapterName || 'this topic'}
          </span>
          .
        </p>

        <div className="flex justify-center mb-8">
          <div className="h-24 w-24 rounded-full bg-purple-100 flex items-center justify-center">
            <span className="text-purple-600 text-4xl font-extrabold">Q</span>
          </div>
        </div>

        <Button
          onClick={handleStartQuiz}
          className="w-full py-5 text-lg bg-purple-600 hover:bg-purple-700 transition-colors duration-300"
        >
          Start Quiz
        </Button>

        <p className="mt-6 text-sm text-gray-400">
          10 questions • 4 Easy • 3 Medium • 3 Hard
        </p>
      </div>
    </div>
  );
};

export default QuizHomePage;
