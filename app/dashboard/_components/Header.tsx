'use client';

import { UserButton, useUser } from '@clerk/nextjs';

const Header = () => {
  const { user } = useUser();
  return (
    <header className="flex justify-between items-center mb-6 w-full">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          Hi, {user?.firstName}!
        </h1>
        <p className="text-gray-500 text-sm">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      <UserButton
        appearance={{
          elements: {
            userButtonAvatarBox: {
              width: '48px', // or whatever size you want
              height: '48px',
            },
          },
        }}
      />
    </header>
  );
};

export default Header;
