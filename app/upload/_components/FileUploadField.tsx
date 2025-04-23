'use client';
import React, { useState, useRef } from 'react';
import { Upload, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploadFieldProps {
  onChange: (file: File | null) => void;
  error?: string;
}

const FileUploadField: React.FC<FileUploadFieldProps> = ({
  onChange,
  error,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    onChange(selectedFile);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files?.[0] || null;
    if (droppedFile) {
      setFile(droppedFile);
      onChange(droppedFile);
    }
  };

  const removeFile = () => {
    setFile(null);
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <label
        htmlFor="book-file"
        className={cn(
          'file-input-label',
          isDragging && 'border-violet-400',
          file && 'has-file',
          error && 'error'
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          {!file ? (
            <>
              <Upload className="w-8 h-8 mb-3 text-book-primary" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500">
                PDF, EPUB or MOBI (Max 50MB)
              </p>
            </>
          ) : (
            <div className="flex items-center justify-center w-full">
              <div className="flex flex-col items-center">
                <Check className="w-8 h-8 mb-2 text-green-500" />
                <p className="mb-1 text-sm font-medium text-gray-700 truncate max-w-[200px]">
                  {file.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    removeFile();
                  }}
                  className="flex items-center mt-2 text-xs text-red-500 hover:text-red-700"
                >
                  <X className="w-3 h-3 mr-1" /> Remove
                </button>
              </div>
            </div>
          )}
        </div>
      </label>
      <input
        ref={fileInputRef}
        id="book-file"
        type="file"
        className="hidden"
        accept=".pdf,.epub,.mobi,application/pdf,application/epub+zip,application/x-mobipocket-ebook"
        onChange={handleFileChange}
      />
      {error && (
        <p className="text-sm text-destructive animate-fade-in">{error}</p>
      )}
    </div>
  );
};

export default FileUploadField;
