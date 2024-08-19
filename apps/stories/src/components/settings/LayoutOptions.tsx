import React from "react";
import {
  Field,
  Switch,
  Checkbox,
  Toggle,
  Accordion,
} from "@foundation-ui/components";

export const LayoutOptionsSettings = () => {
  const SIZES_OPTIONS = [
    {
      id: "small",
      label: "Small",
      Icon: (
        <path d="M19 7H5c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2m0 8H5V9h14z" />
      ),
    },
    {
      id: "medium",
      label: "Medium",
      Icon: (
        <path d="M19 6H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2m0 10H5V8h14z" />
      ),
    },
    {
      id: "large",
      label: "Large",
      Icon: (
        <path d="M19 4H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 14H5V6h14z" />
      ),
    },
  ];
  const LAYOUT_OPTIONS = [
    {
      id: "layout_controls_nav",
      label: "Render Aside Navigation open as default",
      meta: "Positioned on the inner left side of the application.",
    },
    {
      id: "layout_controls_tools",
      label: "Render Tools open as default",
      meta: "Positioned on the inner right side of the application.",
    },
    {
      id: "layout_controls_options",
      label: "Render Options open as default",
      meta: "Positioned on the top side, bellow every navigations/menus of the application.",
    },
    {
      id: "layout_controls_drawer",
      label: "Render Drawer components open as default",
      meta: "Positioned on the bottom side of and over other elements when opened.",
    },
  ];

  return (
    <form className="grid g-medium-60">
      <hgroup className="grid g-medium-30">
        <h4>Layout Options</h4>
      </hgroup>

      <Accordion.Root>
        {LAYOUT_OPTIONS.map((option, key) => (
          <Field.Wrapper
            key={`${option.id}_${key}`}
            className="grid g-medium-30"
          >
            <div className="flex align-start g-medium-30">
              <Checkbox.Root>
                <Checkbox name={option.id} sizing="small" onChange={() => null}>
                  <Checkbox.Indicator />
                </Checkbox>
              </Checkbox.Root>
              <div className="grid g-medium-10">
                <Field.Label optional>{option.label}</Field.Label>
                <Field.Meta className="opacity-default-60">
                  {option.meta}
                </Field.Meta>
                <Accordion>
                  <Accordion.Trigger
                    value={option.id}
                    variant="border"
                    sizing="small"
                  >
                    Advanced options
                  </Accordion.Trigger>
                  <Accordion.Content
                    value={option.id}
                    className="flex align-center g-medium-60 p-t-medium-30"
                  >
                    <div className="grid g-medium-30">
                      <Field.Label optional>
                        <Field.Meta className="flex align-center g-medium-30">
                          <span>
                            <span style={{ color: "var(--color-yellow)" }}>
                              ⚠&nbsp;
                            </span>
                            Enable <b>collapse</b> mode
                          </span>

                          <Switch.Root>
                            <Switch
                              defaultChecked
                              variant="secondary"
                              sizing="medium"
                            >
                              <Switch.Thumb />
                            </Switch>
                          </Switch.Root>
                        </Field.Meta>

                        <Field.Meta className="opacity-default-60">
                          Disabling the collapse mode cancels the shortcuts
                          usage.
                        </Field.Meta>
                      </Field.Label>

                      <Field.Label optional className="grid g-medium-10">
                        <Field.Meta>Component Size</Field.Meta>
                        <div className="flex g-medium-30">
                          {SIZES_OPTIONS.map((item, key) => (
                            <Toggle
                              key={`${item.id}_${key}`}
                              name={item.id}
                              variant="border"
                              sizing="small"
                              onClick={() => null}
                            >
                              <svg
                                focusable="false"
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                                width={16}
                                height={16}
                                fill="currentColor"
                              >
                                {item.Icon}
                              </svg>
                              {item.label}
                            </Toggle>
                          ))}
                        </div>
                      </Field.Label>
                    </div>
                  </Accordion.Content>
                </Accordion>
              </div>
            </div>
          </Field.Wrapper>
        ))}
      </Accordion.Root>
    </form>
  );
};
