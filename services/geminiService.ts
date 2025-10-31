
import { GoogleGenAI } from "@google/genai";
import { ModelConfig, GeminiModel } from '../types';

export const generateResponse = async (
    prompt: string,
    systemInstruction: string,
    model: GeminiModel,
    config: ModelConfig
): Promise<string> => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY no está configurada. Asegúrate de que la variable de entorno API_KEY esté disponible.");
    }

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
                temperature: config.temperature,
                topP: config.topP,
                topK: config.topK,
                maxOutputTokens: config.maxOutputTokens,
            },
        });
        
        return response.text;

    } catch (error) {
        console.error("Error en la llamada a la API de Gemini:", error);
        if (error instanceof Error) {
            throw new Error(`Error en la API de Gemini: ${error.message}`);
        }
        throw new Error("Ocurrió un error desconocido al contactar la API de Gemini.");
    }
};
