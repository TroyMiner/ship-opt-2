import { create } from 'zustand';
import { ImportState } from '../types/import';

export const useImportStore = create<ImportState>((set) => ({
  savedMappings: [],
  addSavedMapping: (mapping) =>
    set((state) => ({
      savedMappings: [
        ...state.savedMappings,
        { ...mapping, id: crypto.randomUUID() },
      ],
    })),
  removeSavedMapping: (id) =>
    set((state) => ({
      savedMappings: state.savedMappings.filter((m) => m.id !== id),
    })),
}));