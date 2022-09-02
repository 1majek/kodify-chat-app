import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import ChatError from '../formatter/erros';
import { findUserByEmailAndPassword } from '../repo/user';

const loginRouter = express.Router();

const generateToken = (email: string | object | Buffer): string => {
	return jwt.sign(email, process.env.TOKEN_SECRET as string)
}

loginRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
	const { email, password } = req.body;
	try {
		const user = await findUserByEmailAndPassword(email, password);
		if (user) {
			const token = generateToken({ email });
			user.token = token;
			return res.json(user);
		}
		return ChatError.badRequest(res, 'Invalid user');
	} catch (error) {
		console.log('🚀 > error', error)
		return ChatError.badRequest(res, 'An unexpected error has occured');
	}
});

export default loginRouter;