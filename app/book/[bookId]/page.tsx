'use client';

import { useEffect } from 'react';
import BottomNavBar from '@/app/_components/BottomNavBar';
import ModeSelector from './_component/ModeSelector';
import ChapterAccordion from './_component/ChapterAccordion';
import { useChapterStore } from '@/stores/useChapterStore';
import { useParams } from 'next/navigation';

const ChapterListPage = () => {
  const params = useParams();
  const bookId = params?.bookId as string; // safer casting

  const { chapters, mode, setMode, fetchChapters, loading, error } =
    useChapterStore();

  useEffect(() => {
    if (bookId) {
      fetchChapters(bookId);
    }
  }, [fetchChapters]);

  return (
    <>
      <div className="pt-2 pb-20 px-4">
        <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50 to-white flex flex-col gap-6">
          {/* Mode Selector */}
          <section className="flex justify-center mb-2">
            <ModeSelector value={mode} onChange={setMode} />
          </section>

          {/* Chapters List */}
          <div className="  pb-20 w-full h-40 max-w-2xl mx-auto">
            {loading ? (
              <div className="text-center text-gray-500">
                Loading chapters...
              </div>
            ) : error ? (
              <div className="text-center text-red-500">{error}</div>
            ) : (
              <ChapterAccordion />
            )}
          </div>
        </div>
      </div>

      <BottomNavBar />
    </>
  );
};

export default ChapterListPage;
