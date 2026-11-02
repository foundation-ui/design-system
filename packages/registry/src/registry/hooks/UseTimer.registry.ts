import type { HookRegistryMetadata } from "@chambellan/contracts";

export const UseTimerMeta: HookRegistryMetadata = {
  kind: "hook",
  name: "useTimer",
  title: "useTimer",
  description:
    "Runs a seconds counter based on performance.now, optionally starting immediately on load.",
  component: "Timer",
  module: "@usefui/analytics",
  code: `import { useTimer } from "@usefui/analytics";

export function HookComponent() {
    const { sec, timer, setTimer } = useTimer({ startOnLoad: true });

    return (
        <div>
            <span>{sec}s</span>
            <button onClick={() => setTimer(!timer)}>
                {timer ? "Pause" : "Start"}
            </button>
        </div>
    );
}`,
  arguments: [
    {
      name: "startOnLoad",
      type: "boolean",
      required: true,
    },
  ],
  returns: [
    {
      name: "sec",
      type: "number",
    },
    {
      name: "timer",
      type: "boolean",
    },
    {
      name: "setTimer",
      type: "React.Dispatch<React.SetStateAction<boolean>>",
    },
  ],
  types: `interface UseTimerOptions {
  startOnLoad: boolean;
}`,
};
