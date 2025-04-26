'use client';
import axios from 'axios';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, SignUpButton, SignInButton } from '@clerk/nextjs';
const LandingPage = () => {
  const { isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const registerUser = async () => {
      if (!user) return;
      try {
        await axios.post('/api/user');
        console.log('User Added to DB');
      } catch (err) {
        console.log(err);
      }
    };

    if (isSignedIn) {
      registerUser();
      router.push('/dashboard'); // redirect to dashboard if logged in
    }
  }, [isSignedIn, user, router]);

  if (isSignedIn) return null; // avoid flicker while redirecting
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="flex items-center justify-between px-4 py-3 shadow bg-white">
        {/* Logo */}
        <img src="logo.png" alt="Logo" className="h-8 w-auto object-contain" />

        {/* Buttons */}
        <div className="flex items-center space-x-2">
          <SignUpButton mode="modal">
            <button className="px-3 py-1 text-sm border border-gray-300 rounded-full hover:bg-gray-100">
              Sign Up
            </button>
          </SignUpButton>

          <SignInButton mode="modal">
            <button className="px-3 py-1 text-sm bg-black text-white rounded-full hover:bg-gray-800">
              Login
            </button>
          </SignInButton>
        </div>
      </nav>

      {/* Page Content */}
    </div>
  );
};
export default LandingPage;
