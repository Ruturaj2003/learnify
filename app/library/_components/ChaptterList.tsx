'use client';
import { useState } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';

// Demo data: Array of chapter objects, each with a name and section list
const CHAPTERS = [
  {
    name: 'Chapter 1: Introduction',
    sections: ['What is React?', 'Project Setup', 'JSX Overview'],
  },
  {
    name: 'Chapter 2: Components',
    sections: ['Functional Components', 'Class Components', 'Props & State'],
  },
  {
    name: 'Chapter 3: Hooks',
    sections: ['useState', 'useEffect', 'Custom Hooks'],
  },
  {
    name: 'Chapter 4: Routing',
    sections: ['React Router Basics', 'Nested Routes', 'Navigation'],
  },
];

const MODES = [
  { key: 'read', label: 'Read' },
  { key: 'explain', label: 'Explain' },
  { key: 'quiz', label: 'Quiz' },
];

const ChapterList = () => {
  const [mode, setMode] = useState(MODES[0].key);

  return (
    <section className="max-w-md mx-auto w-full px-2 py-6 flex flex-col gap-4 font-sans">
      {/* Mode Dropdown */}

      <div className="w-full">
        <label className="block text-sm font-medium mb-2 text-indigo-700">
          Mode
        </label>
        <Select value={mode} onValueChange={setMode}>
          <SelectTrigger className="w-full bg-white border rounded-lg py-2 px-3 shadow-sm focus:ring-2 focus:ring-primary text-sm">
            <SelectValue placeholder="Select mode" />
          </SelectTrigger>
          <SelectContent side="bottom" className="z-50 bg-white">
            {MODES.map((m) => (
              <SelectItem key={m.key} value={m.key}>
                {m.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Accordions for Chapters */}
      <Accordion
        type="single"
        collapsible
        className="w-full bg-white/80 rounded-xl shadow p-2 max-w-md mx-auto"
      >
        {CHAPTERS.map((chapter, idx) => (
          <AccordionItem key={chapter.name} value={`item-${idx}`}>
            <AccordionTrigger className="text-base font-semibold text-indigo-700 hover:underline px-2">
              {chapter.name}
            </AccordionTrigger>
            <AccordionContent className="pl-4 pb-2">
              <ul className="space-y-1 text-gray-700 text-sm">
                {chapter.sections.map((sec, sidx) => (
                  <li
                    key={sidx}
                    className="bg-indigo-50 rounded px-3 py-2 my-1 shadow-sm"
                  >
                    {sec}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default ChapterList;
