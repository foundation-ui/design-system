"use client";

import React from "react";
import { FieldProvider, useField } from "./hooks";

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
} from "./styles";
import { Button, Badge } from "../";

import {
  IReactChildren,
  IComponentStyling,
  ComponentSizeEnum,
  IComponentSize,
  ComponentVariantEnum,
  IComponentVariant,
  ComponentShapeEnum,
  IComponentShape,
} from "../../../../types";
import { TDateSegmentType, ISegment, SegmentRanges, DateState } from "./types";
import { dateToState, buildSegments, commitState, clamp } from "./utils";

export enum MetaVariantEnum {
  Default = "default",
  Hint = "hint",
  Emphasis = "emphasis",
  Error = "error",
}

export type TMetaVariant = "default" | "hint" | "emphasis" | "error";

export interface IField
  extends
    React.ComponentProps<"input">,
    IComponentSize,
    IComponentVariant,
    IComponentShape,
    IComponentStyling {
  hint?: string;
  error?: string;
}
export interface IFieldLabel
  extends React.ComponentProps<"label">, IComponentStyling {
  optional?: boolean;
}
export interface IFieldMeta
  extends React.ComponentProps<"small">, IComponentStyling {
  variant?: TMetaVariant;
}
export interface IFieldNumber extends Omit<IField, "type"> {}
export interface IFieldDate
  extends
    IComponentSize,
    IComponentVariant,
    IComponentShape,
    IComponentStyling {
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date) => void;
  hint?: string;
  error?: string;
  locale?: string;
  withTime?: boolean;
  disabled?: boolean;
  id?: string;
}
export interface IFieldFile extends Omit<IField, "type" | "children"> {
  trigger?: React.ReactNode;
  onFileChange?: (files: FileList | null) => void;
}
type PrivacyType = "password" | "text";
interface IFieldPassword extends IField {
  defaultType?: PrivacyType;
}

export interface IFieldTag
  extends
    IComponentSize,
    IComponentVariant,
    IComponentShape,
    IComponentStyling {
  value?: string[];
  defaultValue?: string[];
  allowed?: string[];
  onChange?: (tags: string[]) => void;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
  id?: string;
}

export interface IFieldComposition {
  Root: typeof FieldRoot;
  Wrapper: typeof FieldWrapper;
  Label: typeof FieldLabel;
  Meta: typeof FieldMeta;
  Number: typeof FieldNumber;
  Date: typeof FieldDate;
  File: typeof FieldFile;
  Password: typeof FieldPassword;
  Tag: typeof FieldTag;
}

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
    ...restProps
  } = props;

  const metaId = React.useId();
  const { id } = useField();

  return (
    <React.Fragment>
      <Input
        id={id}
        aria-invalid={!!error}
        aria-describedby={metaId}
        aria-errormessage={error}
        data-error={Boolean(error)}
        data-variant={variant}
        data-size={sizing}
        data-shape={shape}
        data-raw={Boolean(raw)}
        {...restProps}
      />
      {(error ?? hint) && (
        <FieldMeta
          raw={raw}
          data-variant={error ? MetaVariantEnum.Error : MetaVariantEnum.Hint}
        >
          {error ?? hint}
        </FieldMeta>
      )}
    </React.Fragment>
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
    ...restProps
  } = props;

  const metaId = React.useId();
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
 * @param {ComponentSizeEnum} props.sizing - The size of the component. Defaults to `medium`.
 * @param {string} props.variant - The style definition used by the component.
 * @param {TComponentShape} props.shape - The shape of the component. Defaults to `smooth`.
 * @returns {ReactElement} The Field.Number component.
 */
const FieldNumber = (props: IFieldNumber) => {
  const {
    raw,
    sizing = ComponentSizeEnum.Medium,
    variant = ComponentVariantEnum.Secondary,
    shape = ComponentShapeEnum.Smooth,
    error,
    step = 1,
    ...restProps
  } = props;

  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleStep = (direction: "up" | "down") => {
    if (!inputRef.current) return;
    direction === "up"
      ? inputRef.current.stepUp()
      : inputRef.current.stepDown();
    inputRef.current.dispatchEvent(new Event("change", { bubbles: true }));
  };

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

  return (
    <ParentContainer data-raw={Boolean(raw)}>
      <Field
        ref={inputRef}
        type="number"
        raw={raw}
        sizing={sizing}
        variant={variant}
        shape={shape}
        error={error}
        step={step}
        {...restProps}
      />
      <InnerWrapper
        data-raw={Boolean(raw)}
        data-error={Boolean(error)}
        data-variant={variant}
        data-shape={shape}
        data-multiple="true"
      >
        <InnerTrigger
          type="button"
          aria-label="Increment"
          data-raw={Boolean(raw)}
          onClick={() => handleStep("up")}
          tabIndex={-1}
        >
          <ChevronIcon direction="up" />
        </InnerTrigger>
        <InnerDivider data-raw={Boolean(raw)} />
        <InnerTrigger
          type="button"
          aria-label="Decrement"
          data-raw={Boolean(raw)}
          onClick={() => handleStep("down")}
          tabIndex={-1}
        >
          <ChevronIcon direction="down" />
        </InnerTrigger>
      </InnerWrapper>
    </ParentContainer>
  );
};
FieldNumber.displayName = "Field.Number";

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
  } = props;

  const { id: contextId } = useField();
  const id = idProp ?? contextId;

  const isControlled = value !== undefined;

  const metaId = React.useId();

  // Accumulates digit keypresses within a single segment before committing,
  // allowing e.g. typing "1" then "2" to produce "12" for the day segment
  const bufferRef = React.useRef<string>("");

  // Map of segment type, DOM element for programmatic focus
  const segmentRefs = React.useRef<
    Map<TDateSegmentType, HTMLSpanElement | null>
  >(new Map());

  const [internalState, setInternalState] = React.useState<DateState>(() =>
    dateToState(defaultValue ?? value ?? new Date()),
  );
  const [focusedSegment, setFocusedSegment] =
    React.useState<TDateSegmentType | null>(null);

  const segments = buildSegments(internalState, locale, withTime);

  // Ordered list of focusable segment types, excluding non-interactive literals
  const editableSegments = segments
    .filter(
      (s): s is ISegment & { type: Exclude<TDateSegmentType, "literal"> } =>
        s.type !== "literal",
    )
    .map((s) => s.type);

  const stepSegment = (
    seg: Exclude<TDateSegmentType, "literal">,
    delta: number,
  ) => {
    const { min, max } = SegmentRanges[seg];

    const current = internalState[seg];
    const range = max(internalState) - min + 1;
    // Wrap around using modulo so incrementing past max rolls back to min
    const next = ((current - min + delta + range) % range) + min;

    commitState(
      isControlled,
      { ...internalState, [seg]: next },
      setInternalState,
      onChange,
    );
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
      case "ArrowRight":
      case "Tab": {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          bufferRef.current = "";
          if (idx < editableSegments.length - 1)
            focusSegmentByType(editableSegments[idx + 1]);
        }
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

  const focusSegmentByType = (type: TDateSegmentType | undefined) => {
    if (!type) return;
    segmentRefs.current.get(type)?.focus();
  };

  /**
   * Focuses the first editable segment when the user clicks anywhere on the
   * wrapper that is not already a segment span.
   *
   * The `data-segment` attribute on each `InnerSegment` is used as a guard so
   * that clicks directly on a segment are handled by that segment's own
   * `onFocus` without resetting the buffer or stealing focus.
   *
   * `setTimeout(0)` defers the `.focus()` call until after the browser has
   * finished processing the current click event, preventing the programmatic
   * focus from being immediately overridden by native browser behavior.
   */
  const handleWrapperClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Segment already received the click - its onFocus will handle it
    if ((e.target as HTMLElement).dataset.segment) return;

    const timeout = setTimeout(() => {
      focusSegmentByType(editableSegments[0]);
    }, 0);

    return () => clearTimeout(timeout);
  };

  // Sync controlled value - internal state when parent updates it
  React.useEffect(() => {
    if (isControlled && value) setInternalState(dateToState(value));
  }, [isControlled, value]);

  return (
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
      // Focus the first segment on wrapper click
      onClick={handleWrapperClick}
    >
      {segments.map((seg, i) => {
        if (seg.type === "literal") {
          return (
            <Muted key={i} data-raw={Boolean(raw)} aria-hidden="true">
              {seg.value}
            </Muted>
          );
        }

        const isFocused = focusedSegment === seg.type;

        return (
          <InnerSegment
            key={seg.type}
            ref={(el: HTMLSpanElement | null) =>
              segmentRefs.current.set(seg.type, el)
            }
            role="spinbutton"
            aria-label={seg.type}
            aria-valuenow={internalState[seg.type]}
            aria-valuemin={SegmentRanges[seg.type].min}
            aria-valuemax={SegmentRanges[seg.type].max(internalState)}
            tabIndex={disabled ? -1 : 0}
            data-raw={Boolean(raw)}
            data-focused={isFocused}
            // Guard attribute checked by handleWrapperClick to avoid
            // double-focusing when the click lands directly on a segment
            data-segment={seg.type}
            onFocus={() => {
              setFocusedSegment(seg.type);
              bufferRef.current = "";
            }}
            onBlur={() => setFocusedSegment(null)}
            onKeyDown={(e: React.KeyboardEvent<HTMLSpanElement>) => {
              if (seg.type === "literal") return;
              handleSegmentKeyDown(e, seg.type);
            }}
          >
            {seg.value}
          </InnerSegment>
        );
      })}
    </ParentWrapper>
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
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      fileInputRef.current?.click();
    }
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
          onClick={(e) => {
            handleTriggerClick();
            restProps.onClick?.(e);
          }}
          onKeyDown={(e) => {
            handleKeyDown(e);
            restProps.onKeyDown?.(e);
          }}
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
    if (type === "text") setType("password");
    if (type === "password") setType("text");
  }, [type, setType]);

  const ShowIcon = () => {
    return (
      <React.Fragment>
        <path d="M2.42 12.713c-.136-.215-.204-.323-.242-.49a1.173 1.173 0 0 1 0-.446c.038-.167.106-.274.242-.49C3.546 9.505 6.895 5 12 5s8.455 4.505 9.58 6.287c.137.215.205.323.243.49.029.125.029.322 0 .446-.038.167-.106.274-.242.49C20.455 14.495 17.105 19 12 19c-5.106 0-8.455-4.505-9.58-6.287Z" />
        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      </React.Fragment>
    );
  };
  const HideIcon = () => {
    return (
      <React.Fragment>
        <path d="M10.743 5.092C11.149 5.032 11.569 5 12 5c5.105 0 8.455 4.505 9.58 6.287.137.215.205.323.243.49a1.16 1.16 0 0 1 0 .447c-.038.166-.107.274-.244.492-.3.474-.757 1.141-1.363 1.865M6.724 6.715c-2.162 1.467-3.63 3.504-4.303 4.57-.137.217-.205.325-.243.492a1.173 1.173 0 0 0 0 .446c.038.167.106.274.242.49C3.546 14.495 6.895 19 12 19c2.059 0 3.832-.732 5.289-1.723M3 3l18 18M9.88 9.879a3 3 0 1 0 4.243 4.243" />
      </React.Fragment>
    );
  };

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
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
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
          <Badge sizing="small" variant="border">
            {tag}
            {!disabled && (
              <Button
                variant="ghost"
                sizing="small"
                aria-label={`Remove ${tag}`}
                data-tag="true"
                className="m-l-small-60 "
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

Field.Root = FieldRoot;
Field.Wrapper = FieldWrapper;
Field.Label = FieldLabel;
Field.Meta = FieldMeta;
Field.Number = FieldNumber;
Field.Date = FieldDate;
Field.File = FieldFile;
Field.Password = FieldPassword;
Field.Tag = FieldTag;

export {
  Field,
  FieldRoot,
  FieldWrapper,
  FieldLabel,
  FieldMeta,
  FieldNumber,
  FieldDate,
  FieldFile,
  FieldPassword,
  FieldTag,
};
