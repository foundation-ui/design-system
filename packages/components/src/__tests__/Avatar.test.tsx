import React from "react";

import { test, vi, afterEach, describe, expect } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

import { Avatar, AvataStatusEnum } from "../../src/avatar";
import { ComponentSizeEnum, TComponentSize } from "../../../../types";

afterEach(async () => {
  vi.clearAllMocks();
  vi.resetModules();
  cleanup();
});

expect.extend(toHaveNoViolations);
describe("Avatar", () => {
  test("Renders without accessibility violation", async () => {
    const { container } = render(
      <Avatar
        sizing={ComponentSizeEnum.Small}
        status={AvataStatusEnum.Online}
      />
    );
    const ComponentContainer = await axe(container);
    expect(ComponentContainer).toHaveNoViolations();
  });
  test("Renders with accessibility definition", async () => {
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
    expect(AvatarWrapper.getAttribute("data-size")).toBe("small");
    expect(AvatarWrapper.getAttribute("data-status")).toBe("online");

    expect(AvatarStatus).toBeDefined();
    expect(AvatarStatus.getAttribute("role")).toBe("img");
    expect(AvatarStatus.getAttribute("data-status")).toBe("online");
  });
  test("Renders with Image as background", async () => {
    render(<Avatar src="http://www.bui/tests" />);

    const avatarLabel = "medium-user-avatar";
    const AvatarWrapper = screen.getByLabelText(avatarLabel);
    const AvatarImage = screen.getByLabelText("medium-user-avatar-image");

    expect(AvatarWrapper).toBeDefined();
    expect(AvatarImage).toBeDefined();
    expect(AvatarWrapper.getAttribute("data-size")).toBe("medium");
  });
  test("Renders variants without accessibility violation", async () => {
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
            sizing={
              (SizeVariants[key] as TComponentSize) ?? ComponentSizeEnum.Small
            }
          />
        ))}
      </React.Fragment>
    );

    const ComponentContainer = await axe(container);
    expect(ComponentContainer).toHaveNoViolations();
  });
});
