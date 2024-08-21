import React from "react";
import { useIndexedDB, TIDBConfig } from "./useIndexedDB";

export type TUIPropsSrc = {
  store?: string;
  key?: string;
  payload?: IUIProperties;
};
export type TFeatFlagConfig = {
  enabled?: boolean;
  version?: number;
  variant?: string;
  sizing?: string;
  options?: {
    fixed?: boolean;
    open?: boolean;
  };
};
export type TSortcutsConfig = {
  enabled: boolean;
  shortcut: {
    hotkey: string;
    bindkey: string;
  };
};
export type TUIPropsConfig = {
  silent?: boolean;
  config?: TIDBConfig;
  source: TUIPropsSrc;
};
export interface IUIProperties {
  feature_flags?: Record<string, TFeatFlagConfig | unknown>;
  shortcuts?: Record<string, TSortcutsConfig | unknown>;
  miscs?: Record<string, unknown>;
}

export const useUI = (
  props: TUIPropsConfig
): IUIProperties | Record<string, unknown> => {
  const { silent, source, config } = props;

  if (silent) return;

  const idb = useIndexedDB(config);
  const [pending, setPending] = React.useState(true);
  const [appConfig, setAppConfig] = React.useState(null);

  React.useEffect(() => {
    const hasRequiredConfs = () => {
      if (idb.db && !appConfig) {
        return source.key && source.store && source.payload;
      } else return false;
    };

    if (hasRequiredConfs()) {
      idb
        .getDataFromIDB(source.store, source.key)
        .then((response) => response)
        .then((data) => {
          if (data) {
            setAppConfig(data.value);
            setPending(false);
          } else {
            idb
              .setDataInIDB(source.store, source.key, source.payload)
              .then(() =>
                idb.getDataFromIDB(source.store, source.key).then((data) => {
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
