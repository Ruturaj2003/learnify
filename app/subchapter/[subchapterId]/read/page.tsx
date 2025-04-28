'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/app/_components/Navbar';
import { useChapterStore } from '@/stores/useChapterStore';
import BottomNavBar from '@/app/_components/BottomNavBar';

const ExplainPage = () => {
  const { currentSubchapter } = useChapterStore();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  // Use effect to fetch the PDF when the component mounts
  useEffect(() => {
    if (!currentSubchapter?.subId) return;

    const fetchPdf = async () => {
      try {
        const response = await fetch('/api/read', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ subChapterId: currentSubchapter.subId }), // Only send the ID
        });

        if (!response.ok) {
          throw new Error('Failed to fetch PDF');
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      } catch (error) {
        console.error(error);
        alert('Error loading PDF');
      }
    };

    fetchPdf();
  }, [currentSubchapter]); // Only run when currentSubchapter changes

  const handleDownloadPdf = () => {
    if (!pdfUrl) return;

    const a = document.createElement('a');
    a.href = pdfUrl;
    a.download = 'subchapter.pdf'; // Set the download file name
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center p-4">
        <div className="w-full max-w-3xl mt-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl md:text-3xl font-semibold text-gray-800">
              {currentSubchapter.subchapterName}
            </h1>
            {pdfUrl && (
              <button
                onClick={handleDownloadPdf}
                className="p-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition mt-2 md:mt-0"
              >
                Download PDF
              </button>
            )}
          </div>

          {pdfUrl ? (
            <iframe
              src={pdfUrl}
              width="100%"
              height="500px"
              className="border border-gray-300 shadow-md rounded-lg"
            />
          ) : (
            <div className="text-center mt-4 text-gray-500">Loading PDF...</div>
          )}
        </div>
      </div>
      <BottomNavBar />
    </>
  );
};

export default ExplainPage;
