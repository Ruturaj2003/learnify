'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronRight, List, Trash } from 'lucide-react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import axios from 'axios';
import { useBookStatsStore } from '@/stores/useBookStatsStore';
import { useRouter } from 'next/navigation';

type Book = {
  id: string;
  title: string;
  progress: number;
  knowledgeScore: number;
  coverColor: string;
  lastAccessed?: Date;
};

type BookItemProps = {
  book: Book;
  onDelete: (id: string) => void;
};
const BookItem = ({ book, onDelete }: BookItemProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { loadBookData } = useBookStatsStore();
  const router = useRouter();
  const handleDelete = async () => {
    try {
      // Send DELETE request with the bookId in the body
      const response = await axios.delete('/api/deleteBook', {
        data: { bookId: book.id },
      });

      if (response.status === 200) {
        toast.success(`"${book.title}" has been deleted.`);
        onDelete(book.id); // Notify parent to remove the book from the list
      } else {
        toast.error('Failed to delete the book.');
      }

      setIsDialogOpen(false);
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while deleting the book.');
    }
  };

  const handleStatsClick = () => {
    loadBookData(book.id);
    router.push('/bookStats');

    toast.info(`Viewing stats for "${book.title}"`);
  };

  return (
    <>
      <div
        className={`border-b border-gray-200 py-3 transition-all ${
          isExpanded ? 'bg-gray-50' : ''
        }`}
      >
        <div
          className="flex items-center gap-3 cursor-pointer px-1"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div
            className="w-10 h-14 rounded flex items-center justify-center shrink-0"
            style={{ backgroundColor: book.coverColor }}
          />
          <div className="flex-1 min-w-0">
            <h3
              className="font-medium text-sm mb-1 truncate"
              title={book.title}
            >
              {book.title}
            </h3>
            <div className="flex items-center gap-2">
              <Progress value={book.progress} className="h-1.5 flex-1" />
              <span className="text-xs text-gray-500">{book.progress}%</span>
            </div>
          </div>
          <ChevronRight
            size={18}
            className={`text-gray-400 transition-transform ${
              isExpanded ? 'rotate-90' : ''
            }`}
          />
        </div>

        {isExpanded && (
          <div className="pt-3 px-1 flex justify-end gap-2 animate-fade-in">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={handleStatsClick}
            >
              <List size={14} />
              <span>Stats</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1 text-destructive hover:bg-destructive/10"
              onClick={() => setIsDialogOpen(true)}
            >
              <Trash size={14} />
              <span>Delete</span>
            </Button>
          </div>
        )}
      </div>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove &quot;{book.title}&quot; from your list. This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default BookItem;
