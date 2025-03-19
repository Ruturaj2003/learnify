'use client';

import Navbar from '@/app/(bussiness)/_components/Navbar';
import ChapterCard from './_components/ChapterCard';
import { useGlobalStore } from '@/stores';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';

const chapters = [
  { number: '1', name: 'Introduction to AI' },
  { number: '2', name: 'Machine Learning Basics' },
  { number: '3', name: 'Deep Learning Concepts' },
  {
    number: '4',
    name: 'Natural Language Processing with Advanced Techniques and Applications in Modern AI Systems',
  },
  { number: '131', name: 'Introduction to AI' },
  { number: '232', name: 'Machine Learning Basics' },
  { number: '343', name: 'Deep Learning Concepts' },
  {
    number: '423465',
    name: 'Natural Language Processing with Advanced Techniques and Applications in Modern AI Systems',
  },
  { number: '1546', name: 'Introduction to AI' },
  { number: '245', name: 'Machine Learning Basics' },
  { number: '36', name: 'Deep Learning Concepts' },
  {
    number: '41',
    name: 'Natural Language Processing with Advanced Techniques and Applications in Modern AI Systems',
  },
];

const BookSectionListPage = () => {
  const mode = useGlobalStore((state) => state.mode);
  const setMode = useGlobalStore((state) => state.setMode);
  return (
    <div className="flex flex-col items-center gap-y-4">
      <Navbar title="Book Name ...." />
      <div className="p-2 border bg-gradient-to-r from-amber-400 to-rose-300 rounded-2xl w-[80%] text-2xl text-center">
        Learning mode:
        {mode}
      </div>

      {/* Learning Mode */}
      <DropdownMenu>
        <DropdownMenuTrigger className="text-2xl p-2 border bg-gradient-to-r from-amber-400 to-rose-300 rounded-2xl w-[80%]  text-center ">
          Learning Mode : {mode}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="">
          <DropdownMenuItem
            onClick={() => setMode('explain')}
            className="text-xl"
          >
            Explain
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setMode('read')} className="text-xl">
            Read
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setMode('quiz')} className="text-xl">
            {' '}
            Quiz
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="p-4 space-y-4 w-full max-w-2xl">
        {chapters.map((chapter) => (
          <ChapterCard
            key={chapter.number} // Use chapter number as key for better performance
            chapterNumber={chapter.number}
            chapterName={chapter.name}
          />
        ))}
      </div>
    </div>
  );
};

export default BookSectionListPage;
