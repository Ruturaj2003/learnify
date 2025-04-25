'use client';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

const EmptyState = () => {
  const handleAddBook = () => {
    toast.info('This would open the book upload interface');
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
      <div className="text-center">
        <h3 className="mt-2 text-lg font-medium text-gray-900">No books yet</h3>
        <p className="mt-1 text-sm text-gray-500">
          Get started by uploading your first book
        </p>
        <div className="mt-6">
          <Button
            onClick={handleAddBook}
            className="inline-flex items-center gap-2"
          >
            <Plus size={16} />
            <span>Upload your first book</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
