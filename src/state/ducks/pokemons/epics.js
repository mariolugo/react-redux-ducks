import * as types from "./types";

import { of } from "rxjs";
import { map, catchError, mergeMap } from "rxjs/operators";
import { ofType } from "redux-observable";

import * as actions from "./actions";

import { ajax } from "rxjs/ajax";

export const pokemonsListEpic = action$ =>
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
    catchError(error => of(actions.fetchListFailed(error)))
  );

export const pokemonDetailEpic = action$ =>
  action$.pipe(
    ofType(types.FETCH_POKEMON_START),
    mergeMap(action => {
      return ajax
        .getJSON(`https://pokeapi.co/api/v2/pokemon/${action.name}/`)
        .pipe(
          map(response => {
            return actions.fetchPokemonSuccess(response);
          })
        );
    }),
    catchError(error => of(actions.fetchPokemonFailed(error)))
  );
