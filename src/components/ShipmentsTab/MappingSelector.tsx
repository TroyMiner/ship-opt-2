import React, { useState } from 'react';
import { Save, Trash2, Wand2 } from 'lucide-react';
import { ColumnMapping, SavedMapping } from '../../types/import';
import { autoMapColumns } from '../../utils/mapping';

interface MappingSelectorProps {
  headers: string[];
  mapping: ColumnMapping[];
  onChange: (mapping: ColumnMapping[]) => void;
  savedMappings: SavedMapping[];
  onSaveMapping: (name: string) => void;
  onDeleteMapping?: (id: string) => void;
}

export function MappingSelector({
  headers,
  mapping,
  onChange,
  savedMappings,
  onSaveMapping,
  onDeleteMapping,
}: MappingSelectorProps) {
  const [newMappingName, setNewMappingName] = useState('');
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  const handleAutoMap = () => {
    const autoMapping = autoMapColumns(headers);
    onChange(autoMapping);
  };

  const handleSaveMapping = () => {
    if (newMappingName.trim()) {
      onSaveMapping(newMappingName.trim());
      setNewMappingName('');
      setShowSaveSuccess(true);
      setTimeout(() => setShowSaveSuccess(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {savedMappings.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Load Saved Mapping
          </label>
          <div className="flex gap-2">
            <select
              onChange={(e) => {
                const mapping = savedMappings.find((m) => m.id === e.target.value);
                if (mapping) onChange(mapping.mappings);
              }}
              className="block flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select a saved mapping</option>
              {savedMappings.map((mapping) => (
                <option key={mapping.id} value={mapping.id}>
                  {mapping.name}
                </option>
              ))}
            </select>
            {onDeleteMapping && (
              <button
                onClick={() => {
                  const select = document.querySelector('select') as HTMLSelectElement;
                  if (select.value) {
                    onDeleteMapping(select.value);
                    select.value = '';
                  }
                }}
                className="p-2 text-gray-500 hover:text-red-600 rounded-md hover:bg-red-50"
                title="Delete selected mapping"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      )}

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Column Mappings
          </label>
          <button
            onClick={handleAutoMap}
            className="flex items-center gap-2 px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md"
            title="Auto-map columns based on template order"
          >
            <Wand2 className="w-4 h-4" />
            Auto Map
          </button>
        </div>

        <div className="mt-2 space-y-2 max-h-[40vh] overflow-y-auto pr-2">
          {headers.map((header) => (
            <div key={header} className="flex items-center gap-2">
              <span className="text-sm text-gray-500 w-1/3 truncate" title={header}>
                {header}
              </span>
              <select
                value={mapping.find((m) => m.sourceColumn === header)?.targetField || ''}
                onChange={(e) => {
                  const newMapping = mapping.filter((m) => m.sourceColumn !== header);
                  if (e.target.value) {
                    newMapping.push({
                      sourceColumn: header,
                      targetField: e.target.value,
                    });
                  }
                  onChange(newMapping);
                }}
                className="block w-2/3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
              >
                <option value="">-- Select field --</option>
                <option value="shipmentNumber">Shipment Number</option>
                <option value="orderNumber">Order Number</option>
                <option value="origin.locationCode">Origin Location Code</option>
                <option value="origin.name">Origin Name</option>
                <option value="origin.address">Origin Address</option>
                <option value="origin.city">Origin City</option>
                <option value="origin.state">Origin State</option>
                <option value="origin.postalCode">Origin Postal Code</option>
                <option value="origin.country">Origin Country</option>
                <option value="destination.locationCode">Destination Location Code</option>
                <option value="destination.name">Destination Name</option>
                <option value="destination.address">Destination Address</option>
                <option value="destination.city">Destination City</option>
                <option value="destination.state">Destination State</option>
                <option value="destination.postalCode">Destination Postal Code</option>
                <option value="destination.country">Destination Country</option>
                <option value="shipDates.early">Ship Early Date</option>
                <option value="shipDates.late">Ship Late Date</option>
                <option value="deliveryDates.early">Delivery Early Date</option>
                <option value="deliveryDates.late">Delivery Late Date</option>
                <option value="totalWeight">Total Weight</option>
                <option value="totalCube">Total Cube</option>
                <option value="totalItems">Total Items</option>
                <option value="temperature.low">Temperature Low</option>
                <option value="temperature.high">Temperature High</option>
                <option value="service">Service</option>
                <option value="equipment">Equipment</option>
                <option value="reference1">Reference 1</option>
                <option value="reference2">Reference 2</option>
              </select>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 pt-4">
        <input
          type="text"
          value={newMappingName}
          onChange={(e) => setNewMappingName(e.target.value)}
          placeholder="Mapping name"
          className="block flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
        />
        <button
          onClick={handleSaveMapping}
          disabled={!newMappingName.trim() || mapping.length === 0}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          Save Mapping
        </button>
      </div>
      
      {showSaveSuccess && (
        <div className="text-sm text-green-600">Mapping saved successfully!</div>
      )}
    </div>
  );
}