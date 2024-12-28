import React from 'react';
import { Truck } from 'lucide-react';
import { Tabs } from './components/Tabs';
import { ShipmentsTab } from './components/ShipmentsTab';
import { RatesTab } from './components/RatesTab';
import { OptimizeTab } from './components/OptimizeTab';
import { ConfigureTab } from './components/ConfigureTab';
import { DebugTab } from './components/DebugTab';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4">
            <Truck className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              Shipment Optimizer
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <Tabs
          tabs={[
            { id: 'shipments', label: 'Shipments', content: <ShipmentsTab /> },
            { id: 'rates', label: 'Rates', content: <RatesTab /> },
            { id: 'optimize', label: 'Optimize', content: <OptimizeTab /> },
            { id: 'configure', label: 'Configure', content: <ConfigureTab /> },
            { id: 'debug', label: 'Debug', content: <DebugTab /> },
          ]}
        />
      </main>
    </div>
  );
}

export default App;