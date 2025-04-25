'use client';

import { useState } from 'react';
import { toast } from 'sonner';
// import Header from '@/components/Header';
// import FeaturedBook from '@/components/FeaturedBook';
// import BookList from '@/components/BookList';
import BottomNavBar from '../_components/BottomNavBar';
import BookList from './_components/BookList';
import FeaturedBook from './_components/FeaturedBook';
import Header from './_components/Header';

export type Book = {
  id: string;
  title: string;
  progress: number; // 0-100
  knowledgeScore: number; // 0-100
  coverColor: string;
  lastAccessed?: Date;
};

const sampleBooks: Book[] = [
  {
    id: '1',
    title: 'Neural Networks for Beginners',
    progress: 80,
    knowledgeScore: 75,
    coverColor: '#9b87f5',
    lastAccessed: new Date('2025-04-24'),
  },
  {
    id: '2',
    title: 'Cognitive Psychology Essentials',
    progress: 60,
    knowledgeScore: 62,
    coverColor: '#7E69AB',
    lastAccessed: new Date('2025-04-20'),
  },
  {
    id: '3',
    title: 'DSA Made Easy',
    progress: 35,
    knowledgeScore: 47,
    coverColor: '#D6BCFA',
    lastAccessed: new Date('2025-04-10'),
  },
  {
    id: '4',
    title: 'Intro to Machine Learning',
    progress: 15,
    knowledgeScore: 22,
    coverColor: '#E5DEFF',
  },
];

const DashboardPage = () => {
  const [books, setBooks] = useState<Book[]>(sampleBooks);

  // Sort books by lastAccessed date
  const sortedBooks = [...books].sort((a, b) => {
    if (!a.lastAccessed) return 1;
    if (!b.lastAccessed) return -1;
    return b.lastAccessed.getTime() - a.lastAccessed.getTime();
  });

  const featuredBook = sortedBooks[0];

  const handleDeleteBook = (id: string) => {
    setBooks((prev) => prev.filter((book) => book.id !== id));
    toast.success('Book deleted successfully');
  };

  return (
    <div>
      <div className="pt-14 pb-14">
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-md mx-auto px-4 py-6 bg-white min-h-screen">
            <Header
              name="Alex Johnson"
              avatarUrl="https://i.pravatar.cc/300?img=12"
            />

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
