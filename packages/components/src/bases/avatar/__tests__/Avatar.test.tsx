import React from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { Avatar, AvataStatusEnum } from "../";
import { ComponentSizeEnum } from "../../../../../../types";

import "@testing-library/jest-dom";

expect.extend(toHaveNoViolations);
describe("Avatar", () => {
  it("Renders without accessibility violation", async () => {
    const { container } = render(
      <Avatar
        sizing={ComponentSizeEnum.Small}
        status={AvataStatusEnum.Online}
      />
    );
    const ComponentContainer = await axe(container);
    expect(ComponentContainer).toHaveNoViolations();
  });
  it("Renders as Default with accessibility definition", async () => {
    render(
      <Avatar
        sizing={ComponentSizeEnum.Small}
        status={AvataStatusEnum.Online}
      />
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
      <React.Fragment>
        {StatusVariants.map((variant, key) => (
          <Avatar
            key={variant}
            status={variant}
            sizing={SizeVariants[key] || ComponentSizeEnum.Small}
          />
        ))}
      </React.Fragment>
    );

    const ComponentContainer = await axe(container);
    expect(ComponentContainer).toHaveNoViolations();
  });
});
