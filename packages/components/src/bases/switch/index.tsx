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
} from "../../../../../types";

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

const SwitchRoot = ({ children }: IReactChildren) => {
  return <SwitchProvider>{children}</SwitchProvider>;
};

const Switch = (props: ISwitchProperties) => {
  const {
    raw,
    sizing,
    variant,
    value,
    defaultChecked,
    disabled,
    onClick,
    children,
    ...restProps
  } = props;
  const { states, methods } = useSwitch();
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
      onClick={handleClick}
      value={String(states.checked)}
      disabled={disabled}
      aria-checked={Boolean(states.checked)}
      data-disabled={String(disabled || false)}
      data-variant={variant || ComponentVariantEnum.Primary}
      data-size={sizing || ComponentSizeEnum.Medium}
      data-raw={Boolean(raw)}
      {...restProps}
    >
      {children}
    </TriggerWrapper>
  );
};

const SwitchThumb = (props: ISwitchThumbProperties) => {
  const { raw, sizing } = props;
  const { id, states } = useSwitch();

  return (
    <Thumb
      tabIndex={-1}
      aria-hidden={true}
      aria-label={`${id}-switch-thumb`}
      data-checked={states.checked}
      data-raw={Boolean(raw)}
      data-size={sizing || ComponentSizeEnum.Medium}
      {...props}
    />
  );
};

Switch.Root = SwitchRoot;
Switch.Thumb = SwitchThumb;

export { SwitchRoot, Switch, SwitchThumb };
