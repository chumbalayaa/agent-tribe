"use client";
import { useState, useEffect } from 'react';
import Head from 'next/head';
import ModelSelector from './components/ModelSelector';
import NumberSelector from './components/NumberSelector';
import PromptInput from './components/PromptInput';
import FinalResponse from './components/FinalResponse';
import FlowChart from './components/FlowChart';
import LatencyEstimator from './components/LatencyEstimator';
import CostEstimator from './components/CostEstimator';
import { Agent } from './agents/Agent';

const Home = () => {
  const [model, setModel] = useState('gpt-3.5-turbo');
  const [numModels, setNumModels] = useState(1);
  const [prompt, setPrompt] = useState('');
  const [finalResponse, setFinalResponse] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);

  const models = Array(numModels).fill(model);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
      setApiKey(process.env.NEXT_PUBLIC_OPENAI_API_KEY);
    }
  }, []);

  const handleGenerateResponse = async () => {
    setLoading(true);
    const responses = [];
    for (let i = 0; i < numModels; i++) {
      const agent = new Agent(apiKey, model, prompt, 0.5);
      const response = await agent.generateResponse();
      responses.push(response);
    }
    const critiques = [];
    for (let i = 0; i < numModels; i++) {
      const agent = new Agent(apiKey, model, prompt, 0.5);
      const critique = await agent.critiqueResponse(responses[i], prompt);
      critiques.push(critique);
    }
    const agent = new Agent(apiKey, model, prompt, 0.5);
    const combinedResponse = await agent.combineResponses(prompt, responses, critiques);
    setFinalResponse(combinedResponse);
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Agent Tribe</title>
        <meta name="description" content="An app to collaborate with multiple LLMs" />
      </Head>
      <h1 className="text-2xl font-bold mb-4">Agent Tribe</h1>
      <div className="flex justify-around mb-4">
        <LatencyEstimator numModels={numModels} models={models} />
        <CostEstimator numModels={numModels} models={models} />
        <div>
          <label htmlFor="api-key" className="block text-sm font-medium text-gray-700">
            OpenAI API Key
          </label>
          <input
            type="text"
            id="api-key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
            placeholder="Enter your OpenAI API key"
          />
        </div>
      </div>
      <div className="flex space-x-4">
        <div className="w-1/3 space-y-4">
          <ModelSelector model={model} setModel={setModel} />
          <NumberSelector numModels={numModels} setNumModels={setNumModels} />
          <PromptInput prompt={prompt} setPrompt={setPrompt} />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleGenerateResponse}
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate Response'}
          </button>
        </div>
        <div className="w-2/3">
          <FlowChart numModels={numModels} models={models} />
        </div>
      </div>
      <div className="mt-4">
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="loader"></div>
            <span className="ml-2">Generating response...</span>
          </div>
        ) : (
          <FinalResponse finalResponse={finalResponse} />
        )}
      </div>
    </div>
  );
};

export default Home;
