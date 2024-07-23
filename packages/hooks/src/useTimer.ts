import React from "react";

export const useTimer = ({ startOnLoad }: { startOnLoad: boolean }) => {
  const [timer, setTimer] = React.useState(Boolean(startOnLoad));
  const [counter, setCounter] = React.useState(0);
  const [sec, setSecond] = React.useState(0);

  React.useEffect(() => {
    let intervalId: number | undefined;

    if (timer) {
      intervalId = setInterval(() => {
        const timeElapsed = Math.round(performance.now() - counter);

        setCounter((counter) => counter + 1);
        setSecond(Number((Number(timeElapsed) / 1000) % 60));
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [timer, counter]);

  return {
    sec,
    timer,
    setTimer,
  };
};
