'use client';

import { useRouter } from 'next/navigation';
import { Book } from './BookList';
import { useMemo } from 'react';
import { BookOpen } from 'lucide-react'; // Using a clean, modern book icon
import { format } from 'date-fns'; // Optional: Install date-fns for formatting

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

  const formattedDate = book.createdAt
    ? format(new Date(book.createdAt), 'MMMM dd, yyyy')
    : 'Date not available';

  return (
    <div
      onClick={() => router.push(`/book/${book.id}`)}
      className="group cursor-pointer bg-gradient-to-br from-white/60 to-indigo-50/40 backdrop-blur-md rounded-2xl shadow-sm hover:shadow-indigo-300/30 hover:border-indigo-400 transition-all duration-300 border border-gray-200 px-4 py-4 flex gap-4 relative overflow-hidden"
    >
      {/* Category Tag */}
      <span
        className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${categoryColor(
          book.category
        )} transition-transform duration-300 group-hover:scale-105`}
      >
        {book.category}
      </span>

      {/* Book Icon */}
      <div className="flex-shrink-0 w-20 h-20 rounded-xl bg-gradient-to-br from-indigo-200 to-indigo-100 flex items-center justify-center transition-transform duration-300 group-hover:rotate-3">
        <BookOpen className="w-10 h-10 text-indigo-700" />
      </div>

      {/* Book Info */}
      <div className="flex flex-col justify-center flex-1 min-w-0">
        <h2 className="text-lg font-bold text-gray-900 tracking-tight truncate">
          {book.title}
        </h2>
        <p className="text-gray-600 text-sm italic leading-snug line-clamp-2">
          {book.description}
        </p>
        <p className="text-gray-500 text-xs mt-4">{formattedDate}</p>
      </div>
    </div>
  );
};

export default BookCard;
