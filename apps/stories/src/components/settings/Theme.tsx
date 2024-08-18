import React from "react";

import ThemeIcon from "../../assets/svg/theme_icon";
import SystemThemeIcon from "../../assets/svg/system_theme_icon";

import { Toggle } from "@foundation-ui/components";

export const ThemeSettings = () => {
  const [preferedTheme, setPreferedTheme] = React.useState("dark");

  const THEME_OPTIONS = [
    {
      label: "dark",
      Icon: ThemeIcon,
      contrast: "var(--color-mono-white)",
      body: "var(--color-mono-darkest)",
    },
    {
      label: "light",
      Icon: ThemeIcon,
      contrast: "var(--color-mono-dark)",
      body: "var(--color-mono-light)",
    },
    {
      label: "auto",
      Icon: SystemThemeIcon,
      contrast: "var(--color-mono-dark)",
      body: "var(--color-mono-light)",
    },
  ];

  return (
    <form className="grid g-medium-60">
      <hgroup>
        <h4>Theme</h4>
      </hgroup>

      <div className="flex g-medium-30">
        {THEME_OPTIONS.map((mode, key) => {
          const { label, Icon, contrast, body } = mode;

          return (
            <div className="grid g-medium-10" key={`${label}_${key}}`}>
              <Toggle
                variant="ghost"
                sizing="small"
                onClick={() => setPreferedTheme(label)}
              >
                <Icon
                  contrast={contrast}
                  body={body}
                  width="auto"
                  height={128}
                  radius={3}
                />
              </Toggle>
              <p>
                {preferedTheme === label && <b>&rarr;&nbsp;</b>}
                {label}
              </p>
            </div>
          );
        })}
      </div>
    </form>
  );
};
