import { create } from 'zustand';
import axios from 'axios';

type ViewMode = 'simple' | 'detailed';

interface ExplanationState {
  simpleExplanation: string;
  detailedExplanation: string;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  fetchExplanations: (subChapterId: string) => Promise<void>;
}

export const useExplanationStore = create<ExplanationState>((set) => ({
  simpleExplanation: '',
  detailedExplanation: '',
  viewMode: 'simple', // default is simple
  setViewMode: (mode) => set({ viewMode: mode }),
  fetchExplanations: async (subChapterId) => {
    try {
      // Fetch both simple and detailed explanations
      const [simpleRes, detailedRes] = await Promise.all([
        axios.post('/api/explanation', {
          subChapterId,
          explanationType: 'simple',
        }),
        axios.post('/api/explanation', {
          subChapterId,
          explanationType: 'detailed',
        }),
      ]);

      set({
        simpleExplanation: simpleRes.data.explanation,
        detailedExplanation: detailedRes.data.explanation,
      });
    } catch (error) {
      console.error('Failed to fetch explanations:', error);
    }
  },
}));
