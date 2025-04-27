'use client';
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import ViewModeToggle from './_components/ViewModeToggel';
import { useRouter } from 'next/navigation';

const Reader = () => {
  const [currentChapter, setCurrentChapter] = useState(1);
  const [progress, setProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const chapters = [
    {
      id: 1,
      title: 'Chapter 1: The Beginning',
      content: `In the depths of winter, I finally learned that within me there lay an invincible summer...`,
    },
    {
      id: 2,
      title: 'Chapter 2: The Discovery',
      content: `The book's pages felt warm beneath her fingertips, almost alive with their own energy...`,
    },
  ];

  const handleScroll = () => {
    if (contentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      const newProgress = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setProgress(newProgress);
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-100 dark:from-gray-900 dark:to-purple-900 flex justify-center">
        {/* Reading Progress */}
        <div className="fixed top-0 left-0 w-full h-1 bg-purple-100 dark:bg-purple-900 z-10">
          <div
            className="h-full bg-purple-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Fixed Navbar */}
        <div className="fixed top-0 left-0 w-full p-4 flex justify-between items-center bg-purple-100 dark:bg-purple-900 bg-opacity-80 backdrop-blur-sm z-20 rounded-lg">
          {/* Back Button */}
          <Button onClick={() => router.back()} variant="ghost" size="icon">
            <ChevronLeft className="h-6 w-6 text-purple-700 dark:text-purple-300 hover:text-purple-500 transition-colors" />
          </Button>

          {/* Chapter Name */}
          <h2 className="text-lg font-semibold text-purple-800 dark:text-purple-200">
            {chapters[currentChapter - 1].title}
          </h2>

          {/* Placeholder Button */}
          <ViewModeToggle></ViewModeToggle>
        </div>

        {/* Reading Content */}
        <div
          ref={contentRef}
          className="w-full max-w-xl mx-auto px-6 py-16 md:px-8 lg:px-10"
        >
          {/* Content box with fixed height of 85vh and scrolling */}
          <div
            ref={ref}
            className={cn(
              'bg-white/80 dark:bg-gray-900/80 rounded-xl p-6 shadow-lg transition-opacity duration-500 h-[85vh] overflow-y-auto',
              inView ? 'opacity-100' : 'opacity-0'
            )}
            onScroll={handleScroll}
          >
            <h1 className="text-2xl font-semibold text-purple-800 dark:text-purple-200 mb-6">
              {chapters[currentChapter - 1].title}
            </h1>
            <div className="prose dark:prose-invert max-w-none">
              {chapters[currentChapter - 1].content
                .split('\n\n')
                .map((paragraph, index) => (
                  <p
                    key={index}
                    className="mb-6 text-lg leading-relaxed font-literata text-gray-800 dark:text-gray-200"
                  >
                    {paragraph}
                  </p>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reader;
