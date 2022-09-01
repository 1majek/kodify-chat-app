import { call, put } from "redux-saga/effects";
import { loginFailure, loginSuccess } from "../../actions/loginContext";
import { loginSagaRequest } from "../request/login";
import { Problem } from "../../../shared/models/api";
import { isAxiosError } from "../../../utils/errors";
import { LoginRequest } from "../../actions";

// Dispaches LOGIN_SUCCESS to obten TOKEN from the API
// In case of an error it dispaches LOGIN_FAILURE action
export function* handleLoginSaga(action: LoginRequest) {
  try {
    const { data } = yield call(loginSagaRequest, action.payload);
    yield put(loginSuccess(data));
  } catch (error) {
    if (isAxiosError<Problem>(error) && error.response) {
      yield put(loginFailure(error.response.data.message));
    }
  }
}
