import express, { Request, Response, NextFunction } from 'express';

const authRouter = express.Router();

authRouter.post('/login', (req: Request, res: Response, next: NextFunction) => {
	res.send('auth path');
});

export default authRouter;