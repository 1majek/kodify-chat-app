export interface User {
	id: number;
	nickname: string;
	email: string;
	password: string;
}

export interface Message {
	id: number;
	content: string;
	userId: number;
	createdAt: string;
}