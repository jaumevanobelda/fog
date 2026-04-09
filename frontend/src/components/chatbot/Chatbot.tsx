
import { useChatbot } from "@/mutations/chat/useChat";
import { useState } from "react"
import { toast } from "sonner";
import { Input } from "../ui/input";
import type { ChatMessage } from "@/types/chat";

export default function Chatbot() {
	const chat = useChatbot();
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [prompt, setPrompt] = useState("");
	const [loadingMessage, setLoadingMessage] = useState(false);

	console.log("messages ", messages);
	return (
		<div>
			{messages.map((message, index) => (
				<div key={index} className={message.role}>
					<p>{message.content}</p>
				</div>
			))}
			<div>
				<Input placeholder="Escribe un mensaje" value={prompt} onChange={(event) => setPrompt(event.target.value)} onKeyDown={(event) => event.code == "Enter" ? send(): null  }></Input>
				<button onClick={send} className={loadingMessage === true ? "disabled" : ""}> Enviar </button>
			</div>
		</div>
	)


	async function send() {
		if (loadingMessage) return;
		if (prompt == "") return;
		setLoadingMessage(true);
		try {
			// console.log("messages ", messages);
			setPrompt("");
			setMessages((prev) => [...prev, { role: "user", content: prompt }, { role: "assistant", content: "" }])

			await chat.mutateAsync({
				messages: [...messages, { role: "user", content: prompt }],
				onChunk: (fullText) => {
					console.log("text ", { fullText });

					setMessages((prev) => {
						let newmessages = [...prev];
						newmessages[newmessages.length - 1].content = fullText;
						return newmessages;
					})
				}
			});
			setLoadingMessage(false);
		} catch (error) {
			toast.error("Ha ocurrido un error con el chat");
			console.error(error);
			setLoadingMessage(false);
		}
	}


}