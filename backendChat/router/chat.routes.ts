import { Router } from 'express';
import { chatbot } from '../controllers/chat_controller';
import { verifyJWT } from '../middlware/verifyJWT';

// const router = express.Router();
export const chatRouter = Router();

chatRouter.post('/',verifyJWT, chatbot);
// module.exports = router;
