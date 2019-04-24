import * as types from "../ducks/home/types";

import { of } from "rxjs";
import { delay, mapTo, map, catchError, mergeMap } from "rxjs/operators";
import { ofType } from "redux-observable";

import { listOperations } from "../ducks/home";

export const homeEpic = action$ =>
  action$.pipe(
    ofType(types.FETCH_LIST_START),
    map(action => {
      return listOperations.fetchListSuccess(action.counter);
    }),
    catchError(error =>
      of({
        type: types.FETCH_LIST_FAILED,
        payload: "error",
        error: true
      })
    )
  );
