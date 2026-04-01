import {
  SegmentRanges,
  type DateState,
  type ISegment,
  type TDateSegmentType,
} from "../types";

/**
 * Converts a `Date` object into a flat `DateState` record.
 *
 * Month is normalized from the zero-based `Date` API (0–11) to a
 * human-readable value (1–12) so that segment values always match
 * what is displayed to the user.
 *
 * @param date - The `Date` instance to decompose.
 * @returns A `DateState` object with individual `day`, `month`, `year`,
 *   `hour`, and `minute` fields.
 *
 * @example
 * dateToState(new Date(2026, 2, 28, 9, 54));
 * // → { day: 28, month: 3, year: 2026, hour: 9, minute: 54 }
 */
export function dateToState(date: Date): DateState {
  return {
    day: date.getDate(),
    month: date.getMonth() + 1, // Normalize: Date months are 0-indexed
    year: date.getFullYear(),
    hour: date.getHours(),
    minute: date.getMinutes(),
  };
}

/**
 * Reconstructs a `Date` object from a flat `DateState` record.
 *
 * Month is converted back from human-readable (1–12) to the zero-based
 * value expected by the `Date` constructor.
 *
 * @param state - The `DateState` to recompose.
 * @returns A `Date` instance representing the given state.
 *
 * @example
 * stateToDate({ day: 28, month: 3, year: 2026, hour: 9, minute: 54 });
 * // → Date { Sat Mar 28 2026 09:54:00 }
 */
export function stateToDate(state: DateState): Date {
  return new Date(
    state.year,
    state.month - 1, // Normalize: Date constructor expects 0-indexed months
    state.day,
    state.hour,
    state.minute,
  );
}

/**
 * Builds an ordered array of display segments for the date (and optionally
 * time) input, using `Intl.DateTimeFormat.formatToParts` to resolve the
 * correct part order for the given locale.
 *
 * Each segment is either an editable unit (`day`, `month`, `year`, `hour`,
 * `minute`) or a non-interactive separator (`literal`). Empty literals are
 * filtered out to avoid rendering invisible nodes.
 *
 * When `withTime` is `true`, time segments are appended after a double-space
 * literal separator so they can be visually distinguished from date segments
 * without introducing a hard-coded character.
 *
 * @param state - Current `DateState` used as the formatting probe date.
 * @param locale - BCP 47 locale tag (e.g. `"en-US"`, `"fr-FR"`) that controls
 *   the segment order returned by `Intl.DateTimeFormat`.
 * @param withTime - When `true`, hour and minute segments are appended.
 * @returns An ordered `ISegment[]` array ready to be rendered.
 *
 * @example
 * // French locale → day before month
 * buildSegments({ day: 28, month: 3, year: 2026, hour: 9, minute: 54 }, "fr-FR", true);
 * // → [
 * //     { type: "day",     value: "28" },
 * //     { type: "literal", value: "/"  },
 * //     { type: "month",   value: "03" },
 * //     { type: "literal", value: "/"  },
 * //     { type: "year",    value: "2026" },
 * //     { type: "literal", value: "  " },   ← date/time separator
 * //     { type: "hour",    value: "09" },
 * //     { type: "literal", value: ":"  },
 * //     { type: "minute",  value: "54" },
 * //   ]
 */
export function buildSegments(
  state: DateState,
  locale: string,
  withTime: boolean,
): ISegment[] {
  // Format only the date parts (day / month / year) in locale order
  const dateFormatter = new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  // Format only the time parts (hour / minute) using 24-hour clock so
  // we never have to deal with am/pm segments
  const timeFormatter = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  // Use the current state as the probe date so formatted values match
  // what is actually stored
  const probe = stateToDate(state);

  const dateParts = dateFormatter
    .formatToParts(probe)
    // Discard whitespace-only literals to avoid invisible DOM nodes
    .filter((p) => p.type !== "literal" || p.value.trim() !== "")
    .map((p): ISegment => {
      if (p.type === "day") return { type: "day", value: p.value };
      if (p.type === "month") return { type: "month", value: p.value };
      if (p.type === "year") return { type: "year", value: p.value };

      // Any remaining part (e.g. "/" or ".") becomes a non-interactive literal
      return { type: "literal", value: p.value };
    });

  // Return date-only segments when time display is not requested
  if (!withTime) return dateParts;

  const timeParts = timeFormatter
    .formatToParts(probe)
    .filter((p) => p.type !== "literal" || p.value.trim() !== "")
    .map((p): ISegment => {
      if (p.type === "hour") return { type: "hour", value: p.value };
      if (p.type === "minute") return { type: "minute", value: p.value };
      return { type: "literal", value: p.value };
    });

  // Separate date and time groups with a double-space literal so they are
  // visually distinct without coupling to any locale-specific character
  return [...dateParts, { type: "literal", value: "  " }, ...timeParts];
}

/**
 * Applies a new `DateState` to both the internal React state and the
 * external `onChange` callback, respecting the controlled / uncontrolled
 * pattern.
 *
 * - **Uncontrolled**: updates `internalState` directly so the component
 *   re-renders with the new value.
 * - **Controlled**: skips the internal update and lets the parent drive the
 *   value through the `onChange` → `value` prop cycle.
 * - In both modes, `onChange` is always called when provided, so consumers
 *   receive every change regardless of control mode.
 *
 * @param isControlled - Whether the component is in controlled mode
 *   (`value` prop is defined).
 * @param next - The new `DateState` to commit.
 * @param setInternalState - React `useState` setter for the internal state.
 * @param onChange - Optional external change handler provided by the consumer.
 */
export const commitState = (
  isControlled: boolean,
  next: DateState,
  setInternalState: (value: React.SetStateAction<DateState>) => void,
  onChange: ((date: Date) => void) | undefined,
) => {
  // Only mutate internal state when uncontrolled; controlled components rely
  // on the parent re-rendering with the updated `value` prop
  if (!isControlled) setInternalState(next);

  // Always fire onChange so the consumer can react in both modes
  onChange?.(stateToDate(next));
};

/**
 * Clamps a raw numeric value to the valid range for a given date/time segment.
 *
 * Ranges are looked up from `SegmentRanges`, whose `max` functions accept the
 * full `DateState` so month-aware day limits (e.g., 28 for February) can be
 * applied in the future without changing this function's signature.
 *
 * @param val - The raw number to clamp (e.g. from a keyboard buffer).
 * @param seg - The target segment type (excludes `"literal"`).
 * @param internalState - The current `DateState`, forwarded to the `max`
 *   function so context-sensitive limits can be computed.
 * @returns The value clamped to `[min, max]` for the given segment.
 *
 * @example
 * clamp(45, "month", state); // → 12
 * clamp(0,  "day",   state); // → 1
 * clamp(7,  "hour",  state); // → 7
 */
export const clamp = (
  val: number,
  seg: Exclude<TDateSegmentType, "literal">,
  internalState: DateState,
): number => {
  const { min, max } = SegmentRanges[seg];
  return Math.min(Math.max(val, min), max(internalState));
};
