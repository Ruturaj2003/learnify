import { Card, CardContent } from '@/components/ui/card';

interface ChapterCardProps {
  chapterNumber: string;
  chapterName: string;
}

const ChapterCard: React.FC<ChapterCardProps> = ({
  chapterNumber,
  chapterName,
}) => {
  return (
    <Card className="w-full p-4 mb-4 shadow-md rounded-xl bg-gradient-to-r from-amber-200 to-rose-100 border border-gray-200">
      <CardContent className="flex items-center">
        {/* Circular badge for chapter number */}
        <div className="flex-shrink-0">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-500 text-white font-bold">
            {chapterNumber}
          </div>
        </div>
        {/* Chapter name with max 2 lines */}
        <div className="ml-4 overflow-hidden">
          <h3
            className="text-xl font-semibold text-gray-800 line-clamp-2"
            title={chapterName} // Tooltip for full chapter name
            aria-label={`Chapter ${chapterNumber}: ${chapterName}`} // Accessibility
          >
            {chapterName}
          </h3>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChapterCard;
