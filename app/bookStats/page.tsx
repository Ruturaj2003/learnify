'use client';
import React from 'react';
import BookProgress from './_components/BookProgress';
import ChaptersList from './_components/ChaptersList';

import { Skeleton } from '@/components/ui/skeleton';
import { useBookStatsStore } from '@/stores/useBookStatsStore';
import BottomNavBar from '../_components/BottomNavBar';
const BookStatsPage = () => {
  const { bookData, loading } = useBookStatsStore();

  return (
    <>
      <div className="container py-8 pb-18">
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight">
            {bookData?.bookName || 'Book Title'}
          </h1>
          <p className="text-muted-foreground mt-2">
            {bookData?.description ||
              'Track your progress and knowledge acquisition'}
          </p>
        </header>

        <main className="space-y-8">
          {loading ? (
            // Show skeletons while loading
            <div className="space-y-8">
              <div>
                <Skeleton className="h-8 w-64 mb-4" />
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {Array(4)
                    .fill(0)
                    .map((_, i) => (
                      <Skeleton key={i} className="h-40 w-full" />
                    ))}
                </div>
              </div>
              <div>
                <Skeleton className="h-8 w-48 mb-4" />
                {Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton key={i} className="h-24 w-full mb-4" />
                  ))}
              </div>
            </div>
          ) : bookData ? (
            <>
              <BookProgress data={bookData} />
              <ChaptersList data={bookData} />
            </>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">
                Failed to load book data. Please try again.
              </p>
            </div>
          )}
        </main>
      </div>
      <BottomNavBar></BottomNavBar>
    </>
  );
};
export default BookStatsPage;
