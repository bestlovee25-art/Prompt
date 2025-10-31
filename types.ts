
export interface ModelConfig {
    temperature: number;
    topP: number;
    topK: number;
    maxOutputTokens: number;
}

export type GeminiModel = 'gemini-2.5-pro' | 'gemini-2.5-flash';
