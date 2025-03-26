import React from "react";

export const useSaveOnUnload = ({
  url,
  payload,
  options,
}: {
  url: string;
  payload: Record<string, unknown>;
  options?: Record<string, string>;
}) => {
  const unloadCallback = async () => {
    const blob = new Blob(
      [JSON.stringify(payload)],
      options ?? {
        type: "application/json",
      }
    );

    if (navigator.sendBeacon) {
      navigator.sendBeacon(url, blob);
      console.info(`[foundation] sending beacon to ${url}`);
    } else {
      // Fallback for browsers without sendBeacon support
      const xhr = new XMLHttpRequest();

      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", options?.type ?? "application/json");
      xhr.send(JSON.stringify(payload));
    }
  };

  React.useEffect(() => {
    const handleBeforeUnload = () => unloadCallback();

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [url, payload, options]);
};
