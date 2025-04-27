// @ts-nocheck
'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';
import BottomNavBar from '../_components/BottomNavBar';
import BookList from './_components/BookList';
import FeaturedBook from './_components/FeaturedBook';
import Header from './_components/Header';
import { useDashboardStore } from '@/stores/useDashboardStore';
import { useUser } from '@clerk/nextjs';

const DashboardPage = () => {
  const { books, fetchBooks, deleteBook } = useDashboardStore();
  const { user } = useUser();
  useEffect(() => {
    fetchBooks(); // Fetch on mount
  }, [fetchBooks]);

  const sortedBooks = [...books].sort((a, b) => {
    if (!a.lastAccessed) return 1;
    if (!b.lastAccessed) return -1;
    return (
      new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime()
    );
  });

  const featuredBook = sortedBooks[0];

  const handleDeleteBook = (id: string) => {
    deleteBook(id);
    toast.success('Book deleted successfully');
  };

  return (
    <div>
      <div className="pt-2 pb-14">
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-md mx-auto px-4 py-6 bg-white min-h-screen">
            <Header name={user?.fullName} avatarUrl={user?.imageUrl} />

            {featuredBook && <FeaturedBook book={featuredBook} />}

            <BookList books={books} onDeleteBook={handleDeleteBook} />
          </div>
        </div>
      </div>
      <BottomNavBar />
    </div>
  );
};

export default DashboardPage;
