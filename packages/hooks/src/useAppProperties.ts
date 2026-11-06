import React from "react";
import { useIndexedDB, TIDBConfig } from "./useIndexedDB";

export type TAppPropsSrc = {
  store?: string;
  key?: string;
  payload?: IAppProperties;
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
export type TShortcutsConfig = {
  enabled: boolean;
  shortcut: {
    hotkey: string;
    bindkey: string;
  };
};
export type TUIPropsConfig = {
  silent?: boolean;
  config: TIDBConfig;
  source: TAppPropsSrc;
};
export interface IAppProperties {
  feature_flags?: Record<string, TFeatFlagConfig | unknown>;
  translations?: Record<string, unknown>;
  miscs?: Record<string, unknown>;
}

export const useAppProperties = (
  props: TUIPropsConfig
): IAppProperties | undefined => {
  const { silent, source, config } = props;
  const { store, key } = source;
  const idb = useIndexedDB(config);
  const [appProps, setAppProps] = React.useState<IAppProperties | undefined>(
    undefined
  );

  const sourceRef = React.useRef(source);
  sourceRef.current = source;

  React.useEffect(() => {
    if (silent || !idb.db) return;

    if (!store || !key) return;

    let cancelled = false;

    idb
      .getDataFromIDB<IAppProperties>(store, key)
      .then((record) => {
        if (cancelled) return;

        if (record) {
          setAppProps(record.value);
          return;
        }

        const payload = sourceRef.current.payload;
        if (!payload) return;

        return idb.setDataInIDB(store, key, payload).then(() => {
          if (!cancelled) setAppProps(payload);
        });
      })
      .catch((error) => {
        if (!silent) {
          console.error(
            "[useAppProperties] Failed to load app properties:",
            error
          );
        }
      });

    return () => {
      cancelled = true;
    };
  }, [idb.db, silent, store, key]);

  return appProps;
};
