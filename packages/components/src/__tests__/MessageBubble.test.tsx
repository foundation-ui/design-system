import React from "react";

import { test, vi, afterEach, describe, expect } from "vitest";
import { screen, render, cleanup, waitFor } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

import { MessageBubble } from "../../src/message-bubble";

const MOCK_DATE = new Date("2026-03-17T13:00:00Z");
const MOCK_MESSAGE = "test-message-content";

afterEach(async () => {
  vi.clearAllMocks();
  vi.resetModules();
  cleanup();
});

expect.extend(toHaveNoViolations);

describe("MessageBubble", () => {
  test("Renders without accessibility violation", async () => {
    const { container } = render(
      <MessageBubble.Root>
        <MessageBubble side="left">
          <MessageBubble.Content>{MOCK_MESSAGE}</MessageBubble.Content>
          <MessageBubble.Meta createdAt={MOCK_DATE} />
        </MessageBubble>
      </MessageBubble.Root>,
    );

    const ComponentContainer = await axe(container);
    expect(ComponentContainer).toHaveNoViolations();
  });

  test("Renders with accessibility definitions on the left side", async () => {
    render(
      <MessageBubble.Root>
        <MessageBubble side="left">
          <MessageBubble.Content>{MOCK_MESSAGE}</MessageBubble.Content>
          <MessageBubble.Meta createdAt={MOCK_DATE} />
        </MessageBubble>
      </MessageBubble.Root>,
    );

    await waitFor(() => {
      const bubble = screen.getByLabelText("message-bubble-left");
      expect(bubble).toBeDefined();
      expect(bubble.getAttribute("data-side")).toBe("left");

      const meta = screen.getByLabelText("message-bubble-meta-left");
      expect(meta).toBeDefined();
      expect(meta.getAttribute("data-side")).toBe("left");
    });
  });

  test("Renders with accessibility definitions on the right side", async () => {
    render(
      <MessageBubble.Root>
        <MessageBubble side="right">
          <MessageBubble.Content>{MOCK_MESSAGE}</MessageBubble.Content>
          <MessageBubble.Meta createdAt={MOCK_DATE} />
        </MessageBubble>
      </MessageBubble.Root>,
    );

    await waitFor(() => {
      const bubble = screen.getByLabelText("message-bubble-right");
      expect(bubble).toBeDefined();
      expect(bubble.getAttribute("data-side")).toBe("right");

      const meta = screen.getByLabelText("message-bubble-meta-right");
      expect(meta).toBeDefined();
      expect(meta.getAttribute("data-side")).toBe("right");
    });
  });

  test("Propagates side through context to all compound components", async () => {
    render(
      <MessageBubble.Root>
        <MessageBubble side="right">
          <MessageBubble.Content>{MOCK_MESSAGE}</MessageBubble.Content>
          <MessageBubble.Meta createdAt={MOCK_DATE} />
        </MessageBubble>
      </MessageBubble.Root>,
    );

    await waitFor(() => {
      const bubble = screen.getByLabelText("message-bubble-right");
      const meta = screen.getByLabelText("message-bubble-meta-right");

      expect(bubble.getAttribute("data-side")).toBe("right");
      expect(meta.getAttribute("data-side")).toBe("right");

      const content = meta.closest("[data-side]");
      expect(content).toBeDefined();
    });
  });

  test("Renders content with the correct message text", () => {
    render(
      <MessageBubble.Root>
        <MessageBubble side="left">
          <MessageBubble.Content>{MOCK_MESSAGE}</MessageBubble.Content>
          <MessageBubble.Meta createdAt={MOCK_DATE} />
        </MessageBubble>
      </MessageBubble.Root>,
    );

    expect(screen.getByText(MOCK_MESSAGE)).toBeDefined();
  });

  test("Renders Meta with a correctly formatted date", () => {
    render(
      <MessageBubble.Root>
        <MessageBubble side="left">
          <MessageBubble.Content>{MOCK_MESSAGE}</MessageBubble.Content>
          <MessageBubble.Meta createdAt={MOCK_DATE} />
        </MessageBubble>
      </MessageBubble.Root>,
    );

    const expected = new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(MOCK_DATE);

    expect(screen.getByText(expected)).toBeDefined();
  });

  test("Renders raw prop on all compounds when set", async () => {
    render(
      <MessageBubble.Root>
        <MessageBubble side="left" raw>
          <MessageBubble.Content raw>{MOCK_MESSAGE}</MessageBubble.Content>
          <MessageBubble.Meta createdAt={MOCK_DATE} raw />
        </MessageBubble>
      </MessageBubble.Root>,
    );

    await waitFor(() => {
      const bubble = screen.getByLabelText("message-bubble-left");
      const meta = screen.getByLabelText("message-bubble-meta-left");

      expect(bubble.getAttribute("data-raw")).toBe("true");
      expect(meta.getAttribute("data-raw")).toBe("true");
    });
  });

  test("Renders multiple bubbles in a conversation with correct sides", async () => {
    render(
      <React.Fragment>
        <MessageBubble.Root>
          <MessageBubble side="left">
            <MessageBubble.Content>Hello</MessageBubble.Content>
            <MessageBubble.Meta createdAt={MOCK_DATE} />
          </MessageBubble>
        </MessageBubble.Root>
        <MessageBubble.Root>
          <MessageBubble side="right">
            <MessageBubble.Content>Hi back</MessageBubble.Content>
            <MessageBubble.Meta createdAt={MOCK_DATE} />
          </MessageBubble>
        </MessageBubble.Root>
      </React.Fragment>,
    );

    await waitFor(() => {
      expect(screen.getByText("Hello")).toBeDefined();
      expect(screen.getByText("Hi back")).toBeDefined();

      expect(
        screen.getByLabelText("message-bubble-left").getAttribute("data-side"),
      ).toBe("left");
      expect(
        screen.getByLabelText("message-bubble-right").getAttribute("data-side"),
      ).toBe("right");
    });
  });
});
