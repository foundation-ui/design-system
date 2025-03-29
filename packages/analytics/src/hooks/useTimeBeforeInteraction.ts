import React from "react";

export const useTimeBeforeInteraction = () => {
  const [timeBeforeInteract, setTimeBeforeInteract] = React.useState<number>(0);

  React.useEffect(() => {
    const pageLoadTime = performance.now();

    const removeEventListeners = () => {
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
    };

    const handleUserInteraction = () => {
      const timeElapsed = Math.round(performance.now() - pageLoadTime);

      setTimeBeforeInteract(Number((Number(timeElapsed) / 1000) % 60));
      removeEventListeners(); // Remove event listeners after the first interaction
    };

    // Add event listeners for various user interactions
    window.addEventListener("click", handleUserInteraction);
    window.addEventListener("keydown", handleUserInteraction);
    window.addEventListener("touchstart", handleUserInteraction);

    // Clean up the event listeners on unmount
    return () => {
      removeEventListeners();
    };
  }, []);

  return {
    time_before_interact: timeBeforeInteract,
  };
};
