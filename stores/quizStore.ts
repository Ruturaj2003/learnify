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

  setQuestions: (questions: Question[]) => void;
  submitAnswer: (question: string, answer: string) => void;
  calculateScore: () => void;

  nextQuestion: () => void;
  prevQuestion: () => void;
  resetQuiz: () => void;
};

export const useQuizStore = create<QuizState>((set, get) => ({
  questions: [],
  answers: {},
  score: 0,
  currentQuestionIndex: 0,

  // Sets questions and resets the quiz
  setQuestions: (questions) =>
    set({
      questions,
      currentQuestionIndex: 0,
      answers: {},
      score: 0,
    }),

  // Stores the selected answer
  submitAnswer: (question, answer) => {
    set((state) => ({
      answers: {
        ...state.answers,
        [question]: answer,
      },
    }));
  },

  // Calculates final score based on correct answers
  calculateScore: () => {
    const { questions, answers } = get();
    const score = questions.reduce((total, q) => {
      return answers[q.question] === q.correctAnswer ? total + 1 : total;
    }, 0);
    set({ score });
  },

  // Go to next question
  nextQuestion: () => {
    const { currentQuestionIndex, questions } = get();
    if (currentQuestionIndex < questions.length - 1) {
      set({ currentQuestionIndex: currentQuestionIndex + 1 });
    }
  },

  // Go to previous question
  prevQuestion: () => {
    const { currentQuestionIndex } = get();
    if (currentQuestionIndex > 0) {
      set({ currentQuestionIndex: currentQuestionIndex - 1 });
    }
  },

  // Reset the quiz to start over
  resetQuiz: () => {
    set({
      currentQuestionIndex: 0,
      answers: {},
      score: 0,
    });
  },
}));
