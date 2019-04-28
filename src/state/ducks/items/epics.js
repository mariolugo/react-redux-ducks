import * as types from "./types";

import { of } from "rxjs";
import { map, catchError, mergeMap } from "rxjs/operators";
import { ofType } from "redux-observable";

import * as actions from "./actions";

import { ajax } from "rxjs/ajax";

export const itemsListEpic = action$ =>
  action$.pipe(
    ofType(types.FETCH_LIST_START),
    mergeMap(action => {
      return ajax
        .getJSON(action.url) // getJSON simply sends a GET request with Content-Type application/json
        .pipe(
          map(response => {
            return actions.fetchListSuccess(response);
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

  export const itemDetailEpic = action$ =>
  action$.pipe(
    ofType(types.FETCH_ITEM_START),
    mergeMap(action => {
      return ajax
        .getJSON(`https://pokeapi.co/api/v2/item/${action.name}/`)
        .pipe(
          map(response => {
            return actions.fetchItemSuccess(response);
          })
        );
    }),
    catchError(error => of(actions.fetchItemFailed(error)))
  );
