import { Button } from '@/components/ui/button';
interface Book {
  title: string;
  progress: number;
  knowledgeScore: number;
}

const MyBooksSection = ({
  books,
  onView,
  onRemove,
}: {
  books: Book[];
  onView: (index: number) => void;
  onRemove: (index: number) => void;
}) => {
  return (
    <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Books</h2>
      <ul className="divide-y divide-gray-200">
        {books.map((book, index) => (
          <li key={index} className="py-2 flex justify-between items-center">
            <span className="text-gray-800">{book.title}</span>
            <div className="flex items-center">
              <Button onClick={() => onView(index)} className="text-sm mr-2">
                Stats
              </Button>
              <Button
                onClick={() => onRemove(index)}
                className="text-sm text-red-600"
              >
                Remove
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
export default MyBooksSection;
