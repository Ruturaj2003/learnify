import BookItem from './BookItem';
import EmptyState from './EmptyState';

type Book = {
  id: string;
  title: string;
  progress: number;
  knowledgeScore: number;
  coverColor: string;
  lastAccessed?: Date;
};
type BookListProps = {
  books: Book[];
  onDeleteBook: (id: string) => void;
};

const BookList = ({ books, onDeleteBook }: BookListProps) => {
  if (books.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-800">Your Books</h2>
        <span className="text-sm text-gray-500">{books.length} books</span>
      </div>
      <div className="space-y-1 overflow-y-auto max-h-[calc(100vh-300px)] scrollbar-none">
        {books.map((book) => (
          <BookItem key={book.id} book={book} onDelete={onDeleteBook} />
        ))}
      </div>
    </div>
  );
};

export default BookList;
