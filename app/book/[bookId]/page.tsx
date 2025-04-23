'use client';
import BottomNavBar from '@/app/_components/BottomNavBar';
import { useState } from 'react';
import ModeSelector from './_component/ModeSelector';
import ChapterAccordion, { Chapter } from './_component/ChapterAccordion';

const CHAPTERS: Chapter[] = [
  {
    title:
      'Introduction to Modern Mobile LearningIntroduction to Modern Mobile LearningIntroduction to Modern Mobile LearningIntroduction to Modern Mobile Learning',
    chapterId: 1,
    subChapters: [
      {
        title:
          'Why Mobile Learning?Why Mobile Learning?Why Mobile Learning?Why Mobile Why Mobile Learning?Why Mobile Learning?Learning?Why Mobile Learning?Why Mobile Learning?Why Mobile Learning?Why Mobile Why Mobile Learning?Why Mobile Learning?Learning?',
        subchapterId: '1-1',
      },
      { title: 'Trends in EdTech', subchapterId: '1-2' },
      { title: 'Mobile-First Design Principles', subchapterId: '1-3' },
    ],
  },
  {
    title: 'Planning Your Mobile Course',
    chapterId: 2,
    subChapters: [
      { title: 'Defining Clear Outcomes', subchapterId: '2-1' },
      { title: 'Mobile Content Strategies', subchapterId: '2-2' },
      { title: 'Chunking for Mobile', subchapterId: '2-3' },
    ],
  },
  {
    title: 'Engaging Mobile Learners',
    chapterId: 3,
    subChapters: [
      { title: 'Gamification and Micro Quizzes', subchapterId: '3-1' },
      { title: 'Push Notifications', subchapterId: '3-2' },
      { title: 'Multimodal Learning', subchapterId: '3-3' },
    ],
  },
  {
    title: 'Best Practices',
    chapterId: 4,
    subChapters: [
      { title: 'Accessibility on Mobile', subchapterId: '4-1' },
      { title: 'Personalization', subchapterId: '4-2' },
      { title: 'Measuring Impact', subchapterId: '4-3' },
    ],
  },
];

const ChapterListPage = () => {
  const [mode, setMode] = useState<'read' | 'quiz' | 'explain'>('read');

  return (
    <>
      <div className="pt-14 pb-14">
        <div className="min-h-screen bg-gray-50 flex flex-col pt-6 gap-2">
          <section className="w-full pb-4">
            <h1 className="text-2xl md:text-3xl font-bold mb-3 text-gray-800">
              Mode-Minded Mobile Learn
            </h1>
            <p className="text-gray-500 text-base md:text-lg px-2 mb-2">
              Choose a mode and select a chapter to get started.
            </p>
            <ModeSelector value={mode} onChange={setMode} />
          </section>

          <main className="flex-1 w-full flex flex-col items-center">
            <ChapterAccordion chapters={CHAPTERS} />
          </main>
        </div>
      </div>
      <BottomNavBar />
    </>
  );
};

export default ChapterListPage;
