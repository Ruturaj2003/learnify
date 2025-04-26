import { create } from 'zustand';
import axios from 'axios';

export type Chapter = {
  chapterId: number | string;
  title: string;
  subChapters: {
    subchapterId: string;
    title: string;
  }[];
};

type Mode = 'read' | 'quiz' | 'explain';

type CurrentSubchapter = {
  subId: string;
  subchapterName: string;
};

interface ChapterState {
  chapters: Chapter[];
  mode: Mode;
  loading: boolean;
  error: string | null;
  currentSubchapter: CurrentSubchapter;
  fetchChapters: (bookId: string) => Promise<void>;
  setMode: (mode: Mode) => void;
  setCurrentSubchapter: (subchapterId: string, subchapterName: string) => void;
}

export const useChapterStore = create<ChapterState>((set) => ({
  chapters: [],
  mode: 'read',
  loading: false,
  error: null,
  currentSubchapter: {
    subId: '',
    subchapterName: '',
  },

  fetchChapters: async (bookId) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post('/api/chapters', { bookId });
      set({ chapters: response.data, loading: false });
    } catch (error: any) {
      set({
        error: error.message || 'Failed to fetch chapters',
        loading: false,
      });
    }
  },

  setMode: (mode) => set({ mode }),

  setCurrentSubchapter: (subchapterId: string, subchapterName: string) =>
    set({
      currentSubchapter: {
        subId: subchapterId,
        subchapterName: subchapterName,
      },
    }),
}));
