import * as XLSX from 'xlsx';
import { Shipment } from '../types';
import { ColumnMapping } from '../types/import';

export function generateTemplate(): Uint8Array {
  const worksheet = XLSX.utils.aoa_to_sheet([
    [
      'Shipment Number', 'Order Number',
      'Origin Location Code', 'Origin Name', 'Origin Address', 'Origin City', 'Origin State', 'Origin Postal Code', 'Origin Country',
      'Destination Location Code', 'Destination Name', 'Destination Address', 'Destination City', 'Destination State', 'Destination Postal Code', 'Destination Country',
      'Ship Early Date', 'Ship Late Date', 'Delivery Early Date', 'Delivery Late Date',
      'Total Weight', 'Total Cube', 'Total Items',
      'Temperature Low', 'Temperature High',
      'Service', 'Equipment',
      'Reference 1', 'Reference 2'
    ]
  ]);

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Shipments');
  
  return XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });
}

export function parseExcelFile(file: File): Promise<string[][]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as string[][];
        resolve(rows);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(file);
  });
}

export function applyMapping(rows: string[][], mapping: ColumnMapping[]): Partial<Shipment>[] {
  const [headers, ...dataRows] = rows;
  
  return dataRows.map(row => {
    const shipment: any = {};
    
    mapping.forEach(({ sourceColumn, targetField }) => {
      const columnIndex = headers.indexOf(sourceColumn);
      if (columnIndex !== -1) {
        const value = row[columnIndex];
        const fieldPath = targetField.split('.');
        
        let current = shipment;
        fieldPath.forEach((field, index) => {
          if (index === fieldPath.length - 1) {
            current[field] = value;
          } else {
            current[field] = current[field] || {};
            current = current[field];
          }
        });
      }
    });
    
    return shipment;
  });
}