import * as types from "./types";

export function fetchList(url) {
  return {
    type: types.FETCH_LIST_START,
    url
  };
}

export function fetchListSuccess(response) {
  return {
    type: types.FETCH_LIST_COMPLETED,
    items: response
  };
}

export function fetchListFailed(error) {
  return {
    type: types.FETCH_LIST_FAILED,
    error
  };
}
