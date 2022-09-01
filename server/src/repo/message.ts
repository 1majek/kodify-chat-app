import { ResultSetHeader, RowDataPacket } from 'mysql2'
import { getPool } from '../../config/config'
import { messageMapper } from '../mapper/message';
import { Message } from '../models';

export const sendMessage = async (message: Message): Promise<boolean> => {
	const pool = await getPool();
	const query = 'INSERT INTO message (content, user_id) VALUES (?,?)';
	const [ResultSetHeader] = await pool.query<ResultSetHeader>(query, [message.content, message.userId]);
	if (ResultSetHeader.affectedRows === 1) {
		return true;
	} else {
		return false;
	}
}

export const getAllMessages = async (): Promise<Message[]> => {
	const pool = await getPool();
	const query = 'SELECT * from message';
	const [rows] = await pool.query<RowDataPacket[]>(query);

	return rows.map(messageMapper);
}
