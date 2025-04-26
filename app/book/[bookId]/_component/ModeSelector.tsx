import { BookOpen, ListChecks, HelpCircle } from 'lucide-react';

type Mode = 'read' | 'quiz' | 'explain';

const modeMeta: { [K in Mode]: { label: string; icon: React.ReactNode } } = {
  read: { label: 'Read', icon: <BookOpen size={20} className="mr-1.5" /> },
  quiz: { label: 'Quiz', icon: <ListChecks size={20} className="mr-1.5" /> },
  explain: {
    label: 'Explain',
    icon: <HelpCircle size={20} className="mr-1.5" />,
  },
};

interface ModeSelectorProps {
  value: Mode;
  onChange: (mode: Mode) => void;
}

export default function ModeSelector({ value, onChange }: ModeSelectorProps) {
  return (
    <div className="flex justify-center pb-4">
      <div className="inline-flex bg-gray-100 rounded-full shadow-inner border border-gray-200 p-1">
        {Object.entries(modeMeta).map(([key, { label, icon }]) => {
          const active = value === key;
          return (
            <button
              key={key}
              type="button"
              className={
                'flex items-center px-4 py-2 font-medium rounded-full transition-all duration-150 outline-hidden focus-visible:ring-2 l ' +
                (active
                  ? 'bg-violet-100 text-violet-700 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-200')
              }
              aria-pressed={active}
              onClick={() => onChange(key as Mode)}
            >
              {icon}
              <span className="sr-only">{label}</span>
              <span className="block">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
