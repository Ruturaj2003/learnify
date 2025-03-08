import { Button } from '@/components/ui/button';

const BookCard = () => {
  return (
    <div className="flex h-48 bg-amber-100 rounded-md shadow-md overflow-hidden">
      {/* Book Image (40% Width) */}
      <div className="flex-shrink-0 w-2/5 h-full bg-amber-400"></div>

      {/* Book Data (60% Width) */}
      <div className="flex-grow bg-teal-400/60 flex flex-col p-4">
        {/* Book Title */}
        <h2 className="text-md font-semibold truncate">
          Introduction to Data Science
        </h2>

        {/* Book Description (Truncated) */}
        <p className="text-xs text-gray-700 line-clamp-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis sit at
          velit dignissimos!, Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Quis sit at velit dignissimos!
        </p>

        {/* Buttons */}
        <div className="flex justify-between mt-auto">
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
