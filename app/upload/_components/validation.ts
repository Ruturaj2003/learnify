export type FileErrorType = 'size' | 'type' | 'missing' | null;

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

// 🆕 Updated validateFile to validate file URL
export const validateFile = (fileUrl: string | null): ValidationResult => {
  if (!fileUrl) {
    return { isValid: false, message: 'Please upload a book file' };
  }

  const lowerUrl = fileUrl.toLowerCase();

  if (
    !lowerUrl.endsWith('.pdf') &&
    !lowerUrl.endsWith('.epub') &&
    !lowerUrl.endsWith('.mobi')
  ) {
    return {
      isValid: false,
      message: 'Unsupported file type. Only PDF, EPUB, or MOBI are allowed',
    };
  }

  return { isValid: true };
};
