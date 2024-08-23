import React from 'react';
import ReactFlow, { Background, Node, Edge } from 'reactflow';
import 'reactflow/dist/style.css';

interface FlowChartProps {
  numModels: number;
  models: string[];
}

const FlowChart: React.FC<FlowChartProps> = ({ numModels, models }) => {
  const nodes: Node[] = [
    { id: '1', data: { label: 'User Prompt' }, position: { x: 0, y: 50 } },
    ...models.flatMap((model, index) => [
      { id: `model-${index + 1}`, data: { label: model }, position: { x: 150, y: 100 + index * 150 } },
      { id: `critique-${index + 1}`, data: { label: `Critique ${index + 1}` }, position: { x: 300, y: 100 + index * 150 } },
    ]),
    { id: 'final', data: { label: 'Final Response' }, position: { x: 450, y: 50 + (numModels - 1) * 75 } },
  ];

  const edges: Edge[] = [
    ...models.map((_, index) => ({
      id: `e1-model-${index + 1}`,
      source: '1',
      target: `model-${index + 1}`,
      type: 'smoothstep',
      arrowHeadType: 'arrowclosed',
    })),
    ...models.map((_, index) => ({
      id: `emodel-${index + 1}-critique-${index + 1}`,
      source: `model-${index + 1}`,
      target: `critique-${index + 1}`,
      type: 'smoothstep',
      arrowHeadType: 'arrowclosed',
    })),
    ...models.map((_, index) => ({
      id: `ecritique-${index + 1}-final`,
      source: `critique-${index + 1}`,
      target: 'final',
      type: 'smoothstep',
      arrowHeadType: 'arrowclosed',
    })),
  ];

  return (
    <div style={{ height: 500, width: '100%' }}>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background />
      </ReactFlow>
    </div>
  );
};

export default FlowChart;
