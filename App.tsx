
import React, { useState, useCallback } from 'react';
import { PromptEditor } from './components/PromptEditor';
import { ResponseViewer } from './components/ResponseViewer';
import { generateResponse } from './services/geminiService';
import { ModelConfig, GeminiModel } from './types';
import { DEFAULT_CONFIG, DEFAULT_MODEL } from './constants';

const App: React.FC = () => {
    const [prompt, setPrompt] = useState<string>('');
    const [systemInstruction, setSystemInstruction] = useState<string>('Eres un asistente de IA experto y útil.');
    const [model, setModel] = useState<GeminiModel>(DEFAULT_MODEL);
    const [config, setConfig] = useState<ModelConfig>(DEFAULT_CONFIG);
    const [response, setResponse] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = useCallback(async () => {
        if (!prompt || isLoading) return;

        setIsLoading(true);
        setError(null);
        setResponse('');

        try {
            const result = await generateResponse(prompt, systemInstruction, model, config);
            setResponse(result);
        } catch (e) {
            const err = e as Error;
            setError(err.message || 'Ocurrió un error al generar la respuesta.');
        } finally {
            setIsLoading(false);
        }
    }, [prompt, systemInstruction, model, config, isLoading]);

    return (
        <div className="min-h-screen bg-slate-900 font-sans">
            <header className="bg-slate-950/70 backdrop-blur-sm border-b border-slate-700/50 p-4 sticky top-0 z-10">
                <h1 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                    Agente Experto en Prompts de IA
                </h1>
            </header>

            <main className="flex flex-col md:flex-row h-[calc(100vh-65px)]">
                <div className="w-full md:w-1/2 p-4 lg:p-6 overflow-y-auto">
                    <PromptEditor
                        prompt={prompt}
                        setPrompt={setPrompt}
                        systemInstruction={systemInstruction}
                        setSystemInstruction={setSystemInstruction}
                        model={model}
                        setModel={setModel}
                        config={config}
                        setConfig={setConfig}
                        onSubmit={handleGenerate}
                        isLoading={isLoading}
                    />
                </div>
                <div className="w-full md:w-1/2 p-4 lg:p-6 bg-slate-950/50 border-t md:border-t-0 md:border-l border-slate-800 overflow-y-auto">
                    <ResponseViewer
                        response={response}
                        isLoading={isLoading}
                        error={error}
                    />
                </div>
            </main>
        </div>
    );
};

export default App;
