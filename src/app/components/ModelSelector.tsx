"use client"
import { FC } from 'react';

interface ModelSelectorProps {
  model: string;
  setModel: (model: string) => void;
}

/**
 * Selects the LLM model - for now only looking at legacy completion models (not chat)
 */
const ModelSelector: FC<ModelSelectorProps> = ({ model, setModel }) => {
  return (
    <div>
      <label className="block mb-2">Select Model</label>
      <select
        className="w-full p-2 border border-gray-300 rounded text-gray-900"
        value={model}
        onChange={(e) => setModel(e.target.value)}
      >
        <option value="gpt-3.5-turbo-instruct">gpt-3.5-turbo-instruct</option>
        <option value="babbage-002">babbage-002</option>
        <option value="davinci-002">davinci-002</option>
      </select>
    </div>
  );
};

export default ModelSelector;
