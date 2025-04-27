"use client";
import { useMemo, useState, useEffect } from "react";
import BottomNavBar from "../_components/BottomNavBar";
import SearchBar from "./_components/SearchBar";
import BookList from "./_components/BookList";
import SortDropdown from "./_components/SortDropdown";
import { useBookStore } from "@/stores/useBookStore";
import Navbar from "../_components/Navbar";
import Spinner from "../_components/Spinner";

type Book = {
  id: string;
  title: string;
  description: string;
  category: string;
};

const sortFunctions: Record<string, (a: Book, b: Book) => number> = {
  title_asc: (a, b) => a.title.localeCompare(b.title),
  title_desc: (a, b) => b.title.localeCompare(a.title),
  category_asc: (a, b) => a.category.localeCompare(b.category),
  category_desc: (a, b) => b.category.localeCompare(a.category),
};

const LibraryPage = () => {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] =
    useState<keyof typeof sortFunctions>("title_asc");

  const { books, loading, fetchBooks } = useBookStore();

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const filteredBooks = useMemo(() => {
    const result = books.filter(
      (book) =>
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.description.toLowerCase().includes(search.toLowerCase()) ||
        book.category.toLowerCase().includes(search.toLowerCase())
    );
    return result.sort(sortFunctions[sortKey]);
  }, [books, search, sortKey]);

  return (
    <>
      <Navbar />
      <div className="pb-14">
        <div className="font-sans bg-linear-to-b from-indigo-100 via-purple-50 to-white min-h-screen flex flex-col w-full">
          <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-xs border-b border-gray-200 px-4 pt-6 pb-2 flex flex-col gap-3 items-center w-full">
            <h1 className="text-2xl font-bold text-indigo-700 tracking-tight">
              My Library
            </h1>
            <div className="flex gap-2 w-full max-w-md">
              <SearchBar value={search} onChange={setSearch} />
              <SortDropdown value={sortKey} onChange={setSortKey} />
            </div>
          </header>
          <main className="flex-1 px-2 py-4 w-full max-w-md mx-auto">
            {loading ? (
              <Spinner />
            ) : filteredBooks.length > 0 ? (
              <BookList books={filteredBooks} />
            ) : (
              <div className="text-center text-gray-400 mt-14">
                No books found.
              </div>
            )}
          </main>
        </div>
      </div>
      <BottomNavBar />
    </>
  );
};

export default LibraryPage;
