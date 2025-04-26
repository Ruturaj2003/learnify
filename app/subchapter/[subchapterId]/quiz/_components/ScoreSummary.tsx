import React from 'react';
import { cn } from '@/lib/utils';
import { CircleCheck } from 'lucide-react';

interface ScoreSummaryProps {
  score: number;
  totalQuestions: number;
}

const ScoreSummary: React.FC<ScoreSummaryProps> = ({
  score,
  totalQuestions,
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

  const getRecommendation = () => {
    if (percentage >= 80) {
      return "You've mastered this topic! Try a more challenging quiz next.";
    }
    if (percentage >= 50) {
      return "You're doing well! Review the questions you missed and try again.";
    }
    return 'Consider reviewing the material and trying the quiz again to improve your score.';
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
        <p className="text-gray-600">{getRecommendation()}</p>
      </div>
    </div>
  );
};

export default ScoreSummary;
