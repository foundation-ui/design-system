import React from "react";

export const useTimer = ({ startOnLoad }: { startOnLoad: boolean }) => {
  const [timer, setTimer] = React.useState(Boolean(startOnLoad));
  const [sec, setSec] = React.useState(0);

  React.useEffect(() => {
    if (!timer) return;

    const startedAt = performance.now();
    const intervalId = setInterval(() => {
      setSec(Math.floor((performance.now() - startedAt) / 1000));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timer]);

  return {
    sec,
    timer,
    setTimer,
  };
};
