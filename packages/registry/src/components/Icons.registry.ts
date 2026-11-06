import { Icon, SocialIcon, PixelIcon, WebIcon } from "@usefui/icons";
import type { ComponentRegistryMetadata } from "@chambellan/contracts";

const withoutDisplayName = (keys: string[]) =>
  keys.filter((k) => k !== "displayName");

export const IconMeta: ComponentRegistryMetadata = {
  name: "Icon",
  title: "Icon",
  description:
    "The base icon set exposed as compound components on the Icon root. Each part renders an inline SVG path inside the shared svg shell.",
  module: "@usefui/icons",
  category: "data",
  variants: [],
  props: [{ name: "fillOpacity", type: "number" }],
  parts: Object.fromEntries(
    withoutDisplayName(Object.keys(Icon)).map((n) => [n, { props: [] }]),
  ),
  usage: [
    `import React from "react";
import { Icon } from "@usefui/icons";

function IconExample() {

    return (
      <div className="grid g-medium-30 p-t-large-30 p-x-medium-60">
        <div className="flex align-center g-medium-10 justify-center">
          <Icon>
            <Icon.Bold />
            <Icon.Italic />
            <Icon.Underline />
          </Icon>
        </div>
      </div>
    );

}

export default IconExample;`,
  ],
  examples: [{ kind: "note", title: "Compound icon parts inside Icon shell" }],
  a11y: { role: "img" },
  relatedComponents: [],
  aiHints: {
    useCases: ["inline icon indicators", "UI decoration and affordances"],
    avoid: [
      "decorative-only icons without accessible label",
      "interactive icon-only buttons without visible name",
    ],
    composesWith: [],
  },
};

export const WebIconMeta: ComponentRegistryMetadata = {
  name: "WebIcon",
  title: "WebIcon",
  description:
    "Web and product UI icons exposed on the WebIcon root, including browser and page-chrome metaphors.",
  module: "@usefui/icons",
  category: "data",
  variants: [],
  props: [],
  parts: Object.fromEntries(
    withoutDisplayName(Object.keys(WebIcon)).map((n) => [n, { props: [] }]),
  ),
  usage: [
    `import React from "react";
import { WebIcon } from "@usefui/icons";

function WebIconExample() {

    return (
      <div className="grid g-medium-30 p-t-large-30 p-x-medium-60">
        <div className="flex align-center g-medium-10 justify-center">
          <WebIcon>
            <WebIcon.Terminal />
          </WebIcon>
        </div>
      </div>
    );

}

export default WebIconExample;`,
  ],
  examples: [{ kind: "note", title: "Browser and page-chrome icon parts" }],
  a11y: { role: "img" },
  relatedComponents: [],
  aiHints: {
    useCases: ["browser metaphors", "page chrome icons"],
    avoid: [
      "decorative-only icons without accessible label",
      "interactive icon-only buttons without visible name",
    ],
    composesWith: [],
  },
};

export const PixelIconMeta: ComponentRegistryMetadata = {
  name: "PixelIcon",
  title: "PixelIcon",
  description:
    "Pixel-styled icons exposed on the PixelIcon root for compact or pixel-art interfaces.",
  module: "@usefui/icons",
  category: "data",
  variants: [],
  props: [],
  parts: Object.fromEntries(
    withoutDisplayName(Object.keys(PixelIcon)).map((n) => [n, { props: [] }]),
  ),
  usage: [
    `import React from "react";
import { PixelIcon } from "@usefui/icons";

function PixelIconExample() {

    return (
      <div className="grid g-medium-30 p-t-large-30 p-x-medium-60">
        <div className="flex align-center g-medium-10 justify-center">
          <PixelIcon>
            <PixelIcon.Search />
          </PixelIcon>
        </div>
      </div>
    );

}

export default PixelIconExample;`,
  ],
  examples: [{ kind: "note", title: "Pixel-art compact icon parts" }],
  a11y: { role: "img" },
  relatedComponents: [],
  aiHints: {
    useCases: ["compact or pixel-art interfaces", "retro-styled UIs"],
    avoid: [
      "decorative-only icons without accessible label",
      "interactive icon-only buttons without visible name",
    ],
    composesWith: [],
  },
};

export const SocialIconMeta: ComponentRegistryMetadata = {
  name: "SocialIcon",
  title: "SocialIcon",
  description:
    "Brand and social provider icons exposed on the SocialIcon root (Clerk, AWS, Discord, Slack, Notion, ...).",
  module: "@usefui/icons",
  category: "data",
  variants: [],
  props: [],
  parts: Object.fromEntries(
    withoutDisplayName(Object.keys(SocialIcon)).map((n) => [n, { props: [] }]),
  ),
  usage: [
    `import React from "react";
import { SocialIcon } from "@usefui/icons";

function SocialIconExample() {

    return (
      <div className="grid g-medium-30 p-t-large-30 p-x-medium-60">
        <div className="flex align-center g-medium-10 justify-center">
          <SocialIcon>
            <SocialIcon.Clerk />
            <SocialIcon.Aws />
          </SocialIcon>
        </div>
      </div>
    );

}

export default SocialIconExample;`,
  ],
  examples: [{ kind: "note", title: "Brand and social provider icon parts" }],
  a11y: { role: "img" },
  relatedComponents: [],
  aiHints: {
    useCases: ["brand provider identity", "social login button icons"],
    avoid: [
      "decorative-only icons without accessible label",
      "interactive icon-only buttons without visible name",
    ],
    composesWith: [],
  },
};
