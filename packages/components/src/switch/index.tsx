import React from "react";
import { SwitchProvider, useSwitch } from "./hooks";
import { TriggerWrapper, Thumb } from "./styles";
import {
  IReactChildren,
  IComponentStyling,
  ComponentSizeEnum,
  ComponentVariantEnum,
  IComponentSize,
  IComponentVariant,
} from "../../../../types";

export interface ISwitchComposition {
  Root: typeof SwitchRoot;
  Thumb: typeof SwitchThumb;
}

export interface ISwitchProperties
  extends React.ComponentProps<"button">,
    IComponentSize,
    IComponentVariant,
    IComponentStyling {
  defaultChecked?: boolean;
}
export interface ISwitchThumbProperties
  extends React.ComponentProps<"span">,
    IComponentSize,
    IComponentStyling {}

/**
 * Switch are toggle components that allows the user to turn a setting on or off.
 *
 * **Best practices:**
 *
 * - Use a clear and descriptive label for each switch.
 * - The interaction must have predictable behavior.
 *
 * @param {ISwitchProperties} props - The props for the Switch component.
 * @param {boolean} props.raw - Whether the switch should be rendered without any styles.
 * @param {ComponentSizeEnum} props.sizing - The size of the switch.
 * @param {ComponentVariantEnum} props.variant - The variant of the switch.
 * @param {boolean} props.defaultChecked - The initial state of the switch.
 * @param {ReactNode} props.children - The content to be rendered inside the switch.
 * @returns {ReactElement} The Switch component.
 */
const Switch = (props: ISwitchProperties) => {
  const {
    raw,
    sizing = ComponentSizeEnum.Medium,
    variant = ComponentVariantEnum.Primary,
    value,
    defaultChecked,
    disabled,
    onClick,
    children,
    ...restProps
  } = props;
  const { id, states, methods } = useSwitch();
  const { toggleSwitch } = methods;

  const handleClick = (event: any) => {
    if (onClick) onClick(event);
    if (toggleSwitch) toggleSwitch();
  };

  React.useEffect(() => {
    if (defaultChecked && toggleSwitch) toggleSwitch();
  }, [defaultChecked]);

  return (
    <TriggerWrapper
      type="button"
      role="switch"
      title="switch-trigger"
      onClick={handleClick}
      value={String(states.checked)}
      aria-label={`${id}-switch-trigger`}
      aria-checked={Boolean(states.checked)}
      data-disabled={String(disabled ?? false)}
      data-variant={variant}
      data-size={sizing}
      data-raw={Boolean(raw)}
      {...restProps}
    >
      <title>Switch</title>
      {children}
    </TriggerWrapper>
  );
};
Switch.displayName = "Switch";

const SwitchRoot = ({ children }: IReactChildren) => {
  return <SwitchProvider>{children}</SwitchProvider>;
};
SwitchRoot.displayName = "Switch.Root";

const SwitchThumb = (props: ISwitchThumbProperties) => {
  const { raw, sizing } = props;
  const { id, states } = useSwitch();

  return (
    <Thumb
      role="presentation"
      title="switch-thumb"
      tabIndex={-1}
      aria-hidden={true}
      aria-label={`${id}-switch-thumb`}
      data-checked={states.checked}
      data-raw={Boolean(raw)}
      data-size={sizing ?? ComponentSizeEnum.Medium}
      {...props}
    />
  );
};
SwitchThumb.displayName = "Switch.Thumb";

Switch.Root = SwitchRoot;
Switch.Thumb = SwitchThumb;

export { SwitchRoot, Switch, SwitchThumb };
