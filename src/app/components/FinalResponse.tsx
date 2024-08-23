"use client"
import { FC } from 'react';

interface FinalResponseProps {
  finalResponse: string;
}

const FinalResponse: FC<FinalResponseProps> = ({ finalResponse }) => {
  return (
    <div>
      <label className="block mb-2">Final Response</label>
      <textarea
        className="w-full p-2 border border-gray-300 rounded text-gray-900"
        value={finalResponse}
        readOnly
        rows={6}
      />
    </div>
  );
};

export default FinalResponse;
