'use client';

import axios from 'axios';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { Upload, Check, X, ArrowLeft, Ghost } from 'lucide-react';
import { toast } from 'sonner';
import { UploadButton } from './_components/uploadthing';
import { useRouter } from 'next/navigation';
import BottomNavBar from '../_components/BottomNavBar';

const UploadBookPage = () => {
  const [loading, setLoading] = useState(false);
  const [bookName, setBookName] = useState('');
  const [bookCategory, setBookCategory] = useState('');
  const [bookLink, setBookLink] = useState('');
  const [bookDescription, setBookDescription] = useState('');
  const [isProcessed, setIsProcessed] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [uploadedFileSize, setUploadedFileSize] = useState(0);
  const router = useRouter();

  const handleUpload = async () => {
    if (!isProcessed) {
      toast.error('Please select a file first', { position: 'top-center' });
      return;
    }

    try {
      // Make POST request to save the book
      const res = await axios.post('/api/uploadBook', {
        title: bookName,
        description: bookDescription,
        category: bookCategory,
        fileUrl: bookLink,
      });

      const { bookId } = res.data;

      // Optionally, process the book file further (could be for indexing, etc.)
      await axios.post('/api/processBook', {
        bookId,
        fileUrl: bookLink,
      });

      toast.success('Book Uploaded Successfully!', { position: 'top-center' });
      router.push('/library');
    } catch (err) {
      const error = err as any;
      toast.error(
        'Error Saving Book ' + (error.response?.data?.error || error.message),
        { position: 'top-center' }
      );
    }
  };

  const removeFile = () => {
    setIsProcessed(false);
    setBookLink('');
    setUploadedFileName('');
    setUploadedFileSize(0);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Navbar */}
        <div className="flex items-center p-4 bg-purple-600 text-white shadow-md">
          <button onClick={() => router.back()} className="flex items-center">
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="font-semibold">Back</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 justify-center items-start p-6">
          <Card className="w-full max-w-md p-6 bg-white rounded-3xl shadow-xl">
            <CardContent>
              <motion.h2
                className="text-3xl font-bold text-center mb-6 text-violet-700"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Upload Your Book
              </motion.h2>

              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Book Name"
                  value={bookName}
                  onChange={(e) => setBookName(e.target.value)}
                  className="w-full p-2 border-violet-300 focus:ring-violet-400"
                />
                <Input
                  type="text"
                  placeholder="Category (e.g., Science, Fiction)"
                  value={bookCategory}
                  onChange={(e) => setBookCategory(e.target.value)}
                  className="w-full p-2 border-violet-300 focus:ring-violet-400"
                />
                <Textarea
                  placeholder="Brief Description"
                  value={bookDescription}
                  onChange={(e) => setBookDescription(e.target.value)}
                  className="w-full p-2 border-violet-300 focus:ring-violet-400"
                />

                {/* Upload Area */}
                <div className="flex flex-col items-center">
                  <label className="flex flex-col items-center justify-center w-full p-5 border-2 border-dashed border-violet-400 rounded-xl cursor-pointer hover:bg-violet-50 transition">
                    {!isProcessed ? (
                      <>
                        <Upload className="w-8 h-8 mb-3 text-violet-500" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span>{' '}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-400">
                          PDF, EPUB, MOBI (Max 50MB)
                        </p>

                        <div className="mt-3">
                          <UploadButton
                            endpoint="pdfUploader"
                            onUploadBegin={() => setLoading(true)}
                            onClientUploadComplete={(res) => {
                              if (res && res.length > 0) {
                                toast.success('Initial Processing Complete!', {
                                  position: 'top-center',
                                });
                                setBookLink(res[0].url || res[0].ufsUrl);
                                setUploadedFileName(
                                  res[0].name || 'Uploaded Book'
                                );
                                setUploadedFileSize(res[0].size || 0);
                                setIsProcessed(true);
                                setLoading(false);
                              }
                            }}
                            onUploadError={() => {
                              toast.error('Upload failed!', {
                                position: 'top-center',
                              });
                              setLoading(false);
                            }}
                            appearance={{
                              button:
                                'ut-button:bg-violet-600 ut-button:text-white ut-button:rounded-md',
                            }}
                          />
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Check className="w-8 h-8 mb-2 text-green-500" />
                        <p className="mb-1 text-sm font-medium text-gray-700 truncate max-w-[200px]">
                          {uploadedFileName}
                        </p>
                        <p className="text-xs text-gray-400">
                          {(uploadedFileSize / (1024 * 1024)).toFixed(2)} MB
                        </p>
                        <button
                          type="button"
                          onClick={removeFile}
                          className="flex items-center mt-2 text-xs text-red-500 hover:text-red-700"
                        >
                          <X className="w-3 h-3 mr-1" /> Remove
                        </button>
                      </div>
                    )}
                  </label>
                </div>

                <Button
                  variant={'outline'}
                  onClick={handleUpload}
                  className="w-full hover:bg-purple-200 text-black py-2 rounded-xl transition"
                >
                  Upload Book
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {loading && (
          <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 w-full max-w-xs">
            <div className="bg-white shadow-lg rounded-xl p-4 flex items-center justify-center border border-violet-200">
              <h3 className="text-center text-green-600 font-semibold text-base">
                Book is processing,
                <br /> please wait...
              </h3>
            </div>
          </div>
        )}
      </div>
      <BottomNavBar />
    </>
  );
};

export default UploadBookPage;
