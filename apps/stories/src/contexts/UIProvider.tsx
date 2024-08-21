import React from "react";
import {
  TIDBConfig,
  useIndexedDB,
  TUIPropsSrc,
  useUI,
  TUbaConfig,
  useBehaviorAnalytics,
  TABConfig,
  useABTesting,
} from "@foundation-ui/core";
import { IReactChildren } from "../../../../types";

interface IAppPropsConfig {
  silent?: boolean;
  source: TUIPropsSrc;
}
interface IAppProviderProperties {
  idb: TIDBConfig;
  uba: TUbaConfig;
  ab: TABConfig;
  ui: IAppPropsConfig;
}

const UIContext = React.createContext<null | any>({});
const useUIProps = () => React.useContext(UIContext);
const UIProvider = (
  props: IAppProviderProperties & IReactChildren
): JSX.Element => {
  const { idb, uba, ab, ui } = props;
  const context = useUIProvider({
    idb,
    uba,
    ab,
    ui,
  });

  return (
    <UIContext.Provider value={context}>{props.children}</UIContext.Provider>
  );
};

function useUIProvider(props: IAppProviderProperties): any {
  const { idb, uba, ab, ui } = props;

  const indexed_db = useIndexedDB(idb);
  const user_interface = useUI({
    ...ui,
    config: idb,
  });

  const user_behavior_analytics = useBehaviorAnalytics(uba);
  const ab_testing = useABTesting(ab);

  return {
    indexed_db,
    user_interface,
    user_behavior_analytics,
    ab_testing,
  };
}

export { useUIProps, UIProvider };
