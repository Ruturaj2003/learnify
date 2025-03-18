import { create } from 'zustand';

type Section = {
  id: string;
  title: string;
  content: string;
};

type Book = {
  id: string;
  title: string;
  sections: Section[];
};

type BookState = {
  books: Book[];
  currentBook: Book | null;
  addBook: (book: Book) => void;
  setCurrentBook: (bookId: string) => void;
};

export const useBookStore = create<BookState>((set, get) => ({
  books: [],
  currentBook: null,
  addBook: (book) => set((state) => ({ books: [...state.books, book] })),
  setCurrentBook(bookId) {
    const book = get().books.find((b) => b.id === bookId) || null;
    set({ currentBook: book });
  },
}));
