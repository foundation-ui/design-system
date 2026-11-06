import type { HookRegistryMetadata } from "@chambellan/contracts";

export const UseIndexedDBMeta: HookRegistryMetadata = {
  kind: "hook",
  name: "useIndexedDB",
  title: "useIndexedDB",
  description:
    "Opens an IndexedDB database and exposes get, set, and flush helpers for its object stores.",
  component: "IndexedDB",
  module: "@usefui/hooks",
  code: `import { useIndexedDB } from "@usefui/hooks";

const config = { name: "app-db", stores: ["props"], version: 1 };

export function HookComponent() {
    const idb = useIndexedDB(config);

    if (!idb) return null;
    const { db, getDataFromIDB, setDataInIDB, flushDBStore } = idb;

    return ( {/** Your code here **/} );
}`,
  arguments: [
    {
      name: "config",
      type: "TIDBConfig",
      required: true,
    },
  ],
  returns: [
    {
      name: "db",
      type: "IDBDatabase | null",
    },
    {
      name: "getDataFromIDB",
      type: "(storeName: string, key: string) => Promise<any>",
    },
    {
      name: "setDataInIDB",
      type: "(storeName: string, key: string, value: any) => Promise<void>",
    },
    {
      name: "flushDBStore",
      type: "(storeName: string) => Promise<void>",
    },
  ],
  types: `type TIDBConfig = {
  silent?: boolean;
  name: string;
  stores: string[];
  version: number;
};`,
};
