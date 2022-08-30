import express, { Request, Response, NextFunction } from 'express';
import token from '../middleware/token';

const messageRouter = express.Router();

messageRouter.post('/addMessage', token, (req: Request, res: Response, next: NextFunction) => {
	res.send('add message path');
});

messageRouter.get('/getMessage', token, (req: Request, res: Response, next: NextFunction) => {
	res.send('get message path');
});
export default messageRouter;