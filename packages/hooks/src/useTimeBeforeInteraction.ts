import React from "react";

export const useTimeBeforeInteraction = (options?: { silent?: boolean }) => {
  const [timeBeforeInteract, setTimeBeforeInteract] = React.useState<number>(0);
  const silent = options?.silent ?? false;

  React.useEffect(() => {
    if (silent) return;

    const pageLoadTime = performance.now();

    const handleUserInteraction = () => {
      const timeElapsed = Math.round(performance.now() - pageLoadTime);

      setTimeBeforeInteract(timeElapsed / 1000);
      removeEventListeners(); // Remove event listeners after the first interaction
    };

    const removeEventListeners = () => {
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
    };

    window.addEventListener("click", handleUserInteraction);
    window.addEventListener("keydown", handleUserInteraction);
    window.addEventListener("touchstart", handleUserInteraction);

    return () => {
      removeEventListeners();
    };
  }, [silent]);

  return {
    time_before_interact: timeBeforeInteract,
  };
};
