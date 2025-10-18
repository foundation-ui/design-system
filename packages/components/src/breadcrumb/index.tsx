"use client";

import React from "react";

import { ItemWrapper, SeparatorItem } from "./styles";
import { Button, type IButtonProperties } from "../";

const SEGMENT_SEPARATOR = "/";

interface BreadcrumbProps extends React.ComponentProps<"div"> {
  navigate?: (href: string) => void;
  capitalizeItems?: boolean;
  path: string;
}
interface BreadcrumbItemProps extends IButtonProperties {
  isLastItem?: boolean;
}
export interface BreadcrumbComposition {
  Item: typeof BreadcrumbItem;
  Separator: typeof BreadcrumbSeparator;
}

/**
 * Breadcrumb Item are used to display the path to the current resource.
 *
 * @param {BreadcrumbItemProps} props - The props for the Breadcrumb Item component.
 * @param {boolean} props.isLastItem - Render the item as latest on the links hierarchy.
 * @returns {ReactElement} The Breadcrumb Item component.
 */
const BreadcrumbItem = (props: BreadcrumbItemProps) => {
  const { isLastItem = false, children, ...restProps } = props;

  return (
    <Button sizing="small" variant="ghost" {...restProps}>
      <ItemWrapper data-current={isLastItem}>{children}</ItemWrapper>
    </Button>
  );
};
BreadcrumbItem.displayName = "Breadcrumb.Item";

/**
 * Breadcrumb Separators are used to display hierarchy of links.
 *
 * @param {React.ComponentProps<"span">} props - The props for the Breadcrumb Separators component.
 * @returns {ReactElement} The Breadcrumb Separators component.
 */
const BreadcrumbSeparator = (props: React.ComponentProps<"span">) => {
  const { children } = props;

  return <SeparatorItem>{children ?? SEGMENT_SEPARATOR}</SeparatorItem>;
};
BreadcrumbSeparator.displayName = "Breadcrumb.Separator";

/**
 * Breadcrumbs are used to display the path to the current resource using a hierarchy of links.
 *
 * @param {BreadcrumbProps} props - The props for the Breadcrumb component.
 * @param {boolean} props.capitalizeItems - Render the current path with a capitalized case. Defaults to 'true'.
 * @param {string} props.path - The current path.
 * @param {function} props.navigate - The function used to redirect to the path route.
 * @returns {ReactElement} The Breadcrumb component.
 */
const Breadcrumb = (props: BreadcrumbProps) => {
  const { path, navigate, capitalizeItems = true, children } = props;

  const segments = path.split(SEGMENT_SEPARATOR).filter(Boolean);
  const items = segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join(SEGMENT_SEPARATOR)}`;
    const isLastItem = index === segments.length - 1;

    return {
      href,
      label: segment,
      isLastItem,
    };
  });

  const breadcrumbLabel = (segment: string) => {
    return capitalizeItems
      ? segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ")
      : segment.replace(/-/g, " ");
  };

  const handleNavigate = React.useCallback((href: string) => {
    if (navigate) navigate(href);
  }, []);

  if (path === SEGMENT_SEPARATOR) return null;
  return (
    <div className="flex align-center g-medium-30">
      {children && (
        <React.Fragment>
          {children}
          <Breadcrumb.Separator />
        </React.Fragment>
      )}
      {items.map((item, key) => (
        <React.Fragment key={key}>
          <Breadcrumb.Item
            isLastItem={item.isLastItem}
            disabled={!navigate}
            onClick={() => handleNavigate(item.href)}
          >
            {breadcrumbLabel(item.label)}
          </Breadcrumb.Item>
          {!item.isLastItem && <Breadcrumb.Separator />}
        </React.Fragment>
      ))}
    </div>
  );
};
Breadcrumb.displayName = "Breadcrumb";

Breadcrumb.Item = BreadcrumbItem;
Breadcrumb.Separator = BreadcrumbSeparator;

export { Breadcrumb, BreadcrumbItem, BreadcrumbSeparator };
