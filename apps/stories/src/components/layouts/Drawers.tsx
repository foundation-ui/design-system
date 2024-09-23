import React from "react";
import { useApp } from "../../contexts/AppProvider";

import {
  Page,
  Badge,
  DropdownMenu,
  Divider,
  Checkbox,
  Field,
  Table,
} from "@foundation-ui/components";

export const AnalyticsDrawer = () => {
  const { user_behavior_analytics } = useApp();
  const deferred_interaction_data = React.useDeferredValue(
    user_behavior_analytics.usage
  );

  return (
    <Page.Panel
      side="bottom"
      height="display"
      shortcut={
        deferred_interaction_data && deferred_interaction_data.length !== 0
      }
      hotkey="S"
      bindkey="shiftKey"
      trigger={
        <React.Fragment>
          <svg
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M14.06 9.94 12 9l2.06-.94L15 6l.94 2.06L18 9l-2.06.94L15 12zM4 14l.94-2.06L7 11l-2.06-.94L4 8l-.94 2.06L1 11l2.06.94zm4.5-5 1.09-2.41L12 5.5 9.59 4.41 8.5 2 7.41 4.41 5 5.5l2.41 1.09zm-4 11.5 6-6.01 4 4L23 8.93l-1.41-1.41-7.09 7.97-4-4L3 19z" />
          </svg>
        </React.Fragment>
      }
      triggerProps={{
        sizing: "small",
        variant: "border",
        disabled:
          !deferred_interaction_data || deferred_interaction_data.length === 0,
      }}
    >
      {deferred_interaction_data && deferred_interaction_data.length !== 0 && (
        <div className="m-y-medium-60">
          <hgroup className="m-b-medium-30 flex align-center g-medium-30">
            <Field.Root>
              <Field.Wrapper>
                <Field
                  name="search-uba"
                  variant="secondary"
                  sizing="medium"
                  placeholder="Search.."
                  onChange={() => null}
                />
              </Field.Wrapper>
            </Field.Root>
            <DropdownMenu.Root>
              <DropdownMenu>
                <DropdownMenu.Trigger variant="border" sizing="medium">
                  Columns
                  <svg
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M3 9h14V7H3zm0 4h14v-2H3zm0 4h14v-2H3zm16 0h2v-2h-2zm0-10v2h2V7zm0 6h2v-2h-2z" />
                  </svg>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content sizing="medium">
                  <DropdownMenu.Item className="flex align-center justify-between">
                    Origin<b>✓</b>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="flex align-center justify-between">
                    Most Frequent Count<b>✓</b>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="flex align-center justify-between">
                    Frequency<b>✓</b>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="flex align-center justify-between">
                    Last interaction<b>✓</b>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu>
            </DropdownMenu.Root>
            <DropdownMenu.Root>
              <DropdownMenu>
                <DropdownMenu.Trigger variant="border" sizing="medium">
                  Filter by
                  <svg
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M7 6h10l-5.01 6.3zm-2.75-.39C6.27 8.2 10 13 10 13v6c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-6s3.72-4.8 5.74-7.39c.51-.66.04-1.61-.79-1.61H5.04c-.83 0-1.3.95-.79 1.61" />
                  </svg>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content sizing="small">
                  <DropdownMenu.Item className="flex align-center justify-between">
                    Click<b>◭</b>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="flex align-center justify-between">
                    Dbl Click<b>◭◭</b>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="flex align-center justify-between">
                    Hover<b>❏</b>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu>
            </DropdownMenu.Root>
            <DropdownMenu.Root>
              <DropdownMenu>
                <DropdownMenu.Trigger variant="border" sizing="medium">
                  Sort by
                  <svg
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M16 17.01V10h-2v7.01h-3L15 21l4-3.99zM9 3 5 6.99h3V14h2V6.99h3zm7 14.01V10h-2v7.01h-3L15 21l4-3.99zM9 3 5 6.99h3V14h2V6.99h3z"></path>
                  </svg>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content sizing="small">
                  <DropdownMenu.Item className="flex align-center justify-between">
                    Asc<b>↑</b>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="flex align-center justify-between">
                    Desc<b>↓</b>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu>
            </DropdownMenu.Root>
          </hgroup>

          <Table>
            <Table.Head>
              <Table.Row>
                <Table.HeadCell>
                  <Checkbox.Root>
                    <Checkbox onChange={() => null}>
                      <Checkbox.Indicator />
                    </Checkbox>
                  </Checkbox.Root>
                </Table.HeadCell>
                <Table.HeadCell>Origin</Table.HeadCell>
                <Table.HeadCell>Frequency</Table.HeadCell>
                <Table.HeadCell>Types</Table.HeadCell>
                <Table.HeadCell>
                  <DropdownMenu.Root>
                    <DropdownMenu>
                      <DropdownMenu.Trigger variant="ghost" sizing="small">
                        Most frequent<b>⋮</b>
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Content sizing="small">
                        <DropdownMenu.Item className="flex align-center justify-between">
                          Click<b>◭</b>
                        </DropdownMenu.Item>
                        <DropdownMenu.Item className="flex align-center justify-between">
                          Dbl Click<b>◭◭</b>
                        </DropdownMenu.Item>
                        <DropdownMenu.Item className="flex align-center justify-between">
                          Hover<b>❏</b>
                        </DropdownMenu.Item>
                        <Divider />
                        <DropdownMenu.Item className="flex align-center justify-between">
                          Hide<b>✗</b>
                        </DropdownMenu.Item>
                      </DropdownMenu.Content>
                    </DropdownMenu>
                  </DropdownMenu.Root>
                </Table.HeadCell>
                <Table.HeadCell>Most Frequent Count</Table.HeadCell>

                <Table.HeadCell>
                  <DropdownMenu.Root>
                    <DropdownMenu>
                      <DropdownMenu.Trigger variant="ghost" sizing="small">
                        Last interaction<b>⋮</b>
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Content sizing="small">
                        <DropdownMenu.Item className="flex align-center justify-between">
                          Asc<b>↑</b>
                        </DropdownMenu.Item>
                        <DropdownMenu.Item className="flex align-center justify-between">
                          Desc<b>↓</b>
                        </DropdownMenu.Item>
                        <Divider />
                        <DropdownMenu.Item className="flex align-center justify-between">
                          Hide<b>✗</b>
                        </DropdownMenu.Item>
                      </DropdownMenu.Content>
                    </DropdownMenu>
                  </DropdownMenu.Root>
                </Table.HeadCell>

                <Table.HeadCell />
              </Table.Row>
            </Table.Head>

            <Table.Body className="fs-medium-10">
              {deferred_interaction_data.map(
                (interaction: any, parent_key: number) => (
                  <Table.Row key={parent_key}>
                    <Table.Cell>
                      <Checkbox.Root>
                        <Checkbox onChange={() => null}>
                          <Checkbox.Indicator />
                        </Checkbox>
                      </Checkbox.Root>
                    </Table.Cell>
                    {Object.keys(interaction).map((obj_key, key) => {
                      return (
                        <Table.Cell key={`${obj_key}_${key}`}>
                          <div className="flex flex-wrap align-center g-medium-10">
                            {typeof interaction[obj_key] === typeof "" ||
                            typeof interaction[obj_key] === typeof 1
                              ? interaction[obj_key]
                              : typeof interaction[obj_key] === typeof [] &&
                                interaction[obj_key]?.map((item: string) => (
                                  <Badge key={item} variant="border">
                                    {item}
                                  </Badge>
                                ))}
                          </div>
                        </Table.Cell>
                      );
                    })}
                    <Table.Cell>
                      <DropdownMenu.Root>
                        <DropdownMenu>
                          <DropdownMenu.Trigger variant="border" sizing="small">
                            <b>⋮</b>
                          </DropdownMenu.Trigger>
                          <DropdownMenu.Content sizing="small">
                            <DropdownMenu.Item className="flex align-center justify-between">
                              Details<b>↑</b>
                            </DropdownMenu.Item>
                            <DropdownMenu.Item className="flex align-center justify-between">
                              Heatmap<b>↓</b>
                            </DropdownMenu.Item>
                            <Divider />
                            <DropdownMenu.Item className="flex align-center justify-between">
                              Delete entry<b>✗</b>
                            </DropdownMenu.Item>
                          </DropdownMenu.Content>
                        </DropdownMenu>
                      </DropdownMenu.Root>
                    </Table.Cell>
                  </Table.Row>
                )
              )}
            </Table.Body>
          </Table>
        </div>
      )}
    </Page.Panel>
  );
};
