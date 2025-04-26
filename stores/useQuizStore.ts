import { create } from 'zustand';

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
  selectAnswer: (questionId: string, optionId: string) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  finishQuiz: () => void;
  resetQuiz: () => void;
  startQuiz: () => void;
  calculateScore: () => number;
  getQuestionResult: (
    questionId: string
  ) => 'correct' | 'incorrect' | 'unanswered';
};

const sampleQuizData: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'What is the capital of France?',
    options: [
      { id: 'q1_a', text: 'London' },
      { id: 'q1_b', text: 'Paris' },
      { id: 'q1_c', text: 'Berlin' },
      { id: 'q1_d', text: 'Madrid' },
    ],
    correctOptionId: 'q1_b',
  },
  {
    id: 'q2',
    question: 'Which planet is closest to the sun?',
    options: [
      { id: 'q2_a', text: 'Earth' },
      { id: 'q2_b', text: 'Venus' },
      { id: 'q2_c', text: 'Mercury' },
      { id: 'q2_d', text: 'Mars' },
    ],
    correctOptionId: 'q2_c',
  },
  {
    id: 'q3',
    question: 'What is the largest ocean on Earth?',
    options: [
      { id: 'q3_a', text: 'Atlantic Ocean' },
      { id: 'q3_b', text: 'Indian Ocean' },
      { id: 'q3_c', text: 'Arctic Ocean' },
      { id: 'q3_d', text: 'Pacific Ocean' },
    ],
    correctOptionId: 'q3_d',
  },
  {
    id: 'q4',
    question: 'Which of these is not a programming language?',
    options: [
      { id: 'q4_a', text: 'Python' },
      { id: 'q4_b', text: 'Java' },
      { id: 'q4_c', text: 'HTML' },
      { id: 'q4_d', text: 'Cobra' },
    ],
    correctOptionId: 'q4_d',
  },
  {
    id: 'q5',
    question: 'What year was the first iPhone released?',
    options: [
      { id: 'q5_a', text: '2005' },
      { id: 'q5_b', text: '2007' },
      { id: 'q5_c', text: '2009' },
      { id: 'q5_d', text: '2010' },
    ],
    correctOptionId: 'q5_b',
  },
];

export const useQuizStore = create<QuizStore>((set, get) => ({
  questions: sampleQuizData,
  currentQuestionIndex: -1,
  answers: [],
  score: 0,
  isQuizComplete: false,

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
    }),

  startQuiz: () =>
    set({
      currentQuestionIndex: 0,
      answers: [],
      score: 0,
      isQuizComplete: false,
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
