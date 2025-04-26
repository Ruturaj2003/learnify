import React from 'react';

interface QuizProgressProps {
  current: number;
  total: number;
}

const QuizProgress: React.FC<QuizProgressProps> = ({ current, total }) => {
  const percentage = (current / total) * 100;

  return (
    <div className="mb-6">
      <div className="flex justify-between mb-1 text-sm">
        <span>
          Question {current + 1} of {total}
        </span>
        <span>{Math.round(percentage)}%</span>
      </div>
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
};

export default QuizProgress;
