import { createStore, applyMiddleware, combineReducers } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { compose } from "redux";
import * as reducers from "./ducks";
import { createLogger } from "./middlewares";

import { combineEpics } from "redux-observable";
import { pokemonsListEpic } from "./ducks/pokemons/epics";
import { itemsListEpic } from "./ducks/items/epics";

const rootEpic = combineEpics(
  pokemonsListEpic,
  itemsListEpic
);

const epicMiddleware = createEpicMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(initialState) {
  const rootReducer = combineReducers(reducers);

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(epicMiddleware, createLogger(true)))
  );

  epicMiddleware.run(rootEpic);

  return store;
}
