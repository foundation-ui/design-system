import React from "react";
import { Field, Checkbox, Accordion } from "@foundation-ui/components";

export const ShortcutsSettings = () => {
  const SHORTCUT_OPTIONS = [
    {
      id: "hot_key",
      label: "Hot key",
    },
    {
      id: "bind_key",
      label: "Bind key",
    },
  ];
  const ACTION_SORTCHUTS = [
    {
      id: "quick-search",
      label: "Allow shortcut to open the Quick Search feature",
      meta: "The Quick Search feature can be triggered when the keys combination is pressed.",
    },
    {
      id: "display-settings",
      label: "Allow shortcut to open the Settings panel",
      meta: "The settings panel can be opened when the keys combination is pressed.",
    },
    {
      id: "open_profile",
      label: "Allow shortcut to open the Profile panel",
      meta: "The profile panel can be opened when the keys combination is pressed.",
    },
    {
      id: "new_workspace",
      label: "Allow shortcut to create a new workspace",
      meta: "Opens the workspace creation module when the keys combination is pressed.",
    },
  ];
  const LAYOUT_SORTCHUTS = [
    {
      id: "toggle-nav",
      label: "Allow shortcut to toggle the Navigation",
      meta: "The component can be opened and closed when the key combination is pressed.",
    },
    {
      id: "toggle-tools",
      label: "Allow shortcut to toggle the Tools",
      meta: "The component can be opened and closed when the key combination is pressed.",
    },
    {
      id: "toggle-options",
      label: "Allow shortcut to toggle the Options",
      meta: "The component can be opened and closed when the key combination is pressed.",
    },
    {
      id: "toggle-drawer",
      label: "Allow shortcut to toggle the Drawer",
      meta: "The component can be opened and closed when the key combination is pressed.",
    },
  ];

  return (
    <React.Fragment>
      <form className="grid g-medium-60">
        <hgroup className="m-b-medium-30">
          <h4>Actions</h4>
        </hgroup>
        <Accordion.Root>
          {ACTION_SORTCHUTS.map((option, key) => (
            <Field.Wrapper
              key={`${option.id}_${key}`}
              className="grid g-medium-30"
            >
              <Checkbox.Root>
                <div className="flex align-start g-medium-30">
                  <Checkbox
                    name={option.id}
                    sizing="small"
                    onChange={() => null}
                  >
                    <Checkbox.Indicator />
                  </Checkbox>

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
                        Parameters
                      </Accordion.Trigger>

                      <Accordion.Content
                        value={option.id}
                        className="flex align-center g-medium-30 p-t-medium-30"
                      >
                        {SHORTCUT_OPTIONS.map((option, key) => (
                          <Field.Root key={`${option.id}_${key}`}>
                            <Field.Wrapper>
                              <Field.Meta>{option.label}</Field.Meta>
                              <Field
                                name={option.id}
                                variant="secondary"
                                sizing="medium"
                                placeholder=""
                                onChange={() => null}
                              />
                            </Field.Wrapper>
                          </Field.Root>
                        ))}
                      </Accordion.Content>
                    </Accordion>
                  </div>
                </div>
              </Checkbox.Root>
            </Field.Wrapper>
          ))}
        </Accordion.Root>
      </form>

      <form className="grid g-medium-60">
        <hgroup className="m-b-medium-30">
          <h4>Layout controls</h4>
        </hgroup>
        <Accordion.Root>
          {LAYOUT_SORTCHUTS.map((option, key) => (
            <Field.Wrapper
              key={`${option.id}_${key}`}
              className="grid g-medium-30"
            >
              <Checkbox.Root>
                <div className="flex align-start g-medium-30">
                  <Checkbox
                    name={option.id}
                    sizing="small"
                    onChange={() => null}
                  >
                    <Checkbox.Indicator />
                  </Checkbox>

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
                        Parameters
                      </Accordion.Trigger>

                      <Accordion.Content
                        value={option.id}
                        className="flex align-center g-medium-30 p-t-medium-30"
                      >
                        {SHORTCUT_OPTIONS.map((option, key) => (
                          <Field.Root key={`${option.id}_${key}`}>
                            <Field.Wrapper>
                              <Field.Meta>{option.label}</Field.Meta>
                              <Field
                                name={option.id}
                                variant="secondary"
                                sizing="medium"
                                placeholder=""
                                onChange={() => null}
                              />
                            </Field.Wrapper>
                          </Field.Root>
                        ))}
                      </Accordion.Content>
                    </Accordion>
                  </div>
                </div>
              </Checkbox.Root>
            </Field.Wrapper>
          ))}
        </Accordion.Root>
      </form>
    </React.Fragment>
  );
};
