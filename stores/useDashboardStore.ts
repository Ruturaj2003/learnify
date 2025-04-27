// store/useDashboardStore.ts
import { create } from 'zustand';
import axios from 'axios';

export interface Book {
  id: string;
  title: string;
  category: string;
  description: string;
  progress: number;
  knowledgeScore: number;
  coverColor: string;
  lastAccessed?: Date;
}

interface DashboardStore {
  books: Book[];
  fetchBooks: () => Promise<void>;
  deleteBook: (id: string) => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  books: [],

  fetchBooks: async () => {
    try {
      const response = await axios.get('/api/dashboard'); // ✅ Your backend route
      const fetchedBooks = response.data.map((book: any) => ({
        ...book,
        coverColor: generateRandomColor(),
        lastAccessed: book.lastAccessed
          ? new Date(book.lastAccessed)
          : undefined,
      }));
      set({ books: fetchedBooks });
    } catch (error) {
      console.error('Failed to fetch books:', error);
    }
  },

  deleteBook: (id) =>
    set((state) => ({
      books: state.books.filter((book) => book.id !== id),
    })),
}));

// Helper to generate random hex color
function generateRandomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
