
import { ModelConfig, GeminiModel } from './types';

export const AVAILABLE_MODELS: { id: GeminiModel; name: string }[] = [
    { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro' },
    { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash' },
];

export const DEFAULT_MODEL: GeminiModel = 'gemini-2.5-flash';

export const DEFAULT_CONFIG: ModelConfig = {
    temperature: 0.7,
    topP: 0.9,
    topK: 40,
    maxOutputTokens: 2048,
};
