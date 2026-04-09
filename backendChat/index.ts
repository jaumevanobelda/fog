import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';

import { chatRouter } from './router/chat.routes'


const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

app.use('/chat', chatRouter );

app.listen(process.env.PORT, () => console.log(` Backend IA arrancado`));