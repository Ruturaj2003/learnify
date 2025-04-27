'use client';
import { Avatar } from '@/components/ui/avatar';
import { AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useIsMobile } from './use-mobile';
import { UserButton, useUser } from '@clerk/nextjs';

type HeaderProps = {
  name: string;
  avatarUrl?: string;
};

const Header = ({ name, avatarUrl }: HeaderProps) => {
  const isMobile = useIsMobile();

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
      {/* <Avatar className="h-10 w-10 border-2 border-primary transition-all">
        <AvatarImage src={avatarUrl} alt={name} />
        <AvatarFallback className="bg-primary/10 text-primary">
          {firstName.charAt(0)}
        </AvatarFallback>
      </Avatar> */}
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
