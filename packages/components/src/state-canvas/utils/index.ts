import { EASING_FACTOR } from "../constants";
import type {
  IWaveConfig,
  IWaveParticle,
  IGridInfo,
  IPathSegment,
  ShapeType,
  IParticle,
} from "../types";

export const getEase = (flickerSpeed: number, speed: number): number =>
  Math.min(1, flickerSpeed * EASING_FACTOR * speed);

export const safeSpeed = (speed: number): number => Math.max(speed, 0.01);

export const setAlpha = (
  ctx: CanvasRenderingContext2D,
  alpha: number,
): void => {
  ctx.globalAlpha = Math.min(1, Math.max(0, alpha));
};

export const shuffle = <T>(items: T[]): T[] => {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i] as any, result[j] as any] = [result[j], result[i]];
  }
  return result;
};

export const getEdgeCenters = (cols: number, rows: number): IPathSegment[] => [
  { x: 0, y: rows / 2 }, // Left
  { x: cols, y: rows / 2 }, // Right
  { x: cols / 2, y: 0 }, // Top
  { x: cols / 2, y: rows }, // Bottom
];

export const pickActiveCenters = (count: number): number[] =>
  shuffle([0, 1, 2, 3]).slice(0, count);

export const createWaveParticles = (
  width: number,
  height: number,
  spacing: number,
  getDistance: IWaveConfig["getDistance"],
): { particles: IWaveParticle[]; grid: IGridInfo } => {
  const cols = Math.ceil(width / spacing);
  const rows = Math.ceil(height / spacing);
  const particles: IWaveParticle[] = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const opacity = Math.random();
      const baseSize = Math.random() * 1.5 + 1;
      const { x, y } = toGridPoint(col, row, spacing);

      particles.push({
        gridX: x,
        gridY: y,
        opacity,
        targetOpacity: opacity,
        size: baseSize,
        targetSize: baseSize,
        flickerSpeed: Math.random() * 0.08 + 0.05,
        scale: 1,
        targetScale: 1,
        distance: getDistance(col, row, cols, rows),
        baseSize,
        col,
        row,
      });
    }
  }

  return { particles, grid: { cols, rows, spacing } };
};

export const createOrthogonalPath = (
  start: IParticle,
  end: IParticle,
  spacing: number,
): IPathSegment[] => {
  const path: IPathSegment[] = [{ x: start.gridX, y: start.gridY }];
  let col = start.gridCol;
  let row = start.gridRow;

  const stepCols = (): void => {
    while (col !== end.gridCol) {
      col += col < end.gridCol ? 1 : -1;
      path.push(toGridPoint(col, row, spacing));
    }
  };

  const stepRows = (): void => {
    while (row !== end.gridRow) {
      row += row < end.gridRow ? 1 : -1;
      path.push(toGridPoint(col, row, spacing));
    }
  };

  if (Math.random() > 0.5) {
    stepCols();
    stepRows();
  } else {
    stepRows();
    stepCols();
  }

  return path;
};

export const updateAndDrawParticle = (
  ctx: CanvasRenderingContext2D,
  particle: IWaveParticle,
  shape: ShapeType,
  color: string,
  speed = 1,
): void => {
  const ease = getEase(particle.flickerSpeed, speed);
  particle.opacity += (particle.targetOpacity - particle.opacity) * ease;
  particle.size += (particle.targetSize - particle.size) * ease;
  particle.scale += (particle.targetScale - particle.scale) * ease;

  ctx.fillStyle = color;
  setAlpha(ctx, particle.opacity);
  drawShape(
    ctx,
    particle.gridX,
    particle.gridY,
    particle.size * particle.scale,
    shape,
    true,
  );
};

export const getWaveIntensity = (
  distanceDiff: number,
  width: number,
): number => {
  const rise = width * 0.3;
  const hold = width * 0.4;
  const fall = width * 0.3;

  if (distanceDiff >= width) return 0;
  if (distanceDiff < rise) return distanceDiff / rise;
  if (distanceDiff < rise + hold) return 1;
  return 1 - (distanceDiff - rise - hold) / fall;
};

export const drawShape = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  shape: ShapeType,
  equilateralTriangle = false,
): void => {
  ctx.beginPath();

  switch (shape) {
    case "circle":
      ctx.arc(x, y, size, 0, Math.PI * 2);
      break;
    case "triangle": {
      const w = equilateralTriangle ? size * 0.866 : size;
      const h = equilateralTriangle ? size * 0.5 : size;
      ctx.moveTo(x, y - size);
      ctx.lineTo(x - w, y + h);
      ctx.lineTo(x + w, y + h);
      ctx.closePath();
      break;
    }
    case "square":
      ctx.rect(x - size, y - size, size * 2, size * 2);
      break;
    case "diamond":
      ctx.moveTo(x, y - size);
      ctx.lineTo(x + size, y);
      ctx.lineTo(x, y + size);
      ctx.lineTo(x - size, y);
      ctx.closePath();
      break;
  }

  ctx.fill();
};

export const toGridPoint = (
  col: number,
  row: number,
  spacing: number,
): IPathSegment => ({
  x: col * spacing + spacing / 2,
  y: row * spacing + spacing / 2,
});

export const createParticles = (
  width: number,
  height: number,
  spacing: number,
): { particles: IParticle[]; grid: IGridInfo } => {
  const cols = Math.ceil(width / spacing);
  const rows = Math.ceil(height / spacing);
  const particles: IParticle[] = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const opacity = Math.random();
      const size = Math.random() * 1.5 + 1;
      const { x, y } = toGridPoint(col, row, spacing);

      particles.push({
        gridX: x,
        gridY: y,
        opacity,
        targetOpacity: opacity,
        size,
        targetSize: size,
        flickerSpeed: Math.random() * 0.08 + 0.05,
        scale: 1,
        targetScale: 1,
        gridCol: col,
        gridRow: row,
      });
    }
  }

  return { particles, grid: { cols, rows, spacing } };
};

export const centerDistance = (
  col: number,
  row: number,
  cols: number,
  rows: number,
) => Math.hypot(col - cols / 2, row - rows / 2);

export const centerMax = (cols: number, rows: number) =>
  Math.hypot(cols / 2, rows / 2);
