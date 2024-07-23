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

      let classStrings: string[] = [];

      properties.forEach((propertyType) => {
        if (propertyType === "gap") {
          const className = `g-${name}-${(index + 1) * 10}`;
          const classString = `
            .${className} {
              gap: ${cssValue};
            }
          `;
          classStrings.push(classString);
        } else {
          directions.flatMap((direction) => {
            let property = propertyType;
            let propertiesDefinitions = "";
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
                propertiesDefinitions = `${property}: ${cssValue};`;
                break;
              case "r":
                property += "-right";
                propertiesDefinitions = `${property}: ${cssValue};`;
                break;
              case "b":
                property += "-bottom";
                propertiesDefinitions = `${property}: ${cssValue};`;
                break;
              case "l":
                property += "-left";
                propertiesDefinitions = `${property}: ${cssValue};`;
                break;
              default:
                propertiesDefinitions = `${property}: ${cssValue};`;
                break;
            }

            const classNameWithAxis = `${property.charAt(0)}${
              direction ? `-${direction}` : ""
            }-${name}-${(index + 1) * 10}`;

            const classString = `
              .${classNameWithAxis} {
                ${propertiesDefinitions}
              }
            `;
            classStrings.push(classString);
          });
        }
      });

      return classStrings;
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
