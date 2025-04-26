import { ChangeEvent } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) => (
  <div className="relative flex-1">
    <input
      type="text"
      placeholder="Search books…"
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      className="w-full rounded-lg border border-gray-200 bg-white/80 py-2 pl-10 pr-3 text-sm focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-primary transition placeholder:text-gray-400"
      aria-label="Search books"
    />
    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
  </div>
);

export default SearchBar;
