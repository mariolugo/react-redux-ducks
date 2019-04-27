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
    pokemons: response
  };
}

export function fetchListFailed(error) {
  return {
    type: types.FETCH_LIST_FAILED,
    error
  };
}

export function fetchPokemon(name) {
  return {
    type: types.FETCH_POKEMON_START,
    name
  };
}

export function fetchPokemonSuccess(response) {
  return {
    type: types.FETCH_POKEMON_COMPLETED,
    pokemon: response
  };
}

export function fetchPokemonFailed(error) {
  return {
    type: types.FETCH_POKEMON_FAILED,
    error
  };
}
