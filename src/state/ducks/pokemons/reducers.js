import { combineReducers } from "redux";
import * as types from "./types";
import { createReducer } from "../../utils";

const initState = {
  isFetching: false
};

const reducers = createReducer(initState)({
  [types.FETCH_LIST_START]: (state, action) => {
    return {
      isFetching: true
    };
  },
  [types.FETCH_LIST_COMPLETED]: (state, action) => {
    return {
      pokemons: action.pokemons,
      isFetching: false
    };
  },
  [types.FETCH_LIST_FAILED]: (state, action) => {
    return {
      error: action.error,
      isFetching: false
    };
  },
  [types.FETCH_POKEMON_START]: (state, action) => {
    return {
      isFetching: true
    };
  },
  [types.FETCH_POKEMON_COMPLETED]: (state, action) => {
    return {
      pokemon: action.pokemon,
      isFetching: false
    };
  },
  [types.FETCH_POKEMON_FAILED]: (state, action) => {
    return {
      error: action.error,
      isFetching: false
    };
  }
});

export default combineReducers({
  pokemons: reducers
});
