import React from "react";

import { useGradient } from "@usefui/hooks";

import {
  Card,
  Button,
  Page,
  Pill,
  Switch,
  Checkbox,
  StateCanvas,
  Image,
  useColorMode,
} from "@usefui/components";
import { Icon } from "@usefui/icons";

import { GetDesignToken } from "@usefui/tokens";

/**
 *
 */
const meta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  decorators: [
    (Story: any) => (
      <Page className="p-medium-30">
        <Page.Content className="p-medium-30 w-100 h-100" scrollbar>
          <Story />
        </Page.Content>
      </Page>
    ),
  ],
};
export default meta;

export const Default = {
  render: () => {
    const thumbnail = useGradient({
      width: 512,
      height: 334,
      layerCount: 3,
      stopsPerLayer: 6,
      types: ["linear", "radial"],
      blendModes: ["overlay", "soft-light", "screen"],
    });

    return (
      <div style={{ maxWidth: 360 }}>
        <Card shape="round">
          <Card.Meta className="flex align-center justify-between g-medium-30 p-medium-30">
            <p className="fs-medium-10 opacity-default-60">Facilis eligendi</p>

            <Checkbox.Root>
              <Checkbox variant="secondary" sizing="medium">
                <Checkbox.Indicator />
              </Checkbox>
            </Checkbox.Root>
          </Card.Meta>

          <div className="w-100 h-large-90" style={{ position: "relative" }}>
            <Card.Image
              src={thumbnail.base64}
              alt="card-gradient-cover"
              shape="round"
              fill
            />
          </div>

          <Card.Body shape="round">
            <hgroup>
              <p className="fs-medium-30">Lorem ipsum</p>
              <p className="fs-medium-10 opacity-default-60">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed
                molestiae perspiciatis itaque cupiditate autem repellendus nam
                nesciunt! Quis, distinctio, quidem dolorum possimus consectetur
                repudiandae, facilis eligendi repellendus pariatur ab velit?
              </p>
            </hgroup>

            <footer className="w-100 flex justify-between g-medium-10">
              <div className="flex align-center g-medium-30">
                <Switch.Root>
                  <Switch sizing="medium">
                    <Switch.Thumb />
                  </Switch>
                </Switch.Root>
              </div>

              <Button sizing="small" variant="primary" shape="round">
                Primary
                <Icon>
                  <Icon.ChevronRight />
                </Icon>
              </Button>
            </footer>
          </Card.Body>

          <Card.Meta className="flex justify-between align-center g-medium-30 p-y-medium-10 p-x-medium-30">
            <Pill sizing="small" shape="smooth" status="success" />
            <p className="fs-medium-10 opacity-default-30">
              Possimus consectetur
            </p>
          </Card.Meta>
        </Card>
      </div>
    );
  },
};

export const Grid = {
  render: () => {
    return (
      <Card.Grid sizing="medium">
        {[
          "analysis",
          "connect",
          "sweep-y",
          "sweep-x",
          "think",
          "intense",
          "ripple",
          "converge",
        ].map((v) => (
          <Card.Body shape="round">
            <hgroup>
              <p className="fs-medium-30">Lorem ipsum</p>
              <p className="fs-medium-10 opacity-default-60">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed
                molestiae perspiciatis itaque cupiditate autem repellendus nam
                nesciunt! Quis, distinctio, quidem dolorum possimus consectetur
                repudiandae, facilis eligendi repellendus pariatur ab velit?
              </p>
            </hgroup>

            <footer className="w-100 flex justify-between g-medium-10">
              <div className="flex align-center g-medium-30">
                <Switch.Root>
                  <Switch sizing="medium">
                    <Switch.Thumb />
                  </Switch>
                </Switch.Root>
              </div>

              <Button sizing="small" variant="link" shape="round">
                Details
                <Icon>
                  <Icon.LinkExternal />
                </Icon>
              </Button>
            </footer>
          </Card.Body>
        ))}
      </Card.Grid>
    );
  },
};
export const GridWithImage = {
  render: () => {
    const thumbnail = useGradient({
      width: 512,
      height: 334,
      layerCount: 3,
      stopsPerLayer: 6,
      types: ["linear", "radial"],
      blendModes: ["overlay", "soft-light", "screen"],
    });

    return (
      <Card.Grid sizing="medium">
        {[
          "analysis",
          "connect",
          "sweep-y",
          "sweep-x",
          "think",
          "intense",
          "ripple",
          "converge",
        ].map((v) => (
          <Card shape="round">
            <Card.Meta className="flex align-center justify-between g-medium-30 p-medium-30">
              <p className="fs-medium-10 opacity-default-60">
                Facilis eligendi
              </p>

              <Checkbox.Root>
                <Checkbox variant="secondary" sizing="medium">
                  <Checkbox.Indicator />
                </Checkbox>
              </Checkbox.Root>
            </Card.Meta>
            <div className="w-100 h-large-90" style={{ position: "relative" }}>
              <Card.Image
                src={thumbnail.base64}
                alt="card-gradient-cover"
                shape="round"
                fill
              />
            </div>
            <Card.Body shape="round">
              <hgroup>
                <p className="fs-medium-30">Lorem ipsum</p>
                <p className="fs-medium-10 opacity-default-60">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed
                  molestiae perspiciatis itaque cupiditate autem repellendus nam
                  nesciunt! Quis, distinctio, quidem dolorum possimus
                  consectetur repudiandae, facilis eligendi repellendus pariatur
                  ab velit?
                </p>
              </hgroup>

              <footer className="w-100 flex justify-between g-medium-10">
                <div className="flex align-center g-medium-30">
                  <Switch.Root>
                    <Switch sizing="medium">
                      <Switch.Thumb />
                    </Switch>
                  </Switch.Root>
                </div>

                <Button sizing="small" variant="primary" shape="round">
                  Primary
                  <Icon>
                    <Icon.ChevronRight />
                  </Icon>
                </Button>
              </footer>
            </Card.Body>

            <Card.Meta className="flex justify-between align-center g-medium-30 p-y-medium-10 p-x-medium-30">
              <Pill sizing="small" shape="smooth" status="success" />
              <p className="fs-medium-10 opacity-default-30">
                Possimus consectetur
              </p>
            </Card.Meta>
          </Card>
        ))}
      </Card.Grid>
    );
  },
};
export const GridWithCanvas = {
  render: () => {
    const { colorMode } = useColorMode();
    const thumbnail = useGradient({
      width: 1920,
      height: 1080,
      layerCount: 3,
      stopsPerLayer: 6,

      types: ["linear", "radial"],
      blendModes: ["overlay", "soft-light", "screen"],
      colors: [
        "transparent",
        GetDesignToken("alpha-red-60"),
        GetDesignToken("alpha-orange-60"),
        GetDesignToken("alpha-yellow-60"),
      ],
    });

    const particlesColor =
      colorMode === "light"
        ? GetDesignToken("color-mono-dark")
        : GetDesignToken("color-mono-light");

    return (
      <Card.Grid sizing="medium">
        {[
          "analysis",
          "connect",
          "sweep-y",
          "sweep-x",
          "think",
          "intense",
          "ripple",
          "converge",
        ].map((v) => (
          <Card shape="round">
            <Card.Meta className="flex align-center justify-between g-medium-30 p-medium-30">
              <p className="fs-medium-10 opacity-default-60">
                Facilis eligendi
              </p>

              <Checkbox.Root>
                <Checkbox variant="secondary" sizing="medium">
                  <Checkbox.Indicator />
                </Checkbox>
              </Checkbox.Root>
            </Card.Meta>

            <div className="w-100 h-large-90" style={{ position: "relative" }}>
              <StateCanvas>
                <StateCanvas.Variant
                  variant={v as any}
                  shape="square"
                  color={particlesColor}
                  speed={0.25}
                >
                  <Image
                    src={thumbnail.base64}
                    alt="gradient-cover-fill"
                    fill
                  />
                </StateCanvas.Variant>
              </StateCanvas>
            </div>

            <Card.Body shape="round">
              <hgroup>
                <p className="fs-medium-30">Lorem ipsum</p>
                <p className="fs-medium-10 opacity-default-60">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed
                  molestiae perspiciatis itaque cupiditate autem repellendus nam
                  nesciunt! Quis, distinctio, quidem dolorum possimus
                  consectetur repudiandae, facilis eligendi repellendus pariatur
                  ab velit?
                </p>
              </hgroup>

              <footer className="w-100 flex justify-between g-medium-10">
                <div className="flex align-center g-medium-30">
                  <Switch.Root>
                    <Switch sizing="medium">
                      <Switch.Thumb />
                    </Switch>
                  </Switch.Root>
                </div>

                <Button sizing="small" variant="primary" shape="round">
                  Primary
                  <Icon>
                    <Icon.ChevronRight />
                  </Icon>
                </Button>
              </footer>
            </Card.Body>

            <Card.Meta className="flex justify-between align-center g-medium-30 p-y-medium-10 p-x-medium-30">
              <Pill sizing="small" shape="smooth" status="success" />
              <p className="fs-medium-10 opacity-default-30">
                Possimus consectetur
              </p>
            </Card.Meta>
          </Card>
        ))}
      </Card.Grid>
    );
  },
};
