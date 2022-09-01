import { LoginInput } from "../../../shared/validators/auth";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from "./../types";
import { LoginRequest, LoginSuccess, LoginFailure } from "./../index";
import { User } from "../../../shared/models";

export const loginRequest = (payload: LoginInput): LoginRequest => ({
  type: LOGIN_REQUEST,
  payload,
});

export const loginSuccess = (user: User): LoginSuccess => ({
  type: LOGIN_SUCCESS,
  payload: {
    user,
  },
});

export const loginFailure = (error: string): LoginFailure => ({
  type: LOGIN_FAILURE,
  payload: {
    error,
  },
});
