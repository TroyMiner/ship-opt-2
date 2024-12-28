import { create } from 'zustand';
import { Shipment, CarrierRate, Load } from '../types';

interface AppState {
  shipments: Shipment[];
  carrierRates: CarrierRate[];
  loads: Load[];
  mapboxToken: string;
  debug: boolean;
  debugLogs: Array<{
    timestamp: Date;
    type: string;
    message: string;
  }>;
  addShipment: (shipment: Shipment) => void;
  removeShipment: (id: string) => void;
  addCarrierRate: (rate: CarrierRate) => void;
  removeCarrierRate: (id: string) => void;
  setMapboxToken: (token: string) => void;
  setDebug: (enabled: boolean) => void;
  addDebugLog: (type: string, message: string) => void;
  setLoads: (loads: Load[]) => void;
}

export const useStore = create<AppState>((set) => ({
  shipments: [],
  carrierRates: [],
  loads: [],
  mapboxToken: '',
  debug: false,
  debugLogs: [],
  
  addShipment: (shipment) =>
    set((state) => ({ shipments: [...state.shipments, shipment] })),
    
  removeShipment: (id) =>
    set((state) => ({
      shipments: state.shipments.filter((s) => s.id !== id),
    })),
    
  addCarrierRate: (rate) =>
    set((state) => ({ carrierRates: [...state.carrierRates, rate] })),
    
  removeCarrierRate: (id) =>
    set((state) => ({
      carrierRates: state.carrierRates.filter((r) => r.id !== id),
    })),
    
  setMapboxToken: (token) => set({ mapboxToken: token }),
  
  setDebug: (enabled) => set({ debug: enabled }),
  
  addDebugLog: (type, message) =>
    set((state) => ({
      debugLogs: [
        ...state.debugLogs,
        { timestamp: new Date(), type, message },
      ],
    })),
    
  setLoads: (loads) => set({ loads }),
}));