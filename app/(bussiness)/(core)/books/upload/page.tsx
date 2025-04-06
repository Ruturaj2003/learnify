'use client';
import axios from 'axios';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { UploadCloud } from 'lucide-react';
import Navbar from '../../../_components/Navbar';
import { toast } from 'sonner';
import { UploadButton } from './_utils/uploadthing';

const UploadBookPage = () => {
  const [loading, setLoading] = useState(false);
  const [bookName, setBookName] = useState('');
  const [bookLink, setBookLink] = useState('');
  const [bookDescription, setBookDescription] = useState('');
  const [isProcessed, setIsProcessed] = useState(false);

  const handleUpload = async () => {
    if (!isProcessed) {
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

    try {
      const res = await axios.post('/api/uploadBook', {
        title: bookName,
        description: bookDescription,
        fileUrl: bookLink,
      });

      toast.success('Book Uploaded To the Database', {
        position: 'top-center',
        style: {
          color: '#d1ff22',
        },
      });
      console.log(res);
    } catch (err) {
      const error = err as any;
      toast.error(
        'Error Saving Book' + error.response?.data?.error || error.message,
        {
          position: 'top-center',
        }
      );
    }
  };

  return (
    <div className="flex flex-col gap-y-2">
      <Navbar title="Upload Book" />
      <div className="flex items-start justify-center max-h-[650px] bg-gray-100 p-4">
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
              <div className="flex flex-col items-center">
                <label className="flex items-center flex-col justify-center w-full p-4 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition">
                  <UploadCloud
                    className={`w-6 h-6 mr-2 ${
                      isProcessed ? 'text-green-500' : 'text-gray-500'
                    }`}
                  />
                  <span
                    className={`${
                      !isProcessed ? 'text-gray-700' : 'text-green-500'
                    }`}
                  >
                    {isProcessed ? 'Book Processed' : 'Upload Book (PDF)'}
                  </span>
                  {!isProcessed && (
                    <UploadButton
                      className=" text-white w-full bg-white outline-none"
                      endpoint={'pdfUploader'}
                      onUploadBegin={() => {
                        setLoading(true);
                      }}
                      onClientUploadComplete={(res) => {
                        toast.success('Intial Processing Complete' + res, {
                          position: 'top-center',
                        });
                        setIsProcessed(true);
                        // setBookLink(res);
                        setBookLink(res[0].ufsUrl);
                        setLoading(false);
                      }}
                    ></UploadButton>
                  )}
                </label>
              </div>

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
      {loading && (
        <h3 className="text-2xl text-center text-slate-400">
          Book is Processing Please wait
        </h3>
      )}
    </div>
  );
};

export default UploadBookPage;
