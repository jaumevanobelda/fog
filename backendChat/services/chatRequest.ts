import { groqService } from './groq';
import { cerebrasService } from './cerebras';
import { openRouterService } from './openrouter';
import { geminiService } from './gemini';
import { cohereService } from './cohere';
import { AIService, ChatMessage } from '../types';
const services: AIService[] = [
	groqService, cerebrasService, openRouterService,
	geminiService, cohereService
];
let currentServiceIndex = 0;
function getNextService() {
	const service = services[currentServiceIndex];
	currentServiceIndex = (currentServiceIndex + 1) % services.length;
	return service;
}
export async function ChatRequest(messages: ChatMessage[], attempts = 0) {
	if (attempts >= services.length) {

		return null;
	}
	let service = getNextService();
	try {
		console.log("Mensaje ", service);
		return await service.chat(messages);
	} catch (error) {
		console.log("service falado ", service);
		console.log(error);
		 

		return ChatRequest(messages, attempts + 1);
	}

}