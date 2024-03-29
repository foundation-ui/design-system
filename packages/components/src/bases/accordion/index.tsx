import React from "react";
import { AccordionProvider, useAccordion } from "./hooks";
import { Button, IButtonProperties } from "../button";

import { Container, IProximityProperties } from "../../";
import {
  IReactChildren,
  IComponentSpacing,
  ComponentVariantEnum,
} from "../../../../../types";

export interface IAccordionComposition {
  Root: typeof AccordionRoot;
  Trigger: typeof AccordionTrigger;
  Content: typeof AccordionContent;
}
export interface IAccordionProperties
  extends IProximityProperties,
    IComponentSpacing,
    React.ComponentProps<"div"> {}
export interface IAccordionTriggerProperties extends IButtonProperties {
  value: string;
}
export interface IAccordionContentProperties extends IAccordionProperties {
  defaultOpen?: boolean;
  value: string;
}

/**
 * Accordions are used to expand and collapse sections of content.
 *
 * **Best practices:**
 *
 * - Use a clear and descriptive title for each accordion section.
 * - Ensure that the accordion can be operated using only the keyboard.
 * - Ensure that the focus is properly managed when the accordion section is expanded/collapsed.
 *
 * @param {IAccordionProperties} props - The props for the Accordion component.
 * @param {ReactNode} props.children - The content to be rendered inside the accordion.
 * @returns {ReactElement} The Accordion component.
 */
const Accordion = (props: IAccordionProperties) => {
  const { children, ...restProps } = props;
  const { id } = useAccordion();

  return (
    <Container id={id} {...restProps}>
      {children}
    </Container>
  );
};
Accordion.displayName = "Accordion";

const AccordionRoot = ({ children }: IReactChildren) => {
  return <AccordionProvider>{children}</AccordionProvider>;
};
AccordionRoot.displayName = "Accordion.Root";

/**
 * Accordion.Trigger is used to triggers the expansion and collapse of the associated Accordion.Content component.
 *
 * **Best practices:**
 *
 * - Use a clear and descriptive title for the trigger that accurately conveys the content of the associated accordion section.
 * - Ensure that the trigger can be operated using only the keyboard.
 * - Ensure that the focus is properly managed when the trigger is activated.
 *
 * @param {IAccordionTriggerProperties} props - The props for the Accordion.Trigger component.
 * @param {string} props.value - The value used to bind the Accordion.Trigger and Accordion.Trigger components.
 * @param {ReactNode} props.children - The content to be rendered inside the accordion trigger.
 * @returns {ReactElement} The Accordion.Trigger component.
 */
const AccordionTrigger = (props: IAccordionTriggerProperties) => {
  const { value, disabled, onClick, children, ...restProps } = props;

  const { states, methods } = useAccordion();
  const { getAccordionId, applyValue } = methods;

  const hasSameValueAsContext = value === states.value;
  const IdHandler = {
    trigger: getAccordionId && getAccordionId({ value, type: "trigger" }),
    content: getAccordionId && getAccordionId({ value, type: "content" }),
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      onClick && onClick(event);

      if (applyValue) {
        const unchangedValue = hasSameValueAsContext && states.value !== null;

        if (unchangedValue) applyValue(null);
        else applyValue(value);
      }
    }
  };

  return (
    <Button
      id={String(IdHandler.trigger)}
      value={value}
      disabled={disabled || false}
      onClick={handleClick}
      aria-expanded={hasSameValueAsContext}
      aria-controls={String(IdHandler.content)}
      data-state={hasSameValueAsContext ? "expanded" : "collapsed"}
      {...restProps}
    >
      {children}
    </Button>
  );
};
AccordionTrigger.displayName = "Accordion.Trigger";
AccordionTrigger.defaultProps = {
  raw: false,
  variant: ComponentVariantEnum.Ghost,
};

/**
 * Accordion.Content is used to contains the content of the associated Accordion.Trigger component.
 *
 * **Best practices:**
 *
 * - Ensure that the content is hidden when the associated accordion section is collapsed.
 * - Ensure that the content is properly focused when the associated accordion section is expanded.
 *
 * @param {IAccordionContentProperties} props - The props for the Accordion.Content component.
 * @param {string} props.value - The value used to bind the Accordion.Content and Accordion.Trigger components.
 * @param {boolean} props.defaultOpen - The initial open state of the accordion content. Defaults to false.
 * @param {boolean} props.proximity - The property used to define if the accordion's content has space bewteen children.
 * @param {boolean} props.global - The property used to define how to apply the accordion's content spacings.
 * @param {IComponentSpacing} props.spacing - The value used by the accordion's content spacings.
 * @param {ReactNode} props.children - The content to be rendered inside the accordion.
 * @returns {ReactElement} The Accordion.Content component.
 */
const AccordionContent = (props: IAccordionContentProperties) => {
  const { defaultOpen, value, children, ...restProps } = props;

  const { states, methods } = useAccordion();
  const { getAccordionId, applyValue } = methods;

  const hasSameValueAsContext = value === states.value;
  const IdHandler = {
    trigger: getAccordionId && getAccordionId({ value, type: "trigger" }),
    content: getAccordionId && getAccordionId({ value, type: "content" }),
  };

  React.useEffect(() => {
    if (defaultOpen && !hasSameValueAsContext && applyValue) applyValue(value);
  }, []);

  return (
    <React.Fragment>
      {hasSameValueAsContext && (
        <Container
          role="region"
          id={String(IdHandler.content)}
          aria-labelledby={String(IdHandler.trigger)}
          aria-expanded={hasSameValueAsContext}
          data-value={value}
          {...restProps}
        >
          {children}
        </Container>
      )}
    </React.Fragment>
  );
};
AccordionContent.displayName = "Accordion.Content";
AccordionContent.defaultProps = {
  defaultOpen: false,
};

Accordion.Root = AccordionRoot;
Accordion.Trigger = AccordionTrigger;
Accordion.Content = AccordionContent;

export { Accordion, AccordionRoot, AccordionTrigger, AccordionContent };
