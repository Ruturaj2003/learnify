'use client';
import { useEffect, useRef, useState } from 'react';
import markdownit from 'markdown-it';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import { useQuizStore } from '@/stores/useQuizStore';
import { FileText, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ScoreSummary from '../_components/ScoreSummary';
import axios from 'axios';
import { useChapterStore } from '@/stores/useChapterStore';
import Spinner from '@/app/_components/Spinner';
const md = new markdownit({
  html: true,
  linkify: true,
  typographer: true,
});
const QuizSummaryPage = () => {
  const navigate = useRouter();
  const hasFetched = useRef(false); // 🛡 Prevent double-fetch
  const { score, questions, isQuizComplete, resetQuiz, reviewData } =
    useQuizStore();
  const [recommendation, setRecommendation] = useState('');
  const [loading, setLoading] = useState(false);
  const { currentSubchapter } = useChapterStore();

  const subId = currentSubchapter.subId;
  const getQuizReview = async () => {
    try {
      setLoading(true);

      // 2. Fetch study recommendations
      const response = await axios.post('/api/quiz/studyRecommendations', {
        reviewData,
      });
      // 1. Update quiz statistics
      const stats = await axios.post('/api/quiz/updateStats', {
        subChapterId: subId,
        correctAnswers: Number(score),
      });
      console.log(stats);

      const markdown = await md.render(response.data.recommendations);
      setRecommendation(markdown);
    } catch (error) {
      console.error('Error fetching detailed review:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (reviewData.length > 0 && !hasFetched.current) {
      hasFetched.current = true;
      setLoading(true);
      getQuizReview();
    }
  }, []);
  const handleReviewQuiz = () => {
    navigate.push('review');
  };

  const handleGoHome = () => {
    resetQuiz();
    navigate.push('/library');
  };

  if (!isQuizComplete) {
    return null;
  }
  if (loading) {
    return <Spinner></Spinner>;
  }

  return (
    <div className="quiz-container">
      <Card className="quiz-card mb-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Quiz Results</h1>

        <ScoreSummary
          score={score}
          totalQuestions={questions.length}
          recommendation={recommendation}
        />

        {/* <h2>{recommendation}</h2> */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <Button
            variant="outline"
            onClick={handleReviewQuiz}
            className="flex items-center justify-center gap-2 py-6"
          >
            <FileText className="h-5 w-5" />
            <span>Detailed Review</span>
          </Button>

          <Button
            onClick={handleGoHome}
            className="flex items-center justify-center gap-2 py-6 bg-quiz-primary hover:bg-quiz-secondary"
          >
            <Home className="h-5 w-5" />
            <span>Go to Home</span>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default QuizSummaryPage;
