export type FileErrorType = 'size' | 'type' | null;

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export const validateBookName = (name: string): ValidationResult => {
  if (!name.trim()) {
    return { isValid: false, message: 'Book name is required' };
  }

  if (name.length < 2) {
    return {
      isValid: false,
      message: 'Book name must be at least 2 characters',
    };
  }

  if (name.length > 100) {
    return {
      isValid: false,
      message: 'Book name must be less than 100 characters',
    };
  }

  return { isValid: true };
};

export const validateDescription = (description: string): ValidationResult => {
  if (!description.trim()) {
    return { isValid: false, message: 'Description is required' };
  }

  if (description.length < 10) {
    return {
      isValid: false,
      message: 'Description must be at least 10 characters',
    };
  }

  if (description.length > 500) {
    return {
      isValid: false,
      message: 'Description must be less than 500 characters',
    };
  }

  return { isValid: true };
};

export const validateFile = (file: File | null): ValidationResult => {
  if (!file) {
    return { isValid: false, message: 'Please upload a book file' };
  }

  const supportedFormats = [
    'application/pdf',
    'application/epub+zip',
    'application/x-mobipocket-ebook',
  ];
  const fileExtension = file.name.split('.').pop()?.toLowerCase();

  if (
    !supportedFormats.includes(file.type) &&
    !['pdf'].includes(fileExtension || '')
  ) {
    return {
      isValid: false,
      message:
        'Unsupported file format. Please upload a PDF, EPUB, or MOBI file',
    };
  }

  // 50MB max size
  const maxSize = 50 * 1024 * 1024;
  if (file.size > maxSize) {
    return {
      isValid: false,
      message: 'File is too large. Maximum file size is 50MB',
    };
  }

  return { isValid: true };
};
