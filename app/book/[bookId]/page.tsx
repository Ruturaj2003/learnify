'use client';

import { useEffect } from 'react';
import BottomNavBar from '@/app/_components/BottomNavBar';
import ModeSelector from './_component/ModeSelector';
import ChapterAccordion from './_component/ChapterAccordion';
import { useChapterStore } from '@/stores/useChapterStore';
import { useParams } from 'next/navigation';
import Spinner from '../../_components/Spinner'; //

import { Toaster } from '@/components/ui/sonner';

const ChapterListPage = () => {
  const params = useParams();
  const bookId = params?.bookId as string; // safer casting

  const { mode, setMode, fetchChapters, loading } = useChapterStore();

  useEffect(() => {
    if (bookId) {
      fetchChapters(bookId);
    }
  }, [fetchChapters, bookId]);

  return (
    <>
      <div className="pt-2 pb-20 px-4">
        <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50 to-white flex flex-col gap-6">
          {/* Mode Selector */}
          <section className="flex justify-center mb-2">
            <ModeSelector value={mode} onChange={setMode} />
          </section>

          {/* Chapters List */}
          <div className="pb-20 w-full h-40 max-w-2xl mx-auto">
            {loading ? (
              <Spinner /> // Show spinner when loading
            ) : (
              <ChapterAccordion />
            )}
          </div>
        </div>
      </div>

      <BottomNavBar />
      <Toaster></Toaster>
    </>
  );
};

export default ChapterListPage;
