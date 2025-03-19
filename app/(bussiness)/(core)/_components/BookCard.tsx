'use client';

import { Button } from '@/components/ui/button';
import { useGlobalStore } from '@/stores';
import { useRouter } from 'next/navigation';
type Mode = 'read' | 'quiz' | 'explain';
const BookCard = ({
  id,
  title,
  description,
}: {
  id: number;
  title: string;
  description: string;
}) => {
  const setMode = useGlobalStore((state) => state.setMode);
  const router = useRouter();
  const handleClick = (mode: Mode) => {
    setMode(mode);
    router.push('/books/' + id);
  };

  return (
    // Card Container
    <div className="flex h-48 w-full bg-amber-100 rounded-md shadow-md overflow-hidden">
      {/* Book Image (40% Width) */}
      <div className="flex-shrink-0 w-2/5 h-full bg-amber-400"></div>

      {/* Book Data (60% Width) */}
      <div className="flex flex-col justify-between flex-grow bg-teal-50 p-3">
        {/* Book Title */}
        <h2 className="text-md font-semibold truncate max-w-full">{title}</h2>

        {/* Book Description (Truncated) */}
        <p className="text-sm text-gray-800 line-clamp-3">{description}</p>

        {/* Buttons */}
        <div className="flex justify-between gap-x-2">
          <Button
            onClick={() => handleClick('read')}
            size="sm"
            variant="outline"
          >
            Read
          </Button>
          <Button
            onClick={() => handleClick('explain')}
            size="sm"
            variant="outline"
          >
            Learn
          </Button>
          <Button
            onClick={() => handleClick('quiz')}
            size="sm"
            variant="outline"
          >
            Quiz
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
