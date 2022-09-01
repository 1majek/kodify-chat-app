import express, { Request, Response, NextFunction } from 'express';
import ChatError from '../formatter/erros';
import token from '../middleware/token';
import { getAllMessages, sendMessage } from '../repo/message';

const messageRouter = express.Router();

messageRouter.post('/addMessage', token, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const isMessageSent = await sendMessage(req.body);
		res.json({ isMessageSent });
	} catch (error) {
		console.log('🚀 > error', error)
		return ChatError.badRequest(res, 'An unexpected error has occured');
	}
});

messageRouter.get('/getMessages', token, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const messages = await getAllMessages();
		res.json(messages);
	} catch (error) {
		console.log('🚀 > error', error)
		return ChatError.badRequest(res, 'An unexpected error has occured');
	}
});
export default messageRouter;