export interface Guide {
  id: string;
  position: number;
  orientation: "horizontal" | "vertical";
}

export interface RulerContextType {
  guides: Guide[];
  addGuide: (guide: Omit<Guide, "id">) => void;
  updateGuide: (id: string, position: number) => void;
  removeGuide: (id: string) => void;
  activeGuide: Guide | null;
  setActiveGuide: (guide: Guide | null) => void;
  isDragging: boolean;
  setIsDragging: (dragging: boolean) => void;
  canvasRef: React.RefObject<HTMLDivElement | null>;
}
