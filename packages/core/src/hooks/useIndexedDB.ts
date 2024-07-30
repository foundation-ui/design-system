import React from "react";

export interface IndexedDBConfig {
  name: string;
  stores: string[];
  version: number;
}

/**
 * Custom hook to interact with IndexedDB.
 * @param config - Configuration object containing the database name, store names, and version.
 * @returns An object containing the database instance and functions to get, set, and flush data in IndexedDB.
 */
export const useIndexedDB = (config: IndexedDBConfig) => {
  const [db, setDb] = React.useState<IDBDatabase | null>(null);

  /**
   * Retrieves data from IndexedDB.
   * @param storeName - The name of the store to retrieve data from.
   * @param key - The key of the data to retrieve.
   * @returns A promise that resolves with the retrieved data or rejects with an error.
   */
  const getDataFromIDB = (storeName: string, key: string) => {
    return new Promise<any>((resolve, reject) => {
      if (!db) {
        reject(`[${config.name}-v${config.version}] Database not initialized`);
        return;
      }

      const transaction = db.transaction([storeName], "readonly");
      const store = transaction.objectStore(storeName);
      const request = store.get(key);

      request.onsuccess = () => {
        resolve(request.result);
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
  const setDataInIDB = (storeName: string, key: string, value: any) => {
    return new Promise<void>((resolve, reject) => {
      if (!db) {
        reject(`[${config.name}-v${config.version}] Database not initialized`);
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
  const flushDBStore = (storeName: string) => {
    return new Promise<void>((resolve, reject) => {
      if (!db) {
        reject(`[${config.name}-v${config.version}] Database not initialized`);
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
    const openRequest = indexedDB.open(config.name, config.version);

    openRequest.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      config.stores.forEach((storeName) => {
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath: "id" });
        }
      });
    };

    openRequest.onsuccess = (event: Event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      setDb(db);
    };

    openRequest.onerror = (event: Event) => {
      console.error(
        `[${config.name}-v${config.version}] Error opening IndexedDB:`,
        (event.target as IDBOpenDBRequest).error
      );
    };
  }, [config]);

  return { db, getDataFromIDB, setDataInIDB, flushDBStore };
};
