"use client";

import React, { useCallback, createContext, useContext, useState } from "react";

import type { Guide, IRulerContext, IRulerProviderProperties } from "../types";

const noop = (): void => {};
const noopId = (): string => "";

const defaultRulerContext: IRulerContext = {
  id: "",
  states: {
    guides: [],
    activeGuide: null,
    isDragging: false,
    canvasRef: { current: null },
  },
  methods: {
    addGuide: (guide) => ({ ...guide, id: "" }),
    updateGuide: noop,
    removeGuide: noop,
    setActiveGuide: noop,
    setIsDragging: noop,
  },
};

const RulerContext = createContext<IRulerContext>(defaultRulerContext);

export const useRuler = (): IRulerContext => useContext(RulerContext);

export const RulerProvider = ({
  children,
}: IRulerProviderProperties): React.JSX.Element => {
  const id = React.useId();
  const [guides, setGuides] = useState<Guide[]>([]);
  const [activeGuide, setActiveGuide] = useState<Guide | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = React.useRef<HTMLDivElement>(null);

  const addGuide = useCallback((guide: Omit<Guide, "id">) => {
    const newGuide = { ...guide, id: crypto.randomUUID() };
    setGuides((prev) => [...prev, newGuide]);
    return newGuide;
  }, []);

  const updateGuide = useCallback((guideId: string, position: number) => {
    setGuides((prev) =>
      prev.map((g) => (g.id === guideId ? { ...g, position } : g)),
    );
  }, []);

  const removeGuide = useCallback((guideId: string) => {
    setGuides((prev) => prev.filter((g) => g.id !== guideId));
  }, []);

  return (
    <RulerContext.Provider
      value={{
        id,
        states: {
          guides,
          activeGuide,
          isDragging,
          canvasRef,
        },
        methods: {
          addGuide,
          updateGuide,
          removeGuide,
          setActiveGuide,
          setIsDragging,
        },
      }}
    >
      {children}
    </RulerContext.Provider>
  );
};
