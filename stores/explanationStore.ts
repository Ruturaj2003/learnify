import { create } from 'zustand';

type ExplainationState = {
  explaination: string;
  detailLevel: 'short' | 'detailed';
  setExplanation: (text: string) => void;
  setDetailLevel: (level: 'short' | 'detailed') => void;
};

export const useExplanationStore = create<ExplainationState>((set) => ({
  explaination: '',
  detailLevel: 'detailed',
  setExplanation: (text) => set({ explaination: text }),
  setDetailLevel(level) {
    set({ detailLevel: level });
  },
}));
