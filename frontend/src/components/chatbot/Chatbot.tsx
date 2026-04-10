
import { useChatbot } from "@/mutations/chat/useChat";
import { useEffect, useRef, useState } from "react"
import { toast } from "sonner";
import { Input } from "../ui/input";
import type { ChatMessage } from "@/types/chat";

export default function Chatbot() {
	const chat = useChatbot();
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [prompt, setPrompt] = useState("");
	const [loadingMessage, setLoadingMessage] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const messagesContainerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const container = messagesContainerRef.current;
		if (!container) return;
		container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
	}, [messages]);
	useEffect(() => {
		const container = messagesContainerRef.current;
		if (!container) return;
		messagesContainerRef.current?.scrollTo({ top: container.scrollHeight, behavior: "instant" });
	}, [isOpen]);

	// console.log("messages ", messages);
	return (
		<div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
			{isOpen && (
				<div className="h-[520px] w-[92vw] max-w-[380px] overflow-hidden rounded-2xl border border-gray-700 bg-gray-900 text-white shadow-2xl sm:w-[380px]">
					<div className="flex items-center justify-between border-b border-gray-700 bg-gray-900/95 px-4 py-3 text-white">
						<div>
							<p className="text-sm font-semibold">Asistente IA</p>
						</div>
						<button type="button" onClick={() => setIsOpen(false)} className="rounded-lg px-2 py-1 text-sm text-gray-300 transition hover:bg-gray-800 hover:text-white">
							Cerrar
						</button>
					</div>

					<div ref={messagesContainerRef} className="h-[380px] space-y-3 overflow-y-auto bg-gray-900 p-4">
						{messages.length === 0 && (
							<div className="rounded-xl border border-dashed border-gray-700 bg-gray-800/40 p-4 text-sm text-gray-400">
								Inicia una conversacion escribiendo un mensaje.
							</div>
						)}
						{messages.map((message, index) => (
							<div
								key={index}
								className={`${message.role} w-fit max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${message.role === "user"
									? "user ml-auto rounded-br-sm bg-blue-600 text-white"
									: "assistant mr-auto rounded-bl-sm border border-gray-700 bg-gray-800 text-gray-100"
									}`}
							>
								<p className="whitespace-pre-wrap">{message.content}</p>
							</div>
						))}
					</div>

					<div className="border-t border-gray-700 bg-gray-900 p-3">
						<div className="flex items-center gap-2">
							<Input
								placeholder="Escribe un mensaje"
								value={prompt}
								onChange={(event) => setPrompt(event.target.value)}
								onKeyDown={(event) => event.code == "Enter" ? send() : null}
								className="h-10 border-gray-700 bg-gray-800 text-white placeholder:text-gray-400 focus-visible:ring-blue-500"
							/>
							<button type="button" onClick={send} className={`h-10 rounded-xl px-4 text-sm font-medium text-white transition 
								${loadingMessage === true ? "cursor-not-allowed bg-gray-600" : "bg-blue-600 hover:bg-blue-500"}`}
							>{loadingMessage ? "Enviando..." : "Enviar"}
							</button>
						</div>
					</div>
				</div>
			)}

			<button
				type="button"
				onClick={() => setIsOpen((prev) => !prev)}
				className="rounded-full border border-gray-700 bg-gray-900 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-gray-800"
			>
				{isOpen ? "Ocultar chat" : "Abrir chat"}
			</button>
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