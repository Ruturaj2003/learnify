import BookCard from './BookCard';

export interface Book {
  id: string; // MongoDB ObjectId as a string
  userId: string; // The ID of the user associated with the book
  title: string; // Title of the book
  category: string; // Category of the book
  description?: string; // Optional description of the book
  fileUrl: string; // URL of the book file
  startsFrom?: number; // Optional field indicating where the book starts from
  createdAt: Date; // Date when the book was created
  lastAccessed: Date; // Date when the book was last accessed
}

const BookList = ({ books }: { books: Book[] }) => (
  <div className="flex flex-col gap-4">
    {books.map((book) => (
      <BookCard key={book.id} book={book} />
    ))}
  </div>
);

export default BookList;
