import React from "react";
import {
  ContainerColWrapper,
  ContainerRowWrapper,
  ContainerTitleWrapper,
  ContainerWrapper,
} from "./styles";
import {
  IComponentSpacing,
  IComponentStyling,
  ComponentSizeEnum,
} from "../../../../../types";

export enum ContainerAlignModeEnum {
  Start = "start",
  End = "end",
  SpaceBetween = "space-between",
}

export interface IContainerAlignMode {
  alignmode?: ContainerAlignModeEnum;
}
export interface IProximityProperties {
  proximity?: boolean;
  global?: boolean;
}
export interface IContainerProperties
  extends IComponentStyling,
    IComponentSpacing,
    IContainerAlignMode,
    React.ComponentProps<"div"> {}

/**
 * Containers are used to wrap child components in a container with inner spacings.
 *
 * @param {IProximityProperties & IComponentSpacing & React.ComponentProps<"div">} props - The props for the Container component.
 * @param {ComponentSpacingEnum} props.spacing - The amount of spacing between the container and its child elements.
 * @param {boolean} props.proximity - Whether the first child have spacing or not.
 * @param {boolean} props.global - Whether all child have spacing or not.
 * @returns {ReactElement} The Container component.
 */
const Container = (
  props: IProximityProperties & IComponentSpacing & React.ComponentProps<"div">
) => {
  const { spacing, proximity, global, children } = props;

  return (
    <ContainerWrapper
      data-spacing={spacing}
      data-proximity={Boolean(proximity)}
      data-global={Boolean(global)}
      {...props}
    >
      {children}
    </ContainerWrapper>
  );
};
Container.displayName = "Container";
Container.defaultProps = {
  proximity: false,
  global: false,
  spacing: ComponentSizeEnum.Small,
};

const ContainerRow = (props: IContainerProperties) => {
  const { raw, spacing, alignmode, children } = props;
  return (
    <ContainerRowWrapper
      tabIndex={-1}
      data-orientation="horizontal"
      data-raw={Boolean(raw)}
      data-align={alignmode}
      data-spacing={spacing}
      {...props}
    >
      {children}
    </ContainerRowWrapper>
  );
};
ContainerRow.displayName = "Container.Row";
ContainerRow.defaultProps = {
  raw: false,
  alignmode: ContainerAlignModeEnum.Start,
  spacing: ComponentSizeEnum.None,
};

const ContainerCol = (props: IContainerProperties) => {
  const { raw, spacing, alignmode, children } = props;
  return (
    <ContainerColWrapper
      tabIndex={-1}
      data-orientation="vertical"
      data-raw={Boolean(raw)}
      data-align={alignmode}
      data-spacing={spacing}
      {...props}
    >
      {children}
    </ContainerColWrapper>
  );
};
ContainerCol.displayName = "Container.Col";
ContainerRow.defaultProps = {
  raw: false,
  alignmode: ContainerAlignModeEnum.Start,
  spacing: ComponentSizeEnum.None,
};

Container.Row = ContainerRow;
Container.Col = ContainerCol;

export { Container, ContainerRow, ContainerCol };
