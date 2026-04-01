"use client";

import React from "react";
import type { RulerContextType, Guide } from "../types";

const RulerContext = React.createContext<RulerContextType | null>(null);

export function useRuler() {
  const context = React.useContext(RulerContext);
  if (!context) throw new Error("useRuler must be used within RulerProvider");
  return context;
}

export function RulerProvider({ children }: { children: React.ReactNode }) {
  const [guides, setGuides] = React.useState<Guide[]>([]);
  const [activeGuide, setActiveGuide] = React.useState<Guide | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const canvasRef = React.useRef<HTMLDivElement>(null);

  const addGuide = React.useCallback((guide: Omit<Guide, "id">) => {
    const newGuide = { ...guide, id: crypto.randomUUID() };
    setGuides((prev) => [...prev, newGuide]);
    return newGuide;
  }, []);

  const updateGuide = React.useCallback((id: string, position: number) => {
    setGuides((prev) =>
      prev.map((g) => (g.id === id ? { ...g, position } : g)),
    );
  }, []);

  const removeGuide = React.useCallback((id: string) => {
    setGuides((prev) => prev.filter((g) => g.id !== id));
  }, []);

  return (
    <RulerContext.Provider
      value={{
        guides,
        addGuide,
        updateGuide,
        removeGuide,
        activeGuide,
        setActiveGuide,
        isDragging,
        setIsDragging,
        canvasRef,
      }}
    >
      {children}
    </RulerContext.Provider>
  );
}
