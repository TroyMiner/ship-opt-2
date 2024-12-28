import React from 'react';
import { useStore } from '../../store';

export function ConfigureTab() {
  const { mapboxToken, debug, setMapboxToken, setDebug } = useStore();

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900">Configuration</h2>
      <div className="mt-4 space-y-4">
        <div>
          <label htmlFor="mapboxToken" className="block text-sm font-medium text-gray-700">
            Mapbox Token
          </label>
          <input
            type="text"
            id="mapboxToken"
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="debug"
            checked={debug}
            onChange={(e) => setDebug(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="debug" className="ml-2 block text-sm text-gray-900">
            Enable Debug Mode
          </label>
        </div>
      </div>
    </div>
  );
}