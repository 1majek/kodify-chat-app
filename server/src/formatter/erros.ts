import { Response } from 'express';

export default class ChatError {
	static unauthorized(res: Response, message: string = 'Unauthorized') {
		const STATUS = 401;
		return res.status(STATUS).json({
			status: STATUS,
			message
		})
	};

	static forbidden(res: Response, message: string = 'Forbidden') {
		return res.status(403).json({
			status: 403,
			message,
		});
	};

	static badRequest(res: Response, message: string = 'Bad Request') {
		return res.status(400).json({
			status: 400,
			message,
		});
	}
}