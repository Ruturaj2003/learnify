import { create } from 'zustand';

type Book = {
  id: string;
  title: string;
  description: string;
  category: string;
};

type BookStore = {
  books: Book[];
  loading: boolean;
  fetchBooks: () => Promise<void>;
};

export const useBookStore = create<BookStore>((set) => ({
  books: [],
  loading: false,
  fetchBooks: async () => {
    set({ loading: true });
    try {
      const res = await fetch('/api/books');
      const data = await res.json();
      if (res.ok) {
        set({ books: data.data });
      } else {
        console.error('Failed to fetch books:', data.message);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      set({ loading: false });
    }
  },
}));
