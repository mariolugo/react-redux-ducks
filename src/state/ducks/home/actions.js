import * as types from "./types";

export function fetchList(counter) {
  return {
    type: types.FETCH_LIST_START,
    counter
  };
}

export function fetchListSuccess(counter) {
  return {
    type: types.FETCH_LIST_COMPLETED,
    counter
  };
}

export function fetchListFailed(error) {
  return {
    type: types.FETCH_LIST_FAILED,
    error
  };
}
