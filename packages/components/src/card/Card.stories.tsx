import React from "react";
import { Page, Card, Button } from "..";

import type { Meta } from "@storybook/react";

/**
 *
 */
const meta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;
export default meta;

export const Default = {
  render: () => (
    <Page>
      <Page.Content className="p-medium-60">
        <Card.Grid sizing="medium">
          <Card>
            <Card.Meta>
              <p className="fs-medium-10 opacity-default-30">Header</p>
            </Card.Meta>
            <Card.Body>
              <header className="flex align-start justify-between g-medium-30 w-100">
                <div>
                  <p className="fs-medium-30">Title</p>
                  <p className="fs-medium-20 opacity-default-30">
                    Lorem ipsum dolor sit amet consectetur.
                  </p>
                </div>
                <div>
                  <Button variant="border" sizing="small">
                    Action
                  </Button>
                </div>
              </header>

              <p className="fs-medium-20">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Repellat a corporis exercitationem.
              </p>

              <div className="w-100 grid g-medium-10">
                <Button sizing="large">Primary</Button>
              </div>
            </Card.Body>
            <Card.Meta>
              <p className="fs-medium-10 opacity-default-30">Footer</p>
            </Card.Meta>
          </Card>
        </Card.Grid>
      </Page.Content>
    </Page>
  ),
};
