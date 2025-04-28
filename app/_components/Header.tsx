import { Button } from '@/components/ui/button';
import React from 'react';
import Link from 'next/link';
import { SignInButton } from '@clerk/nextjs';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-purple-600">Learnify</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <nav className="hidden gap-6 md:flex">
            <Link
              href="#features"
              className="text-sm font-medium text-gray-700 transition-colors hover:text-purple-600"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-gray-700 transition-colors hover:text-purple-600"
            >
              How It Works
            </Link>
          </nav>

          <SignInButton>
            <Button className="bg-purple-600 text-white hover:bg-purple-700">
              Get Started
            </Button>
          </SignInButton>
        </div>
      </div>
    </header>
  );
};

export default Header;
