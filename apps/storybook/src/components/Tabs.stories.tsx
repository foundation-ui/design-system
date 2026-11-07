import React from "react";
import {
  Avatar,
  Badge,
  Breadcrumb,
  Page,
  SharedLayout,
  Tabs,
} from "@usefui/components";
import { useGradient } from "@usefui/hooks";

/**
 * Tabs are components for a set of tab panels that allows the user to switch between them.
 *
 * **Best practices:**
 *
 * - Ensure that the tabs can be navigated and activated using the keyboard.
 * - Ensure that the focus is managed correctly when switching between tabs.
 * - Ensure that the active tab is visibly indicated and that its content is visible and focusable.
 *
 */
const meta = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  decorators: [
    (Story: any) => (
      <Tabs.Root>
        <Page className="flex flex-column">
          <Page.Navigation className="flex align-center">
            <Badge variant="secondary" sizing="large" shape="round">
              <SharedLayout.Root>
                <SharedLayout
                  inset={4}
                  direction="x"
                  className="w-100 g-medium-10 flex align-center flex-row"
                >
                  <SharedLayout.Item>
                    <Tabs.Trigger value="eng" variant="ghost">
                      <span className="flex align-center p-medium-30">
                        Engineering
                      </span>
                    </Tabs.Trigger>
                  </SharedLayout.Item>

                  <SharedLayout.Item>
                    <Tabs.Trigger value="design" variant="ghost">
                      <span className="flex align-center p-medium-30">
                        Design
                      </span>
                    </Tabs.Trigger>
                  </SharedLayout.Item>
                </SharedLayout>
              </SharedLayout.Root>
            </Badge>
          </Page.Navigation>

          <Page.Wrapper $navigations={1} $menus={1} className="p-x-medium-30">
            <Page.Content className="w-100 h-100 p-medium-30">
              <Story />
            </Page.Content>
          </Page.Wrapper>
          <Page.Menu />
        </Page>
      </Tabs.Root>
    ),
  ],
};
export default meta;

export const Default = {
  render: () => {
    const randomMultiLayer = useGradient({
      layerCount: 3,
      stopsPerLayer: 6,
      types: ["linear", "radial"],
      blendModes: ["overlay", "soft-light", "screen"],
    });
    const randomMultiLayerNoNoise = useGradient({
      noise: false,
      layerCount: 6,
      stopsPerLayer: 3,
      types: ["linear", "radial"],
      blendModes: ["overlay", "soft-light", "screen"],
      colors: ["#ff0080", "#7928ca", "#0070f3", "#00dfd8"],
    });

    return (
      <Tabs className="w-100 h-100 ">
        <Tabs.Content value="eng">
          <Avatar src={randomMultiLayerNoNoise.base64} />
        </Tabs.Content>
        <Tabs.Content value="design">
          <Avatar src={randomMultiLayer.base64} />
        </Tabs.Content>
      </Tabs>
    );
  },
};
