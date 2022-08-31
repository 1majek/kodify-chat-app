export type ApiResponse<T> = {
  result: T;
};

export interface Problem {
  message: string;
  status: string;
  error: string;
}
