import React from 'react';
import { cn } from '@/lib/utils';
import { CircleCheck } from 'lucide-react';

interface ScoreSummaryProps {
  score: number;
  totalQuestions: number;
  recommendation: string;
}

const ScoreSummary: React.FC<ScoreSummaryProps> = ({
  score,
  totalQuestions,
  recommendation,
}) => {
  const percentage = Math.round((score / totalQuestions) * 100);

  const getScoreColor = () => {
    if (percentage >= 80) return 'text-quiz-success';
    if (percentage >= 50) return 'text-amber-500';
    return 'text-quiz-error';
  };

  const getScoreMessage = () => {
    if (percentage >= 80) return 'Excellent work!';
    if (percentage >= 50) return 'Good effort!';
    return 'Keep practicing!';
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6 pt-4">
        <div className={cn('text-7xl font-bold', getScoreColor())}>
          {percentage}%
        </div>
        <div className="text-xl mt-2 font-semibold">{getScoreMessage()}</div>
        <div className="flex items-center gap-1 mt-2 text-gray-600">
          <CircleCheck className="text-quiz-primary h-5 w-5" />
          <span>
            {score} correct out of {totalQuestions} questions
          </span>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="font-medium mb-2 text-quiz-secondary">
          Recommendation:
        </h3>
        <div
          className="prose max-w-none text-gray-700"
          dangerouslySetInnerHTML={{ __html: recommendation }}
        />
      </div>
    </div>
  );
};

export default ScoreSummary;
