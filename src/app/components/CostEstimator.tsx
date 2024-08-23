"use client";
import { FC } from 'react';

interface CostEstimatorProps {
  numModels: number;
  models: string[];
}

const CostEstimator: FC<CostEstimatorProps> = ({ numModels, models }) => {
  const estimateCost = () => {
    const baseCost = models.includes('gpt-4') ? 0.05 : 0.02; // cost per request in USD
    return baseCost * numModels;
  };

  return (
    <div>
      <h2 className="text-lg font-bold">Estimated Cost</h2>
      <p>${estimateCost().toFixed(2)}</p>
    </div>
  );
};

export default CostEstimator;
