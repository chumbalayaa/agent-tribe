"use client"
import { FC } from 'react';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
}

const PromptInput: FC<PromptInputProps> = ({ prompt, setPrompt }) => {
  return (
    <div>
      <label className="block mb-2">Prompt</label>
      <textarea
        className="w-full p-2 border border-gray-300 rounded text-gray-900"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={4}
      />
    </div>
  );
};

export default PromptInput;
