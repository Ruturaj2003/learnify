'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { UploadCloud } from 'lucide-react';
import Navbar from '../../../_components/Navbar';
import { toast } from 'sonner';

const UploadBookPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [bookName, setBookName] = useState('');
  const [bookDescription, setBookDescription] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file first', {
        position: 'top-center',
        duration: 3000,
        style: {
          background: '#1e293b',
          color: '#f8fafc',
          borderRadius: '10px',
          padding: '12px',
          fontSize: '16px',
        },
      });
      return;
    }

    const toastId = toast.loading(`Uploading: ${file.name}`, {
      position: 'top-center',
      style: {
        background: '#1e293b',
        color: '#f8fafc',
        borderRadius: '10px',
        padding: '12px',
        fontSize: '16px',
      },
    });

    // Simulate an upload process (2 seconds)
    setTimeout(() => {
      toast.dismiss(toastId);
      toast.success('File uploaded successfully!', {
        position: 'top-center',
        duration: 3000,
        style: {
          background: '#10b981',
          color: '#fff',
          borderRadius: '10px',
          padding: '12px',
          fontSize: '16px',
        },
      });
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-y-2">
      <Navbar title="Upload Book" />
      <div className="flex items-start justify-center min-h-screen bg-gray-100 p-4">
        <Card className="w-full max-w-md p-5 shadow-lg bg-white rounded-2xl">
          <CardContent>
            <motion.h2
              className="text-2xl font-bold text-center mb-4"
              initial={{ opacity: 0, y: -10 }}
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
                className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-500"
              />
              <Textarea
                placeholder="Enter a Brief Description of your Book"
                value={bookDescription}
                onChange={(e) => setBookDescription(e.target.value)}
                className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-500"
              />

              <label className="flex items-center justify-center w-full p-4 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition">
                <UploadCloud className="w-6 h-6 mr-2 text-gray-500" />
                <span className="text-gray-700">
                  {file ? file.name : 'Upload Book (PDF)'}
                </span>
                <Input
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
              <Button
                onClick={handleUpload}
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Upload
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UploadBookPage;
