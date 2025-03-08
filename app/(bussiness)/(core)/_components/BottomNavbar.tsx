'use client';

import { Library, LayoutDashboard, Upload } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const BottomNavbar = () => {
  const path = usePathname();

  const navItems = [
    {
      href: '/library',
      label: 'Library',
      icon: <Library className="w-6 h-6" />,
    },
    {
      href: '/books/upload',
      label: 'Upload',
      icon: <Upload className="w-6 h-6" />,
    },
    {
      href: '/dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-6 h-6" />,
    },
  ];

  return (
    <nav className="fixed bottom-0 w-full pt-1">
      <div className="h-16 w-full rounded-t-md bg-white flex justify-evenly items-center shadow-md ">
        {navItems.map(({ href, label, icon }) => (
          <Link
            key={href}
            href={href}
            aria-label={label}
            className="flex flex-col items-center"
          >
            <div
              className={`transition duration-300 ${
                path === href ? 'text-blue-500' : 'text-gray-500'
              }`}
            >
              {icon}
            </div>
            <span
              className={`text-sm ${
                path === href ? 'text-blue-500' : 'text-gray-500'
              }`}
            >
              {label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavbar;
