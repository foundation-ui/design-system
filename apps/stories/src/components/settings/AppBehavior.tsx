import React from "react";
import { Field, Checkbox, Accordion } from "@foundation-ui/components";

export const AppBehaviorSettings = () => {
  const AUTOMATION_OPTIONS = [
    {
      id: "interaction_origin",
      label: "Origin",
    },
    {
      id: "interaction_frequency",
      label: "Frequency",
    },
    {
      id: "interaction_threshold",
      label: "Threshold",
    },
  ];
  const APP_BEHAVIOR_OPTIONS = [
    {
      id: "automation_trigger_settings",
      label: "Allow automation based on interactions",
      meta: "Define an automation to be triggered based on interactions on a specific element.",
    },
    {
      id: "funnel_emphasis_settings",
      label: "Allow actions to get dynamic emphasis",
      meta: "Dynamically put emphasis on the primary interaction in crowded features.",
    },
    {
      id: "routine_emphasis_settings",
      label: "Update interface based on users routine",
      meta: "Update the main features displayed on the applications, based on user interactions history.",
    },
    {
      id: "funnel_frequency_settings",
      label: "Define primary actions according to usage frequency",
      meta: "Enhance workflows by settings as primary interactions a frequently used action.",
    },
  ];

  return (
    <form className="grid g-medium-60">
      <hgroup className="grid g-medium-30">
        <h4>Application Behavior</h4>
        <p style={{ opacity: 0.6 }}>
          Adapt apps interfaces based on User behavior Analytics.
        </p>
      </hgroup>
      <Accordion.Root>
        {APP_BEHAVIOR_OPTIONS.map((option, key) => (
          <Field.Wrapper
            key={`${option.id}_${key}`}
            className="grid g-medium-30"
          >
            <Checkbox.Root>
              <div className="flex align-start g-medium-30">
                <Checkbox name={option.id} sizing="small" onChange={() => null}>
                  <Checkbox.Indicator />
                </Checkbox>

                <div className="grid g-medium-10">
                  <Field.Label optional>{option.label}</Field.Label>
                  <Field.Meta style={{ opacity: 0.6 }}>
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
                      {AUTOMATION_OPTIONS.map((option, key) => (
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
  );
};
