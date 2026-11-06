import type { IWaveConfig } from "../types";
import { centerDistance, centerMax } from "../utils";

export const DEFAULT_COLOR = "#ffffff";

export const GRID_SPACING = 8;
export const MAX_CONNECTIONS = 8;
export const CONNECTION_INTERVAL_MS = 800;
export const FLICKER_CHANCE = 0.08;
export const EASING_FACTOR = 0.6;
export const CONNECTION_DOT_SIZE = 2;

export const CONNECT_WAVE: IWaveConfig = {
  intervalMs: 1200,
  speed: 35,
  width: 40,
  getDistance: (col) => col,
  getMaxDistance: (cols) => cols,
};

export const INTENSE_WAVE = {
  waveIntervalMs: 1500,
  centerSwitchMs: 5000,
  centerSwitchChance: 0.3,
  activeCenterCount: 2,
  exitMargin: 20,
  pulseMinDelayMs: 3000,
  pulseRandomDelayMs: 3000,
  normal: { speed: 30, width: 15, intensity: 1, scale: 2 },
  power: { speed: 120, width: 30, intensity: 1.5, scale: 3 },
};
export const THINK_WAVE: IWaveConfig = {
  intervalMs: 800,
  speed: 30,
  width: 15,
  getDistance: (col, row, cols, rows) =>
    Math.hypot(col - cols / 2, row - rows / 2),
  getMaxDistance: (cols, rows) => Math.max(cols, rows) * 0.8,
};

export const RIPPLE_WAVE: IWaveConfig = {
  intervalMs: 2000,
  speed: 12,
  width: 8,
  getDistance: (col, row, cols, rows) =>
    Math.hypot(col - cols / 2, row - rows / 2),
  getMaxDistance: (cols, rows) => Math.hypot(cols / 2, rows / 2),
};

export const CONVERGE_WAVE: IWaveConfig = {
  ...RIPPLE_WAVE,
  getDistance: (col, row, cols, rows) =>
    Math.hypot(cols / 2, rows / 2) - Math.hypot(col - cols / 2, row - rows / 2),
};

export const SWEEP_X_WAVE: IWaveConfig = {
  intervalMs: 2200,
  speed: 14,
  width: 8,
  getDistance: (col) => col,
  getMaxDistance: (cols) => cols,
};

export const SWEEP_Y_WAVE: IWaveConfig = {
  intervalMs: 2200,
  speed: 10,
  width: 8,
  getDistance: (_col, row) => row,
  getMaxDistance: (_cols, rows) => rows,
};

export const DIAGONAL_WAVE: IWaveConfig = {
  intervalMs: 2400,
  speed: 16,
  width: 10,
  getDistance: (col, row) => col + row,
  getMaxDistance: (cols, rows) => cols + rows,
};

export const CORNER_WAVE: IWaveConfig = {
  intervalMs: 2200,
  speed: 14,
  width: 8,
  getDistance: (col, row) => Math.hypot(col, row),
  getMaxDistance: (cols, rows) => Math.hypot(cols, rows),
};

export const WAVE_CONFIGS = {
  connect: CONNECT_WAVE,
  think: THINK_WAVE,
  ripple: RIPPLE_WAVE,
  converge: CONVERGE_WAVE,
  "sweep-x": SWEEP_X_WAVE,
  "sweep-y": SWEEP_Y_WAVE,
  diagonal: DIAGONAL_WAVE,
  corner: CORNER_WAVE,
} as const satisfies Record<string, IWaveConfig>;
