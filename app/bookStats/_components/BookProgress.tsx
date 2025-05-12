'use client';
import React from 'react';
import { ChartPie, Clock, Award, BookOpen } from 'lucide-react';
import StatCard from './StatCard';
import ProgressCard from './ProgressCard';
import { BookStats } from '../_data/mockData';
import { useBookStatsStore } from '@/stores/useBookStatsStore';

interface BookProgressProps {
  data: BookStats;
}

const BookProgress: React.FC<BookProgressProps> = ({ data }) => {
  const { formatTime } = useBookStatsStore();

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">
        Book Progress Dashboard
      </h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <ProgressCard
          title="Overall Progress"
          progress={data.overallProgress}
          subtitle={`${data.chaptersCompleted} of ${data.totalChapters} chapters completed`}
          progressColor="bg-blue-500"
        />
        <StatCard
          title="Knowledge Score"
          value={`${data.knowledgeScore}%`}
          subtitle="Based on quiz performance"
          icon={<Award size={20} />}
          valueColor="text-purple-600"
        />
        <StatCard
          title="Time Invested"
          value={formatTime(data.totalTimeSpent)}
          icon={<Clock size={20} />}
          valueColor="text-green-600"
        />
        <StatCard
          title="Quiz Performance"
          value={`${data.averageQuizScore}%`}
          subtitle={`${data.totalQuizAttempts} attempts total`}
          icon={<ChartPie size={20} />}
          valueColor="text-amber-600"
        />
      </div>
    </div>
  );
};

export default BookProgress;
