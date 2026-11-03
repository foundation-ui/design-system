import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import {
  Prompt,
  Page,
  Button,
  DropdownMenu,
  Badge,
  ScrollArea,
  MessageBubble,
  Field,
  Avatar,
  ProgressBar,
  Pill,
  Tooltip,
} from "@usefui/components";
import { useGradient } from "@usefui/hooks";
import { Icon } from "@usefui/icons";

const meta = {
  title: "Components/Prompt",
  component: Prompt,
  tags: ["autodocs"],
  decorators: [
    (Story: any) => (
      <Page className="p-medium-30">
        <Page.Content className="flex flex-column align-end justify-between h-100 w-100 p-medium-30">
          <Story />
        </Page.Content>
      </Page>
    ),
  ],
} satisfies Meta<typeof Prompt>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Tools: Story = {
  args: {},
  render: ({ ...args }) => {
    return (
      <React.Fragment>
        <ScrollArea
          className="w-100 h-100 flex flex-column g-medium-60 p-b-medium-60"
          scrollbar
        />

        <Prompt.Root>
          <Prompt cleanup shortcut bindkey="ctrlKey" hotkey="Enter" />
          <Prompt.Tools className="flex justify-end align-center">
            <Button
              variant="primary"
              sizing="small"
              shape="round"
              animation="reflective"
              sound="tick"
            >
              <Icon className="m-y-small-80" fill="var(--body-color)">
                <Icon.ArrowUp />
              </Icon>
            </Button>
          </Prompt.Tools>
        </Prompt.Root>
      </React.Fragment>
    );
  },
};
export const Auxiliary: Story = {
  args: {},
  render: ({ ...args }) => {
    return (
      <React.Fragment>
        <ScrollArea
          className="w-100 h-100 flex flex-column g-medium-60 p-b-medium-60"
          scrollbar
        />

        <Prompt.Root>
          <Prompt.Auxiliary
            height={40}
            direction="x"
            className="flex g-medium-10 align-center w-100"
          >
            {Array.from({ length: 4 }).map((item) => (
              <div>
                <Button variant="secondary" sizing="small" shape="round">
                  Lorem&nbsp;Ipsum
                </Button>
              </div>
            ))}
          </Prompt.Auxiliary>

          <Prompt cleanup shortcut bindkey="ctrlKey" hotkey="Enter" />
        </Prompt.Root>
      </React.Fragment>
    );
  },
};
export const Composed: Story = {
  args: {},
  render: ({ ...args }) => {
    const MAX_CHARS = 2048;

    const [messages, setMessages] = React.useState<string[]>([]);
    const [value, setValue] = React.useState("");

    const randomMultiLayer = useGradient({
      layerCount: 3,
      stopsPerLayer: 6,
      types: ["linear", "radial"],
      blendModes: ["overlay", "soft-light", "screen"],
    });
    const actionsAvatar = useGradient({
      layerCount: 3,
      stopsPerLayer: 6,
      types: ["linear", "radial"],
      blendModes: ["darken", "lighten", "color-dodge", "color-burn"],
    });
    const consumption = value.length;
    const isOverLimit = consumption > MAX_CHARS;
    const canSubmit = value.trim().length > 0 && !isOverLimit;

    const handleAnxiliaryAction = (value: string) => {
      setValue(value);
    };
    const submit = () => {
      if (!canSubmit) return;
      setMessages((prev) => [...prev, value]);
    };

    return (
      <React.Fragment>
        <ScrollArea
          className="w-100 h-100 flex flex-column g-medium-60 p-b-medium-60"
          scrollbar
        >
          {messages.map((msg, i) => (
            <MessageBubble.Root key={i}>
              <MessageBubble side="right">
                <Field.Meta variant="hint">
                  <Avatar src={randomMultiLayer.base64} sizing="medium">
                    <Avatar.Badge src="https://avatars.githubusercontent.com/u/242926543?s=200&v=4" />
                  </Avatar>
                </Field.Meta>

                <MessageBubble.Content
                  variant="secondary"
                  className="fs-medium-20"
                  shape="round"
                  emphasis
                >
                  {msg}
                </MessageBubble.Content>
                <MessageBubble.Meta createdAt={new Date()} />
              </MessageBubble>
            </MessageBubble.Root>
          ))}
        </ScrollArea>

        <Prompt.Root>
          <Prompt.Auxiliary
            height={40}
            direction="x"
            className="flex g-medium-30 align-center w-100"
          >
            {Array.from({ length: 25 }).map((item) => {
              return (
                <div>
                  <Button
                    variant="ghost"
                    shape="round"
                    onClick={() =>
                      handleAnxiliaryAction(
                        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio, magnam. Quibusdam alias nihil dolor ducimus, cum obcaecati blanditiis enim iusto in corporis incidunt, molestiae et aliquam debitis sit! Aliquam, autem!",
                      )
                    }
                  >
                    <Avatar src={actionsAvatar.base64} sizing="medium" />
                  </Button>
                </div>
              );
            })}
          </Prompt.Auxiliary>

          <Prompt
            cleanup
            shortcut={canSubmit}
            bindkey="ctrlKey"
            hotkey="Enter"
            placeholder="Press Ctrl + Enter to send your message"
            value={value}
            onSubmit={submit}
            onChange={(e) => setValue(e.target.value.slice(0, MAX_CHARS))}
          />

          <Prompt.Tools className="flex justify-between align-center">
            <Badge variant="primary">
              <span className="fs-small-50">
                {consumption}/{MAX_CHARS}
              </span>
            </Badge>

            <Button
              variant="primary"
              sizing="small"
              shape="round"
              animation="reflective"
              sound="tick"
              disabled={!canSubmit}
              onClick={() => {
                submit();
                setValue("");
              }}
            >
              <Icon className="m-y-small-80" fill="var(--body-color)">
                <Icon.ArrowUp />
              </Icon>
            </Button>
          </Prompt.Tools>
        </Prompt.Root>
      </React.Fragment>
    );
  },
};
