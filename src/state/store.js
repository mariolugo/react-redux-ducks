import { createStore, applyMiddleware, combineReducers } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { compose } from "redux";
import * as reducers from "./ducks";
import { createLogger } from "./middlewares";
import { reducer as reduxFormReducer } from 'redux-form';

import { combineEpics } from "redux-observable";
import { pokemonsListEpic, pokemonDetailEpic } from "./ducks/pokemons/epics";
import { itemsListEpic, itemDetailEpic } from "./ducks/items/epics";

const rootEpic = combineEpics(
  pokemonsListEpic,
  pokemonDetailEpic,
  itemsListEpic,
  itemDetailEpic
);

const epicMiddleware = createEpicMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const formReducer = {
  form: reduxFormReducer
}
export default function configureStore(initialState) {
  const rootReducer = combineReducers({
    ...reducers,
    ...formReducer
  });

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(epicMiddleware, createLogger(true)))
  );

  epicMiddleware.run(rootEpic);

  return store;
}
