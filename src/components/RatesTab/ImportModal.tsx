import React from 'react';
import { BaseImportModal } from '../shared/BaseImportModal';
import { useStore } from '../../store';
import { CarrierRate } from '../../types';
import { rateTemplateFields } from '../../utils/templates';

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ImportModal({ isOpen, onClose }: ImportModalProps) {
  const { addCarrierRate, addDebugLog } = useStore();

  const handleImport = (rates: Partial<CarrierRate>[]) => {
    rates.forEach(rate => {
      addCarrierRate({
        ...rate,
        id: crypto.randomUUID(),
      } as CarrierRate);
    });
    addDebugLog('Import', `Imported ${rates.length} carrier rates`);
  };

  return (
    <BaseImportModal
      isOpen={isOpen}
      onClose={onClose}
      title="Import Carrier Rates"
      onImport={handleImport}
      mappingType="rates"
      templateFields={rateTemplateFields}
    />
  );
}