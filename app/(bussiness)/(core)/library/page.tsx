import BookCard from '../_components/BookCard';
import Searchbar from '../_components/Searchbar';

const BookLibraryPage = () => {
  // Sample book data (Replace with real data when available)
  const bookArray = [1, 3, 4, 5, 65, 6, 6, 34, 1, 3, 4, 5, 65, 6, 6, 34];

  return (
    <div className="flex flex-col h-screen">
      {/* Custom NavBar */}
      <header className="border-b w-full h-16 flex justify-between items-center px-4 bg-white shadow-md">
        <img src="/logo.svg" alt="Logo" className="h-5 w-auto" />
        <h1 className="text-lg font-semibold text-gray-800">Your Library</h1>
        <button
          className="flex items-center p-2 focus:outline-none"
          aria-label="User Profile"
        >
          <span className="text-lg">User Icon</span>
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
        <div className="flex flex-col gap-4">
          {bookArray.map((book, index) => (
            <BookCard key={index} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default BookLibraryPage;
