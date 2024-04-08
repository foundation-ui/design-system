import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

import { Page } from "..";
import { SystemThemeProvider } from "@foundation-ui/core";

import "@testing-library/jest-dom";

const onClickCallback = jest.fn();
const PageDefault = (args: {}) => {
  return (
    <SystemThemeProvider>
      <Page>
        <Page.Tools
          aria-label="page-tools"
          shortcut
          hotkey="a"
          side="left"
          sizing="small"
          onClick={onClickCallback}
        >
          tool item
        </Page.Tools>
        <Page.Navigation aria-label="page-nav">nav item</Page.Navigation>
        <Page.Menu aria-label="page-menu">menu item</Page.Menu>

        <Page.Content aria-label="page-content">content item</Page.Content>

        <Page.Panel
          shortcut
          hotkey="b"
          side="bottom"
          sizing="large"
          aria-label="page-panel"
          onClick={onClickCallback}
        >
          panel item
        </Page.Panel>
      </Page>
    </SystemThemeProvider>
  );
};

expect.extend(toHaveNoViolations);
describe("Page", () => {
  it("Renders without accessibility violation", async () => {
    const { container } = render(<PageDefault />);
    const ComponentContainer = await axe(container);

    expect(ComponentContainer).toHaveNoViolations();
  });
  it("Render every compound components", async () => {
    render(<PageDefault />);
    const ToolComponent = screen.getByLabelText("page-tools");
    const PanelComponent = screen.getByLabelText("page-panel");
    const NavComponent = screen.getByLabelText("page-nav");
    const MenuComponent = screen.getByLabelText("page-menu");
    const ContentComponent = screen.getByLabelText("page-content");

    // Accesibility criterias are tested in the components used page Page [Toolbar]
    expect(ToolComponent).toBeDefined();
    expect(PanelComponent).toBeDefined();
    expect(NavComponent).toBeDefined();
    expect(MenuComponent).toBeDefined();
    expect(ContentComponent).toBeDefined();
  });
  it("Open tool and panel components on click and when the shortcuts are triggered", async () => {
    const { container } = render(<PageDefault />);

    expect(() => screen.getByText("tool item")).toThrow();
    expect(() => screen.getByText("panel item")).toThrow();

    fireEvent.keyDown(container, { key: "b", code: "KeyB", ctrlKey: true });
    fireEvent.keyDown(container, { key: "a", code: "KeyA", ctrlKey: true });
    await waitFor(() => {
      expect(screen.getByText("tool item"));
      expect(screen.getByText("panel item"));
    });

    fireEvent.click(screen.getByTitle("ctrl + a"));
    fireEvent.click(screen.getByTitle("ctrl + b"));
    await waitFor(() => {
      expect(() => screen.getByText("tool item")).toThrow();
      expect(() => screen.getByText("panel item")).toThrow();
      expect(onClickCallback).toHaveBeenCalled();
    });
  });
});
