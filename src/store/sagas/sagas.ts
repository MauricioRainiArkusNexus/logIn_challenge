/* This was an unsuccessful attempt to use Redux Saga */
import { put, takeEvery, all } from "redux-saga/effects";
import { setIsAuthenticated } from "../slices/authSlice";
import { AuthService } from "../../services";
import { ActionSagas } from "../../types";
import { TakeableChannel } from "redux-saga";

function* loginSaga(action: ActionSagas): unknown {
  try {
    const isAuthenticated = yield AuthService.login(
      action.payload.email,
      action.payload.password
    );
    yield put(setIsAuthenticated(isAuthenticated));
    if (isAuthenticated) {
      localStorage.setItem("isAuthenticated", "true");
    } else {
      localStorage.removeItem("isAuthenticated");
    }
  } catch (error) {
    throw new Error(error as string);
  }
}

function* watchLogin() {
  /* TODO: Research correct type */
  yield takeEvery(
    "auth/login" as unknown as TakeableChannel<unknown>,
    loginSaga
  );
}

export function* rootSaga() {
  yield all([watchLogin()]);
}
