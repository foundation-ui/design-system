import React from "react";
import { SwitchProvider, useSwitch } from "./hooks";
import { TriggerWrapper, Thumb } from "./styles";
import { IReactChildren, IComponentStyling } from "../../../../../types";

export interface ISwitchProperties
  extends React.ComponentPropsWithoutRef<"button">,
    IComponentStyling {
  defaultChecked?: boolean;
}
export interface ISwitchThumbProperties
  extends React.ComponentPropsWithoutRef<"span">,
    IComponentStyling {}

const SwitchRoot = ({ children }: IReactChildren) => {
  return <SwitchProvider>{children}</SwitchProvider>;
};

const Switch = (props: ISwitchProperties) => {
  const {
    raw,
    value,
    defaultChecked,
    disabled,
    onClick,
    children,
    ...restProps
  } = props;
  const switchContext = useSwitch();
  const { states, methods } = switchContext;
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
      data-raw={Boolean(raw)}
      {...restProps}
    >
      {children}
    </TriggerWrapper>
  );
};

const SwitchThumb = (props: ISwitchThumbProperties) => {
  const switchContext = useSwitch();
  const { id, states } = switchContext;

  return (
    <Thumb
      tabIndex={-1}
      aria-hidden={true}
      aria-label={`${id}-switch-thumb`}
      data-checked={states.checked}
      data-raw={Boolean(props.raw)}
      {...props}
    />
  );
};

Switch.Root = SwitchRoot;
Switch.Thumb = SwitchThumb;

export { SwitchRoot, Switch, SwitchThumb };
