import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import ChatError from '../formatter/erros';

const token = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader?.split(' ')[1];

	if (token === undefined) {
		return ChatError.unauthorized(res);
	}

	jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any) => {
		if (err) {
			return ChatError.forbidden(res, 'Invalid Token')
		}
		next();
	});
};

export default token;