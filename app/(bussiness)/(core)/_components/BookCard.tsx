'use client';

import { Button } from '@/components/ui/button';
import { useGlobalStore } from '@/stores';
import { useRouter } from 'next/navigation';

// Define Types
type Mode = 'read' | 'quiz' | 'explain';
type Book = {
  id: number;
  title: string;
  description: string;
};

const BookCard = ({ id, title, description }: Book) => {
  const setMode = useGlobalStore((state) => state.setMode);
  const router = useRouter();

  // Handle Navigation
  const handleNavigation = (mode: Mode) => {
    setMode(mode);
    router.push(`/books/${id}`);
  };

  return (
    <div className="flex h-48 w-full rounded-md shadow-md overflow-hidden bg-amber-100">
      {/* Book Image Placeholder */}
      <div className="flex-shrink-0 w-2/5 h-full bg-amber-400">
        {/* You can add an <img> tag here with alt text when available */}
      </div>

      {/* Book Details */}
      <div className="flex flex-col justify-between flex-grow p-3 bg-teal-50">
        <h2 className="text-md font-semibold truncate">{title}</h2>
        <p className="text-sm text-gray-800 line-clamp-3">{description}</p>

        {/* Action Buttons */}
        <div className="flex justify-between gap-2">
          {(['read', 'explain', 'quiz'] as Mode[]).map((mode) => (
            <Button
              key={mode}
              onClick={() => handleNavigation(mode)}
              size="sm"
              variant="outline"
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
