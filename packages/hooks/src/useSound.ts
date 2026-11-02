"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "sound-preferences";
const MAX_VOICES = 6;
const MIN_INTERVAL_MS = 55; // controls the cap on the same sound overlapping
const START_LATENCY = 0.03; // schedule slightly ahead to avoid clipped attacks

type Preferences = { enabled: boolean; volume: number };
export type SoundName =
  | "click"
  | "tick"
  | "success"
  | "error"
  | "toggle"
  | "pop"
  | "navigate"
  | "select"
  | "slide"
  | "notification"
  | "delete";
export type SoundOptions = { x?: number };

type Engine = {
  context: AudioContext;
  master: GainNode;
  keepAlive?: OscillatorNode;
};

type Partial_ = { ratio: number; gain: number };

type Voice = {
  kind?: "tone" | "noise";
  offset: number;
  duration: number;
  peak?: number;
  attack?: number;
  lowpass?: number;
  // tone
  frequency?: number;
  endFrequency?: number;
  partials?: Partial_[];
  // noise (band-pass)
  bandFrequency?: number;
  bandEndFrequency?: number;
  q?: number;
};

let noiseBuffer: AudioBuffer | null = null;
let engine: Engine | null = null;
let activeVoices = 0;
let currentVolume = 0.42;
let unlockBound = false;

const lastPlayedByName: Record<string, number> = {};

const GLASS: Partial_[] = [
  { ratio: 1, gain: 0.8 },
  { ratio: 2.76, gain: 0.16 },
  { ratio: 5.4, gain: 0.05 },
];
const SOUNDS: Record<SoundName, Voice[]> = {
  // Keyboard-like tap: filtered noise transient plus a soft body thump.
  click: [
    {
      kind: "noise",
      offset: 0,
      duration: 0.024,
      bandFrequency: 3200,
      q: 1.2,
      peak: 0.14,
      attack: 0.002,
    },
    {
      frequency: 190,
      offset: 0,
      duration: 0.035,
      peak: 0.12,
      attack: 0.002,
    },
  ],

  // Lighter, higher, more "dry" than click.
  tick: [
    {
      kind: "noise",
      offset: 0,
      duration: 0.016,
      bandFrequency: 5200,
      q: 1.5,
      peak: 0.09,
      attack: 0.001,
    },
  ],

  // Switch thunk: soft pitched tone with a tiny tick on top.
  toggle: [
    {
      kind: "noise",
      offset: 0,
      duration: 0.018,
      bandFrequency: 4200,
      q: 1.2,
      peak: 0.08,
      attack: 0.001,
    },
    {
      frequency: 1046,
      offset: 0.004,
      duration: 0.07,
      peak: 0.12,
      partials: GLASS,
      lowpass: 6000,
    },
  ],

  // Bubble pop: quick upward sine glide.
  pop: [
    {
      frequency: 330,
      endFrequency: 760,
      offset: 0,
      duration: 0.07,
      peak: 0.2,
      attack: 0.003,
      lowpass: 3500,
    },
  ],

  // Glassy "tink" for selection (G6).
  select: [
    {
      frequency: 1568,
      offset: 0,
      duration: 0.11,
      peak: 0.12,
      partials: GLASS,
      lowpass: 7000,
    },
  ],

  // Soft wooden "tock" with a gentle downward pitch.
  navigate: [
    {
      kind: "noise",
      offset: 0,
      duration: 0.022,
      bandFrequency: 1200,
      q: 1,
      peak: 0.1,
      attack: 0.002,
    },
    {
      frequency: 340,
      endFrequency: 250,
      offset: 0,
      duration: 0.08,
      peak: 0.2,
      attack: 0.003,
      lowpass: 1800,
    },
  ],

  // Swipe: airy band-passed noise that rises.
  slide: [
    {
      kind: "noise",
      offset: 0,
      duration: 0.18,
      bandFrequency: 600,
      bandEndFrequency: 2600,
      q: 0.8,
      peak: 0.1,
      attack: 0.05,
      lowpass: 5000,
    },
  ],

  // Rising two-note glass chime (E6 → A6), like a payment confirmation.
  success: [
    {
      frequency: 1319,
      offset: 0,
      duration: 0.22,
      peak: 0.13,
      partials: GLASS,
      lowpass: 8000,
    },
    {
      frequency: 1760,
      offset: 0.09,
      duration: 0.38,
      peak: 0.13,
      partials: GLASS,
      lowpass: 8000,
    },
  ],

  // Falling two-note chime (C7 → G6), longer tail.
  notification: [
    {
      frequency: 2093,
      offset: 0,
      duration: 0.2,
      peak: 0.1,
      partials: GLASS,
      lowpass: 9000,
    },
    {
      frequency: 1568,
      offset: 0.12,
      duration: 0.45,
      peak: 0.11,
      partials: GLASS,
      lowpass: 9000,
    },
  ],

  // Muted double thud, similar to a "denied" feel. Sine only, no harsh buzz.
  error: [
    {
      frequency: 233,
      endFrequency: 175,
      offset: 0,
      duration: 0.1,
      peak: 0.22,
      lowpass: 1400,
    },
    {
      frequency: 233,
      endFrequency: 175,
      offset: 0.115,
      duration: 0.12,
      peak: 0.22,
      lowpass: 1400,
    },
  ],

  // Trash crumple/whoosh: falling noise sweep plus a low sine drop.
  delete: [
    {
      kind: "noise",
      offset: 0,
      duration: 0.2,
      bandFrequency: 3200,
      bandEndFrequency: 500,
      q: 0.9,
      peak: 0.13,
      attack: 0.01,
      lowpass: 5000,
    },
    {
      frequency: 440,
      endFrequency: 200,
      offset: 0,
      duration: 0.14,
      peak: 0.08,
      lowpass: 1200,
    },
  ],
};

function getAudioEngine(): Engine | null {
  if (typeof window === "undefined") return null;

  if (!engine) {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctx) return null;

    const context = new Ctx({ latencyHint: "interactive" });

    // Compressor keeps stacked sounds from clipping / changing loudness.
    const compressor = context.createDynamicsCompressor();
    compressor.threshold.value = -18;
    compressor.knee.value = 12;
    compressor.ratio.value = 6;
    compressor.attack.value = 0.003;
    compressor.release.value = 0.1;

    const master = context.createGain();
    master.gain.value = currentVolume;
    master.connect(compressor).connect(context.destination);

    engine = { context, master };
  }

  return engine;
}

function ensureRunning(): Promise<Engine | null> {
  const e = getAudioEngine();
  if (!e) return Promise.resolve(null);
  if (e.context.state === "running") return Promise.resolve(e);
  return e.context
    .resume()
    .then(() => (e.context.state === "running" ? e : null))
    .catch(() => null);
}

/** Inaudible constant signal so the output device never goes idle. */
function startKeepAlive(e: Engine) {
  if (e.keepAlive) return;
  const osc = e.context.createOscillator();
  const gain = e.context.createGain();
  gain.gain.value = 0.00001; // below audibility, but keeps the graph active
  osc.frequency.value = 20;
  osc.connect(gain).connect(e.context.destination);
  osc.start();
  e.keepAlive = osc;
}

/** Unlock on the first *activating* gesture (the ones browsers accept). */
function bindUnlock() {
  if (typeof window === "undefined" || unlockBound) return;
  unlockBound = true;

  // touchstart / touch pointerdown do NOT count as user activation.
  const events = ["pointerdown", "pointerup", "touchend", "click", "keydown"];

  const unlock = () => {
    void ensureRunning().then((e) => {
      if (!e) return; // keep listeners, retry on the next gesture
      startKeepAlive(e);
      events.forEach((ev) => window.removeEventListener(ev, unlock, true));
    });
  };

  events.forEach((ev) =>
    window.addEventListener(ev, unlock, { capture: true, passive: true }),
  );

  // Re-resume if the browser suspends/interrupts the context (tab switch, iOS).
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") void ensureRunning();
  });
}

function setMasterVolume(volume: number) {
  currentVolume = volume;
  if (!engine) return; // applied on creation
  const { context, master } = engine;
  master.gain.cancelScheduledValues(context.currentTime);
  master.gain.setValueAtTime(volume, context.currentTime);
}

function connectSpatial(
  ctx: AudioContext,
  node: AudioNode,
  master: GainNode,
  x = 0.5,
) {
  const panner = ctx.createStereoPanner();
  panner.pan.value = Math.max(-1, Math.min(1, x * 2 - 1));
  node.connect(panner).connect(master);
  return panner;
}

/** Seeded, every noise burst is identical. */
function getNoise(ctx: AudioContext) {
  if (noiseBuffer && noiseBuffer.sampleRate === ctx.sampleRate) {
    return noiseBuffer;
  }
  const length = Math.floor(ctx.sampleRate * 0.5);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let seed = 1337;
  for (let i = 0; i < length; i++) {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    data[i] = (seed / 0xffffffff) * 2 - 1;
  }
  noiseBuffer = buffer;
  return buffer;
}

function voice(
  ctx: AudioContext,
  master: GainNode,
  v: Voice,
  base: number,
  x?: number,
) {
  const start = base + v.offset;
  const end = start + v.duration;
  const peak = v.peak ?? 0.16;
  const attack = v.attack ?? 0.004;

  const nodes: AudioNode[] = [];
  const sources: AudioScheduledSourceNode[] = [];

  const env = ctx.createGain();
  env.gain.setValueAtTime(0.0001, start);
  env.gain.exponentialRampToValueAtTime(peak, start + attack);
  env.gain.exponentialRampToValueAtTime(0.0001, end);
  nodes.push(env);

  let tail: AudioNode = env;
  if (v.lowpass) {
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = v.lowpass;
    lp.Q.value = 0.5;
    env.connect(lp);
    nodes.push(lp);
    tail = lp;
  }
  nodes.push(connectSpatial(ctx, tail, master, x));

  if (v.kind === "noise") {
    const src = ctx.createBufferSource();
    src.buffer = getNoise(ctx);
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.Q.value = v.q ?? 1;
    bp.frequency.setValueAtTime(v.bandFrequency ?? 3000, start);
    if (v.bandEndFrequency) {
      bp.frequency.exponentialRampToValueAtTime(v.bandEndFrequency, end);
    }
    src.connect(bp).connect(env);
    nodes.push(src, bp);
    sources.push(src);
  } else {
    const freq = v.frequency ?? 800;
    for (const p of v.partials ?? [{ ratio: 1, gain: 1 }]) {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq * p.ratio, start);
      if (v.endFrequency) {
        osc.frequency.exponentialRampToValueAtTime(
          v.endFrequency * p.ratio,
          end,
        );
      }
      g.gain.value = p.gain;
      osc.connect(g).connect(env);
      nodes.push(osc, g);
      sources.push(osc);
    }
  }

  activeVoices++;
  let remaining = sources.length;
  for (const s of sources) {
    s.onended = () => {
      if (--remaining > 0) return;
      activeVoices--;
      nodes.forEach((n) => n.disconnect());
    };
    s.start(start);
    s.stop(end + 0.02);
  }
}

function playSound(name: SoundName, options: SoundOptions = {}) {
  const e = getAudioEngine();
  if (!e) return;
  const { context, master } = e;

  const schedule = () => {
    const parts = SOUNDS[name] ?? SOUNDS.click;
    if (activeVoices + parts.length > MAX_VOICES * 2) return;
    const base = context.currentTime + START_LATENCY;
    for (const p of parts) voice(context, master, p, base, options.x);
  };

  if (context.state === "running") {
    schedule();
    return;
  }

  // Not running yet: wait for the context, start the keep-alive, then play.
  void ensureRunning().then((ready) => {
    if (!ready) return;
    startKeepAlive(ready);
    schedule();
  });
}

export function useSound() {
  const [preferences, setPreferences] = useState<Preferences>({
    enabled: true,
    volume: 0.42,
  });
  const loaded = useRef(false);

  useEffect(() => {
    bindUnlock();

    const stored = window.localStorage.getItem(STORAGE_KEY);
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Partial<Preferences>;
        setPreferences((c) => ({
          enabled: parsed.enabled ?? c.enabled,
          volume: parsed.volume ?? c.volume,
        }));
      } catch {
        /* use defaults */
      }
    } else if (reduced) {
      setPreferences((c) => ({ ...c, enabled: false }));
    }
    loaded.current = true;
  }, []);

  useEffect(() => {
    setMasterVolume(preferences.volume);
    if (loaded.current) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    }
  }, [preferences]);

  const play = useCallback(
    (name: SoundName, options?: SoundOptions) => {
      if (!preferences.enabled) return;
      const now = performance.now();
      // Module-level throttle: shared across all components using the hook.
      if (now - (lastPlayedByName[name] ?? 0) < MIN_INTERVAL_MS) return;
      lastPlayedByName[name] = now;
      playSound(name, options);
    },
    [preferences.enabled],
  );
  const setEnabled = useCallback(
    (enabled: boolean) => setPreferences((c) => ({ ...c, enabled })),
    [],
  );
  const setVolume = useCallback(
    (volume: number) => setPreferences((c) => ({ ...c, volume })),
    [],
  );

  return { ...preferences, play, setEnabled, setVolume };
}
