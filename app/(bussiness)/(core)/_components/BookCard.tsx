import { Button } from '@/components/ui/button';

const BookCard = () => {
  return (
    // Card Container
    <div className="flex h-48 w-full bg-amber-100 rounded-md shadow-md overflow-hidden">
      {/* Book Image (40% Width) */}
      <div className="flex-shrink-0 w-2/5 h-full bg-amber-400"></div>

      {/* Book Data (60% Width) */}
      <div className="flex flex-col justify-between flex-grow bg-teal-50 p-3">
        {/* Book Title */}
        <h2 className="text-md font-semibold truncate max-w-full">
          Introduction to Data Science
        </h2>

        {/* Book Description (Truncated) */}
        <p className="text-sm text-gray-800 line-clamp-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis sit at
          velit dignissimos!
        </p>

        {/* Buttons */}
        <div className="flex justify-between gap-x-2">
          <Button size="sm" variant="outline">
            Read
          </Button>
          <Button size="sm" variant="outline">
            Learn
          </Button>
          <Button size="sm" variant="outline">
            Quiz
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
