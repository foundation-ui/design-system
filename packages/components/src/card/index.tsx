"use client";

import React from "react";

import { Image } from "../";
import { CardContainer, CardWrapper, CardsGrid } from "./styles";

import type { CardGridProps, CardImageProps, CardProps } from "./types";

export interface CardComposition {
  Body: typeof CardBody;
  Meta: typeof CardMeta;
  Grid: typeof CardGrid;
  Image: typeof CardImage;
}

/**
 * Cards are used to group related content and actions about a single subject.
 *
 * **Best practices:**
 *
 * - Keep the content of a card focused on a single subject.
 * - Use `Card.Body` to wrap the main content and `Card.Meta` for secondary info.
 * - Use `Card.Grid` to display multiple cards consistently.
 *
 * @param {CardProps} props - The props for the Card component.
 * @param {TComponentShape} props.shape - The shape of the component. Defaults to `smooth`.
 * @param {ReactNode} props.children - The content to be rendered inside the card.
 * @returns {ReactElement} The Card component.
 */
const Card = (props: CardProps): React.ReactElement => {
  const { shape = "smooth", children, ...restProps } = props;

  return (
    <CardContainer data-shape={shape} {...restProps}>
      {children}
    </CardContainer>
  );
};
Card.displayName = "Card";

/**
 * Card grids are used to lay out multiple cards.
 *
 * **Best practices:**
 *
 * - Only use `Card` components as direct children.
 * - Pick a sizing that matches the density of the content.
 *
 * @param {CardGridProps} props - The props for the CardGrid component.
 * @param {ComponentSizeEnum} props.sizing - The size of the grid items. Defaults to `medium`.
 * @param {ReactNode} props.children - The cards to be rendered inside the grid.
 * @returns {ReactElement} The CardGrid component.
 */
const CardGrid = (props: CardGridProps): React.ReactElement => {
  const { sizing = "medium", children, ...restProps } = props;

  return (
    <CardsGrid data-size={sizing} {...restProps}>
      {children}
    </CardsGrid>
  );
};
CardGrid.displayName = "Card.Grid";

/**
 * Card meta is used to display secondary information about a card.
 *
 * **Best practices:**
 *
 * - Use it for short content such as titles, dates, tags or authors.
 *
 * @param {React.ComponentProps<"div">} props - The props for the CardMeta component.
 * @param {ReactNode} props.children - The content to be rendered inside the meta.
 * @returns {ReactElement} The CardMeta component.
 */
const CardMeta = (props: React.ComponentProps<"div">): React.ReactElement => {
  const { children, ...restProps } = props;

  return (
    <div className="p-y-medium-20 p-x-medium-30" {...restProps}>
      {children}
    </div>
  );
};
CardMeta.displayName = "Card.Meta";

/**
 * Card body is used to wrap the main content of a card.
 *
 * **Best practices:**
 *
 * - Match the shape of the parent `Card` for visual consistency.
 *
 * @param {CardProps} props - The props for the CardBody component.
 * @param {TComponentShape} props.shape - The shape of the component. Defaults to `smooth`.
 * @param {ReactNode} props.children - The content to be rendered inside the body.
 * @returns {ReactElement} The CardBody component.
 */
const CardBody = (props: CardProps): React.ReactElement => {
  const { shape = "smooth", children, ...restProps } = props;

  return (
    <CardWrapper data-shape={shape} {...restProps}>
      {children}
    </CardWrapper>
  );
};
CardBody.displayName = "Card.Body";

/**
 * Card image is used to display visual content inside a card.
 * It forwards all props to the `Image` component.
 *
 * **Best practices:**
 *
 * - Always provide a meaningful `alt` text. Use `""` for decorative images.
 * - Provide `width` and `height`, or use `fill` inside a positioned parent.
 * - Use `priority` only for above-the-fold cards.
 *
 * @param {CardImageProps} props - The props for the CardImage component. See `Image`.
 * @param {TComponentShape} props.shape - The shape of the image. Defaults to `smooth`.
 * @returns {ReactElement | null} The CardImage component, or `null` if no safe source is available.
 */
const CardImage = React.forwardRef<HTMLImageElement, CardImageProps>(
  (props, forwardedRef) => <Image ref={forwardedRef} {...props} />,
);
CardImage.displayName = "Card.Image";

Card.Grid = CardGrid;
Card.Meta = CardMeta;
Card.Body = CardBody;
Card.Image = CardImage;

export { Card, CardGrid, CardBody, CardMeta, CardImage };
