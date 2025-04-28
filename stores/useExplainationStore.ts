'use-client';

// store.ts
import { create } from 'zustand';
import axios from 'axios';
import { marked } from 'marked';
type ViewMode = 'simple' | 'detailed';

interface ExplanationState {
  simpleExplanation: string;
  detailedExplanation: string;
  simpleExplanationHtml: string;
  detailedExplanationHtml: string;
  viewMode: ViewMode;
  currentSubChapterId: string | null; // Keep track of the currently fetched subChapterId
  loadingExplaination: boolean;
  setViewMode: (mode: ViewMode) => void;
  fetchExplanations: (subChapterId: string) => Promise<void>;
}

export const useExplanationStore = create<ExplanationState>((set, get) => ({
  simpleExplanation: '',
  detailedExplanation: '',
  simpleExplanationHtml: '',
  detailedExplanationHtml: '',
  viewMode: 'simple', // default is simple
  loadingExplaination: false,

  currentSubChapterId: null, // Initialize as null since no subChapter is fetched initially
  setViewMode: (mode) => set({ viewMode: mode }),

  fetchExplanations: async (subChapterId) => {
    try {
      // Access the current store state using `get()`
      const { currentSubChapterId } = get();

      // Set loading state to true before starting the fetch

      // Check if the subChapterId is the same as the current one
      if (currentSubChapterId === subChapterId) {
        console.log(
          'Explanations already fetched for this subChapterId, skipping fetch.'
        );
        return; // Skip fetching if the subChapterId is the same
      }

      set({ loadingExplaination: true });

      // Clear previous explanations if the subChapterId is different
      set({
        simpleExplanation: '',
        detailedExplanation: '',
        simpleExplanationHtml: '',
        detailedExplanationHtml: '',
        currentSubChapterId: subChapterId, // Update the current subChapterId
      });

      // Fetch the simple explanation immediately
      const simpleRes = await axios.post('/api/explanation', {
        subChapterId,
        explanationType: 'simple',
      });

      // Wait for 32 seconds before fetching the detailed explanation
      await new Promise((resolve) => setTimeout(resolve, 32000)); // 32 seconds delay

      // Fetch the detailed explanation after the delay
      const detailedRes = await axios.post('/api/explanation', {
        subChapterId,
        explanationType: 'detailed',
      });

      // Convert both explanations to HTML using marked
      const simpleHtml = await marked(simpleRes.data.explanation);
      const detailedHtml = await marked(detailedRes.data.explanation);

      // Set the state with the fetched explanations
      set({
        simpleExplanation: simpleRes.data.explanation,
        detailedExplanation: detailedRes.data.explanation,
        simpleExplanationHtml: simpleHtml,
        detailedExplanationHtml: detailedHtml,
      });
      set({ loadingExplaination: false });
    } catch (error) {
      console.error('Failed to fetch explanations:', error);
    }
  },
}));
