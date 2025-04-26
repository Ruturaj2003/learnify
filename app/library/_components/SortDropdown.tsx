import { ChevronDown, SortAsc, SortDesc, List } from 'lucide-react';

const sortOptions = [
  { label: 'Title (A-Z)', value: 'title_asc', icon: SortAsc },
  { label: 'Title (Z-A)', value: 'title_desc', icon: SortDesc },
  { label: 'Category (A-Z)', value: 'category_asc', icon: List },
  { label: 'Category (Z-A)', value: 'category_desc', icon: List },
];

const SortDropdown = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) => (
  <div className="relative">
    <select
      className="appearance-none rounded-lg border border-gray-200 bg-white/80 py-2 pl-3 pr-8 text-sm focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-primary transition text-gray-700"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Sort books"
    >
      {sortOptions.map((opt) => (
        <option value={opt.value} key={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    <ChevronDown
      className="pointer-events-none absolute top-2.5 right-2 text-gray-400"
      size={18}
    />
  </div>
);

export default SortDropdown;
