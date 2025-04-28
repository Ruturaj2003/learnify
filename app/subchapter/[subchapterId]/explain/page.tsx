'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import ViewModeToggle from './_components/ViewModeToggel';
import { useRouter } from 'next/navigation';
import { useExplanationStore } from '@/stores/useExplainationStore';
import { useChapterStore } from '@/stores/useChapterStore';
import Spinner from '../../../_components/Spinner'; // <-- Added Spinner import

const Reader = () => {
  const [progress, setProgress] = useState(0);
  // <-- Added loading state

  const contentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const { currentSubchapter } = useChapterStore();
  const chapterId = currentSubchapter.subId;

  const {
    simpleExplanationHtml,
    detailedExplanationHtml,
    viewMode,

    fetchExplanations,
    loadingExplaination,
  } = useExplanationStore();

  // Fetch explanations when the chapterId changes
  useEffect(() => {
    const fetchData = async () => {
      // Start loading
      await fetchExplanations(chapterId);
      // Stop loading after fetching
    };

    fetchData();
  }, [chapterId, fetchExplanations]);

  // Handle scroll for progress
  const handleScroll = () => {
    if (contentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      const newProgress = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setProgress(newProgress);
    }
  };

  // Get the current explanation based on the viewMode
  const currentExplanation =
    viewMode === 'simple' ? simpleExplanationHtml : detailedExplanationHtml;

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
            {`${currentSubchapter.subchapterName}`}
          </h2>

          {/* View Mode Toggle */}
          <ViewModeToggle />
        </div>

        {/* Reading Content */}
        <div
          ref={contentRef}
          className="w-full max-w-xl mx-auto px-6 py-16 md:px-8 lg:px-10"
        >
          {loadingExplaination ? (
            // Spinner while loading
            <div className="flex justify-center items-center h-[80vh]">
              <Spinner />
            </div>
          ) : (
            <div
              ref={ref}
              className={cn(
                'bg-white/80 dark:bg-gray-900/80 rounded-xl p-6 shadow-lg transition-opacity duration-500 h-[85vh] overflow-y-auto',
                inView ? 'opacity-100' : 'opacity-0'
              )}
              onScroll={handleScroll}
            >
              <div className="prose pt-8 dark:prose-invert max-w-none">
                {/* Explanation Content */}

                <div
                  className="mb-6 text-lg leading-relaxed font-literata text-gray-800 dark:text-gray-200"
                  dangerouslySetInnerHTML={{ __html: currentExplanation }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reader;
