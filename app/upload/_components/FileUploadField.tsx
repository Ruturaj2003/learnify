'use client';

import React, { useState } from 'react';
import { Upload, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
// Adjust path if needed
import { toast } from 'sonner';
import { UploadButton } from '@uploadthing/react';

interface FileUploadFieldProps {
  onChange: (file: File | null) => void;
  error?: string;
}

const FileUploadField: React.FC<FileUploadFieldProps> = ({
  onChange,
  error,
}) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number | null>(null);

  const handleUploadComplete = (res: { name: string; size: number }[]) => {
    if (res && res.length > 0) {
      const uploaded = res[0];
      setFileName(uploaded.name);
      setFileSize(uploaded.size);
      toast.success('File uploaded!');
      onChange(new File([], uploaded.name)); // Placeholder File object
    }
  };

  const handleUploadError = (error: Error) => {
    console.error(error);
    toast.error('Failed to upload file');
    onChange(null);
  };

  const removeFile = () => {
    setFileName(null);
    setFileSize(null);
    onChange(null);
  };

  return (
    <div className="space-y-2">
      <label
        htmlFor="book-file"
        className={cn(
          'file-input-label',
          fileName && 'has-file',
          error && 'error'
        )}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          {!fileName ? (
            <>
              <Upload className="w-8 h-8 mb-3 text-book-primary" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500">PDF</p>
              <div className="mt-4"></div>
            </>
          ) : (
            <div className="flex items-center justify-center w-full">
              <div className="flex flex-col items-center">
                <Check className="w-8 h-8 mb-2 text-green-500" />
                <p className="mb-1 text-sm font-medium text-gray-700 truncate max-w-[200px]">
                  {fileName}
                </p>
                <p className="text-xs text-gray-500">
                  {(fileSize! / (1024 * 1024)).toFixed(2)} MB
                </p>
                <button
                  type="button"
                  onClick={removeFile}
                  className="flex items-center mt-2 text-xs text-red-500 hover:text-red-700"
                >
                  <X className="w-3 h-3 mr-1" /> Remove
                </button>
              </div>
            </div>
          )}
        </div>
      </label>
      {error && (
        <p className="text-sm text-destructive animate-fade-in">{error}</p>
      )}
    </div>
  );
};

export default FileUploadField;
