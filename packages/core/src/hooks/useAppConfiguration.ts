import React from "react";
import { useIndexedDB, IndexedDBConfig } from "./useIndexedDB";

type TLayoutOptionsProps = {
  enabled: boolean;
  fixed?: boolean;
  size?: string;
};
type TShortcutsProperties = {
  enabled: boolean;
  shortcut?: {
    bindkey: string;
    hotkey: string;
  };
};
type TShortcuts = Record<string, TShortcutsProperties>;
type TLayouts = Record<string, Record<string, TLayoutOptionsProps>>;
type TOptions = {
  analytics?: boolean;
  ab?: boolean;
};
type IAppProperties = {
  options?: TOptions;
  layout?: TLayouts;
  shortcuts?: TShortcuts;
};
interface IAppConfigurationProperties {
  store: string;
  key: string;
  config: {
    idb: IndexedDBConfig;
    app_properties: IAppProperties;
  };
}

export const useAppConfiguration = ({
  config,
  store,
  key,
}: IAppConfigurationProperties): IAppProperties => {
  const idb = useIndexedDB(config.idb);

  const [pending, setPending] = React.useState(true);
  const [appConfig, setAppConfig] = React.useState(null);

  React.useEffect(() => {
    if (idb.db && !appConfig) {
      idb
        .getDataFromIDB(store, key)
        .then((response) => response)
        .then((data) => {
          if (data) {
            setAppConfig(data.value);
            setPending(false);
          } else {
            idb.setDataInIDB(store, key, config.app_properties).then(() =>
              idb.getDataFromIDB(store, key).then((data) => {
                setAppConfig(data.value);
                setPending(false);
              })
            );
          }
        });
    }
  }, [idb.db, pending]);

  return appConfig;
};
