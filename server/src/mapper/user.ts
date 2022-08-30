import { User } from '../models';

export const userMapper = (result: Record<string, any>): User => {
	return {
		id: result.id,
		nickname: result.nickname,
		email: result.email,
		password: result.password
	}
}