import { LoginInput } from "../../../shared/validators/auth";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from "./../types";
import { LoginRequest, LoginSuccess, LoginFailure } from "./../index";

export const loginRequest = (payload: LoginInput): LoginRequest => ({
  type: LOGIN_REQUEST,
  payload,
});

export const loginSuccess = (token: string): LoginSuccess => ({
  type: LOGIN_SUCCESS,
  payload: {
    token,
  },
});

export const loginFailure = (error: string): LoginFailure => ({
  type: LOGIN_FAILURE,
  payload: {
    error,
  },
});
