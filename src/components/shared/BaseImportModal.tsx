import React, { useState } from 'react';
import { parseExcelFile, applyMapping } from '../../utils/excel';
import { ColumnMapping } from '../../types/import';
import { MappingSelector } from './MappingSelector';
import { useImportStore } from '../../store/importStore';
import { useStore } from '../../store';

interface BaseImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onImport: (data: any[]) => void;
  mappingType: string;
  templateFields: string[];
}

export function BaseImportModal({
  isOpen,
  onClose,
  title,
  onImport,
  mappingType,
  templateFields,
}: BaseImportModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [headers, setHeaders] = useState<string[]>([]);
  const [mapping, setMapping] = useState<ColumnMapping[]>([]);
  const { savedMappings, addSavedMapping, removeSavedMapping } = useImportStore();
  const addDebugLog = useStore((state) => state.addDebugLog);

  const filteredMappings = savedMappings.filter(m => m.type === mappingType);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setFile(file);
      const rows = await parseExcelFile(file);
      setHeaders(rows[0]);
      addDebugLog('Import', `File loaded: ${file.name}`);
    } catch (error) {
      addDebugLog('Error', `Failed to parse file: ${error}`);
    }
  };

  const handleImport = async () => {
    if (!file || mapping.length === 0) return;

    try {
      const rows = await parseExcelFile(file);
      const data = applyMapping(rows, mapping);
      onImport(data);
      onClose();
    } catch (error) {
      addDebugLog('Error', `Import failed: ${error}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium">{title}</h3>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select File
              </label>
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            {headers.length > 0 && (
              <MappingSelector
                headers={headers}
                mapping={mapping}
                onChange={setMapping}
                savedMappings={filteredMappings}
                onSaveMapping={(name) => {
                  addSavedMapping({ name, mappings: mapping, type: mappingType });
                  addDebugLog('Mapping', `Saved new ${mappingType} mapping: ${name}`);
                }}
                onDeleteMapping={(id) => {
                  removeSavedMapping(id);
                  addDebugLog('Mapping', `Deleted ${mappingType} mapping`);
                }}
                templateFields={templateFields}
              />
            )}
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 border border-gray-300 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleImport}
              disabled={!file || mapping.length === 0}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50"
            >
              Import
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}