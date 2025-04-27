import { create } from 'zustand';
import axios from 'axios';

// Define the Book interface
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

// Define the Dashboard store interface
interface DashboardStore {
  books: Book[];
  loading: boolean;
  error: string | null;
  fetchBooks: () => Promise<void>;
  deleteBook: (id: string) => void;
}

// Create the Zustand store for the dashboard
export const useDashboardStore = create<DashboardStore>((set) => ({
  books: [],
  loading: false,
  error: null,

  // Fetch books from the API
  fetchBooks: async () => {
    set({ loading: true, error: null }); // Set loading to true and clear any previous errors
    try {
      const response = await axios.get('/api/dashboard'); // Make API request to fetch books
      const fetchedBooks = response.data.map((book: any) => ({
        ...book,
        coverColor: generateRandomColor(), // Generate a random cover color
        lastAccessed: book.lastAccessed
          ? new Date(book.lastAccessed) // If lastAccessed is present, convert it to Date object
          : undefined,
      }));
      set({ books: fetchedBooks, loading: false }); // Update the state with fetched books and set loading to false
    } catch (error: unknown) {
      console.error('Failed to fetch books:', error);
      if (error instanceof Error) {
        set({ error: error.message, loading: false }); // If error is an instance of Error, set the message
      } else {
        set({ error: 'Failed to fetch books', loading: false }); // Fallback error message if not an instance of Error
      }
    }
  },

  // Delete a book by its ID
  deleteBook: (id) =>
    set((state) => ({
      books: state.books.filter((book) => book.id !== id), // Remove the book with the given ID from the books list
    })),
}));

// Helper function to generate a random hex color
function generateRandomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`; // Generate a random hex color
}
