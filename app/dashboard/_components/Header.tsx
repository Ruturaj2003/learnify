import { Avatar } from '@/components/ui/avatar';
import { AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useIsMobile } from './use-mobile';

type HeaderProps = {
  name: string;
  avatarUrl?: string;
};

const Header = ({ name, avatarUrl }: HeaderProps) => {
  const isMobile = useIsMobile();
  const firstName = name.split(' ')[0];

  return (
    <header className="flex justify-between items-center mb-6 w-full">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          Hi, {firstName}!
        </h1>
        <p className="text-gray-500 text-sm">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>
      <Avatar className="h-10 w-10 border-2 border-primary transition-all">
        <AvatarImage src={avatarUrl} alt={name} />
        <AvatarFallback className="bg-primary/10 text-primary">
          {firstName.charAt(0)}
        </AvatarFallback>
      </Avatar>
    </header>
  );
};

export default Header;
