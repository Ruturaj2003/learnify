'use client';

import { ChevronLeft } from 'lucide-react';

const Navbar = ({ title }: { title: string }) => {
  return (
    <div className="border-b w-full h-16 flex items-center px-4 sm:px-6 bg-white shadow-md">
      <button
        className="flex items-center p-2 focus:outline-none"
        aria-label="Go back"
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
