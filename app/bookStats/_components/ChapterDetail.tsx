'use client';
import React from 'react';
import { CardContent } from '@/components/ui/card';
import { Chapter } from '../_data/mockData';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle } from 'lucide-react';
import { useBookStatsStore } from '@/stores/useBookStatsStore';

interface ChapterDetailProps {
  chapter: Chapter;
}

const ChapterDetail: React.FC<ChapterDetailProps> = ({ chapter }) => {
  const { formatTime } = useBookStatsStore();

  // Function to determine quiz score color
  const getScoreColor = (score: number) => {
    if (score === 0) return 'text-gray-400';
    if (score < 60) return 'text-red-600';
    if (score < 80) return 'text-yellow-600';
    return 'text-green-600';
  };

  // Function to determine progress background color from text color class
  const getBgColorFromTextColor = (textColor: string) => {
    return textColor.replace('text-', 'bg-');
  };

  return (
    <CardContent className="border-t pt-6 pb-6">
      <h4 className="text-sm font-medium mb-4">Subchapters</h4>
      <div className="space-y-4">
        {chapter.subChapters.map((subchapter) => (
          <div
            key={subchapter.id}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-center border-b pb-4 last:border-0 last:pb-0"
          >
            <div className="flex items-center gap-2 lg:col-span-2">
              {subchapter.completed ? (
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              ) : (
                <XCircle className="h-5 w-5 text-gray-400 flex-shrink-0" />
              )}
              <span
                className={cn(
                  'text-sm',
                  subchapter.completed ? 'font-medium' : 'text-muted-foreground'
                )}
              >
                {subchapter.title}
              </span>
            </div>

            <div className="text-sm">
              <span className="text-muted-foreground">Time: </span>
              <span className="font-medium">
                {formatTime(subchapter.timeSpent)}
              </span>
            </div>

            <div className="text-sm">
              <span className="text-muted-foreground">Quiz attempts: </span>
              <span className="font-medium">
                {subchapter.quizAttempts || 'None'}
              </span>
            </div>

            <div className="text-sm flex items-center gap-2">
              <span className="text-muted-foreground">Score: </span>
              <span
                className={cn(
                  'font-medium',
                  getScoreColor(subchapter.quizScore)
                )}
              >
                {subchapter.quizScore ? `${subchapter.quizScore}%` : 'N/A'}
              </span>

              {subchapter.quizScore > 0 && (
                <Progress
                  value={subchapter.quizScore}
                  className={cn(
                    'h-2 flex-1',
                    getBgColorFromTextColor(getScoreColor(subchapter.quizScore))
                  )}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  );
};

export default ChapterDetail;
