
import React, { useCallback, useState } from 'react';
import ReactFlow, { addEdge, Connection, Node, Edge, Background, Controls, useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';

const initialZNodes = [
  { id: '1', type: 'input', data: { label: 'Start Node' }, position: { x: 250, y: 5 } },
  { id: '2', data: { label: 'HTTP Request' }, position: { x: 100, y: 100 } },
];

const initialTzinorEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, label: 'Flow' },
];

export const ArkheCanvas: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialZNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialTzinorEdges);

  const onConnect = useCallback((params: Connection) => setEdges((els) => addEdge(params, els)), [setEdges]);

  return (
    <div className="h-full w-full bg-[#0a0a0f]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        snapToGrid={true}
        snapGrid={[16, 16]}
      >
        <Background color="#333" gap={16} />
        <Controls />
      </ReactFlow>
    </div>
  );
};
