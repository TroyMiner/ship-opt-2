import { ColumnMapping } from '../types/import';

export function autoMapColumns(headers: string[], templateFields: string[]): ColumnMapping[] {
  return headers.map((header, index) => ({
    sourceColumn: header,
    targetField: index < templateFields.length ? templateFields[index] : '',
  })).filter(mapping => mapping.targetField !== '');
}