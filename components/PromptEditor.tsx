
import React from 'react';
import { ModelConfig, GeminiModel } from '../types';
import { AVAILABLE_MODELS } from '../constants';
import { SparklesIcon } from './icons';

interface PromptEditorProps {
    prompt: string;
    setPrompt: (prompt: string) => void;
    systemInstruction: string;
    setSystemInstruction: (instruction: string) => void;
    model: GeminiModel;
    setModel: (model: GeminiModel) => void;
    config: ModelConfig;
    setConfig: (config: ModelConfig) => void;
    onSubmit: () => void;
    isLoading: boolean;
}

const SliderControl: React.FC<{ label: string; value: number; min: number; max: number; step: number; onChange: (value: number) => void; tooltip: string; }> = ({ label, value, min, max, step, onChange, tooltip }) => (
    <div className="space-y-2 group relative">
        <label className="flex justify-between items-center text-sm font-medium text-slate-300">
            <span>{label}</span>
            <span className="font-mono text-cyan-400">{value.toFixed(1)}</span>
        </label>
        <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-400"
        />
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            {tooltip}
        </div>
    </div>
);

export const PromptEditor: React.FC<PromptEditorProps> = ({
    prompt,
    setPrompt,
    systemInstruction,
    setSystemInstruction,
    model,
    setModel,
    config,
    setConfig,
    onSubmit,
    isLoading
}) => {
    const handleConfigChange = <K extends keyof ModelConfig,>(key: K, value: ModelConfig[K]) => {
        setConfig({ ...config, [key]: value });
    };

    return (
        <div className="flex flex-col space-y-6 h-full">
            <div className="flex-grow flex flex-col space-y-4">
                <div>
                    <label htmlFor="systemInstruction" className="block text-sm font-medium text-slate-300 mb-2">Instrucción del Sistema</label>
                    <textarea
                        id="systemInstruction"
                        value={systemInstruction}
                        onChange={(e) => setSystemInstruction(e.target.value)}
                        placeholder="Define el rol y comportamiento de la IA..."
                        rows={3}
                        className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 text-slate-200 focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
                    />
                </div>
                 <div>
                    <label htmlFor="prompt" className="block text-sm font-medium text-slate-300 mb-2">Prompt del Usuario</label>
                    <textarea
                        id="prompt"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Escribe tu prompt aquí..."
                        rows={8}
                        className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 text-slate-200 focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
                    />
                </div>
            </div>

            <div className="flex-shrink-0 space-y-6 bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                <h3 className="text-lg font-semibold text-slate-200 border-b border-slate-700 pb-2">Configuración</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div>
                        <label htmlFor="model" className="block text-sm font-medium text-slate-300 mb-2">Modelo</label>
                        <select
                            id="model"
                            value={model}
                            onChange={(e) => setModel(e.target.value as GeminiModel)}
                            className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-slate-200 focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
                        >
                            {AVAILABLE_MODELS.map(m => (
                                <option key={m.id} value={m.id}>{m.name}</option>
                            ))}
                        </select>
                    </div>
                     <div>
                        <label htmlFor="maxOutputTokens" className="block text-sm font-medium text-slate-300 mb-2">Tokens Máximos</label>
                        <input
                            type="number"
                            id="maxOutputTokens"
                            value={config.maxOutputTokens}
                            onChange={(e) => handleConfigChange('maxOutputTokens', parseInt(e.target.value, 10))}
                            className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-slate-200 focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
                        />
                    </div>
                </div>
                <SliderControl
                    label="Temperatura"
                    value={config.temperature}
                    min={0}
                    max={1}
                    step={0.1}
                    onChange={(v) => handleConfigChange('temperature', v)}
                    tooltip="Controla la aleatoriedad. Más alto = más creativo."
                />
                <SliderControl
                    label="Top-P"
                    value={config.topP}
                    min={0}
                    max={1}
                    step={0.1}
                    onChange={(v) => handleConfigChange('topP', v)}
                    tooltip="Muestreo por núcleo. Considera tokens con probabilidad acumulada."
                />
                 <SliderControl
                    label="Top-K"
                    value={config.topK}
                    min={1}
                    max={100}
                    step={1}
                    onChange={(v) => handleConfigChange('topK', v)}
                    tooltip="Considera los K tokens más probables en cada paso."
                />
            </div>
            
            <button
                onClick={onSubmit}
                disabled={isLoading || !prompt}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold py-3 px-4 rounded-md hover:from-purple-700 hover:to-cyan-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
            >
                <SparklesIcon />
                {isLoading ? 'Generando...' : 'Generar Respuesta'}
            </button>
        </div>
    );
};
