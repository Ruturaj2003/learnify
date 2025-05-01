//@ts-nocheck
import { create } from 'zustand';
import axios from 'axios';

// --- Types ---
export type QuizOption = {
  id: string;
  text: string;
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: QuizOption[];
  correctOptionId: string;
};

export type QuizAnswer = {
  questionId: string;
  selectedOptionId: string;
};

type QuizStore = {
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  answers: QuizAnswer[];
  score: number;
  isQuizComplete: boolean;
  loading: boolean;
  error: string | null;
  startQuiz: (subChapterId: string) => Promise<void>;
  selectAnswer: (questionId: string, optionId: string) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  finishQuiz: () => void;
  resetQuiz: () => void;
  calculateScore: () => number;
  getQuestionResult: (
    questionId: string
  ) => 'correct' | 'incorrect' | 'unanswered';
};

// --- Store ---
export const useQuizStore = create<QuizStore>((set, get) => ({
  questions: [],
  currentQuestionIndex: -1,
  answers: [],
  score: 0,
  isQuizComplete: false,
  loading: false,
  error: null,

  startQuiz: async (subChapterId: string) => {
    set({ loading: true, error: null });

    try {
      console.log('Fetching Quiz...');
      const response = await axios.post('/api/quiz', { subChapterId });
      console.log(response.data);

      set({
        questions: response.data.quiz,
        currentQuestionIndex: 0,
        answers: [],
        score: 0,
        isQuizComplete: false,
        loading: false,
      });
    } catch (error: any) {
      console.error('Error starting quiz:', error);
      set({
        error: error.message || 'Failed to start quiz',
        loading: false,
      });
    }
  },

  selectAnswer: (questionId, optionId) => {
    set((state) => {
      const newAnswers = [...state.answers];
      const existingAnswerIndex = newAnswers.findIndex(
        (a) => a.questionId === questionId
      );

      if (existingAnswerIndex >= 0) {
        newAnswers[existingAnswerIndex] = {
          questionId,
          selectedOptionId: optionId,
        };
      } else {
        newAnswers.push({ questionId, selectedOptionId: optionId });
      }

      return { answers: newAnswers };
    });
  },

  nextQuestion: () =>
    set((state) => ({
      currentQuestionIndex:
        state.currentQuestionIndex < state.questions.length - 1
          ? state.currentQuestionIndex + 1
          : state.currentQuestionIndex,
    })),

  previousQuestion: () =>
    set((state) => ({
      currentQuestionIndex:
        state.currentQuestionIndex > 0
          ? state.currentQuestionIndex - 1
          : state.currentQuestionIndex,
    })),

  finishQuiz: () => {
    const score = get().calculateScore();
    set({ score, isQuizComplete: true });
  },

  resetQuiz: () =>
    set({
      currentQuestionIndex: -1,
      answers: [],
      score: 0,
      isQuizComplete: false,
      questions: [],
      loading: false,
      error: null,
    }),

  calculateScore: () => {
    const state = get();
    let correctAnswers = 0;

    state.answers.forEach((answer) => {
      const question = state.questions.find((q) => q.id === answer.questionId);
      if (question && question.correctOptionId === answer.selectedOptionId) {
        correctAnswers++;
      }
    });

    return correctAnswers;
  },

  getQuestionResult: (questionId) => {
    const state = get();
    const answer = state.answers.find((a) => a.questionId === questionId);
    if (!answer) return 'unanswered';

    const question = state.questions.find((q) => q.id === questionId);
    if (!question) return 'unanswered';

    return question.correctOptionId === answer.selectedOptionId
      ? 'correct'
      : 'incorrect';
  },
}));
