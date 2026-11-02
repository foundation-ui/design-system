export const applyDataState = (condition: boolean): string | void =>
  condition ? "open" : "closed";

export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export const getCollapsedClip = (
  origin: {
    x: number;
    y: number;
  },
  size: { width: number; height: number },
) => {
  const half = 8;
  const top = clamp(origin.y - half, 0, size.height);
  const right = clamp(size.width - origin.x - half, 0, size.width);
  const bottom = clamp(size.height - origin.y - half, 0, size.height);
  const left = clamp(origin.x - half, 0, size.width);
  return `inset(${top}px ${right}px ${bottom}px ${left}px round 10px)`;
};
