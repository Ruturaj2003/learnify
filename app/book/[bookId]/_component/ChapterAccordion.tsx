'use client';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';

interface ChapterAccordionProps {
  chapters: Chapter[];
}

export type SubChapter = {
  title: string;
  subchapterId: number | string;
};

export type Chapter = {
  title: string;
  chapterId: string | number;
  subChapters: SubChapter[];
};

export default function ChapterAccordion({ chapters }: ChapterAccordionProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto pt-4">
      {chapters.map((chapter, idx) => {
        const open = openIdx === idx;
        return (
          <div
            key={chapter.chapterId}
            className="rounded-2xl shadow-md border border-gray-200 transition-all duration-150 bg-white"
          >
            <button
              className="w-full flex items-center justify-between px-6 py-4 rounded-2xl focus:outline-hidden focus-visible:ring-2 focus-visible:ring-violet-500 hover:bg-violet-50 transition"
              onClick={() => setOpenIdx(open ? null : idx)}
              aria-expanded={open}
              aria-controls={`accordion-content-${idx}`}
            >
              <span className="text-base font-semibold text-gray-800 text-left line-clamp-2">
                {chapter.title}
              </span>
              {open ? (
                <ChevronUp className="text-violet-500" size={20} />
              ) : (
                <ChevronDown className="text-gray-400" size={20} />
              )}
            </button>

            <div
              id={`accordion-content-${idx}`}
              className={`overflow-hidden border-t border-violet-100 rounded-b-2xl transition-all duration-300 ${
                open ? 'max-h-96' : 'max-h-0'
              }`}
              style={{ background: open ? '#faf8ff' : undefined }}
            >
              <ul
                className={`divide-y divide-gray-300 px-6 ${
                  open ? 'py-3' : 'py-0'
                } transition-all duration-75`}
              >
                {open &&
                  chapter.subChapters.map((sub) => (
                    <li key={sub.subchapterId} className="py-2">
                      <Link
                        href={`/subchapter/${sub.subchapterId}`}
                        className="text-sm text-violet-700 hover:underline hover:text-violet-900 transition-colors line-clamp-3"
                      >
                        {sub.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}
