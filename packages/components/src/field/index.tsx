"use client";

import React from "react";

import { FieldProvider, useField } from "./hooks";

import { Badge } from "../badge";
import { Button } from "../button";

import {
  Fieldset,
  Sup,
  Input,
  HiddenInput,
  Label,
  Def,
  Muted,
  ParentContainer,
  ParentWrapper,
  InnerDivider,
  InnerWrapper,
  InnerTrigger,
  InnerSegment,
  RangeWrapper,
  RangeInput,
  RangeValue,
} from "./styles";

import {
  IReactChildren,
  ComponentSizeEnum,
  ComponentVariantEnum,
  ComponentShapeEnum,
} from "../../../../types";
import { TDateSegmentType, ISegment, SegmentRanges, DateState } from "./types";
import { dateToState, buildSegments, commitState, clamp } from "./utils";

import type {
  IField,
  IFieldAddon,
  IFieldCurrency,
  IFieldDate,
  IFieldFile,
  IFieldLabel,
  IFieldMeta,
  IFieldNumber,
  IFieldPassword,
  IFieldRange,
  IFieldTag,
  PrivacyType,
} from "./types";
import { MetaVariantEnum } from "./types";

export interface IFieldComposition {
  Root: typeof FieldRoot;
  Wrapper: typeof FieldWrapper;
  Label: typeof FieldLabel;
  Meta: typeof FieldMeta;
  Number: typeof FieldNumber;
  Date: typeof FieldDate;
  File: typeof FieldFile;
  Password: typeof FieldPassword;
  Currency: typeof FieldCurrency;
  Tag: typeof FieldTag;
}

/** Chevron glyph used by the numeric increment/decrement controls. */
const ChevronIcon = ({ direction }: { direction: "up" | "down" }) => (
  <svg
    width="8"
    height="4"
    viewBox="0 0 10 6"
    fill="none"
    style={{
      transform: direction === "up" ? "rotate(180deg)" : "none",
    }}
    aria-hidden="true"
  >
    <path
      d="M1 1L5 5L9 1"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Renders the trailing addon of an input.
 *
 * - `suffix` only: static suffix text, separated by a divider.
 * - `controls` only: increment / decrement chevrons.
 * - `controls` + `suffix`: chevrons only, the suffix is not rendered
 *   (mirrors `Field.Number` behaviour).
 */
const FieldAddon = ({
  raw,
  error,
  variant,
  shape,
  suffix,
  controls,
  onStep,
}: IFieldAddon) => {
  if (!suffix && !controls) return null;

  return (
    <InnerWrapper
      data-raw={Boolean(raw)}
      data-error={Boolean(error)}
      data-variant={variant}
      data-shape={shape}
      data-multiple="true"
    >
      {!controls && suffix && (
        <React.Fragment>
          <InnerDivider data-raw={Boolean(raw)} />
          <InnerTrigger
            className="fs-small-60"
            type="button"
            data-raw={Boolean(raw)}
            data-suffix="true"
            tabIndex={-1}
          >
            {suffix}
          </InnerTrigger>
        </React.Fragment>
      )}
      {controls && (
        <React.Fragment>
          <InnerTrigger
            type="button"
            aria-label="Increment"
            data-raw={Boolean(raw)}
            onClick={() => onStep?.("up")}
            tabIndex={-1}
          >
            <ChevronIcon direction="up" />
          </InnerTrigger>
          <InnerDivider data-raw={Boolean(raw)} />
          <InnerTrigger
            type="button"
            aria-label="Decrement"
            data-raw={Boolean(raw)}
            onClick={() => onStep?.("down")}
            tabIndex={-1}
          >
            <ChevronIcon direction="down" />
          </InnerTrigger>
        </React.Fragment>
      )}
    </InnerWrapper>
  );
};

/**
 * Fields are input element that provides additional functionality such as error and hint messages.
 *
 * **Best practices:**
 *
 * - Provide clear and descriptive labels for all input elements.
 * - Ensure that error and hint messages are visible and easily identifiable by users.
 *
 * @param {IField} props - The props for the Field component.
 * @param {boolean} props.raw - Define whether the component is styled or not.
 * @param {ComponentSizeEnum} props.sizing - The size of the component. Defaults to `medium`.
 * @param {string} props.variant - The style definition used by the component.
 * @param {TComponentShape} props.shape - The size of the component. Defaults to `smooth`.
 * @param {string} props.error - The error message to display.
 * @param {string} props.hint - The hint message to display.
 * @param {string} props.suffix - Static text displayed at the end of the input.
 * @param {boolean} props.controls - Display increment/decrement controls.
 * @returns {ReactElement} The Field component.
 */
const Field = (props: IField) => {
  const {
    raw,
    sizing = ComponentSizeEnum.Medium,
    variant = ComponentVariantEnum.Secondary,
    shape = ComponentShapeEnum.Smooth,
    error,
    hint,
    suffix,
    controls,
    ...restProps
  } = props;

  const metaId = React.useId();
  const { id } = useField();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleStep = (direction: "up" | "down") => {
    const el = inputRef.current;
    if (!el) return;
    direction === "up" ? el.stepUp() : el.stepDown();
    // React listens to `input` for controlled/uncontrolled change tracking
    el.dispatchEvent(new Event("input", { bubbles: true }));
  };

  const hasAddon = Boolean(suffix || controls);

  return (
    <ParentContainer data-raw={Boolean(raw)}>
      <Input
        ref={inputRef}
        id={id}
        aria-invalid={!!error}
        aria-describedby={metaId}
        aria-errormessage={error}
        data-error={Boolean(error)}
        data-variant={variant}
        data-size={sizing}
        data-shape={shape}
        data-raw={Boolean(raw)}
        data-addon={hasAddon}
        {...restProps}
      />
      <FieldAddon
        raw={raw}
        error={error}
        variant={variant}
        shape={shape}
        suffix={suffix}
        controls={controls}
        onStep={handleStep}
      />
      {(error ?? hint) && (
        <FieldMeta
          raw={raw}
          data-variant={error ? MetaVariantEnum.Error : MetaVariantEnum.Hint}
        >
          {error ?? hint}
        </FieldMeta>
      )}
    </ParentContainer>
  );
};
Field.displayName = "Field";

const FieldRoot = ({ children }: IReactChildren) => {
  return <FieldProvider>{children}</FieldProvider>;
};
FieldRoot.displayName = "Field.Root";

const FieldWrapper = ({
  children,
  ...restProps
}: IReactChildren & React.ComponentProps<"fieldset">) => {
  return <Fieldset {...restProps}>{children}</Fieldset>;
};
FieldWrapper.displayName = "Field.Wrapper";

/**
 * Labels are component used to describe the expected value of an input.
 *
 * **Best practices:**
 *
 * - Provide a clear and descriptive label for each input.
 * - The `required` criteria of an input must be reflected in the label.
 *
 * @param {IFieldLabel} props - The props for the Field.Label component.
 * @param {boolean} props.raw - Define whether the component is styled or not.
 * @param {boolean} props.optional - Whether the form field is required or not.
 * @param {string} props.children - The label text.
 * @returns {ReactElement} The Field.Label component.
 */
const FieldLabel = (props: IFieldLabel) => {
  const { raw, optional = false, children, ...restProps } = props;
  const { id } = useField();

  return (
    <Label htmlFor={id} data-raw={Boolean(raw)} {...restProps}>
      {children}
      {!optional && <Sup>*</Sup>}
    </Label>
  );
};
FieldLabel.displayName = "Field.Label";

/**
 * Meta are component used to bring more context about an input's usage.
 *
 * @param {IFieldMeta} props - The props for the Field.Meta component.
 * @param {boolean} props.raw - Define whether the component is styled or not.
 * @param {TMetaVariant} props.variant - The style definition used by the component.
 * @param {string} props.children - The meta text.
 * @returns {ReactElement} The Field.Meta component.
 */
const FieldMeta = (props: IFieldMeta) => {
  const {
    raw,
    variant = MetaVariantEnum.Emphasis,
    children,
    id: idProp,
    ...restProps
  } = props;

  const generatedId = React.useId();
  const metaId = idProp ?? generatedId;
  const { id } = useField();

  return (
    <Def
      id={metaId}
      aria-details={id}
      data-variant={variant}
      data-raw={Boolean(raw)}
      {...restProps}
    >
      {children}
    </Def>
  );
};
FieldMeta.displayName = "Field.Meta";

/**
 * Field.Number is a numeric input field with increment/decrement controls.
 *
 * **Best practices:**
 *
 * - Provide clear and descriptive labels for all numeric inputs.
 * - Use `min`, `max`, and `step` props to constrain valid values.
 *
 * @param {IFieldNumber} props - The props for the Field.Number component.
 * @param {boolean} props.raw - Define whether the component is styled or not.
 * @param {boolean} props.controls - Display increment/decrement controls.
 * @param {string} props.suffix - Static suffix. Hidden when `controls` is set.
 * @param {ComponentSizeEnum} props.sizing - The size of the component. Defaults to `medium`.
 * @param {string} props.variant - The style definition used by the component.
 * @param {TComponentShape} props.shape - The shape of the component. Defaults to `smooth`.
 * @returns {ReactElement} The Field.Number component.
 */
const FieldNumber = (props: IFieldNumber) => {
  const {
    raw,
    controls,
    suffix,
    sizing = ComponentSizeEnum.Medium,
    variant = ComponentVariantEnum.Secondary,
    shape = ComponentShapeEnum.Smooth,
    error,
    step = 1,
    ...restProps
  } = props;

  return (
    <Field
      type="number"
      raw={raw}
      sizing={sizing}
      variant={variant}
      shape={shape}
      error={error}
      step={step}
      suffix={suffix}
      controls={controls}
      {...restProps}
    />
  );
};
FieldNumber.displayName = "Field.Number";

/**
 * Field.Currency is a locale-aware monetary input built on `Intl.NumberFormat`.
 * The displayed text is always grouped (e.g. `1 234,51`) while the emitted
 * value is a plain `number` (e.g. `1234.51`), or `null` when empty.
 *
 * **Best practices:**
 *
 * - Pair with `Field.Label` so screen readers announce the field correctly.
 * - Pass `locale` to match the user's regional number format.
 * - Use `min` / `max` to constrain the accepted amount.
 *
 * @param {IFieldCurrency} props - The props for the Field.Currency component.
 * @param {boolean} props.raw - Define whether the component is styled or not.
 * @param {ComponentSizeEnum} props.sizing - The size of the component. Defaults to `medium`.
 * @param {string} props.variant - The style definition used by the component.
 * @param {TComponentShape} props.shape - The shape of the component. Defaults to `smooth`.
 * @param {number | null} props.value - Controlled amount.
 * @param {number | null} props.defaultValue - Uncontrolled initial amount.
 * @param {(value: number | null) => void} props.onChange - Called when the parsed amount changes.
 * @param {string} props.currency - ISO 4217 code. Defaults to `EUR`.
 * @param {string} props.locale - BCP 47 locale tag. Defaults to browser locale.
 * @param {string} props.suffix - Static suffix displayed at the end of the input.
 * @param {number} props.min - Minimum accepted amount (applied on blur).
 * @param {number} props.max - Maximum accepted amount (applied on blur).
 * @param {number} props.step - ArrowUp/ArrowDown increment. Defaults to one minor unit.
 * @param {boolean} props.allowNegative - Allow negative amounts. Defaults to `false`.
 * @returns {ReactElement} The Field.Currency component.
 */
const FieldCurrency = (props: IFieldCurrency) => {
  const {
    raw,
    sizing = ComponentSizeEnum.Medium,
    variant = ComponentVariantEnum.Secondary,
    shape = ComponentShapeEnum.Smooth,
    error,
    value,
    suffix,
    defaultValue,
    onChange,
    currency = "EUR",
    locale = typeof globalThis.navigator !== "undefined"
      ? globalThis.navigator.language
      : "en-US",
    min,
    max,
    step,
    allowNegative = false,
    disabled,
    onFocus,
    onBlur,
    onKeyDown,
    id: idProp,
    ...restProps
  } = props;

  const { id: contextId } = useField();
  const id = idProp ?? contextId;
  const currencyId = React.useId();

  const isControlled = value !== undefined;
  const isFocusedRef = React.useRef(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const caretRef = React.useRef<number | null>(null);

  // Derive locale/currency specifics from the native Intl API
  const { digits, decimal, group, formatter, intFormatter } =
    React.useMemo(() => {
      const currencyFormat = new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
      });
      const fractionDigits = currencyFormat.resolvedOptions()
        .maximumFractionDigits as number;

      const parts = new Intl.NumberFormat(locale, {
        minimumFractionDigits: 1,
      }).formatToParts(11111.1);

      return {
        digits: fractionDigits,
        decimal: parts.find((p) => p.type === "decimal")?.value ?? ".",
        group: parts.find((p) => p.type === "group")?.value ?? ",",
        intFormatter: new Intl.NumberFormat(locale, {
          maximumFractionDigits: 0,
          useGrouping: true,
        }),
        formatter: new Intl.NumberFormat(locale, {
          style: "decimal",
          minimumFractionDigits: fractionDigits,
          maximumFractionDigits: fractionDigits,
        }),
      };
    }, [locale, currency]);

  const unit = 10 ** -digits;
  const stepValue = step ?? unit;

  const round = React.useCallback(
    (n: number) => Math.round(n * 10 ** digits) / 10 ** digits,
    [digits],
  );

  const bound = React.useCallback(
    (n: number) => {
      let next = n;
      if (!allowNegative && next < 0) next = 0;
      if (min !== undefined) next = Math.max(min, next);
      if (max !== undefined) next = Math.min(max, next);
      return next;
    },
    [allowNegative, min, max],
  );

  // Locale-formatted text -> number (null when not a complete number)
  const parse = React.useCallback(
    (text: string): number | null => {
      const normalized = text
        .split(group)
        .join("")
        .split(decimal)
        .join(".")
        .replace(/[^\d.-]/g, "");
      if (normalized === "" || normalized === "-" || normalized === ".")
        return null;
      const n = Number(normalized);
      return Number.isFinite(n) ? n : null;
    },
    [decimal, group],
  );

  // Number -> fully padded display ("1 234,50")
  const format = React.useCallback(
    (n: number | null) => (n === null ? "" : formatter.format(n)),
    [formatter],
  );

  // Strip anything that is not a digit, a single decimal separator, or a sign
  const sanitize = React.useCallback(
    (text: string) => {
      let out = "";
      let hasDecimal = false;
      let decimals = 0;

      for (const [i, char] of Array.from(text).entries()) {
        if (/\d/.test(char)) {
          if (hasDecimal) {
            if (decimals >= digits) continue;
            decimals++;
          }
          out += char;
        } else if (
          digits > 0 &&
          !hasDecimal &&
          (char === decimal ||
            ((char === "." || char === ",") && char !== group))
        ) {
          hasDecimal = true;
          out += decimal;
        } else if (char === "-" && allowNegative && i === 0) {
          out += char;
        }
      }
      return out;
    },
    [digits, decimal, group, allowNegative],
  );

  // Sanitized raw string ("1234,5") -> grouped display ("1 234,5").
  // Decimals are left untouched so the user can keep typing them.
  const formatLive = React.useCallback(
    (rawText: string) => {
      const negative = rawText.startsWith("-");
      const body = negative ? rawText.slice(1) : rawText;
      if (body === "") return negative ? "-" : "";

      const [int = "", frac] = body.split(decimal);
      const grouped = intFormatter.format(BigInt(int || "0"));

      return `${negative ? "-" : ""}${grouped}${
        frac !== undefined ? decimal + frac : ""
      }`;
    },
    [decimal, intFormatter],
  );

  // Number -> live-formatted display (no decimal padding)
  const fromNumber = React.useCallback(
    (n: number | null) =>
      n === null ? "" : formatLive(String(n).replace(".", decimal)),
    [formatLive, decimal],
  );

  const [amount, setAmount] = React.useState<number | null>(
    () => (isControlled ? value : defaultValue) ?? null,
  );
  const [text, setText] = React.useState<string>(() => format(amount));

  const commit = (next: number | null) => {
    if (!isControlled) setAmount(next);
    onChange?.(next);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const el = e.target;
    const rawText = sanitize(el.value);
    const formatted = formatLive(rawText);

    // Number of meaningful chars (digits, decimal, sign) before the caret
    const caret = el.selectionStart ?? el.value.length;
    const significant = sanitize(el.value.slice(0, caret)).length;

    // Map it onto the formatted string, skipping inserted separators
    let seen = 0;
    let pos = 0;
    while (pos < formatted.length && seen < significant) {
      if (/\d|-/.test(String(formatted[pos])) || formatted[pos] === decimal)
        seen++;
      pos++;
    }
    caretRef.current = pos;

    setText(formatted);

    const parsed = parse(rawText);
    commit(parsed === null ? null : round(parsed));
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    isFocusedRef.current = true;
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    isFocusedRef.current = false;
    const parsed = parse(text);

    if (parsed === null) {
      setText("");
      if (amount !== null) commit(null);
    } else {
      const clamped = round(bound(parsed));
      setText(format(clamped));
      if (clamped !== amount) commit(clamped);
    }
    onBlur?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!disabled && (e.key === "ArrowUp" || e.key === "ArrowDown")) {
      e.preventDefault();
      const delta = e.key === "ArrowUp" ? stepValue : -stepValue;
      const next = round(bound((parse(text) ?? 0) + delta));

      setText(fromNumber(next));
      commit(next);
    }
    onKeyDown?.(e);
  };

  // Restore the caret after a live reformat
  React.useLayoutEffect(() => {
    const el = inputRef.current;
    if (el && caretRef.current !== null && document.activeElement === el) {
      el.setSelectionRange(caretRef.current, caretRef.current);
    }
    caretRef.current = null;
  }, [text]);

  // Controlled value -> display (live format while focused, padded otherwise)
  React.useEffect(() => {
    if (!isControlled) return;
    setAmount(value);
    if (isFocusedRef.current) {
      if (parse(text) !== value) setText(fromNumber(value));
    } else setText(format(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isControlled, value]);

  // Re-format when locale / currency change
  React.useEffect(() => {
    if (!isFocusedRef.current) setText(format(amount));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [format]);

  return (
    <Field
      id={id}
      type="text"
      inputMode={digits > 0 ? "decimal" : "numeric"}
      autoComplete="off"
      autoCorrect="off"
      spellCheck={false}
      raw={raw}
      sizing={sizing}
      variant={variant}
      shape={shape}
      error={error}
      disabled={disabled}
      value={text}
      suffix={suffix}
      aria-describedby={currencyId}
      data-currency={currency}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      {...restProps}
      ref={inputRef}
    />
  );
};
FieldCurrency.displayName = "Field.Currency";

/**
 * Field.Date is a segmented date (and optionally time) input driven by `Intl.DateTimeFormat`.
 *
 * **Best practices:**
 *
 * - Pair with `Field.Label` so screen readers announce the field correctly.
 * - Pass `locale` to match the user's regional date format.
 * - Use `withTime` when you need both date and time selection.
 *
 * @param {IFieldDate} props
 * @param {ComponentSizeEnum} props.sizing - The size of the component. Defaults to `medium`.
 * @param {string} props.variant - The style definition used by the component.
 * @param {TComponentShape} props.shape - The size of the component. Defaults to `smooth`.
 * @param {Date} props.value - Controlled date value.
 * @param {Date} props.defaultValue - Uncontrolled initial value.
 * @param {(date: Date) => void} props.onChange - Called on every segment change.
 * @param {string} props.locale - BCP 47 locale tag. Defaults to browser locale.
 * @param {boolean} props.withTime - Show hour/minute segments. Defaults to false.
 * @param {string} props.suffix - Static suffix displayed at the end of the input.
 */
const FieldDate = (props: IFieldDate) => {
  const {
    raw,
    sizing = ComponentSizeEnum.Medium,
    variant = ComponentVariantEnum.Secondary,
    shape = ComponentShapeEnum.Smooth,
    error,
    value,
    defaultValue,
    onChange,
    locale = typeof globalThis.navigator !== "undefined"
      ? globalThis.navigator.language
      : "en-US",
    withTime = false,
    disabled = false,
    id: idProp,
    suffix,
  } = props;

  const { id: contextId } = useField();
  const id = idProp ?? contextId;

  const isControlled = value !== undefined;

  const metaId = React.useId();

  // Accumulates digit keypresses within a single segment before committing,
  // allowing e.g. typing "1" then "2" to produce "12" for the day segment
  const bufferRef = React.useRef<string>("");

  // Map of segment type -> DOM element, used for programmatic focus
  const segmentRefs = React.useRef<
    Map<Exclude<TDateSegmentType, "literal">, HTMLSpanElement | null>
  >(new Map());

  const [internalState, setInternalState] = React.useState<DateState>(() =>
    dateToState(defaultValue ?? value ?? new Date()),
  );
  // Source of truth for the highlighted cell. Kept in sync with real DOM focus
  // through onFocus/onBlur below.
  const [focusedSegment, setFocusedSegment] = React.useState<Exclude<
    TDateSegmentType,
    "literal"
  > | null>(null);

  const segments = buildSegments(internalState, locale, withTime);

  // Ordered list of focusable segment types, excluding non-interactive literals
  const editableSegments = segments
    .filter(
      (s): s is ISegment & { type: Exclude<TDateSegmentType, "literal"> } =>
        s.type !== "literal",
    )
    .map((s) => s.type);

  const focusSegmentByType = (
    type: Exclude<TDateSegmentType, "literal"> | undefined,
  ) => {
    if (!type) return;
    segmentRefs.current.get(type)?.focus();
  };

  const stepSegment = (
    seg: Exclude<TDateSegmentType, "literal">,
    delta: number,
  ) => {
    const { min, max } = SegmentRanges[seg];

    const current = internalState[seg];
    const range = max(internalState) - min + 1;
    // Wrap around using modulo so incrementing past max rolls back to min
    const next = ((((current - min + delta) % range) + range) % range) + min;

    commitState(
      isControlled,
      { ...internalState, [seg]: next },
      setInternalState,
      onChange,
    );
  };

  // Chevron controls step the currently focused segment (or the first one
  // when nothing is focused), mirroring ArrowUp/ArrowDown on the keyboard.
  const handleControlStep = (direction: "up" | "down") => {
    const target = focusedSegment ?? editableSegments[0];
    if (!target || disabled) return;
    bufferRef.current = "";
    stepSegment(target, direction === "up" ? 1 : -1);
    focusSegmentByType(target);
  };

  const handleSegmentKeyDown = (
    e: React.KeyboardEvent<HTMLSpanElement>,
    seg: Exclude<TDateSegmentType, "literal">,
  ) => {
    if (disabled) return;

    const idx = editableSegments.indexOf(seg);

    switch (e.key) {
      case "ArrowUp": {
        e.preventDefault();
        bufferRef.current = "";
        stepSegment(seg, 1);
        break;
      }
      case "ArrowDown": {
        e.preventDefault();
        bufferRef.current = "";
        stepSegment(seg, -1);
        break;
      }
      // Move to the previous segment and reset the buffer
      case "ArrowLeft":
      case "Backspace": {
        e.preventDefault();
        bufferRef.current = "";
        if (idx > 0) focusSegmentByType(editableSegments[idx - 1]);
        break;
      }
      // ArrowRight advances manually; Tab is left to bubble for natural focus
      case "ArrowRight": {
        e.preventDefault();
        bufferRef.current = "";
        if (idx < editableSegments.length - 1)
          focusSegmentByType(editableSegments[idx + 1]);
        break;
      }
      default: {
        if (/^\d$/.test(e.key)) {
          e.preventDefault();
          bufferRef.current += e.key;
          const num = parseInt(bufferRef.current, 10);
          const { max } = SegmentRanges[seg];
          const maxVal = max(internalState);
          const clamped = clamp(num, seg, internalState);

          commitState(
            isControlled,
            { ...internalState, [seg]: clamped },
            setInternalState,
            onChange,
          );

          // Auto-advance when adding another digit would inevitably overflow,
          // or when the buffer has reached the maximum digit count for the segment
          const maxDigits = String(maxVal).length;
          const willOverflow =
            parseInt(bufferRef.current + "0", 10) > maxVal ||
            bufferRef.current.length >= maxDigits;

          if (willOverflow) {
            bufferRef.current = "";
            if (idx < editableSegments.length - 1)
              focusSegmentByType(editableSegments[idx + 1]);
          }
        }
      }
    }
  };

  /**
   * Focuses the first editable segment when the user clicks anywhere on the
   * wrapper that is not already a segment cell.
   */
  const handleWrapperClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).dataset.segment) return;

    // Defer so the browser finishes the click before we move focus
    setTimeout(() => {
      focusSegmentByType(editableSegments[0]);
    }, 0);
  };

  // Sync controlled value -> internal state when parent updates it
  React.useEffect(() => {
    if (isControlled && value) setInternalState(dateToState(value));
  }, [isControlled, value]);

  return (
    <ParentContainer data-raw={Boolean(raw)}>
      <ParentWrapper
        id={id}
        role="group"
        aria-label="Date input"
        aria-invalid={!!error}
        aria-describedby={metaId}
        data-error={Boolean(error)}
        data-variant={variant}
        data-size={sizing}
        data-shape={shape}
        data-raw={Boolean(raw)}
        data-disabled={disabled}
        data-addon={Boolean(suffix)}
        onClick={handleWrapperClick}
      >
        {segments.map((seg, i) => {
          if (seg.type === "literal") {
            return (
              <Muted
                key={`literal-${i}`}
                data-raw={Boolean(raw)}
                aria-hidden="true"
              >
                {seg.value}
              </Muted>
            );
          }

          const editableType = seg.type as Exclude<TDateSegmentType, "literal">;
          const isFocused = focusedSegment === editableType;

          return (
            <InnerSegment
              key={editableType}
              ref={(el: HTMLSpanElement | null) => {
                segmentRefs.current.set(editableType, el);
              }}
              role="spinbutton"
              aria-label={editableType}
              aria-valuenow={internalState[editableType]}
              aria-valuemin={SegmentRanges[editableType].min}
              aria-valuemax={SegmentRanges[editableType].max(internalState)}
              aria-disabled={disabled}
              tabIndex={disabled ? -1 : 0}
              data-raw={Boolean(raw)}
              data-focused={isFocused}
              className="p-y-small-30 p-x-small-80"
              // Guard attribute checked by handleWrapperClick to avoid
              // double-focusing when the click lands directly on a segment
              data-segment={editableType}
              onFocus={() => {
                setFocusedSegment(editableType);
                bufferRef.current = "";
              }}
              onBlur={() => {
                setFocusedSegment((current) =>
                  current === editableType ? null : current,
                );
                bufferRef.current = "";
              }}
              onKeyDown={(e: React.KeyboardEvent<HTMLSpanElement>) =>
                handleSegmentKeyDown(e, editableType)
              }
            >
              {seg.value}
            </InnerSegment>
          );
        })}
      </ParentWrapper>

      <FieldAddon
        raw={raw}
        error={error}
        variant={variant}
        shape={shape}
        suffix={suffix}
        onStep={handleControlStep}
      />
    </ParentContainer>
  );
};
FieldDate.displayName = "Field.Date";

/**
 * Field.File is a file upload field composed of a read-only text input that
 * displays the selected filename and a trigger button that opens the native
 * file picker.
 *
 * **Best practices:**
 *
 * - Pair with `Field.Label` so screen readers announce the field correctly.
 * - Use `accept` to constrain the file types shown in the picker.
 * - Reflect allowed formats and size limits in a `Field.Meta` hint.
 *
 * @param {IFieldFile} props
 * @param {ComponentSizeEnum} props.sizing - The size of the component. Defaults to `medium`.
 * @param {string} props.variant - The style definition used by the component.
 * @param {TComponentShape} props.shape - The size of the component. Defaults to `smooth`.
 * @param {React.ReactNode} props.trigger - Content for the upload button.
 * @param {(files: FileList | null) => void} props.onFileChange - Called with the selected `FileList` after the user picks files.
 */
const FieldFile = (props: IFieldFile) => {
  const {
    raw,
    sizing = ComponentSizeEnum.Medium,
    variant = ComponentVariantEnum.Secondary,
    shape = ComponentShapeEnum.Smooth,
    error,
    trigger,
    onFileChange,
    disabled,
    accept,
    multiple,
    onClick,
    onKeyDown,
    ...restProps
  } = props;

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = React.useState<string>("");

  const handleTriggerClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const names = Array.from(files)
        .map((f) => f.name)
        .join(", ");

      setFileName(names);
    } else setFileName("");

    onFileChange?.(files);
  };

  const handleFieldClick = (e: React.MouseEvent<HTMLInputElement>) => {
    handleTriggerClick();
    onClick?.(e);
  };

  const handleFieldKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      fileInputRef.current?.click();
    }
    onKeyDown?.(e);
  };

  return (
    <React.Fragment>
      <input
        ref={fileInputRef}
        type="file"
        aria-hidden="true"
        tabIndex={-1}
        disabled={disabled}
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      <ParentContainer data-raw={Boolean(raw)}>
        <Field
          type="text"
          readOnly
          raw={raw}
          sizing={sizing}
          variant={variant}
          shape={shape}
          error={error}
          disabled={disabled}
          value={fileName}
          onClick={handleFieldClick}
          onKeyDown={handleFieldKeyDown}
          {...restProps}
        />
        {trigger && (
          <InnerWrapper
            data-raw={Boolean(raw)}
            data-error={Boolean(error)}
            data-variant={variant}
            data-shape={shape}
          >
            <InnerTrigger
              type="button"
              data-raw={Boolean(raw)}
              data-shape={shape}
              data-error={Boolean(error)}
              disabled={disabled}
              variant={variant}
              onClick={handleTriggerClick}
              aria-label={
                typeof trigger === "string" ? trigger : "file-upload-trigger"
              }
            >
              {trigger}
            </InnerTrigger>
          </InnerWrapper>
        )}
      </ParentContainer>
    </React.Fragment>
  );
};
FieldFile.displayName = "Field.File";

/**
 * Field.Password is a text input that toggles the visibility of its value
 * between plain text and masked characters.
 *
 * **Best practices:**
 *
 * - Pair with `Field.Label` so screen readers announce the field correctly.
 * - Avoid setting `autoComplete` to a value that would expose sensitive data.
 * - Use `defaultType` to control the initial visibility state of the field.
 *
 * @param {IFieldPassword} props - The props for the Field.Password component.
 * @param {boolean} props.raw - Define whether the component is styled or not.
 * @param {ComponentSizeEnum} props.sizing - The size of the component. Defaults to `medium`.
 * @param {string} props.variant - The style definition used by the component.
 * @param {TComponentShape} props.shape - The shape of the component. Defaults to `smooth`.
 * @param {string} props.error - The error message to display.
 * @param {boolean} props.disabled - Whether the input is disabled.
 * @param {PrivacyType} props.defaultType - The initial input type. Defaults to `password`.
 * @returns {ReactElement} The Field.Password component.
 */
const FieldPassword = (props: IFieldPassword) => {
  const {
    raw,
    sizing = ComponentSizeEnum.Medium,
    variant = ComponentVariantEnum.Secondary,
    shape = ComponentShapeEnum.Smooth,
    error,
    disabled,
    defaultType,
    ...restProps
  } = props;

  const [type, setType] = React.useState<PrivacyType>(
    defaultType ?? "password",
  );

  const handleChangeType = React.useCallback(() => {
    setType((prev) => (prev === "text" ? "password" : "text"));
  }, []);

  const ShowIcon = () => (
    <React.Fragment>
      <path d="M2.42 12.713c-.136-.215-.204-.323-.242-.49a1.173 1.173 0 0 1 0-.446c.038-.167.106-.274.242-.49C3.546 9.505 6.895 5 12 5s8.455 4.505 9.58 6.287c.137.215.205.323.243.49.029.125.029.322 0 .446-.038.167-.106.274-.242.49C20.455 14.495 17.105 19 12 19c-5.106 0-8.455-4.505-9.58-6.287Z" />
      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
    </React.Fragment>
  );
  const HideIcon = () => (
    <React.Fragment>
      <path d="M10.743 5.092C11.149 5.032 11.569 5 12 5c5.105 0 8.455 4.505 9.58 6.287.137.215.205.323.243.49a1.16 1.16 0 0 1 0 .447c-.038.166-.107.274-.244.492-.3.474-.757 1.141-1.363 1.865M6.724 6.715c-2.162 1.467-3.63 3.504-4.303 4.57-.137.217-.205.325-.243.492a1.173 1.173 0 0 0 0 .446c.038.167.106.274.242.49C3.546 14.495 6.895 19 12 19c2.059 0 3.832-.732 5.289-1.723M3 3l18 18M9.88 9.879a3 3 0 1 0 4.243 4.243" />
    </React.Fragment>
  );

  return (
    <ParentContainer data-raw={Boolean(raw)}>
      <Field
        autoComplete="off"
        type={type}
        raw={raw}
        sizing={sizing}
        variant={variant}
        shape={shape}
        error={error}
        disabled={disabled}
        {...restProps}
      />
      <InnerWrapper
        data-raw={Boolean(raw)}
        data-error={Boolean(error)}
        data-variant={variant}
        data-shape={shape}
      >
        <InnerTrigger
          type="button"
          data-raw={Boolean(raw)}
          data-shape={shape}
          data-error={Boolean(error)}
          disabled={disabled}
          variant={variant}
          onClick={handleChangeType}
          aria-label="password-field-trigger"
        >
          <svg
            viewBox="0 0 24 24"
            width="var(--fontsize-medium-10)"
            height="var(--fontsize-medium-10)"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {type === "password" ? <ShowIcon /> : <HideIcon />}
          </svg>
        </InnerTrigger>
      </InnerWrapper>
    </ParentContainer>
  );
};
FieldPassword.displayName = "Field.Password";

/**
 * Field.Tag is a tag/chip input that lets users build a list of unique
 * string tokens by typing and pressing Enter.
 *
 * **Best practices:**
 *
 * - Pair with `Field.Label` so screen readers announce the field correctly.
 * - Provide a `placeholder` to hint at expected input.
 * - Use `defaultValue` for uncontrolled usage or `value` + `onChange` for controlled.
 * - Use `allowed` to restrict input to a predefined set of values.
 *
 * @param {IFieldTag} props
 * @param {boolean} props.raw - Define whether the component is styled or not.
 * @param {ComponentSizeEnum} props.sizing - The size of the component. Defaults to `medium`.
 * @param {string} props.variant - The style definition used by the component.
 * @param {TComponentShape} props.shape - The shape of the component. Defaults to `smooth`.
 * @param {string[]} props.value - Controlled tag list.
 * @param {string[]} props.defaultValue - Uncontrolled initial tag list.
 * @param {string[]} props.allowed - Optional allowlist; when provided only matching values can be added.
 * @param {(tags: string[]) => void} props.onChange - Called whenever the tag list changes.
 * @param {string} props.error - The error message to display.
 * @param {boolean} props.disabled - Whether the input is disabled.
 * @param {string} props.placeholder - Placeholder shown when the input is empty.
 */
const FieldTag = (props: IFieldTag) => {
  const {
    raw,
    sizing = ComponentSizeEnum.Medium,
    variant = ComponentVariantEnum.Secondary,
    shape = ComponentShapeEnum.Smooth,
    error,
    value,
    defaultValue,
    allowed,
    onChange,
    disabled = false,
    placeholder,
    id: idProp,
  } = props;

  const { id: contextId } = useField();
  const id = idProp ?? contextId;
  const metaId = React.useId();

  const isControlled = value !== undefined;

  const [internalTags, setInternalTags] = React.useState<string[]>(
    defaultValue ?? [],
  );
  const [inputValue, setInputValue] = React.useState("");
  const [focusedTagIndex, setFocusedTagIndex] = React.useState<number | null>(
    null,
  );

  const inputRef = React.useRef<HTMLInputElement>(null);
  const tagRefs = React.useRef<Map<number, HTMLSpanElement | null>>(new Map());

  const tags = isControlled ? value : internalTags;

  const commitTags = React.useCallback(
    (next: string[]) => {
      if (!isControlled) setInternalTags(next);
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  const addTag = React.useCallback(
    (label: string) => {
      const trimmed = label.trim();
      if (!trimmed) return;

      // Enforce uniqueness (case-insensitive)
      if (tags.some((t) => t.toLowerCase() === trimmed.toLowerCase())) {
        return;
      }

      // Enforce allowlist (case-insensitive)
      if (!allowed?.some((a) => a.toLowerCase() === trimmed.toLowerCase())) {
        return;
      }

      commitTags([...tags, trimmed]);
      setInputValue("");
    },
    [tags, commitTags, allowed],
  );

  const removeTag = React.useCallback(
    (index: number) => {
      const next = tags.filter((_, i) => i !== index);
      commitTags(next);
      setFocusedTagIndex(null);

      // Return focus to the text input after removal
      inputRef.current?.focus();
    },
    [tags, commitTags],
  );

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    if (e.key === "Enter") {
      e.preventDefault();
      addTag(inputValue);
      return;
    }

    // When backspace is pressed and input is empty, focus the last tag
    if (
      (e.key === "Backspace" || e.key === "Delete") &&
      inputValue === "" &&
      tags.length > 0
    ) {
      e.preventDefault();
      const lastIndex = tags.length - 1;
      setFocusedTagIndex(lastIndex);
      tagRefs.current.get(lastIndex)?.focus();
    }
  };

  const handleTagKeyDown = (
    e: React.KeyboardEvent<HTMLSpanElement>,
    index: number,
  ) => {
    if (disabled) return;

    switch (e.key) {
      case "Backspace":
      case "Delete": {
        e.preventDefault();
        removeTag(index);
        break;
      }
      case "ArrowLeft": {
        e.preventDefault();
        if (index > 0) {
          const prev = index - 1;
          setFocusedTagIndex(prev);
          tagRefs.current.get(prev)?.focus();
        }
        break;
      }
      case "ArrowRight": {
        e.preventDefault();
        if (index < tags.length - 1) {
          const next = index + 1;
          setFocusedTagIndex(next);
          tagRefs.current.get(next)?.focus();
        } else {
          // Move focus back to input when going past the last tag
          setFocusedTagIndex(null);
          inputRef.current?.focus();
        }
        break;
      }
      case "Escape": {
        e.preventDefault();
        setFocusedTagIndex(null);
        inputRef.current?.focus();
        break;
      }
    }
  };

  const handleWrapperClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // If the click wasn't on a tag or its remove button, focus the input
    const target = e.target as HTMLElement;
    if (!target.closest("[data-tag]")) {
      inputRef.current?.focus();
    }
  };

  React.useEffect(() => {
    if (isControlled && value) setInternalTags(value);
  }, [isControlled, value]);

  return (
    <ParentWrapper
      id={id}
      role="group"
      aria-invalid={!!error}
      aria-describedby={metaId}
      data-error={Boolean(error)}
      data-variant={variant}
      data-size={sizing}
      data-shape={shape}
      data-raw={Boolean(raw)}
      data-disabled={disabled}
      data-wrap="true"
      onClick={handleWrapperClick}
    >
      {tags.map((tag, index) => (
        <InnerSegment
          key={`${tag}-${index}`}
          ref={(el: HTMLSpanElement | null) => tagRefs.current.set(index, el)}
          role="option"
          aria-label={tag}
          aria-selected={focusedTagIndex === index}
          tabIndex={disabled ? -1 : -1}
          data-raw={Boolean(raw)}
          data-focused={focusedTagIndex === index}
          data-tag="true"
          onFocus={() => setFocusedTagIndex(index)}
          onBlur={() => setFocusedTagIndex(null)}
          onKeyDown={(e: React.KeyboardEvent<HTMLSpanElement>) =>
            handleTagKeyDown(e, index)
          }
        >
          <Badge sizing="small" variant="secondary">
            {tag}
            {!disabled && (
              <Button
                variant="ghost"
                sizing="small"
                aria-label={`Remove ${tag}`}
                data-tag="true"
                className="m-l-small-60"
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(index);
                }}
              >
                ×
              </Button>
            )}
          </Badge>
        </InnerSegment>
      ))}

      <HiddenInput
        ref={inputRef}
        type="text"
        value={inputValue}
        disabled={disabled}
        placeholder={tags.length === 0 ? placeholder : undefined}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInputValue(e.target.value)
        }
        onKeyDown={handleInputKeyDown}
      />
    </ParentWrapper>
  );
};
FieldTag.displayName = "Field.Tag";

/**
 * Field.Range is a slider input built on the native `<input type="range">`,
 * so keyboard, screen reader, and form behaviour come for free.
 *
 * **Accessibility:**
 *
 * - Native range semantics: arrow keys, Home/End, PageUp/PageDown.
 * - Pair with `Field.Label` (linked through `id`) so the slider is named.
 * - The current value is exposed via `aria-valuetext`, including the suffix.
 * - `aria-invalid` and `aria-describedby` reflect `error` / `hint`.
 * - Focus is visibly indicated on the thumb.
 *
 * @param {IFieldRange} props - The props for the Field.Range component.
 * @param {number} props.value - Controlled value.
 * @param {number} props.defaultValue - Uncontrolled initial value. Defaults to `min`.
 * @param {(value: number) => void} props.onChange - Called with the numeric value.
 * @param {number} props.min - Minimum value. Defaults to `0`.
 * @param {number} props.max - Maximum value. Defaults to `100`.
 * @param {number} props.step - Step increment. Defaults to `1`.
 * @param {string} props.suffix - Unit displayed with the value.
 * @param {boolean} props.showValue - Display the current value. Defaults to `true`.
 * @param {string} props.hint - Hint message to display.
 * @param {string} props.error - Error message to display.
 * @returns {ReactElement} The Field.Range component.
 */
const FieldRange = (props: IFieldRange) => {
  const {
    raw,
    value,
    defaultValue,
    sizing = ComponentSizeEnum.Medium,
    shape = ComponentShapeEnum.Smooth,
    onChange,
    min = 0,
    max = 100,
    step = 1,
    suffix,
    showValue = true,
    hint,
    error,
    disabled,
    id: idProp,
    ...restProps
  } = props;

  const { id: contextId } = useField();
  const id = idProp ?? contextId;
  const metaId = React.useId();

  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState<number>(
    () => defaultValue ?? min,
  );
  const current = isControlled ? value : internal;

  const percentage = max === min ? 0 : ((current - min) / (max - min)) * 100;
  const display = suffix ? `${current} ${suffix}` : String(current);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = Number(e.target.value);
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  return (
    <ParentContainer data-raw={Boolean(raw)}>
      <RangeWrapper data-raw={Boolean(raw)} data-disabled={Boolean(disabled)}>
        <RangeInput
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={current}
          onChange={handleChange}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={hint || error ? metaId : undefined}
          aria-valuetext={display}
          data-raw={Boolean(raw)}
          data-error={Boolean(error)}
          data-size={sizing}
          data-shape={shape}
          style={{
            ["--range-progress" as string]: `${percentage}%`,
          }}
          {...restProps}
        />
        {showValue && (
          <RangeValue
            data-raw={Boolean(raw)}
            aria-hidden="true"
            className="fs-small-60"
          >
            {display}
          </RangeValue>
        )}
      </RangeWrapper>
      {(error ?? hint) && (
        <FieldMeta
          id={metaId}
          raw={raw}
          data-variant={error ? MetaVariantEnum.Error : MetaVariantEnum.Hint}
        >
          {error ?? hint}
        </FieldMeta>
      )}
    </ParentContainer>
  );
};
FieldRange.displayName = "Field.Range";

Field.Root = FieldRoot;
Field.Wrapper = FieldWrapper;
Field.Label = FieldLabel;
Field.Meta = FieldMeta;
Field.Number = FieldNumber;
Field.Currency = FieldCurrency;
Field.Date = FieldDate;
Field.File = FieldFile;
Field.Password = FieldPassword;
Field.Range = FieldRange;
Field.Tag = FieldTag;

export {
  Field,
  FieldRoot,
  FieldWrapper,
  FieldLabel,
  FieldMeta,
  FieldNumber,
  FieldCurrency,
  FieldDate,
  FieldFile,
  FieldPassword,
  FieldRange,
  FieldTag,
};
