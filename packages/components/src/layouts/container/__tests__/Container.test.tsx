import React from "react";
import { render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

import { Container } from "../";
import "@testing-library/jest-dom";

const ContainerDefault = (args: {
  alignmode?: string;
  proximity?: boolean;
  global?: boolean;
}) => {
  return (
    <Container {...args} aria-label="container-test">
      <Container.Title>
        <h1>container-title</h1>
      </Container.Title>
      <Container.Row>
        <p>container-content</p>
        <p>container-content-2</p>
      </Container.Row>
      <Container.Col>
        <p>container-content</p>
        <p>container-content-2</p>
      </Container.Col>
    </Container>
  );
};

expect.extend(toHaveNoViolations);
describe("Portal", () => {
  it("Renders without accessibility violation", async () => {
    const { container } = render(<ContainerDefault />);
    const ComponentContainer = await axe(container);

    expect(ComponentContainer).toHaveNoViolations();
  });
  it("Renders a row container", async () => {
    render(
      <Container.Row aria-label="container-test">row-content</Container.Row>
    );
    const ContainerComponent = screen.getByLabelText("container-test");
    expect(ContainerComponent.getAttribute("tabIndex")).toBe("-1");
    expect(ContainerComponent.getAttribute("data-orientation")).toBe(
      "horizontal"
    );
  });
  it("Renders a column container", async () => {
    render(
      <Container.Col aria-label="container-test">col-content</Container.Col>
    );
    const ContainerComponent = screen.getByLabelText("container-test");
    expect(ContainerComponent.getAttribute("tabIndex")).toBe("-1");
    expect(ContainerComponent.getAttribute("data-orientation")).toBe(
      "vertical"
    );
  });
});
