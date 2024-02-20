import React from "react";
import { render, screen } from "@testing-library/react";

import { Portal } from "../";
import "@testing-library/jest-dom";

const PortalDefault = (args: {
  visible?: boolean;
  closeOnInteract?: boolean;
}) => {
  return (
    <React.Fragment>
      <Portal container="portal">portal-content</Portal>
      <div aria-label="test-portal" id="portal"></div>
    </React.Fragment>
  );
};

describe("Portal", () => {
  it("Renders in the dedicated container", async () => {
    render(<PortalDefault />);
    expect(screen.getByLabelText("test-portal")).toHaveTextContent(
      "portal-content"
    );
  });
});
