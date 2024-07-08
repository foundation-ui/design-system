import React from "react";

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
  started_at: string;
  ended_at: string;
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
  started_at: "",
  ended_at: "",
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

export const useBehavior = () => React.useContext(BehaviorContext);

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

function useBehaviorProvider(): IBehaviorProperties {
  const [interactionsData, setInteractionsData] = React.useState([]);
  const [historyData, setHistoryData] = React.useState([]);
  const [errorsData, setErrorsData] = React.useState([]);
  const [sessionData, setSessionData] = React.useState({
    started_at: "",
    ended_at: "",
    browser: "",
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

  return {
    started_at: sessionData.started_at,
    ended_at: sessionData.ended_at,
    browser: sessionData.browser,
    device: sessionData.device,
    interactions: interactionsData,
    history: historyData,
    errors: errorsData,
    updateInteractionsTracker,
    updateHistoryTracker,
    updateErrorsTracker,
    updateSessionData,
  };
}
