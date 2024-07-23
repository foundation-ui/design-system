import React from "react";

export interface IA11YProperties {
  assistive_technologies: string[];
  screen_reader?: {
    name: string;
    version: string;
  };
  attributes: {
    id: string;
    aria: {
      label?: string | null;
      description?: string | null;
      hidden?: string | null;
    };
    type: string;
    occurrences: number;
  }[];
}

export interface IA11YProps {
  a11y: IA11YProperties;
}

const getScreenReader = () => {
  const userAgent = navigator.userAgent;
  const screenReaderMatch = userAgent.match(
    /(NVDA|JAWS|VoiceOver|Window-Eyes)\/?(?<version>[\d.]+)/
  );
  if (screenReaderMatch) {
    const [, name, version] = screenReaderMatch;
    return { name, version };
  }
  return { name: "unknown", version: "unknown" };
};

export const useA11YTracking = (references: string[]): IA11YProps => {
  const { speechSynthesis } = window;

  const [a11yData, setA11yData] = React.useState<IA11YProperties>({
    assistive_technologies: [],
    attributes: [],
  });

  const handleTouchStart = () => {
    setA11yData((prevData) => ({
      ...prevData,
      assistive_technologies: [...prevData.assistive_technologies, "touch"],
    }));
  };

  const handleScreenReaderUsage = (event: MediaQueryListEvent) => {
    if (event.matches) {
      const screenReader = getScreenReader();

      setA11yData((prevData) => ({
        ...prevData,
        assistive_technologies: [
          ...prevData.assistive_technologies,
          "screen reader",
        ],
        screen_reader: {
          name: screenReader.name || "unknown",
          version: screenReader.version || "unknown",
        },
      }));
    }
  };

  const handleElementsAttributes = (
    element: HTMLElement,
    componentId: string
  ) => {
    if (!element || !references.includes(componentId)) return;

    setA11yData((prevData) => {
      const index = prevData.attributes.findIndex(
        (attr) => attr.id === componentId
      );

      if (index === -1) {
        return {
          ...prevData,
          attributes: [
            ...prevData.attributes,
            {
              id: componentId,
              aria: {
                hidden: element.ariaHidden,
                label: element.ariaLabel,
                description: element.ariaDescription,
              },
              type: element.nodeName,
              occurrences: 1,
            },
          ],
        };
      } else {
        if (prevData.attributes[index]) {
          prevData.attributes[index].occurrences += 1;
        }
        return {
          ...prevData,
        };
      }
    });
  };

  React.useEffect(() => {
    window.addEventListener("touchstart", handleTouchStart);
    window
      .matchMedia("(prefers-reduced-motion: reduce)")
      .addEventListener("change", handleScreenReaderUsage);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window
        .matchMedia("(prefers-reduced-motion: reduce)")
        .removeEventListener("change", handleScreenReaderUsage);
    };
  }, []);

  React.useEffect(() => {
    if (
      speechSynthesis.paused ||
      speechSynthesis.pending ||
      speechSynthesis.speaking
    ) {
      if (!a11yData.assistive_technologies.includes("speech synthesis")) {
        setA11yData((prevData) => ({
          ...prevData,
          assistive_technologies: [
            ...prevData.assistive_technologies,
            "speech synthesis",
          ],
        }));
      }
    }
  }, [speechSynthesis]);

  React.useEffect(() => {
    references.forEach((componentId) => {
      const componentElements = document.querySelectorAll(
        `[id="${componentId}"]`
      );

      componentElements.forEach((componentElement) => {
        handleElementsAttributes(componentElement as HTMLElement, componentId);
      });
    });
  }, [references]);

  return { a11y: a11yData };
};
