'use client';

import React from 'react';
import { Book } from 'lucide-react';

const FormHeader: React.FC = () => {
  return (
    <div className="flex flex-col items-center mb-8">
      <div className="rounded-full bg-violet-200 p-4 mb-3">
        <Book className="h-8 w-8 text-violet-800" />
      </div>
      <h1 className="text-2xl font-bold text-center text-violet-600 mb-2">
        Upload Your Book
      </h1>
      <p className="text-center text-gray-500 max-w-xs">
        Share your knowledge with the world by uploading your book below
      </p>
    </div>
  );
};

export default FormHeader;
