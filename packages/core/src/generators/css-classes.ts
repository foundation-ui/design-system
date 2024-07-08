import { css } from "styled-components";
import { IScaleProperties } from "../../../../types";

interface Size extends IScaleProperties {
  name: string;
}

export const generateSizeClasses = (sizes: Size[]) => {
  const cssClasses = sizes.flatMap(({ name, values }) => {
    return values.flatMap((value, index) => {
      const cssValue = `${value.px}px`;
      const directions = ["", "x", "y", "t", "r", "b", "l"];
      const properties = ["padding", "margin", "gap"];

      return properties.flatMap((propertyType) => {
        let propertiesDefinitions = "";

        if (propertyType === "gap") {
          propertiesDefinitions += `gap: ${cssValue};`;
        } else {
          directions.flatMap((direction) => {
            let property = propertyType;
            switch (direction) {
              case "x":
                propertiesDefinitions += `
                ${property}-left: ${cssValue};
                ${property}-right: ${cssValue};`;
                break;
              case "y":
                propertiesDefinitions += `
                ${property}-top: ${cssValue};
                ${property}-bottom: ${cssValue};`;
                break;
              case "t":
                property += "-top";
                break;
              case "r":
                property += "-right";
                break;
              case "b":
                property += "-bottom";
                break;
              case "l":
                property += "-left";
                break;
              default:
                break;
            }

            const classNameWithAxis = `${propertyType.charAt(0)}${
              direction ? `-${direction}` : ""
            }-${name}-${(index + 1) * 10}`;

            return [
              `
              .${classNameWithAxis} {
                ${
                  propertiesDefinitions
                    ? propertiesDefinitions
                    : `${property}: ${cssValue};`
                }
              }
            `,
            ];
          });
        }

        const className = `${propertyType.charAt(0)}-${name}-${
          (index + 1) * 10
        }`;

        return [
          `
          .${className} {
            ${propertiesDefinitions}
          }
        `,
        ];
      });
    });
  });

  return css`
    ${cssClasses.join("")}
  `;
};

export const generateLayoutClasses = () => {
  const displays = ["flex", "grid"] as const;
  const options = ["justify-content", "align-items"] as const;
  const values = [
    "flex-start",
    "flex-end",
    "center",
    "space-between",
    "space-around",
    "space-evenly",
    "stretch",
    "start",
    "end",
    "left",
    "right",
    "baseline",
    "revert",
  ] as const;

  const cssClasses = displays.flatMap((display) => {
    const displayClass = `
      .${display} {
        display: ${display};
      }
    `;

    const optionClasses = options.flatMap((option) => {
      return values.map((value) => {
        const className = `.${option.split("-").at(0)}-${value
          .split("-")
          .at(-1)}`;
        const cssProperty = `${option}: ${value};`;

        return `${className} { ${cssProperty} }`;
      });
    });

    return [displayClass, ...optionClasses];
  });

  return css`
    ${cssClasses.join("")}
  `;
};
