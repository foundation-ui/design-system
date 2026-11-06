"use client";

import React from "react";

import {
  createOrthogonalPath,
  createParticles,
  createWaveParticles,
  drawShape,
  getEase,
  getEdgeCenters,
  getWaveIntensity,
  pickActiveCenters,
  setAlpha,
  updateAndDrawParticle,
  safeSpeed,
} from "../utils";

import {
  CONNECTION_DOT_SIZE,
  CONNECTION_INTERVAL_MS,
  FLICKER_CHANCE,
  GRID_SPACING,
  INTENSE_WAVE,
  MAX_CONNECTIONS,
} from "../constants";

import type {
  IWaveConfig,
  IWaveParticle,
  IGridInfo,
  IWave,
  ShapeType,
  IIntenseWave,
  IIntenseParticle,
  IParticle,
  IConnection,
} from "../types";

// Keeps the latest value in a ref so that changing the value
// doesn't restart the animation
export const useLatest = <T,>(value: T): React.RefObject<T> => {
  const ref = React.useRef(value);
  ref.current = value;
  return ref;
};

export const useWaveAnimation = (
  shape: ShapeType,
  config: IWaveConfig,
  color: string,
  speed = 1,
): React.RefObject<HTMLCanvasElement | null> => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const colorRef = useLatest(color);
  const speedRef = useLatest(speed);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: IWaveParticle[] = [];
    let grid: IGridInfo = { cols: 0, rows: 0, spacing: GRID_SPACING };
    let waves: IWave[] = [];
    let lastWaveCreation = 0;
    let frameId: number | null = null;

    const setCanvasSize = (): void => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      ({ particles, grid } = createWaveParticles(
        canvas.width,
        canvas.height,
        GRID_SPACING,
        config.getDistance,
      ));
    };

    const updateWaves = (now: number, maxDistance: number): number[] => {
      const s = safeSpeed(speedRef.current);

      if (
        waves.length === 0 ||
        now - lastWaveCreation >= config.intervalMs / s
      ) {
        waves.push({ startTime: now });
        lastWaveCreation = now;
      }

      const positions: number[] = [];
      waves = waves.filter((wave) => {
        const position = ((now - wave.startTime) / 1000) * config.speed * s;

        if (position >= maxDistance + 20) return false;
        positions.push(position);

        return true;
      });
      return positions;
    };

    const animate = (): void => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const maxDistance = Math.max(
        config.getMaxDistance(grid.cols, grid.rows),
        1,
      );
      const wavePositions = updateWaves(performance.now(), maxDistance);

      particles.forEach((particle) => {
        const { distance } = particle;
        const sizeFade = Math.max(0, 1 - distance / (maxDistance * 1.2));
        const intensityFade = Math.max(0, 1 - distance / (maxDistance * 1.5));

        let maxIntensity = 0;
        for (const position of wavePositions) {
          const intensity =
            getWaveIntensity(Math.abs(distance - position), config.width) *
            intensityFade;
          if (intensity > maxIntensity) maxIntensity = intensity;
        }

        particle.targetOpacity = maxIntensity;
        particle.targetScale = maxIntensity * 2;
        particle.targetSize = particle.baseSize * (0.3 + sizeFade * 0.7);

        updateAndDrawParticle(
          ctx,
          particle,
          shape,
          colorRef.current,
          speedRef.current,
        );
      });

      frameId = requestAnimationFrame(animate);
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);
    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      if (frameId !== null) cancelAnimationFrame(frameId);
    };
  }, [shape, config]);

  return canvasRef;
};

export const useIntenseAnimation = (
  shape: ShapeType,
  color: string,
  speed = 1,
): React.RefObject<HTMLCanvasElement | null> => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const colorRef = useLatest(color);
  const speedRef = useLatest(speed);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const config = INTENSE_WAVE;
    let particles: IIntenseParticle[] = [];
    let grid: IGridInfo = { cols: 0, rows: 0, spacing: GRID_SPACING };
    let waves: IIntenseWave[] = [];
    let activeCenters: number[] = [];
    let lastWaveByCenter = [-Infinity, -Infinity, -Infinity, -Infinity];
    let nextPulseAt = 0;
    let frameId: number | null = null;

    const setCanvasSize = (): void => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      const created = createWaveParticles(
        canvas.width,
        canvas.height,
        GRID_SPACING,
        () => 0,
      );
      grid = created.grid;

      const centers = getEdgeCenters(grid.cols, grid.rows);
      particles = created.particles.map((particle) => {
        const distances = centers.map((center) =>
          Math.hypot(particle.col - center.x, particle.row - center.y),
        );
        // `distance` holds the distance to the nearest center
        return { ...particle, distances, distance: Math.min(...distances) };
      });

      activeCenters = pickActiveCenters(config.activeCenterCount);
    };

    const getSettings = (wave: IIntenseWave) =>
      wave.isPowerPulse ? config.power : config.normal;

    const getRadius = (wave: IIntenseWave, now: number): number =>
      ((now - wave.startTime) / 1000) *
      getSettings(wave).speed *
      speedRef.current;

    const updateWaves = (now: number, maxDistance: number): void => {
      const s = safeSpeed(speedRef.current);

      if (now >= nextPulseAt && activeCenters.length > 0) {
        waves.push({
          startTime: now,
          centerIndex: Number(
            activeCenters[Math.floor(Math.random() * activeCenters.length)],
          ),
          isPowerPulse: true,
        });
        nextPulseAt =
          now +
          (config.pulseMinDelayMs + Math.random() * config.pulseRandomDelayMs) /
            s;
      }

      activeCenters.forEach((centerIndex) => {
        if (now - lastWaveByCenter[centerIndex]! >= config.waveIntervalMs / s) {
          waves.push({ startTime: now, centerIndex, isPowerPulse: false });
          lastWaveByCenter[centerIndex] = now;
        }
      });

      waves = waves.filter(
        (wave) => getRadius(wave, now) < maxDistance + config.exitMargin,
      );
    };

    const animate = (): void => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const now = performance.now();
      const maxDistance = Math.max(Math.max(grid.cols, grid.rows) * 0.8, 1);
      updateWaves(now, maxDistance);
      const radii = waves.map((wave) => getRadius(wave, now));

      particles.forEach((particle) => {
        let maxOpacity = 0;
        let maxScale = 0;

        waves.forEach((wave, i) => {
          const settings = getSettings(wave);
          const distance = particle.distances[wave.centerIndex];
          const fade = Math.max(0, 1 - distance! / (maxDistance * 1.5));
          const intensity =
            getWaveIntensity(Math.abs(distance! - radii[i]!), settings.width) *
            fade *
            settings.intensity;

          if (intensity > maxOpacity) maxOpacity = intensity;
          if (intensity * settings.scale > maxScale) {
            maxScale = intensity * settings.scale;
          }
        });

        const sizeFade = Math.max(
          0,
          1 - particle.distance / (maxDistance * 1.2),
        );

        particle.targetOpacity = maxOpacity;
        particle.targetScale = maxScale;
        particle.targetSize = particle.baseSize * (0.3 + sizeFade * 0.7);

        updateAndDrawParticle(
          ctx,
          particle,
          shape,
          colorRef.current,
          speedRef.current,
        );
      });

      frameId = requestAnimationFrame(animate);
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Self-rescheduling timeout so the delay follows the current speed
    let switchTimeoutId: ReturnType<typeof setTimeout>;
    const scheduleCenterSwitch = (): void => {
      if (Math.random() < config.centerSwitchChance) {
        activeCenters = pickActiveCenters(config.activeCenterCount);
      }
      switchTimeoutId = setTimeout(
        scheduleCenterSwitch,
        config.centerSwitchMs / safeSpeed(speedRef.current),
      );
    };
    switchTimeoutId = setTimeout(scheduleCenterSwitch, config.centerSwitchMs);

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      clearTimeout(switchTimeoutId);
      if (frameId !== null) cancelAnimationFrame(frameId);
    };
  }, [shape]);

  return canvasRef;
};

export const useAnalysisAnimation = (
  shape: ShapeType,
  color: string,
  speed = 1,
): React.RefObject<HTMLCanvasElement | null> => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const colorRef = useLatest(color);
  const speedRef = useLatest(speed);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: IParticle[] = [];
    let grid: IGridInfo = { cols: 0, rows: 0, spacing: GRID_SPACING };
    let connections: IConnection[] = [];
    let frameId: number | null = null;

    const setCanvasSize = (): void => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      ({ particles, grid } = createParticles(
        canvas.width,
        canvas.height,
        GRID_SPACING,
      ));
      // Old connections reference stale indices after a resize
      connections = [];
    };

    const createConnection = (): void => {
      if (particles.length < 2) return;

      const startIndex = Math.floor(Math.random() * particles.length);
      let endIndex = Math.floor(Math.random() * particles.length);
      while (endIndex === startIndex) {
        endIndex = Math.floor(Math.random() * particles.length);
      }

      connections.push({
        startIndex,
        endIndex,
        progress: 0,
        speed: Math.random() * 0.008 + 0.008,
        opacity: Math.random() * 0.3 + 0.2,
        path: createOrthogonalPath(
          particles[startIndex]!,
          particles[endIndex]!,
          grid.spacing,
        ),
      });
    };

    const drawConnections = (): void => {
      connections = connections.filter((connection) => {
        const start = particles[connection.startIndex];
        const end = particles[connection.endIndex];
        if (!start || !end) return false;

        connection.progress += connection.speed * speedRef.current;
        if (connection.progress >= 1) return false;

        const { path, progress, opacity } = connection;
        const totalSegments = path.length - 1;
        if (totalSegments < 1) return false;

        const currentSegment = Math.min(
          Math.floor(progress * totalSegments),
          totalSegments - 1,
        );
        const segmentProgress = (progress * totalSegments) % 1;
        const from = path[currentSegment]!;
        const to = path[currentSegment + 1]!;
        const currentX = from.x + (to.x - from.x) * segmentProgress;
        const currentY = from.y + (to.y - from.y) * segmentProgress;

        ctx.strokeStyle = colorRef.current;
        setAlpha(ctx, opacity * (1 - progress * 0.5));
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(path[0]!.x, path[0]!.y);
        for (let i = 1; i <= currentSegment; i++) {
          ctx.lineTo(path[i]!.x, path[i]!.y);
        }
        ctx.lineTo(currentX, currentY);
        ctx.stroke();

        ctx.fillStyle = colorRef.current;
        setAlpha(ctx, opacity * 1.5);
        ctx.beginPath();
        ctx.arc(currentX, currentY, CONNECTION_DOT_SIZE, 0, Math.PI * 2);
        ctx.fill();

        return true;
      });
    };

    const drawParticles = (): void => {
      const s = speedRef.current;

      particles.forEach((particle) => {
        if (Math.random() < Math.min(1, FLICKER_CHANCE * s)) {
          particle.targetOpacity = Math.random();
          particle.targetSize = Math.random() * 2 + 0.5;
          particle.targetScale = 1 + Math.random() * 0.15;
        }

        const ease = getEase(particle.flickerSpeed, s);
        particle.opacity += (particle.targetOpacity - particle.opacity) * ease;
        particle.size += (particle.targetSize - particle.size) * ease;
        particle.scale += (particle.targetScale - particle.scale) * ease;

        ctx.fillStyle = colorRef.current;
        setAlpha(ctx, particle.opacity);
        drawShape(
          ctx,
          particle.gridX,
          particle.gridY,
          particle.size * particle.scale,
          shape,
        );
      });
    };

    const animate = (): void => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawConnections();
      drawParticles();
      frameId = requestAnimationFrame(animate);
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Self-rescheduling timeout so the delay follows the current speed
    let connectionTimeoutId: ReturnType<typeof setTimeout>;
    const scheduleConnection = (): void => {
      if (connections.length < MAX_CONNECTIONS) createConnection();
      connectionTimeoutId = setTimeout(
        scheduleConnection,
        CONNECTION_INTERVAL_MS / safeSpeed(speedRef.current),
      );
    };
    connectionTimeoutId = setTimeout(
      scheduleConnection,
      CONNECTION_INTERVAL_MS,
    );

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      clearTimeout(connectionTimeoutId);
      if (frameId !== null) cancelAnimationFrame(frameId);
    };
  }, [shape]);

  return canvasRef;
};
