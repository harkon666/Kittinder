import { put, takeEvery, call } from "redux-saga/effects";
import { API } from "../config/api";

export function* getUser() {
  try {
    yield put({ type: "GET_USER_FULFILLED" });
  } catch (error) {
    yield put({ type: "GET_USER_REJECTED" });
  }
}

export function* watchGetUser() {
  yield takeEvery("GET_USER_PENDING", getUser);
}
