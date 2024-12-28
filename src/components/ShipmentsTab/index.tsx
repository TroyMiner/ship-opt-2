import React, { useState } from 'react';
import { ShipmentList } from './ShipmentList';
import { ImportModal } from './ImportModal';
import { generateTemplate } from '../../utils/excel';
import { useStore } from '../../store';

export function ShipmentsTab() {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const addDebugLog = useStore((state) => state.addDebugLog);

  const handleExportTemplate = () => {
    const data = generateTemplate();
    const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'shipments-template.xlsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    addDebugLog('Export', 'Template downloaded');
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Shipments</h2>
        <div className="space-x-2">
          <button
            onClick={handleExportTemplate}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-md"
          >
            Download Template
          </button>
          <button
            onClick={() => setIsImportModalOpen(true)}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
          >
            Import Shipments
          </button>
        </div>
      </div>
      
      <ShipmentList />
      
      <ImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
      />
    </div>
  );
}