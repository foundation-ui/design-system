export const checkDecimals = (value: number): boolean =>
  value === Math.floor(value);

export const formatDecimals = (value: number): number =>
  Number(value.toFixed(1));
