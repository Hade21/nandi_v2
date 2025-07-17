import { createStore } from "zustand/vanilla";
import { UnitData } from "../../types";

export type UnitState = {
  units: UnitData[];
  selectedUnit: UnitData;
  updateLocation: "gps" | "pin" | null;
  tempMarker: {
    lat: number;
    lng: number;
    alt: number;
    label: string;
  };
};

export type UnitAction = {
  setLocation: (units: UnitState["updateLocation"]) => void;
  setUnits: (units: UnitState["units"]) => void;
  setTempMarker: (units: UnitState["tempMarker"]) => void;
  setSelectedUnit: (unit: UnitState["selectedUnit"]) => void;
};

export type UnitStore = UnitState & UnitAction;

export const defaultInitState: UnitState = {
  units: [],
  selectedUnit: {
    id: "",
    name: "",
    type: "",
    egi: "",
    createdBy: "",
  },
  tempMarker: {
    lat: 0,
    lng: 0,
    alt: 0,
    label: "",
  },
  updateLocation: null,
};

export const createUnitStore = (initState: UnitState = defaultInitState) => {
  return createStore<UnitStore>()((set) => ({
    ...initState,
    setLocation: (location) => set(() => ({ updateLocation: location })),
    setUnits: (units) =>
      set(() => ({
        units: units.map((unit) => ({
          ...unit,
          locations: Array.isArray(unit.locations) ? unit.locations[0] : null,
        })),
      })),
    setSelectedUnit: (unit) => set(() => ({ selectedUnit: unit })),
    setTempMarker: (marker) => set(() => ({ tempMarker: marker })),
  }));
};
