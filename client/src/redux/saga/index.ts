import { takeLatest } from "redux-saga/effects";
import { LOGIN_REQUEST } from "../actions/types";
import { handleLoginSaga } from "./handler/login";

// https://redux-saga.js.org/docs/api/
export function* watcherSaga() {
  yield takeLatest(LOGIN_REQUEST, handleLoginSaga);
}
