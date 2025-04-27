import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { List, Grid2x2 } from 'lucide-react';

const ViewModeToggle = () => {
  const [isSimpleMode, setIsSimpleMode] = useState(true);

  const toggleMode = () => {
    setIsSimpleMode((prevMode) => !prevMode);
  };

  return (
    <Button
      onClick={toggleMode}
      variant="ghost"
      className="flex items-center gap-2 bg-violet-200/50 hover:bg-violet-300 text-violet-700"
    >
      {isSimpleMode ? (
        <List className="h-4 w-4" />
      ) : (
        <Grid2x2 className="h-4 w-4" />
      )}
      {isSimpleMode ? 'Simple View' : 'Detailed View'}
    </Button>
  );
};

export default ViewModeToggle;
