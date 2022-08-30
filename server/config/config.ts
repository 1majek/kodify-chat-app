import mysql, { Pool } from 'mysql2/promise';

interface ConnectionConfig {
	port: number;
	username: string;
	password: string;
	host: string;
	dbname: string;
}

let pool: Promise<Pool>;

const createPool = async () => {
	let connection: ConnectionConfig = {
		port: Number(process.env.DB_PORT ?? 3306),
		username: process.env.DB_USER ?? '',
		password: process.env.DB_PASSWORD ?? '',
		host: process.env.DB_HOST ?? '',
		dbname: process.env.DB_DATABASE ?? ''
	};

	return mysql.createPool({
		host: connection.host,
		user: connection.username,
		password: connection.password,
		port: connection.port,
		database: connection.dbname
	})
}

export const getPool = async (): Promise<Pool> => {
	if (!pool) {
		pool = createPool();
	}

	return pool;
};
