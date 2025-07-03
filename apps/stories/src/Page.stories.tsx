import React from "react";

import { useColorMode } from "@foundation-ui/tokens";
import {
  Page,
  Button,
  Avatar,
  Dialog,
  Badge,
  Tooltip,
} from "@foundation-ui/components";

import type { Meta } from "@storybook/react";

const meta = {
  title: "Misc/PlaygroundPage",
  component: Page,
} satisfies Meta<typeof Page>;

import styled from "styled-components";

const DisplayXl = styled.h1`
  font-size: clamp(var(--fontsize-large-40), 8vw, var(--fontsize-large-70));
  letter-spacing: -0.05em;
  line-height: 1;
  font-weight: 600;
`;

const Navbar = () => {
  const { colorMode, setColorMode } = useColorMode();

  return (
    <nav
      className="p-x-medium-60 p-y-medium-60 flex justify-between align-center"
      style={{ width: "100%", maxWidth: 1440, margin: "0 auto" }}
    >
      <div className="flex align-center g-medium-60">
        <Avatar
          alt="gh-logo"
          src="https://avatars.githubusercontent.com/u/59123840?v=4"
          sizing="small"
        />
        <Badge variant="border" className="flex g-medium-30">
          <Badge variant="secondary">
            <small>&beta;</small>
          </Badge>
          Public Beta
        </Badge>
        <Button variant="ghost" sizing="small">
          Docs
        </Button>
        <Button variant="ghost" sizing="small">
          Components
        </Button>
        <Button variant="ghost" sizing="small">
          Engine
        </Button>
        <Button variant="ghost" sizing="small">
          Core
        </Button>
        <Button variant="ghost" sizing="small">
          CLI
        </Button>
      </div>

      <div className="flex align-center g-medium-60">
        <Button variant="ghost">
          <svg
            viewBox="0 0 438.549 438.549"
            focusable="false"
            aria-hidden="true"
            width={24}
            height={24}
            fill="currentColor"
          >
            <path d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"></path>
          </svg>
        </Button>
        <Tooltip content={`Mode: ${colorMode === "dark" ? "Dark" : "Light"}`}>
          <Button
            className="flex align-center justify-between"
            variant="ghost"
            onClick={() =>
              setColorMode(colorMode === "dark" ? "light" : "dark")
            }
          >
            <svg
              viewBox="0 0 24 24"
              focusable="false"
              aria-hidden="true"
              width={18}
              height={18}
              fill="currentColor"
            >
              {colorMode === "dark" ? (
                <path d="m6.76 4.84-1.8-1.79-1.41 1.41 1.79 1.79zM4 10.5H1v2h3zm9-9.95h-2V3.5h2zm7.45 3.91-1.41-1.41-1.79 1.79 1.41 1.41zm-3.21 13.7 1.79 1.8 1.41-1.41-1.8-1.79zM20 10.5v2h3v-2zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6m-1 16.95h2V19.5h-2zm-7.45-3.91 1.41 1.41 1.79-1.8-1.41-1.41z" />
              ) : (
                <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1" />
              )}
            </svg>
          </Button>
        </Tooltip>
      </div>
    </nav>
  );
};
const Heading = () => {
  return (
    <hgroup className="grid g-medium-60" style={{ maxWidth: 1024 }}>
      <DisplayXl>
        Build products and digital experiences with Data-Driven insights and
        components optimized for fast development.
      </DisplayXl>
      <p className="fs-medium-40" style={{ maxWidth: 768 }}>
        Foundation offers a suite of powerful&nbsp;
        <Tooltip content="@fui/core">
          <b>Engines</b>
        </Tooltip>
        &nbsp;and Libraries, optimized to create cohesive UIs with
        agnostic&nbsp;
        <Tooltip content="@fui/tokens">
          <b>Design Tokens</b>
        </Tooltip>
        &nbsp;and Themes. It provides accessible, robust, and intuitive
        components alongside User Behavior Analytics that can be
        programmatically integrated, ensuring seamless, data-driven design and
        development.
      </p>
      <div className="flex g-medium-60 align-center">
        <Button variant="primary">Get started</Button>
        <Button variant="ghost">
          <svg viewBox="0 0 438.549 438.549" width={16} height={16}>
            <path
              fill="currentColor"
              d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
            />
          </svg>
          Github
        </Button>
      </div>
    </hgroup>
  );
};
const Footer = () => {
  const convertStringFormat = (string: string) =>
    string.replace(" ", "_").toLowerCase();
  const FOOTER = {
    services: [
      "Pricing",
      "For enterprise",
      "Integrations",
      "Feature Request",
      "Release Notes",
    ],
    use_cases: [
      "Cross Functional Teams",
      "Engineering Teams",
      "Single Engineer",
      "Data Teams",
    ],
    devs: ["Documentation", "Tutorial", "Guides", "Samples"],
    community: ["Discord", "Github"],
  };

  return (
    <footer
      style={{ width: "100%", maxWidth: 1440, margin: "0 auto" }}
      className="p-b-large-30 p-x-medium-60 "
    >
      <div
        className="flex justify-between align-start g-large-60"
        style={{ flexWrap: "wrap" }}
      >
        <div className="grid g-large-30">
          <div className="flex g-large-60">
            <div className="grid align-start g-medium-10">
              <h6 className="m-b-medium-40">Services</h6>
              {FOOTER.services.map((label: string) => (
                <small
                  key={convertStringFormat(label)}
                  style={{ listStyle: "none", margin: 0 }}
                >
                  {label}
                </small>
              ))}
            </div>
            <div className="grid align-start g-medium-10">
              <h6 className="m-b-medium-40">Use Cases</h6>
              {FOOTER.use_cases.map((label: string) => (
                <small
                  key={convertStringFormat(label)}
                  style={{ listStyle: "none", margin: 0 }}
                >
                  {label}
                </small>
              ))}
            </div>
          </div>
          <div className="flex g-large-60">
            <div className="grid align-start g-medium-10">
              <h6 className="m-b-medium-40">Developers</h6>
              {FOOTER.devs.map((label: string) => (
                <small
                  key={convertStringFormat(label)}
                  style={{ listStyle: "none", margin: 0 }}
                >
                  {label}
                </small>
              ))}
            </div>
            <div className="grid align-start g-medium-10">
              <h6 className="m-b-medium-40">Community</h6>
              {FOOTER.devs.map((label: string) => (
                <small
                  key={convertStringFormat(label)}
                  style={{ listStyle: "none", margin: 0 }}
                >
                  {label}
                </small>
              ))}
            </div>
          </div>
        </div>

        <div className="grid g-medium-10">
          <h6>Foundation UI Toolkit</h6>
          <small style={{ color: "var(--color-green)" }}>
            ●&nbsp;All systems operational
          </small>
        </div>
      </div>
    </footer>
  );
};

export const PlaygroundPage = {
  render: () => {
    return (
      <Dialog.Root>
        <Page>
          <Page.Content>
            <Navbar />
            <section
              className="p-x-medium-60  grid g-medium-90 align-center h-95"
              style={{ maxWidth: 1440, margin: "0 auto" }}
            >
              <Heading />
            </section>
            <Footer />
          </Page.Content>
        </Page>
      </Dialog.Root>
    );
  },
};

export default meta;
