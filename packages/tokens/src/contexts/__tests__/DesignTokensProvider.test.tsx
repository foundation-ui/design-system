import React from "react";
import {
  render,
  screen,
  act,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { DesignTokensProvider, useDesignTokens } from "../DesignTokensProvider";
import { IDesignTokensLibrary } from "../../../../../types";
import "@testing-library/jest-dom";

const tokenLibrary: IDesignTokensLibrary = {
  name: "test",
  design_tokens: {
    color: [],
    measurement: [],
    fontsize: [],
    depth: [],
    opacity: [],
  },
};
const updatedTokenLibrary: IDesignTokensLibrary = {
  name: "new test",
  design_tokens: {
    color: [{ name: "red", base: { hex: "#ff0000" } }],
    measurement: [],
    fontsize: [],
    depth: [],
    opacity: [],
  },
};
const Component = () => {
  const { color, setDesignTokensLibrary } = useDesignTokens();

  return (
    <button
      aria-label="test-trigger"
      onClick={() => setDesignTokensLibrary(updatedTokenLibrary)}
    >
      {color.length}
    </button>
  );
};
describe("DesignTokensProvider", () => {
  it("Provide the design tokens library to the context", () => {
    render(
      <DesignTokensProvider tokenLibrary={updatedTokenLibrary}>
        <Component />
      </DesignTokensProvider>
    );

    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("Update the design tokens library when setDesignTokensLibrary is called", async () => {
    render(
      <DesignTokensProvider tokenLibrary={tokenLibrary}>
        <Component />
      </DesignTokensProvider>
    );

    act(() => fireEvent.click(screen.getByLabelText("test-trigger")));
    await waitFor(() => expect(screen.getByText("1")).toBeInTheDocument());
  });
});
