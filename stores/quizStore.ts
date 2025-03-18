import { create } from 'zustand';

type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
};

type QuizState = {
  questions: Question[];
  answers: Record<string, string>;
  score: number;
  setQuestions: (questions: Question[]) => void;
  submitAnswer: (question: string, answer: string) => void;
  calculateScore: () => void;
};

export const useQuizStore = create<QuizState>((set, get) => ({
  questions: [],
  answers: {},
  score: 0,
  setQuestions: (questions) => set({ questions }),
  submitAnswer(question, answer) {
    set((state) => ({ answers: { ...state.answers, [question]: answer } }));
  },
  calculateScore() {
    const { questions, answers } = get();
    const score = questions.reduce(
      (acc, q) => (answers[q.question] === q.correctAnswer ? acc + 1 : acc),
      0
    );
    set({ score });
  },
}));
