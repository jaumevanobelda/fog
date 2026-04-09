import type { ChatMessage } from '@/types/chat';
import { apiChat } from './api'




export async function ChatbotResponse(request: { messages: ChatMessage[], onChunk: (fullText: string) => void }) {

	const res = await apiChat.post('chat', { messages: request.messages }, {
		responseType: 'text',
		onDownloadProgress: (event) => {
			const eventTarget = event.event?.target

			console.log("EVENt ", eventTarget);

			const responseText = eventTarget.responseText
			if (eventTarget.status != 200) {
				return
			}
			request.onChunk?.(responseText)
		},
	})
	return res;
}