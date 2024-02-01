import React from "react";
import { render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

import { Avatar, AvataStatusEnum } from "../";
import { SystemThemeProvider } from "@bsw/ds-core";
import { ComponentSizeEnum } from "../../../../../../types";
import "@testing-library/jest-dom";

expect.extend(toHaveNoViolations);
describe("Avatar", () => {
  it("Renders without accessibility violation", async () => {
    const { container } = render(
      <SystemThemeProvider>
        <Avatar
          sizing={ComponentSizeEnum.Small}
          status={AvataStatusEnum.Online}
        />
      </SystemThemeProvider>
    );
    const ComponentContainer = await axe(container);
    expect(ComponentContainer).toHaveNoViolations();
  });
  it("Renders with accessibility definition", async () => {
    render(
      <SystemThemeProvider>
        <Avatar
          sizing={ComponentSizeEnum.Small}
          status={AvataStatusEnum.Online}
        />
      </SystemThemeProvider>
    );

    const avatarLabel = "small-user-avatar";
    const AvatarWrapper = screen.getByLabelText(avatarLabel);
    const AvatarStatus = screen.getByLabelText(`${avatarLabel}-status`);

    expect(AvatarWrapper).toBeDefined();
    expect(AvatarStatus).toBeDefined();

    expect(AvatarWrapper).toHaveAttribute("data-size", "small");
    expect(AvatarWrapper).toHaveAttribute("data-status", "online");

    expect(AvatarStatus).toHaveAttribute("role", "img");
    expect(AvatarStatus).toHaveAttribute("data-status", "online");
  });
  it("Renders as Default with Image as background", async () => {
    render(
      <SystemThemeProvider>
        <Avatar src="http://www.bui/tests" />
      </SystemThemeProvider>
    );

    const avatarLabel = "medium-user-avatar";
    const AvatarWrapper = screen.getByLabelText(avatarLabel);
    const AvatarImage = screen.getByLabelText("medium-user-avatar-image");

    expect(AvatarWrapper).toBeDefined();
    expect(AvatarImage).toBeDefined();
    expect(AvatarWrapper).toHaveAttribute("data-size", "medium");
    expect(AvatarWrapper).toHaveAttribute("data-status", "offline");
  });
  it("Renders variants without accessibility violation", async () => {
    const SizeVariants = [
      ComponentSizeEnum.Small,
      ComponentSizeEnum.Medium,
      ComponentSizeEnum.Large,
    ];
    const StatusVariants = [
      AvataStatusEnum.Online,
      AvataStatusEnum.Away,
      AvataStatusEnum.Busy,
      AvataStatusEnum.Offline,
    ];

    const { container } = render(
      <SystemThemeProvider>
        {StatusVariants.map((variant, key) => (
          <Avatar
            key={variant}
            status={variant}
            sizing={SizeVariants[key] || ComponentSizeEnum.Small}
          />
        ))}
      </SystemThemeProvider>
    );

    const ComponentContainer = await axe(container);
    expect(ComponentContainer).toHaveNoViolations();
  });
});
