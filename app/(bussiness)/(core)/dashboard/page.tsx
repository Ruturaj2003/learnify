'use client';

import { useState } from 'react';
import Navbar from '../../_components/Navbar';
import { Button } from '@/components/ui/button';

interface Book {
  title: string;
  progress: number;
  knowledgeScore: number;
}

const DashboardPage = () => {
  const [books, setBooks] = useState<Book[]>([
    {
      title: 'Learnify: Dynamic Learning System',
      progress: 75,
      knowledgeScore: 85,
    },
    {
      title: 'Understanding AI and Machine Learning',
      progress: 50,
      knowledgeScore: 70,
    },
    {
      title: 'Web Development with Next.js',
      progress: 30,
      knowledgeScore: 60,
    },
  ]);

  const [currentBookIndex, setCurrentBookIndex] = useState(0);
  const currentBook = books[currentBookIndex];

  const removeBook = (index: number) => {
    setBooks((prevBooks) => prevBooks.filter((_, i) => i !== index));
    if (currentBookIndex === index) {
      setCurrentBookIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 mb-16">
      <Navbar title="Dashboard" />
      <main className="max-w-5xl mx-auto p-4 sm:p-6">
        {/* Current Book Section */}
        <CurrentBookSection book={currentBook} />

        {/* Recommendations Section */}
        <RecommendationsSection />

        {/* My Books Section */}
        <MyBooksSection
          books={books}
          onView={setCurrentBookIndex}
          onRemove={removeBook}
        />

        {/* Quizzes Section */}
        <QuizzesSection />
      </main>
    </div>
  );
};

const CurrentBookSection = ({ book }: { book: Book }) => (
  <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Current Book</h2>
    <p className="text-xl text-gray-900 mb-4">{book.title}</p>
    <ProgressBar progress={book.progress} />
    <KnowledgeScore score={book.knowledgeScore} />
  </section>
);

const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="mb-4">
    <h3 className="text-lg font-medium text-gray-700">Progress: {progress}%</h3>
    <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
      <div
        className="bg-blue-600 h-3 rounded-full"
        style={{ width: `${progress}%` }}
      />
    </div>
  </div>
);

const KnowledgeScore = ({ score }: { score: number }) => (
  <div>
    <h3 className="text-lg font-medium text-gray-700">
      Knowledge Score: {score}/100
    </h3>
  </div>
);

const RecommendationsSection = () => (
  <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
      Recommendations
    </h2>
    <ul className="list-disc list-inside text-gray-800">
      <li className="mb-2">Review Section 3</li>
      <li className="mb-2">Explore Chapter 5</li>
      <li>Revisit Quiz 2</li>
    </ul>
  </section>
);

const MyBooksSection = ({
  books,
  onView,
  onRemove,
}: {
  books: Book[];
  onView: (index: number) => void;
  onRemove: (index: number) => void;
}) => (
  <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Books</h2>
    <ul className="divide-y divide-gray-200">
      {books.map((book, index) => (
        <li key={index} className="py-2 flex justify-between items-center">
          <span className="text-gray-800">{book.title}</span>
          <div className="flex items-center">
            <Button onClick={() => onView(index)} className="text-sm mr-2">
              Stats
            </Button>
            <Button
              onClick={() => onRemove(index)}
              className="text-sm text-red-600"
            >
              Remove
            </Button>
          </div>
        </li>
      ))}
    </ul>
  </section>
);

const QuizzesSection = () => (
  <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quizzes</h2>
    <div className="flex flex-col sm:flex-row gap-4">
      <Button className="flex-1">Take Quiz</Button>
      <Button className="flex-1">Quiz History</Button>
    </div>
  </section>
);

export default DashboardPage;
