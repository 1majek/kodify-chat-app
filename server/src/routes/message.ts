import express, { Request, Response, NextFunction } from 'express';

const messageRouter = express.Router();

messageRouter.post('/addMessage', (req: Request, res: Response, next: NextFunction) => {
	res.send('add message path');
});

messageRouter.get('/getMessage', (req: Request, res: Response, next: NextFunction) => {
	res.send('get message path');
});
export default messageRouter;