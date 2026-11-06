import React from "react";
import {
  StateCanvas,
  Page,
  Shimmer,
  BulkActions,
  Tooltip,
  Button,
  Loader,
  Toggle,
  Field,
  Viewport,
} from "@usefui/components";
import { useColorMode } from "@usefui/tokens";
import { Icon } from "@usefui/icons";

const meta = {
  title: "Components/StateCanvas",
  component: StateCanvas,
  tags: ["autodocs"],
  decorators: [
    (Story: any) => (
      <Page className="p-medium-30">
        <Page.Content className="flex align-center justify-center h-100 w-100 g-medium-30">
          <Story />
        </Page.Content>
      </Page>
    ),
  ],
};
export default meta;

export const Default = {
  args: {},
  render: ({ ...args }) => {
    return (
      <StateCanvas>
        <StateCanvas.Variant />
      </StateCanvas>
    );
  },
};
export const CustomColor = {
  args: {},
  render: ({ ...args }) => {
    return (
      <StateCanvas>
        <StateCanvas.Variant color="orange" />
      </StateCanvas>
    );
  },
};
export const ColorMode = {
  args: {},
  render: ({ ...args }) => {
    const { colorMode, setColorMode } = useColorMode();
    const particlesColor = colorMode === "light" ? "blue" : "green";

    return (
      <React.Fragment>
        <StateCanvas>
          <StateCanvas.Variant color={particlesColor} />
        </StateCanvas>

        <BulkActions.Root>
          <BulkActions
            className="flex align-center g-medium-60"
            shape="round"
            sizing="small"
            side="bottom"
            variant="secondary"
            shortcut
            hotkey="B"
            bindkey="shiftKey"
          >
            <div className="flex align-center g-medium-60">
              <BulkActions.Item>
                <Toggle
                  sizing="small"
                  variant="ghost"
                  sound="tick"
                  onCheckedChange={() => {
                    setColorMode(colorMode === "light" ? "dark" : "light");
                  }}
                >
                  <Icon className="m-y-small-80">
                    {colorMode === "light" ? <Icon.Sun /> : <Icon.Moon />}
                  </Icon>
                </Toggle>
              </BulkActions.Item>
            </div>
          </BulkActions>
        </BulkActions.Root>
      </React.Fragment>
    );
  },
};

export const Variant = {
  args: {},
  render: ({ ...args }) => {
    const { colorMode } = useColorMode();

    const [currentShape, setCurrentShape] = React.useState("circle");
    const [currentVariant, setCurrentVariant] = React.useState("analysis");
    const [currentSpeed, setCurrentSpeed] = React.useState(1);

    const particlesColor = colorMode === "light" ? "#00000030" : "#FFFFFF30";

    return (
      <React.Fragment>
        <StateCanvas>
          <StateCanvas.Variant
            shape={currentShape as any}
            variant={currentVariant as any}
            speed={currentSpeed}
            color={particlesColor}
            key={`${currentShape}-${currentVariant}`}
          />
        </StateCanvas>

        <BulkActions.Root>
          <BulkActions
            className="flex align-center g-medium-60"
            shape="round"
            sizing="small"
            side="top"
            variant="secondary"
            shortcut
            hotkey="B"
            bindkey="shiftKey"
          >
            <div className="flex flex-column align-center g-medium-10">
              <Tooltip variant="secondary" content="Speed" hint="Default to 1">
                <Field.Root>
                  <Field.Range
                    showValue={false}
                    min={0.1}
                    max={2}
                    step={0.1}
                    defaultValue={currentSpeed}
                    sizing="small"
                    shape="round"
                    onChange={(value) => setCurrentSpeed(value)}
                  />
                </Field.Root>
              </Tooltip>
            </div>
          </BulkActions>
        </BulkActions.Root>

        <BulkActions.Root>
          <BulkActions
            className="flex align-center g-medium-60"
            shape="round"
            sizing="small"
            side="left"
            variant="secondary"
            shortcut
            hotkey="B"
            bindkey="shiftKey"
          >
            <div className="flex flex-column align-center g-medium-10">
              <Tooltip variant="secondary" content="Circle">
                <BulkActions.Item>
                  <Button
                    variant="ghost"
                    sizing="small"
                    shape="round"
                    onClick={() => setCurrentShape("circle")}
                    rawicon
                    sound="tick"
                  >
                    <Icon
                      className="m-y-small-80"
                      fill="none"
                      stroke="var(--font-color)"
                      opacity={0.6}
                      height={8}
                      width={8}
                    >
                      <Icon.Circle />
                    </Icon>
                  </Button>
                </BulkActions.Item>
              </Tooltip>
              <Tooltip variant="secondary" content="Triangle">
                <BulkActions.Item>
                  <Button
                    variant="ghost"
                    sizing="small"
                    shape="round"
                    rawicon
                    onClick={() => setCurrentShape("triangle")}
                    sound="tick"
                  >
                    <Icon
                      className="m-y-small-80"
                      opacity={0.6}
                      height={8}
                      width={8}
                    >
                      <Icon.Triangle />
                    </Icon>
                  </Button>
                </BulkActions.Item>
              </Tooltip>
              <Tooltip variant="secondary" content="Square">
                <BulkActions.Item>
                  <Button
                    variant="ghost"
                    sizing="small"
                    shape="round"
                    rawicon
                    onClick={() => setCurrentShape("square")}
                    sound="tick"
                  >
                    <Icon
                      className="m-y-small-80"
                      opacity={0.6}
                      height={8}
                      width={8}
                    >
                      <Icon.Square />
                    </Icon>
                  </Button>
                </BulkActions.Item>
              </Tooltip>
              <Tooltip variant="secondary" content="Diamond">
                <BulkActions.Item>
                  <Button
                    variant="ghost"
                    sizing="small"
                    shape="round"
                    rawicon
                    onClick={() => setCurrentShape("diamond")}
                    sound="tick"
                  >
                    <Icon
                      className="m-y-small-80"
                      opacity={0.6}
                      style={{ rotate: "45deg" }}
                      height={8}
                      width={8}
                    >
                      <Icon.Square />
                    </Icon>
                  </Button>
                </BulkActions.Item>
              </Tooltip>
            </div>
          </BulkActions>
        </BulkActions.Root>

        <BulkActions.Root>
          <BulkActions
            className="flex align-center g-medium-60"
            shape="round"
            sizing="small"
            side="bottom"
            variant="secondary"
            shortcut
            hotkey="B"
            bindkey="shiftKey"
          >
            <div className="flex align-center g-medium-60 p-x-medium-30">
              {[
                "Analysis",
                "Connect",
                "Think",
                "Intense",
                "Ripple",
                "Converge",
                "Sweep X",
                "Sweep Y",
                "Diagonal",
                "Corner",
              ].map((v) => (
                <Tooltip variant="secondary" content={v}>
                  <BulkActions.Item>
                    <Button
                      variant="ghost"
                      sizing="small"
                      shape="round"
                      onClick={() =>
                        setCurrentVariant(v.toLowerCase().replaceAll(" ", "-"))
                      }
                      sound="tick"
                    >
                      <span className="fs-medium-30">•</span>
                    </Button>
                  </BulkActions.Item>
                </Tooltip>
              ))}
            </div>
          </BulkActions>
        </BulkActions.Root>
      </React.Fragment>
    );
  },
};
