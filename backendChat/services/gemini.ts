import { GoogleGenAI } from '@google/genai';
import { AIService, ChatMessage } from '../types';

export const geminiService: AIService = {
  name: "Google Gemini",
  async chat(messages: ChatMessage[]) {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
    const formattedContent = messages.map(m => ({
      role: m.role === 'system' || m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: formattedContent, // <--- Pasamos todo el array formateado
      config: { 
        temperature: 0.1,
        maxOutputTokens: 1000 
      }
    });

    return (async function* () {
      yield response.text || "No pude generar una recomendación.";
    })();
  }
};