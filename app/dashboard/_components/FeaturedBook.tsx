import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen } from 'lucide-react';

type FeaturedBookProps = {
  book: Book;
};

type Book = {
  id: string;
  title: string;
  progress: number;
  knowledgeScore: number;
  coverColor: string;
  lastAccessed?: Date;
};
const FeaturedBook = ({ book }: FeaturedBookProps) => {
  return (
    <Card className="w-full mb-6 shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-medium">
            Recently Accessed
          </CardTitle>
          <Badge variant="outline" className="bg-primary/10 text-primary">
            {book.knowledgeScore}% Mastery
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 items-center">
          <div
            className="w-12 h-16 rounded flex items-center justify-center"
            style={{ backgroundColor: book.coverColor }}
          >
            <BookOpen className="text-white" size={24} />
          </div>
          <div className="flex-1">
            <h3
              className="font-medium text-base mb-2 line-clamp-1"
              title={book.title}
            >
              {book.title}
            </h3>
            <div className="flex items-center gap-2 mb-1">
              <Progress value={book.progress} className="h-2" />
              <span className="text-sm text-gray-500 whitespace-nowrap">
                {book.progress}%
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeaturedBook;
