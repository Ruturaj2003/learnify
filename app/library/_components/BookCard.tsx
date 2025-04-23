import { Book } from './BookList';

const categoryColors: Record<string, string> = {
  'Self-Help': 'bg-green-100 text-green-700',
  Fantasy: 'bg-violet-100 text-violet-700',
  Technology: 'bg-blue-100 text-blue-700',
  Productivity: 'bg-orange-100 text-orange-700',
  History: 'bg-gray-100 text-gray-700',
};

const BookCard = ({ book }: { book: Book }) => (
  <div className="bg-white/90 rounded-xl shadow-sm border border-gray-200 px-4 py-3 flex flex-col gap-2 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div className="flex-1 min-w-0">
        <h2 className="font-bold text-lg text-gray-900 truncate">
          {book.title}
        </h2>
      </div>
      <span
        className={`ml-3 px-2 py-0.5 rounded-lg text-xs font-semibold ${
          categoryColors[book.category] || 'bg-gray-200 text-gray-700'
        }`}
      >
        {book.category}
      </span>
    </div>
    <p className="text-gray-600 text-sm">{book.description}</p>
  </div>
);

export default BookCard;
