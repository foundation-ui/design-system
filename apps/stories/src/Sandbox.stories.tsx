import React from "react";
import styled, { css } from "styled-components";
import type { Meta } from "@storybook/react";

// import { BehaviorProvider, useBehavior } from "@foundation-ui/core";
import { Page, Button } from "@foundation-ui/components";

const meta = {
  title: "Sandbox/Sandbox",
  component: Page,
} satisfies Meta<typeof Page>;
export default meta;

interface IAnalyticsProperties {
  type: string;
  origin: string;
  funnel: string;
  recurrence: number;
  description?: string;
  occured_at?: string;
}
interface IPageAnalyticsProperties {
  path: string;
  previous?: string;
  visited_at: string;
  timespan: string;
  time_before_interact: string;
}
interface IBehaviorProperties {
  session_start: string;
  session_stop: string;
  browser: string;
  device: string;
  interactions: IAnalyticsProperties[] | [];
  history: IPageAnalyticsProperties[] | [];
  errors: IAnalyticsProperties[] | [];
  updateInteractionsTracker: Function;
  updateHistoryTracker: Function;
  updateErrorsTracker: Function;
  updateSessionData: Function;
}

const BehaviorContext = React.createContext<IBehaviorProperties>({
  session_start: "",
  session_stop: "",
  browser: "",
  device: "",
  interactions: [],
  history: [],
  errors: [],
  updateInteractionsTracker: () => null,
  updateHistoryTracker: () => null,
  updateErrorsTracker: () => null,
  updateSessionData: () => null,
});

export const BehaviorProvider = ({
  children,
}: React.PropsWithChildren): JSX.Element => {
  const context = useBehaviorProvider();

  return (
    <BehaviorContext.Provider value={context}>
      {children}
    </BehaviorContext.Provider>
  );
};

function useTimer() {
  const [second, setSecond] = React.useState(0);
  const [minute, setMinute] = React.useState(0);
  const [isActive, setIsActive] = React.useState(false);
  const [counter, setCounter] = React.useState(1);

  React.useEffect(() => {
    let intervalId;

    if (isActive) {
      intervalId = setInterval(() => {
        setSecond(counter % 60);
        setMinute(Math.floor(counter / 60));
        setCounter((counter) => counter + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive, counter]);

  return {
    second,
    minute,
    isActive,
    setIsActive,
  };
}

export const useBehavior = () => React.useContext(BehaviorContext);
function useBehaviorProvider(): IBehaviorProperties {
  const { second, minute, isActive, setIsActive } = useTimer();
  const [interactionsData, setInteractionsData] = React.useState([]);
  const [historyData, setHistoryData] = React.useState([]);
  const [errorsData, setErrorsData] = React.useState([]);
  const [sessionData, setSessionData] = React.useState({
    session_start: "",
    session_stop: "",
    browser: navigator,
    device: "",
  });

  const updateInteractionsTracker = () => {
    setInteractionsData([]);
  };
  const updateHistoryTracker = () => {
    setHistoryData([]);
  };
  const updateErrorsTracker = () => {
    setErrorsData([]);
  };
  const updateSessionData = ({
    key,
    value,
    payload,
  }: {
    key?: "started_at" | "ended_at" | "browser" | "device";
    value?: string;
    payload?: typeof sessionData;
  }) => {
    if (key && value)
      return setSessionData((prevItems) => ({
        ...prevItems,
        [key]: value,
      }));
    if (!key && !value && payload) return setSessionData(payload);
    if (!key && !value && !payload)
      throw new Error("Define either `key` + `value` or `payload`");
  };

  console.log(sessionData);

  return {
    ...sessionData,
    interactions: interactionsData,
    history: historyData,
    errors: errorsData,
    updateInteractionsTracker,
    updateHistoryTracker,
    updateErrorsTracker,
    updateSessionData,
  };
}

const AnalyticsComponent = ({ children }: React.PropsWithChildren) => {
  const analytics = useBehavior();

  console.log(analytics);
  return <p>analytics</p>;
};

export const Sandbox = {
  render: () => {
    return (
      <BehaviorProvider>
        <Page style={{ height: "100dvh", width: "100%" }}>
          <Page.Content>
            <hgroup>
              <h4 className="p-b-small-60">Token Engine</h4>
              <small data-emphasis-level="low">@foundation-ui/core</small>
            </hgroup>

            <AnalyticsComponent />
          </Page.Content>
        </Page>
      </BehaviorProvider>
    );
  },
};
