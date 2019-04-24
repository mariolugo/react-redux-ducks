import React from 'react';
import _ from 'lodash';
import { Switch, Route } from 'react-router-dom';

import routes from '../routes';

const renderRoutes = (routes) => (
  <Switch>
    {routes.map((route, i) => (
      <Route exact={route.exact} key={i} path={route.path} render={props => (
        <route.component {...props} routes={route.routes}/>
      )}/>
    ))}
  </Switch>
);

export const mapRoutes = (routes) => (
  routes && routes.length ? renderRoutes(routes) : ''
);

export const routeTo = (name) => _.find(routes, { name: name }).path;