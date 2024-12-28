import React from 'react';
import { useStore } from '../../store';

export function DebugTab() {
  const { debug, debugLogs } = useStore();

  if (!debug) {
    return (
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Debug</h2>
        <p className="text-gray-500 mt-4">Debug mode is disabled. Enable it in the Configure tab.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900">Debug Logs</h2>
      <div className="mt-4">
        {debugLogs.length === 0 ? (
          <p className="text-gray-500">No logs yet.</p>
        ) : (
          <div className="space-y-2">
            {debugLogs.map((log, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-500">
                  {log.timestamp.toLocaleString()}
                </div>
                <div className="font-medium">{log.type}</div>
                <div className="text-gray-700">{log.message}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}