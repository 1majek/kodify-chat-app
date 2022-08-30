import { RowDataPacket } from 'mysql2'
import { getPool } from '../../config/config'
import { userMapper } from '../mapper/user';
import { User } from '../models';

export const findUserByEmailAndPassword = async (email: string, password: string): Promise<User | null> => {
	const pool = await getPool();
	const query = 'SELECT * FROM user where email = ?';
	const [rows] = await pool.query<RowDataPacket[]>(query, [email]);

	const result = rows[0];

	if (!result) {
		return null;
	}

	if (password === result['password']) {
		return userMapper(result);
	} else {
		return null;
	}
}