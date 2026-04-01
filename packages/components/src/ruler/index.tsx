"use client";

import React from "react";
import { useRuler, RulerProvider } from "./hooks";

import {
  HorizontalRuler,
  VerticalRuler,
  CornerSquare,
  HTickContainer,
  VTickContainer,
  HTickMark,
  VTickMark,
  HTickLabel,
  VTickLabel,
  VerticalGuideLine,
  HorizontalGuideLine,
  CanvasContent,
  CanvasWrapper,
} from "./styles";

import { MAJOR_TICK_INTERVAL, MINOR_TICK_INTERVAL } from "./constants";
import { Guide } from "./types";
import { IReactChildren } from "../../../../types";

export interface RulerComposition {
  Root: typeof RulerRoot;
  Row: typeof RulerRow;
  Corner: typeof RulerCorner;
  Lines: typeof RulerLines;
  Canvas: typeof RulerCanvas;
}

const Ruler = ({ children }: IReactChildren) => {
  return <CanvasWrapper>{children}</CanvasWrapper>;
};
Ruler.displayName = "Ruler";

const RulerRoot = ({ children }: IReactChildren) => {
  return <RulerProvider>{children}</RulerProvider>;
};
RulerRoot.displayName = "Ruler.Root";

const RulerRow = ({
  orientation,
}: {
  orientation: "horizontal" | "vertical";
}) => {
  const { addGuide, setActiveGuide, setIsDragging, canvasRef } = useRuler();

  const rulerRef = React.useRef<HTMLDivElement>(null);
  const [size, setSize] = React.useState(0);

  const isH = orientation === "horizontal";

  React.useEffect(() => {
    const update = () => {
      if (canvasRef.current) {
        setSize(
          isH ? canvasRef.current.offsetWidth : canvasRef.current.offsetHeight,
        );
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [canvasRef, isH]);

  const getPos = (e: React.MouseEvent) => {
    const rect = rulerRef.current?.getBoundingClientRect();
    if (!rect) return null;
    return isH ? e.clientX - rect.left : e.clientY - rect.top;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const position = getPos(e);
    if (position === null) return;
    const guide = addGuide({
      position: 0,
      orientation: isH ? "horizontal" : "vertical",
    }) as any;
    setActiveGuide(guide);
    setIsDragging(true);
  };

  const ticks = Array.from(
    { length: Math.floor(size / MINOR_TICK_INTERVAL) + 1 },
    (_, idx) => {
      const i = idx * MINOR_TICK_INTERVAL;
      const isMajor = i % MAJOR_TICK_INTERVAL === 0;
      return isH ? (
        <HTickContainer key={i} $x={i}>
          <HTickMark $major={isMajor} />
          {isMajor && <HTickLabel>{i}</HTickLabel>}
        </HTickContainer>
      ) : (
        <VTickContainer key={i} $y={i}>
          <VTickMark $major={isMajor} />
          {isMajor && <VTickLabel>{i}</VTickLabel>}
        </VTickContainer>
      );
    },
  );

  const RulerEl = isH ? HorizontalRuler : VerticalRuler;

  return (
    <RulerEl ref={rulerRef} onMouseDown={handleMouseDown}>
      {ticks}
    </RulerEl>
  );
};
RulerRow.displayName = "Ruler.Row";

const RulerCorner = () => {
  return <CornerSquare />;
};
RulerCorner.displayName = "Ruler.Corner";

const RulerLine = ({ guide }: { guide: Guide }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const { activeGuide, removeGuide, setActiveGuide, setIsDragging } =
    useRuler();

  const highlighted = activeGuide?.id === guide.id || isHovered;

  const sharedProps = {
    $active: highlighted,
    onMouseDown(e: React.MouseEvent) {
      e.stopPropagation();
      setActiveGuide(guide);
      setIsDragging(true);
    },
    onDoubleClick(e: React.MouseEvent) {
      e.stopPropagation();
      removeGuide(guide.id);
    },
    onMouseEnter() {
      setIsHovered(true);
    },
    onMouseLeave() {
      setIsHovered(false);
    },
  };

  if (guide.orientation === "vertical") {
    return <VerticalGuideLine $x={guide.position} {...sharedProps} />;
  }

  return <HorizontalGuideLine $y={guide.position} {...sharedProps} />;
};
RulerLine.displayName = "Ruler.Line";

const RulerLines = () => {
  const {
    guides,
    activeGuide,
    updateGuide,
    removeGuide,
    setActiveGuide,
    isDragging,
    setIsDragging,
    canvasRef,
  } = useRuler();

  React.useEffect(() => {
    if (!isDragging || !activeGuide) return;

    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const pos =
        activeGuide.orientation === "vertical"
          ? e.clientX - rect.left
          : e.clientY - rect.top;

      updateGuide(activeGuide.id, Math.max(0, pos));
    };

    const handleMouseUp = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (canvas && activeGuide) {
        const rect = canvas.getBoundingClientRect();
        const isOutside =
          e.clientX < rect.left ||
          e.clientX > rect.right ||
          e.clientY < rect.top ||
          e.clientY > rect.bottom;
        if (isOutside) removeGuide(activeGuide.id);
      }
      setIsDragging(false);
      setActiveGuide(null);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    isDragging,
    activeGuide,
    updateGuide,
    removeGuide,
    setActiveGuide,
    setIsDragging,
    canvasRef,
  ]);

  return (
    <React.Fragment>
      {guides.map((guide) => (
        <RulerLine key={guide.id} guide={guide} />
      ))}
    </React.Fragment>
  );
};
RulerLines.displayName = "Ruler.Lines";

const RulerCanvas = ({ children }: IReactChildren) => {
  const { canvasRef, isDragging } = useRuler();

  return (
    <CanvasContent ref={canvasRef} $isDragging={isDragging}>
      {children}
    </CanvasContent>
  );
};
RulerCanvas.displayName = "Ruler.Canvas";

Ruler.Root = RulerRoot;
Ruler.Row = RulerRow;
Ruler.Corner = RulerCorner;
Ruler.Lines = RulerLines;
Ruler.Canvas = RulerCanvas;

export { Ruler, RulerRoot, RulerRow, RulerCorner, RulerLines, RulerCanvas };
