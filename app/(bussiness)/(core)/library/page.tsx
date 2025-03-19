import { User } from 'lucide-react';
import BookCard from '../_components/BookCard';
import Searchbar from '../_components/Searchbar';

const BookLibraryPage = () => {
  // Sample book data (Replace with real data when available)
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
    <div className="flex flex-col h-screen">
      {/* Custom NavBar */}
      <header className="border-b w-full h-16 flex   justify-between items-center px-4 bg-white shadow-md">
        <img src="/logo.png" alt="Logo" className="h-12 w-auto mb-1" />

        <button
          className="flex items-center p-2 focus:outline-none"
          aria-label="User Profile"
        >
          <span className="text-lg">
            <User
              className="bg-blue-500 text-white rounded-full"
              height={30}
            ></User>
          </span>
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow p-4 bg-gray-100 rounded-lg">
        <h2 className="font-bold text-center">Uploaded Books</h2>

        {/* Search Bar */}
        <div className="my-4">
          <Searchbar />
        </div>

        {/* Book List (Always One Column) */}
        <div className="flex flex-col gap-4 mb-16">
          {bookArray.map((book, index) => (
            <BookCard
              id={book.id}
              description={book.description}
              title={book.title}
              key={index}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default BookLibraryPage;
