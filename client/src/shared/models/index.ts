export interface User {
  id: number;
  nickname: string;
  email: string;
  password: string;
  token?: string;
}

export interface Message {
  id?: number;
  content: string;
  userId: number;
  createdAt?: string;
}
