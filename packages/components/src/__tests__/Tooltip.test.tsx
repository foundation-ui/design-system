import React from "react";

import { test, vi, afterEach, describe, expect } from "vitest";
import {
  screen,
  render,
  cleanup,
  waitFor,
  fireEvent,
} from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

import { Tooltip } from "../";
import { ComponentSizeEnum } from "../../../../types";

afterEach(async () => {
  vi.clearAllMocks();
  vi.resetModules();
  cleanup();
});

const TooltipDefault = (args: {
  content: string;
  delay?: number;
  sizing?: ComponentSizeEnum;
  raw?: boolean;
}) => {
  return (
    <Tooltip content={args.content} delay={args.delay} raw={args.raw}>
      <span>Hover me</span>
    </Tooltip>
  );
};

expect.extend(toHaveNoViolations);
describe("Tooltip", () => {
  test("Renders without accessibility violation", async () => {
    const { container } = render(<TooltipDefault content="Test content" />);
    const ComponentContainer = await axe(container);
    expect(ComponentContainer).toHaveNoViolations();
  });

  test("Renders tooltip content on hover", async () => {
    render(<TooltipDefault content="Test content" />);
    const tooltipTrigger = screen.getByText("Hover me");

    fireEvent.mouseEnter(tooltipTrigger);

    await waitFor(() => {
      expect(screen.getByText("Test content")).toBeDefined();
    });

    fireEvent.mouseLeave(tooltipTrigger);

    await waitFor(() => {
      expect(() => screen.getByText("Test content")).toThrow();
    });
  });

  test("Applies delay before showing tooltip", async () => {
    render(<TooltipDefault content="Test content" delay={200} />);
    const tooltipTrigger = screen.getByText("Hover me");

    fireEvent.mouseEnter(tooltipTrigger);
    expect(() => screen.getByText("Test content")).toThrow();

    await waitFor(() => {
      expect(screen.getByText("Test content")).toBeDefined();
    });
  });

  test("Hide content on mouse leave", async () => {
    render(<TooltipDefault content="Test content" />);
    const tooltipTrigger = screen.getByText("Hover me");

    fireEvent.mouseEnter(tooltipTrigger);

    await waitFor(() => {
      expect(screen.getByText("Test content")).toBeDefined();
    });

    fireEvent.mouseLeave(tooltipTrigger);

    await waitFor(() => {
      expect(() => screen.getByText("Test content")).toThrow();
    });
  });
});
