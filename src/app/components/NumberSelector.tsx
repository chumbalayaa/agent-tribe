"use client"
import { FC } from 'react';

interface NumberSelectorProps {
  numModels: number;
  setNumModels: (num: number) => void;
}

// How many models do we allow?
const numberOptions = 10;

const NumberSelector: FC<NumberSelectorProps> = ({ numModels, setNumModels }) => {
  return (
    <div>
      <label className="block mb-2">Number of Models</label>
      <select
        className="w-full p-2 border border-gray-300 rounded text-gray-900"
        value={numModels}
        onChange={(e) => setNumModels(Number(e.target.value))}
      >
        {[...Array(numberOptions)].map((_, i) => (
          <option key={i} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
    </div>
  );
};

export default NumberSelector;
