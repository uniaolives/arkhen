
import React, { useState } from 'react';
import { ReactFlowProvider } from 'reactflow';
import { ArkheCanvas } from './Editor';

const App: React.FC = () => {
  return (
    <div className="h-screen w-screen flex flex-col bg-gray-900 text-gray-100">
      <header className="p-4 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
        <h1 className="text-xl font-bold text-cyan-400">🜏 Arkhe(n) Flow</h1>
        <div>
          <button className="px-4 py-2 bg-cyan-600 rounded hover:bg-cyan-500 mr-2">
            Load Workflow
          </button>
          <button className="px-4 py-2 bg-green-600 rounded hover:bg-green-500">
            Execute
          </button>
        </div>
      </header>

      <main className="flex-1">
        <ReactFlowProvider>
          <ArkheCanvas />
        </ReactFlowProvider>
      </main>
    </div>
  );
};

export default App;
