import { ChatbotResponse } from '@/services/chatService'
import { useMutation, } from '@tanstack/react-query'


export function useChatbot() {
	return useMutation({
		mutationFn: ChatbotResponse,
	})
}

