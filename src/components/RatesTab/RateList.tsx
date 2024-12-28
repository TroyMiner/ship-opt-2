import React from 'react';
import { useStore } from '../../store';

export function RateList() {
  const rates = useStore((state) => state.carrierRates);
  
  return (
    <div className="mt-4">
      {rates.length === 0 ? (
        <p className="text-gray-500">No carrier rates added yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Carrier Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rate Set
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mode
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rates.map((rate) => (
                <tr key={rate.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{rate.carrierName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{rate.rateSet}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{rate.mode}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {rate.rate} per {rate.ratePer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => useStore.getState().removeCarrierRate(rate.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}