import React from "react";
import { render, screen } from "@testing-library/react";
import { BehaviorProvider, useBehavior } from "../BehavioralAnalyticsProvider";
import "@testing-library/jest-dom";

const Component = () => {
  const analytics = useBehavior();

  return <button aria-label="test-trigger">{analytics.started_at}</button>;
};
describe("BehaviorProvider", () => {
  it("Display the session start timestamp", () => {
    render(
      <BehaviorProvider>
        <Component />
      </BehaviorProvider>
    );

    // expect(screen.getByText("")).toBeInTheDocument();
  });
});
