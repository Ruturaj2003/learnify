'use client';
import { useRouter } from 'next/navigation';
import { Book } from './BookList';
import { useMemo } from 'react';

const colorClasses = [
  'bg-red-100 text-red-700',
  'bg-green-100 text-green-700',
  'bg-blue-100 text-blue-700',
  'bg-yellow-100 text-yellow-700',
  'bg-purple-100 text-purple-700',
  'bg-pink-100 text-pink-700',
  'bg-indigo-100 text-indigo-700',
  'bg-orange-100 text-orange-700',
  'bg-teal-100 text-teal-700',
];

const BookCard = ({ book }: { book: Book }) => {
  const router = useRouter();
  const categoryColor = useMemo(() => {
    const map = new Map<string, string>();
    return (category: string) => {
      if (!map.has(category)) {
        const randomColor =
          colorClasses[Math.floor(Math.random() * colorClasses.length)];
        map.set(category, randomColor);
      }
      return map.get(category)!;
    };
  }, []);

  return (
    <div
      onClick={() => router.push(`/book/${book.id}`)}
      className="bg-white/90 rounded-xl shadow-xs border border-gray-200 px-4 py-3 flex flex-col gap-2 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="font-bold text-lg text-gray-900 truncate">
            {book.title}
          </h2>
        </div>
        <span
          className={`ml-3 px-2 py-0.5 rounded-lg text-xs font-semibold ${categoryColor(
            book.category
          )}`}
        >
          {book.category}
        </span>
      </div>
      <p className="text-gray-600 text-sm">{book.description}</p>
    </div>
  );
};

export default BookCard;
