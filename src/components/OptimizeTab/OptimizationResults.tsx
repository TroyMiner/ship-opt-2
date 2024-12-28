import React from 'react';
import { useStore } from '../../store';
import { Load } from '../../types';
import { Truck, Package, DollarSign } from 'lucide-react';

interface OptimizationResultsProps {
  loads: Load[];
  onReset: () => void;
}

export function OptimizationResults({ loads, onReset }: OptimizationResultsProps) {
  const totalCost = loads.reduce((sum, load) => sum + load.totalCost, 0);
  const totalShipments = loads.reduce((sum, load) => sum + 1, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-blue-500" />
            <h4 className="font-medium">Total Loads</h4>
          </div>
          <p className="text-2xl font-bold mt-2">{loads.length}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-green-500" />
            <h4 className="font-medium">Total Shipments</h4>
          </div>
          <p className="text-2xl font-bold mt-2">{totalShipments}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-yellow-500" />
            <h4 className="font-medium">Total Cost</h4>
          </div>
          <p className="text-2xl font-bold mt-2">${totalCost.toFixed(2)}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="text-lg font-medium">Optimized Loads</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {loads.map((load, index) => (
            <div key={load.id} className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">Load {index + 1}</h4>
                <span className="text-sm text-gray-500">
                  {load.carrierRate.carrierName} - ${load.totalCost.toFixed(2)}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                <p>From: {load.origin.name}</p>
                <p>To: {load.destination.name}</p>
                <p>Service: {load.service}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onReset}
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-md"
        >
          Reset Optimization
        </button>
      </div>
    </div>
  );
}