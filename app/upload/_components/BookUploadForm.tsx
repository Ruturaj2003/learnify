'use client';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

import {
  validateBookName,
  validateDescription,
  ValidationResult,
} from './validation';
import FileUploadField from './FileUploadField';
import FormHeader from './FormHeader';

interface FormFields {
  bookName: string;
  description: string;
  category: string;
  file: File | null;
}

interface FormErrors {
  bookName?: string;
  description?: string;
  category?: string;
  file?: string;
}

const BookUploadForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormFields>({
    bookName: '',
    description: '',
    category: '',
    file: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = (
    field: keyof FormFields,
    value: string | File | null
  ): string | undefined => {
    let result: ValidationResult = { isValid: true };

    switch (field) {
      case 'bookName':
        result = validateBookName(value as string);
        break;
      case 'description':
        result = validateDescription(value as string);
        break;
    }

    return result.isValid ? undefined : result.message;
  };

  const handleChange =
    (field: keyof FormFields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));

      if (touched[field]) {
        const error = validate(field, value);
        setErrors((prev) => ({ ...prev, [field]: error }));
      }
    };

  const handleFileChange = (file: File | null) => {
    setFormData((prev) => ({ ...prev, file }));

    if (touched.file) {
      const error = validate('file', file);
      setErrors((prev) => ({ ...prev, file: error }));
    }
  };

  const handleBlur = (field: keyof FormFields) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));

    const value = formData[field];
    const error = validate(field, value);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Validate all fields
    (Object.keys(formData) as Array<keyof FormFields>).forEach((field) => {
      const error = validate(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched({
      bookName: true,
      description: true,
      category: true,
      file: true,
    });

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Success toast
      toast.success(`"${formData.bookName}" has been uploaded.`);

      // Reset form
      setFormData({
        bookName: '',
        description: '',
        category: '',
        file: null,
      });
      setErrors({});
      setTouched({});
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(
          `There was a problem uploading your book. ${error.message}`
        );
      } else {
        toast.error(
          'There was a problem uploading your book. Please try again.'
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <FormHeader />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="book-name">
            Book Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="book-name"
            placeholder="Enter the title of your book"
            value={formData.bookName}
            onChange={handleChange('bookName')}
            onBlur={handleBlur('bookName')}
            className={errors.bookName ? 'border-destructive' : ''}
          />
          {errors.bookName && (
            <p className="text-sm text-destructive animate-fade-in">
              {errors.bookName}
            </p>
          )}
          {formData.bookName && !errors.bookName && (
            <p className="text-xs text-muted-foreground text-right">
              {formData.bookName.length}/100
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">
            Description <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="description"
            placeholder="Briefly describe your book"
            value={formData.description}
            onChange={handleChange('description')}
            onBlur={handleBlur('description')}
            className={`min-h-[100px] resize-none ${
              errors.description ? 'border-destructive' : ''
            }`}
          />
          {errors.description && (
            <p className="text-sm text-destructive animate-fade-in">
              {errors.description}
            </p>
          )}
          {formData.description && !errors.description && (
            <p className="text-xs text-muted-foreground text-right">
              {formData.description.length}/500
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">
            Category <span className="text-destructive">*</span>
          </Label>
          <Input
            id="category"
            placeholder="Enter the category of your book"
            value={formData.category}
            onChange={handleChange('category')}
            onBlur={handleBlur('category')}
            className={errors.category ? 'border-destructive' : ''}
          />
          {errors.category && (
            <p className="text-sm text-destructive animate-fade-in">
              {errors.category}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="book-file">
            Book File <span className="text-destructive">*</span>
          </Label>
          <FileUploadField onChange={handleFileChange} error={errors.file} />
        </div>

        <Button
          type="submit"
          className="w-full bg-violet-700 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Uploading...' : 'Upload Book'}
        </Button>
      </form>
    </div>
  );
};

export default BookUploadForm;
