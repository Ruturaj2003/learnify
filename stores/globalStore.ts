import { create } from 'zustand';

type Mode = 'read' | 'quiz' | 'explain';

type GlobalState = {
  currentSection: string | null;
  mode: Mode;
  setMode: (mode: Mode) => void;
  setCurrentSection: (section: string) => void;
};

export const useGlobalStore = create<GlobalState>((set) => ({
  currentSection: null,
  mode: 'read',
  setMode: (mode) => set({ mode }),
  setCurrentSection: (section) => set({ currentSection: section }),
}));
