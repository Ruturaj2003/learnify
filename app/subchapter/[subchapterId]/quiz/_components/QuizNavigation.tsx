import { Button } from '@/components/ui/button';
import { useQuizStore } from '@/stores/useQuizStore';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface QuizNavigationProps {
  onComplete?: () => void;
}

const QuizNavigation = ({ onComplete }: QuizNavigationProps) => {
  const {
    currentQuestionIndex,
    questions,
    nextQuestion,
    previousQuestion,
    answers,
    finishQuiz,
  } = useQuizStore();

  const currentQuestionId = questions[currentQuestionIndex]?.id;
  const hasAnswered = answers.some(
    (answer) => answer.questionId === currentQuestionId
  );
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleNext = () => {
    if (isLastQuestion) {
      finishQuiz();
      if (onComplete) {
        onComplete();
      }
    } else {
      nextQuestion();
    }
  };

  return (
    <div className="flex justify-between mt-6">
      <Button
        variant="outline"
        onClick={previousQuestion}
        disabled={currentQuestionIndex === 0}
        className="flex items-center gap-1"
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="hidden sm:inline">Previous</span>
      </Button>

      <Button
        onClick={handleNext}
        disabled={!hasAnswered}
        className="bg-quiz-primary hover:bg-quiz-secondary flex items-center gap-1"
      >
        {isLastQuestion ? (
          'Finish'
        ) : (
          <>
            <span className="hidden sm:inline">Next</span>
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  );
};

export default QuizNavigation;
