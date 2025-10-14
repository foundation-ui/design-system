import type {
  IColorProperties,
  IScaleProperties,
  ISequenceProperties,
} from "../../../../types";

interface Size extends IScaleProperties {
  name: string;
}
interface Color extends IColorProperties {
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

  return `
    ${cssClasses.join("")}
  `;
};

export const generateFontSizesClasses = (fs: Size[]) => {
  const cssClasses = fs.flatMap(({ name, values }) => {
    return values.flatMap((value, index) => {
      const cssValue = `${value.px}px`;
      let classStrings: string[] = [];

      const className = `fs-${name}-${(index + 1) * 10}`;
      const classString = `
            .${className} {
              font-size: ${cssValue};
            }
          `;

      classStrings.push(classString);
      return classStrings;
    });
  });

  return `
    ${cssClasses.join("")}
  `;
};

export const generateOpacityClasses = (opacity: ISequenceProperties[]) => {
  const cssClasses = opacity.flatMap(({ name, values }) => {
    return values.flatMap((value, index) => {
      let classStrings: string[] = [];

      const className = `opacity-${name}-${(index + 1) * 10}`;
      const classString = `
            .${className} {
              opacity: ${value.value};
            }
          `;

      classStrings.push(classString);
      return classStrings;
    });
  });

  return `
    ${cssClasses.join("")}
  `;
};

export const generateColorClasses = (color: Color[]) => {
  const generateClasses = (
    items: Color[],
    mode: "background" | "color"
  ): string[] => {
    const classNamePrefix = mode === "background" ? "bg" : "color";
    const cssAttribute = mode === "background" ? "background-color" : "color";

    const cssColorClasses = items.flatMap(({ name }) => {
      let bgClassStrings: string[] = [];

      const classString = `
         .${classNamePrefix}-${name} {
            ${cssAttribute}: var(--color-${name}) !important;
         }`;

      bgClassStrings.push(classString);
      return bgClassStrings;
    });

    return cssColorClasses;
  };

  const cssColorClasses = generateClasses(color, "color");
  const cssBgClasses = generateClasses(color, "background");

  return `
    ${cssColorClasses.join("")}
    ${cssBgClasses.join("")}
  `;
};

export const generateLayoutClasses = () => {
  const displays = ["flex", "grid"];

  const align_options = ["justify-content", "align-items"];
  const align_values = [
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
  ];

  const wrap_option = ["flex-wrap"];
  const wrap_values = [
    "wrap",
    "wrap-reverse",
    "nowrap",
    "revert",
    "revert-layer",
    "unset",
    "inherit",
    "initial",
  ];

  const direction_option = ["flex-direction"];
  const direction_values = [
    "column",
    "column-reverse",
    "row",
    "row-reverse",
    "revert",
    "revert-layer",
    "unset",
    "inherit",
    "initial",
  ];

  const cssClasses = displays.flatMap((display) => {
    const displayClass = `
      .${display} {
        display: ${display};
      }
    `;

    const generateCSSClasses = (options: string[], values: string[]) => {
      return options.flatMap((option) => {
        return values.map((value) => {
          const className = `.${option.split("-").at(0)}-${value
            .split("-")
            .at(-1)}`;
          const cssProperty = `${option}: ${value};`;

          return `${className} { ${cssProperty} }`;
        });
      });
    };

    const optionClasses = generateCSSClasses(align_options, align_values);
    const wrapClasses = generateCSSClasses(wrap_option, wrap_values);
    const directionClasses = generateCSSClasses(
      direction_option,
      direction_values
    );

    return [
      displayClass,
      ...optionClasses,
      ...wrapClasses,
      ...directionClasses,
    ];
  });

  return `
    ${cssClasses.join("")}
  `;
};

export const generateDimensionClasses = () => {
  const directions = ["width", "height"] as const;
  const options = [
    "100%",
    "95%",
    "90%",
    "85%",
    "80%",
    "75%",
    "70%",
    "66%",
    "50%",
    "33%",
    "25%",
    "10%",
    "auto",
    "fit-content",
    "max-content",
  ] as const;

  const cssClasses = directions.flatMap((dir) => {
    const dimensionClasses = options.flatMap((option) => {
      const className = `.${dir.split("").at(0)}-${option.replaceAll("%", "")}`;
      const cssProperty = `${dir}: ${option};`;

      return `${className} { ${cssProperty} }`;
    });

    return dimensionClasses;
  });

  return `
    ${cssClasses.join("")}
  `;
};
