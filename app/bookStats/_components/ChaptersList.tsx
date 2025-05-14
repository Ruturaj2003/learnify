'use client';

import { Card } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { BookStats } from '../_data/mockData';
import ChapterDetail from './ChapterDetail';
import { cn } from '@/lib/utils';
import { useBookStatsStore } from '@/stores/useBookStatsStore';

interface ChaptersListProps {
  data: BookStats;
}

const ChaptersList: React.FC<ChaptersListProps> = ({ data }) => {
  const { expandedChapter, toggleChapter } = useBookStatsStore();

  // Function to determine progress color
  const getProgressColor = (progress: number) => {
    if (progress < 30) return 'bg-red-500';
    if (progress < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-4 mt-8">
      <h2 className="text-2xl font-bold tracking-tight">Chapters Breakdown</h2>
      <div className="space-y-4">
        {data.chapters.map((chapter) => (
          <Card key={chapter.id} className="overflow-hidden">
            <div
              className="flex items-center justify-between p-6 cursor-pointer"
              onClick={() => toggleChapter(chapter.id)}
            >
              <div className="space-y-1.5">
                <h3 className="text-lg font-semibold">{chapter.title}</h3>
                <div className="flex items-center gap-2">
                  <Progress
                    value={chapter.progress}
                    className={cn(
                      'w-32 h-2',
                      getProgressColor(chapter.progress)
                    )}
                  />
                  <span className="text-sm text-muted-foreground">
                    {chapter.progress}% complete
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm font-medium">Quiz Average</div>
                  <div
                    className={cn(
                      'text-xl font-bold',
                      chapter.quizAverage >= 80
                        ? 'text-green-600'
                        : chapter.quizAverage >= 60
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    )}
                  >
                    {chapter.quizAverage}%
                  </div>
                </div>
                {expandedChapter === chapter.id ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            </div>
            {expandedChapter === chapter.id && (
              <ChapterDetail chapter={chapter} />
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ChaptersList;
