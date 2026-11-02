"use client";

import React from "react";

import { PillBody } from "./styles";
import {
  ComponentSizeEnum,
  IComponentSize,
  ComponentShapeEnum,
  IComponentShape,
} from "../../../../types";

export interface IPillProperties
  extends
    IComponentSize,
    IComponentShape,
    React.HTMLAttributes<HTMLDivElement> {
  pulse?: boolean;
  fixed?: boolean;
  color?: string;
  status?: "success" | "warning" | "danger";
}

const Pill = (props: IPillProperties) => {
  const {
    status,
    sizing = ComponentSizeEnum.Small,
    shape = ComponentShapeEnum.Round,
    pulse = true,
    fixed,
    color,
    ...restProps
  } = props;

  const getPillStyles = (status: string) => {
    let classNames: string = "";
    let color: string = "";

    if (status === "success") {
      classNames = "bg-green";
      color = "var(--color-green)";
    }
    if (status === "warning") {
      classNames = "bg-orange";
      color = "var(--color-orange)";
    }
    if (status === "danger") {
      classNames = "bg-red";
      color = "var(--color-red)";
    }

    return {
      classNames: classNames,
      color: color,
    };
  };

  return (
    <PillBody
      data-size={sizing}
      data-shape={shape}
      $color={color ?? getPillStyles(status ?? "").color}
      $pulse={pulse}
      $fixed={fixed}
      aria-label={props["aria-label"] ?? `${sizing}-pill`}
      className={getPillStyles(status ?? "").classNames}
      {...restProps}
    />
  );
};
Pill.displayName = "Pill";

export { Pill };
