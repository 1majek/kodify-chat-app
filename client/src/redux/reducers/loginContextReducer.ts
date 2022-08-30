import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
} from "./../actions/types";
import { Reducer } from "redux";
import { AuthActions, AuthState } from "../actions";

const initialState: AuthState = {
  token: null,
  loading: false,
  error: null,
};

const loginContextReducer: Reducer<AuthState, AuthActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        loading: false,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        token: null,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default loginContextReducer;
