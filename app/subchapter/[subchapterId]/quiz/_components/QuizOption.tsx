import { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuizOptionProps {
  id: string;
  text: string;
  selected: boolean;
  showResult?: boolean;
  isCorrect?: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const QuizOption = ({
  id,
  text,
  selected,
  showResult = false,
  isCorrect = false,
  onClick,
  disabled = false,
}: QuizOptionProps) => {
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  const getOptionClass = () => {
    if (!showResult) {
      return selected ? 'option-selected' : '';
    }

    if (selected) {
      return isCorrect ? 'option-correct' : 'option-incorrect';
    }

    return isCorrect ? 'option-correct' : '';
  };

  return (
    <button
      className={cn(
        'option-button opacity-0 min-h-[60px] text-left py-4 px-5',
        getOptionClass(),
        animateIn && 'animate-slide-in'
      )}
      style={{
        animationDelay: `${parseInt(id.split('_')[1].slice(1)) * 100}ms`,
      }}
      onClick={onClick}
      disabled={disabled}
    >
      <div className="flex-1 text-base leading-relaxed">{text}</div>

      {showResult && (
        <div className="ml-3 shrink-0">
          {isCorrect ? (
            <Check className="h-5 w-5 text-quiz-success" />
          ) : selected ? (
            <X className="h-5 w-5 text-quiz-error" />
          ) : null}
        </div>
      )}
    </button>
  );
};

export default QuizOption;
