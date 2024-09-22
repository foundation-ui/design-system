import React from "react";
import {
  TIDBConfig,
  useIndexedDB,
  TAppPropsSrc,
  useAppProperties,
  TUbaConfig,
  useBehaviorAnalytics,
  TABConfig,
  useABTesting,
} from "@foundation-ui/core";
import { IReactChildren } from "../../../../types";

interface IAppPropsConfig {
  silent?: boolean;
  source: TAppPropsSrc;
}
interface IAppProviderProperties {
  idb: TIDBConfig;
  uba: TUbaConfig;
  ab: TABConfig;
  ui: IAppPropsConfig;
}

const AppContext = React.createContext<null | any>({});
const useApp = () => React.useContext(AppContext);
const AppProvider = (
  props: IAppProviderProperties & IReactChildren
): JSX.Element => {
  const { idb, uba, ab, ui } = props;
  const context = useAppProvider({
    idb,
    uba,
    ab,
    ui,
  });

  return (
    <AppContext.Provider value={context}>{props.children}</AppContext.Provider>
  );
};

function useAppProvider(props: IAppProviderProperties): any {
  const { idb, uba, ab, ui } = props;

  const indexed_db = useIndexedDB(idb);
  const app_properties = useAppProperties({
    ...ui,
    config: idb,
  });

  const user_behavior_analytics = useBehaviorAnalytics(uba);
  const ab_testing = useABTesting(ab);

  return {
    indexed_db,
    app_properties,
    user_behavior_analytics,
    ab_testing,
  };
}

export { useApp, AppProvider };
