import { create } from 'zustand';
import { BookStats } from '../app/bookStats/_data/mockData';

interface BookState {
  // Current state
  bookData: BookStats | null;
  expandedChapter: string | null;
  loading: boolean;

  // Actions
  setBookData: (data: BookStats) => void;
  toggleChapter: (chapterId: string) => void;
  formatTime: (minutes: number) => string;
  loadBookData: () => Promise<void>;
}

export const useBookStatsStore = create<BookState>((set, get) => ({
  // Initial state
  bookData: null,
  expandedChapter: null,
  loading: false,

  // Actions
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

  loadBookData: async () => {
    set({ loading: true });
    try {
      // Simulating API call with the imported data
      // In a real app, we would fetch from an API
      const { bookData } = await import('../app/bookStats/_data/mockData');
      set({ bookData, loading: false });
    } catch (error) {
      console.error('Failed to load book data:', error);
      set({ loading: false });
    }
  },
}));
