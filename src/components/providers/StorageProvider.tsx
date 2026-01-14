import type { QueryItem } from "@/lib/types";
import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

const KEY = "localStorageData" as const;

interface LocalStorageData {
  queryList: Array<QueryItem>;
  mutationList: Array<QueryItem>;
}

export const DEFAULT_VALUE: LocalStorageData = {
  queryList: [
    {
      id: crypto.randomUUID(),
      label: "lead #1",
      queryKey: ["lead", "detail", "#1"],
    },
  ],
  mutationList: [
    { id: crypto.randomUUID(), label: "all leads", queryKey: ["lead"] },
  ],
} as const;

interface StorageContextType {
  storage: LocalStorageData;
  setStorage: React.Dispatch<React.SetStateAction<LocalStorageData>>;
}

const StorageContext = createContext<StorageContextType | undefined>(undefined);

export function StorageProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<LocalStorageData>(() => {
    const saved = localStorage.getItem(KEY);
    return saved ? JSON.parse(saved) : DEFAULT_VALUE;
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(data));
  }, [data]);

  return (
    <StorageContext.Provider value={{ storage: data, setStorage: setData }}>
      {children}
    </StorageContext.Provider>
  );
}

export function useStorage() {
  const context = useContext(StorageContext);
  if (!context) {
    throw new Error("useStorage must be used within a StorageProvider");
  }
  return context;
}
