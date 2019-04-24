import React from "react";
import ReactDOM from "react-dom";

import * as serviceWorker from "./serviceWorker";
import { createBrowserHistory } from "history";
import { BrowserRouter } from "react-router-dom";

import { AppLayout } from "./views/layouts";

import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./state/store";

import routes from "./routes";
import { mapRoutes } from "./utils";

import "./index.css";

const reduxStore = configureStore(window.REDUX_INITIAL_DATA);

const history = createBrowserHistory();

ReactDOM.render(
  <ReduxProvider store={reduxStore}>
    <BrowserRouter history={history}>
      <AppLayout>{mapRoutes(routes)}</AppLayout>
    </BrowserRouter>
  </ReduxProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
