import { Search } from 'lucide-react';

const Searchbar = () => {
  return (
    <div className="relative w-full mt-2">
      <input
        type="text"
        className="h-10 w-full pl-10 pr-4 bg-white border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500"
        placeholder="Search for your books"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
    </div>
  );
};

export default Searchbar;
