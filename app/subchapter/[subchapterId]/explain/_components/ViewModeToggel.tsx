"use client";
import { Button } from "@/components/ui/button";
import { useExplanationStore } from "@/stores/useExplainationStore";
import { List, Grid2x2 } from "lucide-react";

const ViewModeToggle = () => {
  // Access viewMode and setViewMode from the Zustand store
  const { viewMode, setViewMode } = useExplanationStore();

  const toggleMode = () => {
    // Toggle between 'simple' and 'detailed'
    setViewMode(viewMode === "simple" ? "detailed" : "simple");
  };

  return (
    <Button
      onClick={toggleMode}
      variant="ghost"
      className="flex items-center gap-2 bg-violet-200/50 hover:bg-violet-300 text-violet-700"
    >
      {viewMode === "simple" ? (
        <List className="h-4 w-4" />
      ) : (
        <Grid2x2 className="h-4 w-4" />
      )}
      {viewMode === "simple" ? "Simple View" : "Detailed View"}
    </Button>
  );
};

export default ViewModeToggle;
