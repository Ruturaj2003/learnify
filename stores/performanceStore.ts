import { create } from 'zustand';

type PerformanceData = {
  sectionId: string;
  score: number;
  attempts: number;
};

type PerformanceState = {
  performanceData: PerformanceData[];
  addPerformance: (data: PerformanceData) => void;
  updatePerformance: (sectionId: string, score: number) => void;
};

export const usePerformanceStore = create<PerformanceState>((set) => ({
  performanceData: [],

  addPerformance: (data) => {
    set((state) => ({
      performanceData: [...state.performanceData, data],
    }));
  },

  updatePerformance: (sectionId, score) => {
    set((state) => ({
      performanceData: state.performanceData.map((p) =>
        p.sectionId === sectionId
          ? { ...p, score, attempts: p.attempts + 1 }
          : p
      ),
    }));
  },
}));
