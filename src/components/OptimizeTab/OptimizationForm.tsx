import React from 'react';
import { useStore } from '../../store';
import { Settings } from 'lucide-react';

interface OptimizationSettings {
  maxStops: number;
  consolidateLoads: boolean;
  preferredCarriers: string[];
  maxDistance: number;
}

export function OptimizationForm({ onOptimize }: { onOptimize: (settings: OptimizationSettings) => void }) {
  const [settings, setSettings] = React.useState<OptimizationSettings>({
    maxStops: 3,
    consolidateLoads: true,
    preferredCarriers: [],
    maxDistance: 500,
  });
  const { carrierRates } = useStore();
  const uniqueCarriers = [...new Set(carrierRates.map(rate => rate.carrierName))];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="w-5 h-5 text-gray-500" />
        <h3 className="text-lg font-medium">Optimization Settings</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Maximum Stops</label>
          <input
            type="number"
            min={1}
            max={10}
            value={settings.maxStops}
            onChange={e => setSettings({ ...settings, maxStops: parseInt(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Maximum Distance (miles)</label>
          <input
            type="number"
            min={100}
            max={2000}
            value={settings.maxDistance}
            onChange={e => setSettings({ ...settings, maxDistance: parseInt(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.consolidateLoads}
              onChange={e => setSettings({ ...settings, consolidateLoads: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Consolidate Loads</span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Preferred Carriers</label>
          <select
            multiple
            value={settings.preferredCarriers}
            onChange={e => setSettings({
              ...settings,
              preferredCarriers: Array.from(e.target.selectedOptions, option => option.value)
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {uniqueCarriers.map(carrier => (
              <option key={carrier} value={carrier}>{carrier}</option>
            ))}
          </select>
        </div>

        <button
          onClick={() => onOptimize(settings)}
          className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
        >
          Run Optimization
        </button>
      </div>
    </div>
  );
}