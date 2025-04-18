'use client';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Navbar = ({ title }: { title: string }) => {
  const router = useRouter();

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push('/library'); // fallback route
    }
  };

  return (
    <div className="border-b w-full h-16 flex items-center px-4 sm:px-6 bg-white shadow-md">
      <button
        onClick={handleBack}
        aria-label="Go back"
        className="flex items-center p-2 focus:outline-none"
      >
        <ChevronLeft height={24} className="text-blue-500" />
      </button>
      <div className="flex-grow flex justify-center">
        <span className="text-lg font-semibold text-gray-800">{title}</span>
      </div>
    </div>
  );
};

export default Navbar;
