import React from "react";
import { Toolbar, Field } from "@foundation-ui/components";

export const InternalLinksSheet = () => {
  return (
    <Toolbar.Root>
      <Toolbar
        side="left"
        sizing="medium"
        height="auto"
        shortcut
        hotkey="A"
        bindkey="shiftKey"
      >
        <Toolbar.Section>
          {/* <Toolbar.Item>Shift+A</Toolbar.Item> */}
        </Toolbar.Section>

        <Toolbar.Trigger
          id="nav-funnel-trigger"
          variant="border"
          sizing="small"
        >
          <svg
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="m20.5 3-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5M15 19l-6-2.11V5l6 2.11z" />
          </svg>
        </Toolbar.Trigger>
      </Toolbar>
    </Toolbar.Root>
  );
};
export const ToolsSheet = () => {
  return (
    <Toolbar.Root>
      <Toolbar
        side="right"
        sizing="large"
        height="auto"
        shortcut
        hotkey="D"
        bindkey="shiftKey"
      >
        <Toolbar.Section>
          {/* <Toolbar.Item>Shift+D</Toolbar.Item> */}
        </Toolbar.Section>

        <Toolbar.Trigger
          id="tools-funnel-trigger"
          variant="border"
          sizing="small"
        >
          <svg
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="m16.24 11.51 1.57-1.57-3.75-3.75-1.57 1.57-4.14-4.13c-.78-.78-2.05-.78-2.83 0l-1.9 1.9c-.78.78-.78 2.05 0 2.83l4.13 4.13L3 17.25V21h3.75l4.76-4.76 4.13 4.13c.95.95 2.23.6 2.83 0l1.9-1.9c.78-.78.78-2.05 0-2.83zm-7.06-.44L5.04 6.94l1.89-1.9L8.2 6.31 7.02 7.5l1.41 1.41 1.19-1.19 1.45 1.45zm7.88 7.89-4.13-4.13 1.9-1.9 1.45 1.45-1.19 1.19 1.41 1.41 1.19-1.19 1.27 1.27zm3.65-11.92c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.47-.47-1.12-.29-1.41 0l-1.83 1.83 3.75 3.75z" />
          </svg>
        </Toolbar.Trigger>
      </Toolbar>
    </Toolbar.Root>
  );
};
export const OptionsSheet = () => {
  const [custom_ab, setCustomAb] = React.useState({
    default: 0,
    alternative: 1,
    gamble: 1,
    odds: 2,
  });

  return (
    <Toolbar.Root>
      <Toolbar
        side="top"
        sizing="medium"
        height="auto"
        shortcut
        hotkey="W"
        bindkey="shiftKey"
      >
        <Toolbar.Trigger variant="border" sizing="small">
          <svg viewBox="0 0 24 24">
            <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4z" />
            <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m-5.99 13c-.59 0-1.05-.47-1.05-1.05 0-.59.47-1.04 1.05-1.04.59 0 1.04.45 1.04 1.04-.01.58-.45 1.05-1.04 1.05m2.5-6.17c-.63.93-1.23 1.21-1.56 1.81-.13.24-.18.4-.18 1.18h-1.52c0-.41-.06-1.08.26-1.65.41-.73 1.18-1.16 1.63-1.8.48-.68.21-1.94-1.14-1.94-.88 0-1.32.67-1.5 1.23l-1.37-.57C11.51 5.96 12.52 5 13.99 5c1.23 0 2.08.56 2.51 1.26.37.61.58 1.73.01 2.57" />
          </svg>
        </Toolbar.Trigger>

        <Toolbar.Section>
          <hgroup className="grid g-medium-10 m-y-medium-60">
            <p>Configure AB Testing</p>
            <p
              className="opacity-default-60 "
              style={{
                maxWidth: "var(--breakpoint-tablet-small)",
              }}
            >
              AB is a statistical comparison method used to compare different
              variations of a basic version of an element and is used in this
              Application.
            </p>
          </hgroup>

          <form className="flex g-medium-30">
            <Field.Root>
              <Field.Wrapper>
                <Field.Label optional>Default version</Field.Label>
                <Field
                  type="number"
                  name="default-ab-version"
                  variant="secondary"
                  sizing="medium"
                  placeholder=""
                  value={custom_ab.default}
                  onChange={(event) =>
                    setCustomAb((prevItems) => ({
                      ...prevItems,
                      default: Number(event.target.value),
                    }))
                  }
                />
              </Field.Wrapper>
            </Field.Root>
            <Field.Root>
              <Field.Wrapper>
                <Field.Label optional>Target version</Field.Label>
                <Field
                  type="number"
                  name="target-ab-version"
                  variant="secondary"
                  sizing="medium"
                  placeholder=""
                  value={custom_ab.alternative}
                  onChange={(event) =>
                    setCustomAb((prevItems) => ({
                      ...prevItems,
                      alternative: Number(event.target.value),
                    }))
                  }
                />
              </Field.Wrapper>
            </Field.Root>
            <Field.Root>
              <Field.Wrapper>
                <Field.Label optional>Trigger Key</Field.Label>
                <Field
                  type="number"
                  name="ab-trigger-key"
                  variant="secondary"
                  sizing="medium"
                  placeholder=""
                  value={custom_ab.gamble}
                  onChange={(event) =>
                    setCustomAb((prevItems) => ({
                      ...prevItems,
                      gamble: Number(event.target.value),
                    }))
                  }
                />
              </Field.Wrapper>
            </Field.Root>
            <Field.Root>
              <Field.Wrapper>
                <Field.Label optional>Threshold</Field.Label>
                <Field
                  type="number"
                  name="ab-treshold"
                  variant="secondary"
                  sizing="medium"
                  placeholder=""
                  value={custom_ab.odds}
                  onChange={(event) =>
                    setCustomAb((prevItems) => ({
                      ...prevItems,
                      threshold: Number(event.target.value),
                    }))
                  }
                />
              </Field.Wrapper>
            </Field.Root>
          </form>
        </Toolbar.Section>
      </Toolbar>
    </Toolbar.Root>
  );
};
