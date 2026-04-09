import express, { Request, Response } from 'express';

import { ChatRequest } from '../services/chatRequest';

export async function chatbot(req: Request, res: Response)  {
	const { messages } = req.body;


	const sanitizedMessages = messages.map((m: any) => ({
		role: m.role,
		content: m.content
	}));
	console.log("messages", messages);
	console.log("sanitizedMessages", sanitizedMessages);


	const stream = await ChatRequest(sanitizedMessages);
	console.log("stream ", stream);
	if (stream === null) {

		return res.status(503).json({ error: 'Todos los proveedores fallaron.' });
	}
	let fullResponse;

	res.setHeader('Content-Type', 'text/event-stream');
	res.setHeader('Cache-Control', 'no-cache');

	for await (const chunk of stream) {
		fullResponse += chunk;
		res.write(chunk);
		console.log("chunk ", chunk ," ",new Date().getMilliseconds());

	}
	console.log("fullResponse ", fullResponse);
	res.end();

}