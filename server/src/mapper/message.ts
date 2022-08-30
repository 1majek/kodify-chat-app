import { Message } from '../models';

export const messageMapper = (result: Record<string, any>): Message => {
	return {
		id: result.id,
		content: result.content,
		userId: result.user_id,
		createdAt: result.created_at.toJSON(),
	}
}