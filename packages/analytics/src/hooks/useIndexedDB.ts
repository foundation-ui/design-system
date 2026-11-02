import React from "react";

export type TIDBConfig = {
  silent?: boolean;
  name: string;
  stores: string[];
  version: number;
};

export type TIDBRecord<T = unknown> = {
  id: string;
  value: T;
};

/**
 * Custom hook to interact with IndexedDB.
 * @param config - Configuration object containing the database name, store names, and version.
 * @returns An object containing the database instance and functions to get, set, and flush data in IndexedDB.
 */
export const useIndexedDB = (config: TIDBConfig) => {
  const { silent, name, stores, version } = config;
  const [db, setDb] = React.useState<IDBDatabase | null>(null);

  const storesKey = stores.join(",");
  const storesRef = React.useRef(stores);
  storesRef.current = stores;

  /**
   * Retrieves data from IndexedDB.
   * @param storeName - The name of the store to retrieve data from.
   * @param key - The key of the data to retrieve.
   * @returns A promise that resolves with the retrieved record, or `undefined` when absent.
   */
  const getDataFromIDB = <T = unknown>(
    storeName: string,
    key: string
  ): Promise<TIDBRecord<T> | undefined> => {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject(new Error(`[${name}-v${version}] Database not initialized`));
        return;
      }

      const transaction = db.transaction([storeName], "readonly");
      const store = transaction.objectStore(storeName);
      const request = store.get(key);

      request.onsuccess = () => {
        resolve(request.result as TIDBRecord<T> | undefined);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  };

  /**
   * Stores or updates data in IndexedDB.
   * @param storeName - The name of the store to store or update data in.
   * @param key - The key of the data to store or update.
   * @param value - The value of the data to store or update.
   * @returns A promise that resolves when the data is successfully stored or updated, or rejects with an error.
   */
  const setDataInIDB = (
    storeName: string,
    key: string,
    value: unknown
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject(new Error(`[${name}-v${version}] Database not initialized`));
        return;
      }

      const transaction = db.transaction([storeName], "readwrite");
      const store = transaction.objectStore(storeName);
      const request = store.put({ id: key, value });

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  };

  /**
   * Deletes every item from the desired IndexedDB store.
   * @param storeName - The name of the store to flush.
   * @returns A promise that resolves when the store is successfully flushed, or rejects with an error.
   */
  const flushDBStore = (storeName: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject(new Error(`[${name}-v${version}] Database not initialized`));
        return;
      }

      const transaction = db.transaction([storeName], "readwrite");
      const store = transaction.objectStore(storeName);
      const request = store.clear();

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  };

  React.useEffect(() => {
    if (silent) return;

    const openRequest = indexedDB.open(name, version);

    openRequest.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const database = (event.target as IDBOpenDBRequest).result;
      storesRef.current.forEach((storeName) => {
        if (!database.objectStoreNames.contains(storeName)) {
          database.createObjectStore(storeName, { keyPath: "id" });
        }
      });
    };

    openRequest.onsuccess = (event: Event) => {
      setDb((event.target as IDBOpenDBRequest).result);
    };

    openRequest.onerror = (event: Event) => {
      console.error(
        `[${name}-v${version}] Error opening IndexedDB:`,
        (event.target as IDBOpenDBRequest).error
      );
    };
  }, [silent, name, version, storesKey]);

  return { db, getDataFromIDB, setDataInIDB, flushDBStore };
};
