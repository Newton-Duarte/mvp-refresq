import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Movements from '../pages/Movements';

export function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/movimentos" component={Movements} />
    </Switch>
  )
}

export default Routes;