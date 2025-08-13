"use client";

import { type ReactNode, createContext, useContext, useRef } from "react";
import { useStore } from "zustand";

import { type UnitStore, createUnitStore } from "@/stores/unitStore";

export type UnitStoreApi = ReturnType<typeof createUnitStore>;

export const UnitStoreContext = createContext<UnitStoreApi | undefined>(
  undefined
);

export interface UnitStoreProviderProps {
  children: ReactNode;
}

export const UnitStoreProvider = ({ children }: UnitStoreProviderProps) => {
  const storeRef = useRef<UnitStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createUnitStore();
  }

  return (
    <UnitStoreContext.Provider value={storeRef.current}>
      {children}
    </UnitStoreContext.Provider>
  );
};

export const useUnitStore = <T,>(selector: (store: UnitStore) => T): T => {
  const unitStoreContext = useContext(UnitStoreContext);

  if (!unitStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`);
  }

  return useStore(unitStoreContext, selector);
};
