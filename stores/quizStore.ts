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
  currentQuestionIndex: number;
  resultSummary: string;
  resultRecommendation: string;

  setQuestions: (questions: Question[]) => void;
  submitAnswer: (question: string, answer: string) => void;
  calculateScore: () => void;

  nextQuestion: () => void;
  prevQuestion: () => void;
  resetQuiz: () => void;

  fetchResultSummary: () => Promise<void>;
  fetchResultRecommendation: () => Promise<void>;
};

export const useQuizStore = create<QuizState>((set, get) => ({
  questions: [],
  answers: {},
  score: 0,
  currentQuestionIndex: 0,
  resultSummary: '',
  resultRecommendation: '',

  setQuestions: (questions) =>
    set({
      questions,
      currentQuestionIndex: 0,
      answers: {},
      score: 0,
      resultSummary: '',
      resultRecommendation: '',
    }),

  submitAnswer: (question, answer) => {
    set((state) => ({
      answers: {
        ...state.answers,
        [question]: answer,
      },
    }));
  },

  calculateScore: () => {
    const { questions, answers } = get();
    const score = questions.reduce((total, q) => {
      return answers[q.question] === q.correctAnswer ? total + 1 : total;
    }, 0);
    set({ score });
  },

  nextQuestion: () => {
    const { currentQuestionIndex, questions } = get();
    if (currentQuestionIndex < questions.length - 1) {
      set({ currentQuestionIndex: currentQuestionIndex + 1 });
    }
  },

  prevQuestion: () => {
    const { currentQuestionIndex } = get();
    if (currentQuestionIndex > 0) {
      set({ currentQuestionIndex: currentQuestionIndex - 1 });
    }
  },

  resetQuiz: () => {
    set({
      currentQuestionIndex: 0,
      answers: {},
      score: 0,
      resultSummary: '',
      resultRecommendation: '',
    });
  },

  fetchResultSummary: async () => {
    const { questions, answers } = get();

    try {
      const res = await fetch('/api/quiz/summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ questions, answers }),
      });

      const data = await res.json();
      set({ resultSummary: data.summary || '' });
    } catch (err) {
      console.error('Failed to fetch summary:', err);
    }
  },

  fetchResultRecommendation: async () => {
    const { questions, answers } = get();

    try {
      const res = await fetch('/api/quiz/recommendation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ questions, answers }),
      });

      const data = await res.json();
      set({ resultRecommendation: data.recommendation || '' });
    } catch (err) {
      console.error('Failed to fetch recommendation:', err);
    }
  },
}));
