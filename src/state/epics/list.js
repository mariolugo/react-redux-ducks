import * as types from "../ducks/list/types";

import { of } from "rxjs";
import {
  delay,
  mapTo,
  map,
  catchError,
  mergeMap,
  switchMap
} from "rxjs/operators";
import { ofType } from "redux-observable";

import { listOperations } from "../ducks/list";

import { ajax } from "rxjs/ajax";

export const listEpic = action$ =>
  action$.pipe(
    ofType(types.FETCH_LIST_START),
    mergeMap(action => {
      console.log('action',action);
      return ajax
        .getJSON(action.url) // getJSON simply sends a GET request with Content-Type application/json
        .pipe(
          map(response => {
            return listOperations.fetchListSuccess(response);
          })
        ); // get the data and extract only the results
    }),
    catchError(error =>
      of({
        type: types.FETCH_LIST_FAILED,
        payload: "error",
        error: true
      })
    )
  );
