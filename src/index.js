import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { createBrowserHistory } from "history";
import { BrowserRouter } from "react-router-dom";

import { AppLayout } from "./views/layouts";

import routes from "./routes";
import { mapRoutes } from "./utils";

const history = createBrowserHistory();

ReactDOM.render(
  <BrowserRouter history={history}>
    <AppLayout>{mapRoutes(routes)}</AppLayout>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
