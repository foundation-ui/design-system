"use client";

import React from "react";
import { CardContainer, CardWrapper, CardsGrid } from "./styles";

import type { IComponentSize, TComponentShape } from "../../../../types";

export interface CardComposition {
  Body: typeof CardBody;
  Meta: typeof CardMeta;
  Grid: typeof CardGrid;
}

interface CardGridProps extends React.ComponentProps<"div">, IComponentSize {}
interface CardProps extends React.ComponentProps<"div"> {
  shape?: TComponentShape;
}

const CardGrid = (props: CardGridProps) => {
  const { sizing = "medium", children } = props;

  return <CardsGrid data-size={sizing}>{children}</CardsGrid>;
};
CardGrid.displayName = "Card.Grid";

const CardMeta = (props: React.ComponentProps<"div">) => {
  const { children } = props;

  return (
    <div className="p-y-medium-20 p-x-medium-30" {...props}>
      {children}
    </div>
  );
};
CardMeta.displayName = "Card.Meta";

const CardBody = (props: CardProps) => {
  const { shape = "smooth", children } = props;

  return <CardWrapper data-shape={shape}>{children}</CardWrapper>;
};
CardBody.displayName = "Card.Body";

const Card = (props: CardProps) => {
  const { shape = "smooth", children } = props;

  return <CardContainer data-shape={shape}> {children}</CardContainer>;
};
Card.displayName = "Card";

Card.Grid = CardGrid;
Card.Meta = CardMeta;
Card.Body = CardBody;

export { Card, CardGrid, CardBody, CardMeta };
