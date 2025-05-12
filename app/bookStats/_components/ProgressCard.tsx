'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface ProgressCardProps {
  title: string;
  progress: number;
  subtitle?: string;
  className?: string;
  progressColor?: string;
}

const ProgressCard: React.FC<ProgressCardProps> = ({
  title,
  progress,
  subtitle,
  className,
  progressColor,
}) => {
  // Function to determine the color based on progress
  const getProgressColor = () => {
    if (progressColor) return progressColor;
    if (progress < 30) return 'bg-red-500';
    if (progress < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <span className="text-sm font-medium">{progress}%</span>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-2">
          <Progress
            value={progress}
            className={cn('h-2', getProgressColor())}
          />
          {subtitle && (
            <p className="text-xs text-muted-foreground pt-2">{subtitle}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressCard;
