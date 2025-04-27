// @ts-nocheck

import { Button } from '@/components/ui/button';
import React from 'react';
import Link from 'next/link';
import { SignInButton, UserButton } from '@clerk/nextjs';

const Navbar = () => {
  return (
    <header
      className="sticky top-0 z-50 w-full border-b bg-gradient-to-r
    from-violet-100 to-purple-100
    backdrop-blur-md"
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/library" className="flex items-center">
            <span className="text-xl font-bold text-violet-800">Learnify</span>
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

          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: {
                  width: '28px', // or whatever size you want
                  height: '28px',
                },
              },
            }}
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
