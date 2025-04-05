import { create } from 'zustand';

type ExplanationState = {
  explanation: string;
  detailLevel: 'short' | 'detailed';
  pages: string[];
  currentPage: number;

  setExplanation: (text: string) => void;
  setDetailLevel: (level: 'short' | 'detailed') => void;
  splitIntoPages: () => void;
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (page: number) => void;
};

function splitTextForMobile(text: string, wordsPerPage = 80): string[] {
  const words = text.split(/\s+/);
  const chunks = [];

  for (let i = 0; i < words.length; i += wordsPerPage) {
    chunks.push(words.slice(i, i + wordsPerPage).join(' '));
  }

  return chunks;
}

export const useExplanationStore = create<ExplanationState>((set, get) => ({
  explanation: '',
  detailLevel: 'detailed',
  pages: [],
  currentPage: 0,

  setExplanation: (text) => {
    const chunks = splitTextForMobile(text);
    set({ explanation: text, pages: chunks, currentPage: 0 });
  },

  setDetailLevel: (level) => set({ detailLevel: level }),

  splitIntoPages: () => {
    const chunks = splitTextForMobile(get().explanation);
    set({ pages: chunks, currentPage: 0 });
  },

  nextPage: () => {
    const { currentPage, pages } = get();
    if (currentPage < pages.length - 1) {
      set({ currentPage: currentPage + 1 });
    }
  },

  prevPage: () => {
    const { currentPage } = get();
    if (currentPage > 0) {
      set({ currentPage: currentPage - 1 });
    }
  },

  goToPage: (page) => {
    const { pages } = get();
    if (page >= 0 && page < pages.length) {
      set({ currentPage: page });
    }
  },
}));
