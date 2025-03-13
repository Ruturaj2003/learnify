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

const page = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file first', {
        position: 'top-center',
        duration: 3000, // Auto-dismiss after 3s
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

    // Show loading toast and store its ID
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
      toast.dismiss(toastId); // Remove loading toast
      toast.success('File uploaded successfully!', {
        position: 'top-center',
        duration: 3000, // Auto-dismiss success message
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
      <Navbar title="Upload Book"></Navbar>
      <div className="flex items-start justify-center min-h-screen bg-gray-100 p-4 ">
        <Card className="w-full max-w-md p-5 shadow-lg bg-white rounded-2xl">
          <CardContent>
            <motion.h2
              className="text-xl font-bold text-center md-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Upload Your Book
            </motion.h2>

            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Book Name"
                className="w-full p-2 border rounded-lg"
              ></Input>
              <Textarea
                placeholder="Enter a Breif Description of your Book"
                className="w-full p-2 border rounded-lg"
              ></Textarea>

              <label className="flex items-center justify-center w-full p-4 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                <UploadCloud className="w-6 h-6  mr-2 text-gray-500 "></UploadCloud>
                <span className="text-gray-700 ">
                  {file ? file.name : 'Upload Book (PDF)'}
                </span>
                <Input
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={handleFileChange}
                ></Input>
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
export default page;
