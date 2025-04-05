'use client';

import { UserButton } from '@clerk/nextjs';
import BookCard from '../_components/BookCard';
import Searchbar from '../_components/Searchbar';

const BookLibraryPage = () => {
  const bookArray = [
    {
      id: 1,
      title: 'The Alchemist',
      description: 'A journey of self-discovery.',
    },
    {
      id: 2,
      title: 'Atomic Habits',
      description: 'A guide to building good habits.',
    },
    {
      id: 3,
      title: '1984',
      description: 'A dystopian novel about totalitarianism.',
    },
    {
      id: 4,
      title: 'To Kill a Mockingbird',
      description: 'A classic novel on racial injustice.',
    },
    {
      id: 5,
      title: 'The Catcher in the Rye',
      description: 'A coming-of-age story.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header / Navbar */}
      <header className="w-full px-4 py-3 bg-white border-b shadow-sm flex justify-between items-center">
        <img
          src="/logo.png"
          alt="Logo"
          className="h-10 w-auto object-contain"
        />
        <UserButton />
      </header>

      {/* Main Content */}
      <main className="flex-grow px-4 py-6">
        <h2 className="text-xl font-semibold text-center mb-4 text-gray-800">
          Your Uploaded Books
        </h2>

        {/* Search Bar */}
        <div className="mb-6">
          <Searchbar />
        </div>

        {/* Book List */}
        <div className="flex flex-col gap-4 mb-16">
          {bookArray.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              description={book.description}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default BookLibraryPage;
