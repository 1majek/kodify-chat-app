import { LoginInput } from "../../shared/validators/auth";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from "./types";

// LOGIN
export interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface LoginRequest {
  type: typeof LOGIN_REQUEST;
  payload: LoginInput;
}

export interface LoginSuccess {
  type: typeof LOGIN_SUCCESS;
  payload: {
    token: string;
  };
}

export interface LoginFailure {
  type: typeof LOGIN_FAILURE;
  payload: {
    error: string;
  };
}

export type AuthActions = LoginRequest | LoginSuccess | LoginFailure;
