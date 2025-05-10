import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'sonner';
export type Chapter = {
  chapterId: number | string;
  title: string;
  subChapters: {
    subchapterId: string;
    title: string;
    completed: boolean;
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
  toggleSubchapterCompleted: (subchapterId: string) => Promise<void>;
}

export const useChapterStore = create<ChapterState>((set, get) => ({
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
  toggleSubchapterCompleted: async (subchapterId) => {
    try {
      const res = await axios.patch('/api/toggle-completed', {
        subchapterId,
      });

      const { completed } = res.data;

      // Update local state
      const updatedChapters = get().chapters.map((chapter) => ({
        ...chapter,
        subChapters: chapter.subChapters.map((sub) =>
          sub.subchapterId === subchapterId ? { ...sub, completed } : sub
        ),
      }));

      set({ chapters: updatedChapters });

      toast.success(
        completed ? 'Subchapter marked as completed ✅' : 'Marked as incomplete'
      );
    } catch (error: any) {
      const message =
        error.response?.data?.error || 'Failed to update completion status';
      toast.error(message);
      set({ error: message });
    }
  },
}));
