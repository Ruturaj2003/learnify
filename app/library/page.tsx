'use client';
import { useMemo, useState } from 'react';
import BottomNavBar from '../_components/BottomNavBar';
import SearchBar from './_components/SearchBar';
import BookList from './_components/BookList';
import SortDropdown from './_components/SortDropdown';

// Demo data for books
const BOOKS: Books = [
  {
    id: 1,
    title: 'Atomic Habits',
    description:
      'An insightful guide on how tiny changes lead to remarkable results.',
    category: 'AHelp',
  },
  {
    id: 2,
    title: 'Sapiens',
    description: 'A brief history of humankind.',
    category: 'History',
  },
  {
    id: 3,
    title: 'React Up & Running',
    description: 'A practical introduction to React.js for web development.',
    category: 'Technology',
  },
  {
    id: 4,
    title: 'The Hobbit',
    description: 'A fantasy novel and prelude to the Lord of the Rings.',
    category: 'Fantasy',
  },
  {
    id: 5,
    title: 'Deep Work',
    description: 'Rules for focused success in a distracted world.',
    category: 'Productivity',
  },
];
// Define the shape of a single book
type Book = {
  id: number;
  title: string;
  description: string;
  category: string;
};

// Define the list of books
type Books = Book[];

// Define sorting functions for different sort options
const sortFunctions: Record<string, (a: Book, b: Book) => number> = {
  // Sort books by title A → Z
  title_asc: (a, b) => a.title.localeCompare(b.title),

  // Sort books by title Z → A
  title_desc: (a, b) => b.title.localeCompare(a.title),

  // Sort books by category A → Z
  category_asc: (a, b) => a.category.localeCompare(b.category),

  // Sort books by category Z → A
  category_desc: (a, b) => b.category.localeCompare(a.category),
};

const LibraryPage = () => {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] =
    useState<keyof typeof sortFunctions>('title_asc');

  // Filter and sort books
  const filteredBooks = useMemo(() => {
    const result = BOOKS.filter(
      (book) =>
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.description.toLowerCase().includes(search.toLowerCase()) ||
        book.category.toLowerCase().includes(search.toLowerCase())
    );
    return result.sort(sortFunctions[sortKey]);
  }, [search, sortKey]);

  return (
    <>
      <div className="pt-14 pb-14">
        <div className="font-sans bg-gradient-to-b from-indigo-100 via-purple-50 to-white min-h-screen flex flex-col w-full">
          <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-sm border-b border-gray-200 px-4 pt-6 pb-2 flex flex-col gap-3 items-center w-full">
            <h1 className="text-2xl font-bold text-indigo-700 tracking-tight">
              My Library
            </h1>
            <div className="flex gap-2 w-full max-w-md">
              <SearchBar value={search} onChange={setSearch} />
              <SortDropdown value={sortKey} onChange={setSortKey} />
            </div>
          </header>
          <main className="flex-1 px-2 py-4 w-full max-w-md mx-auto">
            <BookList books={filteredBooks} />
            {filteredBooks.length === 0 && (
              <div className="text-center text-gray-400 mt-14">
                No books found.
              </div>
            )}
          </main>
        </div>
      </div>
      <BottomNavBar></BottomNavBar>
    </>
  );
};
export default LibraryPage;
