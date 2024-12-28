export interface ColumnMapping {
  sourceColumn: string;
  targetField: string;
}

export interface SavedMapping {
  id: string;
  name: string;
  type: string;
  mappings: ColumnMapping[];
}

export interface ImportState {
  savedMappings: SavedMapping[];
  addSavedMapping: (mapping: Omit<SavedMapping, 'id'>) => void;
  removeSavedMapping: (id: string) => void;
}