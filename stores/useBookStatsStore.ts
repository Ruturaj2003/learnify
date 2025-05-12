import { create } from 'zustand';
import axios from 'axios';

interface SubChapter {
  id: string;
  title: string;
  completed: boolean;
  timeSpent: number; // in minutes
  quizScore: number; // percentage
  quizAttempts: number;
}

interface Chapter {
  id: string;
  title: string;
  progress: number; // percentage
  quizAverage: number; // percentage
  subChapters: SubChapter[];
}
interface BookStats {
  bookName: string;
  description: string;
  overallProgress: number; // percentage
  knowledgeScore: number; // percentage
  totalTimeSpent: number; // in minutes
  chaptersCompleted: number;
  totalChapters: number;
  totalQuizAttempts: number;
  averageQuizScore: number; // percentage
  chapters: Chapter[];
}

interface BookState {
  bookData: BookStats | null;
  expandedChapter: string | null;
  loading: boolean;

  setBookData: (data: BookStats) => void;
  toggleChapter: (chapterId: string) => void;
  formatTime: (minutes: number) => string;
  loadBookData: (bookId: string) => Promise<void>;
}

export const useBookStatsStore = create<BookState>((set, get) => ({
  bookData: null,
  expandedChapter: null,
  loading: false,

  setBookData: (data) => set({ bookData: data }),

  toggleChapter: (chapterId) =>
    set((state) => ({
      expandedChapter: state.expandedChapter === chapterId ? null : chapterId,
    })),

  formatTime: (minutes) => {
    if (minutes === 0) return 'Not started';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins}m`;
    return `${hours}h ${mins}m`;
  },

  loadBookData: async (bookId: string) => {
    set({ loading: true });
    try {
      const response = await axios.post('/api/bookStats', { bookId });
      const data: BookStats = response.data;
      set({ bookData: data, loading: false });
    } catch (error) {
      console.error('Error fetching book stats:', error);
      set({ loading: false });
    }
  },
}));
