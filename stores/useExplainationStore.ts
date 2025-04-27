// store.ts
import { create } from 'zustand';
import axios from 'axios';
import { marked } from 'marked';
type ViewMode = 'simple' | 'detailed';

interface ExplanationState {
  simpleExplanation: string;
  detailedExplanation: string;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  fetchExplanations: (subChapterId: string) => Promise<void>;

  // For Parsing or it will look very shabby :
  simpleExplanationHtml: string;
  detailedExplanationHtml: string;
}

export const useExplanationStore = create<ExplanationState>((set) => ({
  simpleExplanation: '',
  detailedExplanation: '',
  simpleExplanationHtml: '',
  detailedExplanationHtml: '',
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
      const simpleHtml = await marked(simpleRes.data.explanation);
      const detailedHtml = await marked(detailedRes.data.explanation);
      set({
        simpleExplanation: simpleRes.data.explanation,
        detailedExplanation: detailedRes.data.explanation,
        simpleExplanationHtml: simpleHtml,
        detailedExplanationHtml: detailedHtml,
      });
    } catch (error) {
      console.error('Failed to fetch explanations:', error);
    }
  },
}));
