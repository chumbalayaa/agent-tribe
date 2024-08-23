"use client";
import { FC } from 'react';

interface LatencyEstimatorProps {
  numModels: number;
  models: string[];
}

const LatencyEstimator: FC<LatencyEstimatorProps> = ({ numModels, models }) => {
  const estimateLatency = () => {
    const baseLatency = models.includes('gpt-4') ? 300 : 100; // in ms
    return baseLatency * numModels;
  };

  return (
    <div>
      <h2 className="text-lg font-bold">Estimated Latency</h2>
      <p>{estimateLatency()} ms</p>
    </div>
  );
};

export default LatencyEstimator;
