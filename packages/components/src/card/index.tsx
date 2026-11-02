"use client";

import React from "react";
import { CardContainer, CardWrapper, CardsGrid } from "./styles";

import type { CardGridProps, CardProps } from "./types";

export interface CardComposition {
  Body: typeof CardBody;
  Meta: typeof CardMeta;
  Grid: typeof CardGrid;
}

/**
 * CardGrid component.
 *
 * @returns {ReactElement} The CardGrid component.
 */
const CardGrid = (props: CardGridProps) => {
  const { sizing = "medium", children } = props;

  return <CardsGrid data-size={sizing}>{children}</CardsGrid>;
};
CardGrid.displayName = "Card.Grid";

/**
 * CardMeta component.
 *
 * @returns {ReactElement} The CardMeta component.
 */
const CardMeta = (props: React.ComponentProps<"div">) => {
  const { children } = props;

  return (
    <div className="p-y-medium-20 p-x-medium-30" {...props}>
      {children}
    </div>
  );
};
CardMeta.displayName = "Card.Meta";

/**
 * CardBody component.
 *
 * @returns {ReactElement} The CardBody component.
 */
const CardBody = (props: CardProps) => {
  const { shape = "smooth", children } = props;

  return <CardWrapper data-shape={shape}>{children}</CardWrapper>;
};
CardBody.displayName = "Card.Body";

/**
 * Card component.
 *
 * @returns {ReactElement} The Card component.
 */
const Card = (props: CardProps) => {
  const { shape = "smooth", children } = props;

  return <CardContainer data-shape={shape}> {children}</CardContainer>;
};
Card.displayName = "Card";

Card.Grid = CardGrid;
Card.Meta = CardMeta;
Card.Body = CardBody;

export { Card, CardGrid, CardBody, CardMeta };
