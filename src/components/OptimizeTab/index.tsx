import React, { useState } from 'react';
import { useStore } from '../../store';
import { OptimizationForm } from './OptimizationForm';
import { OptimizationResults } from './OptimizationResults';
import { optimizeLoads } from '../../utils/optimization';
import { Load } from '../../types';

export function OptimizeTab() {
  const [optimizedLoads, setOptimizedLoads] = useState<Load[]>([]);
  const { shipments, carrierRates, setLoads, addDebugLog } = useStore();

  const handleOptimize = async (settings: any) => {
    try {
      addDebugLog('Optimize', 'Starting load optimization...');
      const loads = await optimizeLoads(shipments, carrierRates, settings);
      setOptimizedLoads(loads);
      setLoads(loads);
      addDebugLog('Optimize', `Successfully created ${loads.length} optimized loads`);
    } catch (error) {
      addDebugLog('Error', `Optimization failed: ${error}`);
    }
  };

  const handleReset = () => {
    setOptimizedLoads([]);
    setLoads([]);
    addDebugLog('Optimize', 'Reset optimization results');
  };

  if (shipments.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Please add shipments before running optimization.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {optimizedLoads.length === 0 ? (
        <OptimizationForm onOptimize={handleOptimize} />
      ) : (
        <OptimizationResults loads={optimizedLoads} onReset={handleReset} />
      )}
    </div>
  );
}