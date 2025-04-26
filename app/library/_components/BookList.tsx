import BookCard from './BookCard';

export interface Book {
  id: string;
  title: string;
  description: string;
  category: string;
}

const BookList = ({ books }: { books: Book[] }) => (
  <div className="flex flex-col gap-4">
    {books.map((book) => (
      <BookCard key={book.id} book={book} />
    ))}
  </div>
);

export default BookList;
